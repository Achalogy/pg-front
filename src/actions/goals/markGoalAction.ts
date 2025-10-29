import { ActionError, defineAction } from "astro:actions";
import { z } from "astro:schema";

const { BACKEND_URL } = import.meta.env

export const markGoalAction = defineAction({
  accept: 'json',
  input: z.object({
    id: z.string().uuid(),
    v: z.boolean().optional()
  }),
  handler: async (input, ctx) => {
    const request = await fetch(new URL(`/goals/${input.id}/complete?v=${input.v == undefined || input.v ? "1" : "0"}`, BACKEND_URL).toString(), {
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