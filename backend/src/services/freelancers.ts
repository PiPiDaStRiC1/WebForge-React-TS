import { freelancersById, allFreelancersIds } from "@/data/users.json";
import { ordersById } from "@/data/orders.json";
import { getIdOrThrow } from "@/helpers";
import { isFreelancer } from "@shared/types/typeguards";
import type { Response, Request } from "express";
import type {
    FreelancerWithoutCompletedOrders,
    Freelancer,
    FreelancerResponse,
    FreelancersResponse,
} from "@shared/types";
import type { FreelancerRequest } from "@/types";

const basedFreelancers: Record<string, FreelancerWithoutCompletedOrders> = Object.fromEntries(
    (Object.values(freelancersById) as Array<unknown>)
        .filter(isFreelancer)
        .map((user) => [user.id, user]),
);

const buildFreelancersWithCompletedOrders = (ids: number[]): Record<string, Freelancer> =>
    Object.fromEntries(
        ids.map((freelancerId) => {
            const freelancer = getIdOrThrow(freelancerId, basedFreelancers);
            const completedOrders = Object.values(ordersById).filter(
                (order) => order.completedById === freelancer.id,
            ).length;
            return [freelancer.id, { ...freelancer, completedOrders }];
        }),
    );

export const getAllFreelancers = (_req: Request, res: Response<FreelancersResponse>) => {
    try {
        const freelancersWithCompletedOrders =
            buildFreelancersWithCompletedOrders(allFreelancersIds);

        res.status(200).json({
            status: true,
            data: { freelancersById: freelancersWithCompletedOrders, allIds: allFreelancersIds },
        });
    } catch (error) {
        res.status(500).json({ status: false, data: "Internal Server Error" });
    }
};

export const getOneFreelancer = (
    req: Request<FreelancerRequest>,
    res: Response<FreelancerResponse>,
) => {
    const userId = req.params["freelancerId"];

    try {
        const freelancer = getIdOrThrow(userId, basedFreelancers);
        const completedOrdersCount = Object.values(ordersById).filter(
            (order) => order.completedById === freelancer.id,
        ).length;

        res.status(200).json({
            status: true,
            data: { ...freelancer, completedOrders: completedOrdersCount },
        });
    } catch (error) {
        res.status(404).json({ status: false, data: "Freelancer not found" });
    }
};
