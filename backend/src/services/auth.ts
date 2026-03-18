import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Prisma } from "@prisma/client";
import { prisma, createAccessToken, flatedUserFromDB } from "@/helpers";
import type { Request, Response } from "express";
import type {
    ApiResponse,
    Freelancer,
    Client,
    AuthResult,
    RegisterRequest,
    LoginRequest,
    BaseUser,
} from "@shared/types";
import type { JWTPayload } from "@/types";

const SALT_ROUNDS = 10;

export const registerUser = async (
    req: Request<{}, {}, RegisterRequest, {}>,
    res: Response<ApiResponse<AuthResult>>,
) => {
    try {
        if (!req.body || typeof req.body !== "object") {
            return res.status(400).json({ success: false, data: "Invalid request body" });
        }

        const { name, lastName, email, password, role } = req.body;

        if (!name || !lastName || !email || !password || !role) {
            return res.status(400).json({ success: false, data: "Missing required fields" });
        }

        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
        const login = `${name.toLowerCase()}${lastName.toLowerCase()}${Date.now().toString().slice(-4)}`;

        const createdUser = await prisma.user.create({
            data: {
                name,
                lastName,
                email,
                password: hashedPassword,
                role,
                login,
                gender: "male",
                phone: "",
                location: "",
                rating: 0,
                status: "unverified",
                statusChat: "online",
                ...(role === "freelancer"
                    ? {
                          freelancer: {
                              create: {
                                  pricePerHour: 1000,
                                  experience: 0,
                                  category: "web-dev",
                                  earning: 0,
                              },
                          },
                      }
                    : { client: { create: { spending: 0 } } }),
            },
        });

        const base: BaseUser = {
            id: createdUser.id,
            name: createdUser.name,
            lastName: createdUser.lastName,
            email: createdUser.email,
            login: createdUser.login,
            phone: createdUser.phone,
            picture: null,
            gender: "male",
            rating: 0,
            bio: null,
            location: "",
            status: "unverified",
            statusChat: "online",
            registeredAt: createdUser.registeredAt.toISOString(),
        };

        const flatUser: Freelancer | Client =
            role === "freelancer"
                ? {
                      ...base,
                      role: "freelancer",
                      completedOrders: 0,
                      skills: [],
                      pricePerHour: 1000,
                      experience: 0,
                      category: "web-dev",
                      earning: 0,
                  }
                : { ...base, role: "client", spending: 0 };

        const token = createAccessToken({ userId: flatUser.id, role: flatUser.role });

        return res.status(201).json({ success: true, data: { token, user: flatUser } });
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
            return res
                .status(409)
                .json({ success: false, data: "User with this email already exists" });
        }

        console.error(error);
        return res.status(500).json({ success: false, data: "Failed to register user" });
    }
};

export const loginUser = async (
    req: Request<{}, {}, LoginRequest, {}>,
    res: Response<ApiResponse<AuthResult>>,
) => {
    try {
        if (!req.body || typeof req.body !== "object") {
            return res.status(400).json({ success: false, data: "Invalid request body" });
        }

        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ success: false, data: "Missing email or password" });
        }

        const SECRET_KEY = process.env["SECRET_KEY"];

        if (!SECRET_KEY) {
            return res.status(500).json({ success: false, data: "Invalid token" });
        }

        const user = await prisma.user.findUnique({
            where: { email },
            include: {
                picture: { select: { large: true, medium: true, thumbnail: true } },
                client: { select: { orders: true, spending: true } },
                freelancer: {
                    select: {
                        orders: true,
                        skills: { select: { name: true } },
                        pricePerHour: true,
                        category: true,
                        earning: true,
                        experience: true,
                        responses: true,
                    },
                },
            },
        });

        if (!user) {
            return res.status(401).json({ success: false, data: "Invalid email or password" });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ success: false, data: "Invalid email or password" });
        }

        let flatUser = flatedUserFromDB(user);

        if (!flatUser) {
            return res.status(401).json({ success: false, data: "Invalid email or password" });
        }

        const token = createAccessToken({ userId: flatUser.id, role: flatUser.role });

        return res.status(200).json({ success: true, data: { token, user: flatUser } });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, data: "Internal Server Error" });
    }
};

export const deleteUser = async (
    req: Request<{ currentUserId: string }, {}, {}, {}>,
    res: Response,
) => {
    try {
        const currentUserId = Number(req.params["currentUserId"]);

        await prisma.user.delete({ where: { id: currentUserId } });

        res.status(200).json({ success: true, data: "User successfully deleted" });
    } catch (error) {
        res.status(500).json({ success: false, data: "Internal Server Error" });
    }
};

export const autoLogin = async (req: Request, res: Response<ApiResponse<AuthResult>>) => {
    try {
        const token = req.headers["authorization"]?.split(" ")[1];

        if (!token) {
            return res.status(401).json({ success: false, data: "No token provided" });
        }

        const SECRET_KEY = process.env["SECRET_KEY"];

        if (!SECRET_KEY) {
            return res.status(500).json({ success: false, data: "Invalid token" });
        }

        const payload = jwt.verify(token, SECRET_KEY) as JWTPayload;

        const user = await prisma.user.findUnique({
            where: { id: payload.userId, role: payload.role },
            include: {
                picture: { select: { large: true, medium: true, thumbnail: true } },
                client: { select: { orders: true, spending: true } },
                freelancer: {
                    select: {
                        orders: true,
                        skills: { select: { name: true } },
                        pricePerHour: true,
                        category: true,
                        earning: true,
                        experience: true,
                        responses: true,
                    },
                },
            },
        });

        if (!user) {
            return res.status(401).json({ success: false, data: "Invalid email or password" });
        }

        let flatUser = flatedUserFromDB(user);

        if (!flatUser) {
            return res.status(401).json({ success: false, data: "Invalid email or password" });
        }

        return res.status(200).json({ success: true, data: { token, user: flatUser } });
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            return res.status(401).json({ success: false, data: "Token expired" });
        }

        if (error instanceof jwt.JsonWebTokenError) {
            return res.status(401).json({ success: false, data: "Invalid token" });
        }

        return res.status(500).json({ success: false, data: "Internal Server Error" });
    }
};
