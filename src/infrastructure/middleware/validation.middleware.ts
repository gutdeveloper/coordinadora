import { Request, Response, NextFunction } from "express";
import { z, ZodError, ZodSchema } from "zod";
import { StatusCodes } from "http-status-codes";

// Tipado mejorado para los esquemas de validación
export interface ValidationSchemas {
    params?: ZodSchema<unknown>;
    query?: ZodSchema<unknown>;
    body?: ZodSchema<unknown>;
}

export function validateData(schema: ValidationSchemas) {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            const parsedParams = schema.params?.safeParse(req.params);
            const parsedQuery = schema.query?.safeParse(req.query);
            const parsedBody = schema.body?.safeParse(req.body);
            const errors: any[] = [];

            if (parsedParams && !parsedParams.success) {
                errors.push(...parsedParams.error.errors);
            }

            if (parsedQuery && !parsedQuery.success) {
                errors.push(...parsedQuery.error.errors);
            }

            if (parsedBody && !parsedBody.success) {
                errors.push(...parsedBody.error.errors);
            }

            if (errors.length > 0) {
                res.status(StatusCodes.BAD_REQUEST).json({
                    error: "Invalid request data",
                    details: errors.map((issue) => ({
                        field: issue.path.join("."),
                        message: issue.message,
                    })),
                });
                return;
            }
            next();
        } catch (error) {
            console.error("Validation Middleware Error ❌:", error);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                error: "Internal Server Error",
            });
        }
    };
}
