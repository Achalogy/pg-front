import { ActionError, defineAction } from "astro:actions";
import { z } from "astro:schema";

const { BACKEND_URL } = import.meta.env

export const postTransactionAction = defineAction({
  accept: 'form',
  input: z.object({
    type: z.enum(["INCOME", "EXPENSE"]),
    amount: z.preprocess((v) => {
      if (typeof v === "string") {
        const value = v.replace(/\D/g, ""); // elimina no dígitos
        const number = Number(value);
        return isNaN(number) ? undefined : number;
      }
      return v;
    }, z.number().min(1)),
    description: z.string().optional(),
    category: z.string().optional(),
  }),
  handler: async (input, ctx) => {
    const request = await fetch(new URL("/transactions", BACKEND_URL).toString(), {
      method: "POST",
      body: JSON.stringify(input),
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${ctx.cookies.get("token")?.value ?? ""}`
      }
    })


    if (!request.ok) {
      throw new ActionError({
        code: "BAD_REQUEST",
        message: "unhandled"
      })
    }

    const response = await request.json()

    return response
  }
})