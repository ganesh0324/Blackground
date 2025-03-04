import { z } from "zod";

export const formSchema = z.object({
  handle: z.string().min(2).max(50),
});
