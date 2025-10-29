const { BACKEND_URL } = import.meta.env;
import headersWAuth from "../../utils/headersWAuth";

export default async (Astro: any, id: string): Promise<{
  id: string;
  type: "INCOME" | "EXPENSE";
  amount: number;
  category: string;
  description: string;
  date: Date;
  createdAt: Date;
  goalId?: string;
  goal: {
    name: string
  }
}> => {
  const query = await fetch(new URL(`/transactions/${id}`, BACKEND_URL), {
    headers: headersWAuth(Astro),
  });

  if (!query.ok) throw new Error(`HTTP ${query.status}`)

  return await query.json()
}
