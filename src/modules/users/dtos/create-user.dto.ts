import { z } from "zod";
import { cpf } from "cpf-cnpj-validator";

export const CreateUserSchema = z.object({
  name: z.string().min(2),
  email: z.string().email({ message: "Invalid email format" }),
  phone: z
    .string()
    .regex(/^\+?[1-9]\d{1,14}$/, { message: "Invalid E.164 phone number" }),
  password: z.string().min(8),
  cpf: z.string().refine(
    (userCpf) => {
      return cpf.isValid(userCpf);
    },
    { message: "Invalid CPF" },
  ),
});

export type CreateUserDTO = z.infer<typeof CreateUserSchema>;
