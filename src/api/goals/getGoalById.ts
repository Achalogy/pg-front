const { BACKEND_URL } = import.meta.env;
import headersWAuth from "../../utils/headersWAuth";

export default async (Astro: any, id: string): Promise<{
  id: string;
  name: string,
  targetAmount: number,
  deadline: Date,
  completed: boolean,
  createdAt: Date
  currentBalance: number
}> => {
  const query = await fetch(new URL(`/goals/${id}`, BACKEND_URL), {
    headers: headersWAuth(Astro),
  });

  if (!query.ok) throw new Error(`HTTP ${query.status}`)

  return await query.json()
}
