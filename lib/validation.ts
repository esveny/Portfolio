import { z } from "zod";

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter at least 2 characters for your name.")
    .max(80, "Name is too long."),
  email: z.string().trim().email("Please enter a valid email address."),
  message: z
    .string()
    .trim()
    .min(20, "Message should be at least 20 characters.")
    .max(1200, "Message is too long.")
});

export type ContactInput = z.infer<typeof contactSchema>;