import { ActionError, defineAction } from "astro:actions";
import { z } from "astro:schema";

const { BACKEND_URL } = import.meta.env

export const deleteGoalAction = defineAction({
  accept: 'json',
  input: z.object({
    id: z.string().uuid()
  }),
  handler: async (input, ctx) => {
    const request = await fetch(new URL(`/goals/${input.id}`, BACKEND_URL).toString(), {
      method: "DELETE",
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

    const response = await request.text()

    return response
  }
})