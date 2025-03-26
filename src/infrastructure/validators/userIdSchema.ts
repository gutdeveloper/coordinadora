import { z } from "zod";

export const userIdSchema = z.object({
    user_id: z.string().uuid({ message: "Invalid user_id format. Must be a UUID." })
});