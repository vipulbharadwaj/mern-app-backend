const { z } = require("zod");

const loginSchema = z.object({
  email: z.string({ required_error: "Email is required" }).trim().email({ message: "Invalid email address" }),
  password: z.string({ required_error: "Password is required" }).trim().min(6, { message: "Password must be at least 6 characters long" }),
});

const signupSchema = loginSchema.extend({
  username: z.string({ required_error: "Name is required" }).trim(),
  phone: z.string({ required_error: "Phone is required" }).trim().min(10, { message: "Phone must be at least 10 characters long" }),
});

module.exports = { signupSchema, loginSchema };
