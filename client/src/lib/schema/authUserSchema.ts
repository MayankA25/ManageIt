import * as z from "zod";

export const checkUserEmail = z.object({
    firstName: z.string().min(3, "Atleast 3 characters required").max(40, "At max 40 characters are possible"),
    lastName: z.string().min(3, "Atleast 3 characters required").max(40, "At max 40 characters are possible"),
    email: z.email("Email Must Be Valid.")
})