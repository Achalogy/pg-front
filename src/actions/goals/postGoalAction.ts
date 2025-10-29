import { ActionError, defineAction } from "astro:actions";
import { z } from "astro:schema";

const { BACKEND_URL } = import.meta.env

function formatDateColombia(date: Date) {
  const pad = (n: number) => n.toString().padStart(2, "0");

  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1);
  const day = pad(date.getDate());
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());
  const seconds = pad(date.getSeconds());

  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}-05:00`;
}


export const postGoalAction = defineAction({
  accept: 'form',
  input: z.object({
    name: z.string(),
    targetAmount: z.preprocess((v) => {
      if (typeof v === "string") {
        const value = v.replace(/\D/g, ""); // elimina no dígitos
        const number = Number(value);
        return isNaN(number) ? undefined : number;
      }
      return v;
    }, z.number().min(1)),
    deadline: z.preprocess((v: any) => {
      return formatDateColombia(new Date(v + ":00-05:00"))
    }, z.string())
  }),
  handler: async (input, ctx) => {
    const request = await fetch(new URL("/goals", BACKEND_URL).toString(), {
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