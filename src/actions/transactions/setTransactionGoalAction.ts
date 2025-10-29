import { ActionError, defineAction } from "astro:actions";
import { z } from "astro:schema";

const { BACKEND_URL } = import.meta.env

export const setTransactionGoalAction = defineAction({
  accept: 'json',
  input: z.object({
    tid: z.string().uuid(),
    gid: z.string()
  }),
  handler: async (input, ctx) => {
    const request = await fetch(new URL(`/transactions/${input.tid}/goal/${input.gid}`, BACKEND_URL).toString(), {
      method: "POST",
      headers: {
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