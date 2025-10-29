import { ActionError, defineAction } from "astro:actions";
import { z } from "astro:schema";

const { BACKEND_URL } = import.meta.env

export const LogInAction = defineAction({
  accept: 'form',
  input: z.object({
    password: z.string(),
    email: z.string().email()
  }),
  handler: async (input) => {
    const request = await fetch(new URL("/auth/log-in", BACKEND_URL).toString(), {
      method: "POST",
      body: JSON.stringify(input),
      headers: {
        "Content-Type": "application/json"
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