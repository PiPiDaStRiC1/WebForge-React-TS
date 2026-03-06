import { responsesById, allIds } from "@/data/orderResponses.json";
import { isResponse } from "@shared/types/typeguards";
import type { Request, Response as ExpressResponse } from "express";
import type { Response, OrderResponsesResponse, ResponsesResponse } from "@shared/types";
import type { ResponseRequest } from "@/types";

const basedResponses: Record<string, Response> = Object.fromEntries(
    (Object.values(responsesById) as Array<unknown>)
        .filter(isResponse)
        .map((response) => [response.id, response]),
);

export const getAllResponses = (_req: Request, res: ExpressResponse<ResponsesResponse>) => {
    try {
        res.status(200).json({ status: true, data: { responsesById: basedResponses, allIds } });
    } catch (error) {
        res.status(500).json({ status: false, data: "Internal Server Error" });
    }
};

export const getOneOrderResponses = (
    req: Request<ResponseRequest>,
    res: ExpressResponse<OrderResponsesResponse>,
) => {
    const orderId = Number(req.params["orderId"]);

    try {
        const responses = Object.values(basedResponses).filter(
            (response) => response.orderId === orderId,
        );
        res.status(200).json({ status: true, data: responses });
    } catch (error) {
        res.status(404).json({ status: false, data: "Response not found" });
    }
};
