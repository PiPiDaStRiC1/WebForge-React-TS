import { prisma } from "@/helpers";
import type { Response, Request } from "express";
import type { FreelancerResponse, FreelancersResponse, Freelancer } from "@shared/types";
import type { FreelancerRequest } from "@/types";

export const getAllFreelancers = async (_req: Request, res: Response<FreelancersResponse>) => {
    try {
        const freelancers = await prisma.user.findMany({
            where: { role: "freelancer" },
            include: {
                freelancer: { include: { orders: true, skills: true } },
                picture: { select: { large: true, medium: true, thumbnail: true } },
            },
        });

        const flatFreelancers = Object.fromEntries(
            freelancers.map((freelancer) => {
                const { freelancer: freelancerData, ...rest } = freelancer;

                const ordersCount = freelancerData?.orders?.length ?? 0;
                return [
                    freelancer.id,
                    {
                        ...rest,
                        gender: rest.gender as Freelancer["gender"],
                        role: "freelancer" as const,
                        status: rest.status as Freelancer["status"],
                        statusChat: rest.statusChat as Freelancer["statusChat"],
                        registeredAt: rest.registeredAt.toISOString(),
                        pricePerHour: freelancerData?.pricePerHour ?? 1000,
                        category: (freelancerData?.category ?? "") as Freelancer["category"],
                        earning: freelancerData?.earning ?? 0,
                        experience: freelancerData?.experience ?? 0,
                        skills: freelancerData?.skills.map((skill) => skill.name) ?? [],
                        completedOrders: ordersCount,
                    },
                ];
            }),
        );

        const allIds = freelancers.map((freelancer) => freelancer.id);

        res.status(200).json({ success: true, data: { freelancersById: flatFreelancers, allIds } });
    } catch (error) {
        res.status(500).json({ success: false, data: "Internal Server Error" });
    }
};

export const getOneFreelancer = async (
    req: Request<FreelancerRequest>,
    res: Response<FreelancerResponse>,
) => {
    const id = Number(req.params["freelancerId"]);

    try {
        const freelancer = await prisma.user.findFirstOrThrow({
            where: { role: "freelancer", id: id },
            include: {
                freelancer: { include: { orders: true, skills: true } },
                picture: { select: { large: true, medium: true, thumbnail: true } },
            },
        });

        const { freelancer: freelancerData, ...rest } = freelancer;
        const ordersCount = freelancerData?.orders?.length ?? 0;

        const flatFreelancer: Freelancer = {
            ...rest,
            gender: rest.gender as Freelancer["gender"],
            role: "freelancer" as const,
            status: rest.status as Freelancer["status"],
            statusChat: rest.statusChat as Freelancer["statusChat"],
            registeredAt: rest.registeredAt.toISOString(),
            pricePerHour: freelancerData?.pricePerHour ?? 1000,
            category: (freelancerData?.category ?? "") as Freelancer["category"],
            earning: freelancerData?.earning ?? 0,
            experience: freelancerData?.experience ?? 0,
            skills: freelancerData?.skills.map((skill) => skill.name) ?? [],
            completedOrders: ordersCount,
        };

        res.status(200).json({ success: true, data: flatFreelancer });
    } catch (error) {
        res.status(404).json({ success: false, data: "Freelancer not found" });
    }
};
