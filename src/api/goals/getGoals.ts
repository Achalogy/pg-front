const { BACKEND_URL } = import.meta.env;
import headersWAuth from "../..//utils/headersWAuth";

export default async (Astro: any): Promise<{
  data: {
    id: string;
    name: string,
    targetAmount: number,
    deadline: Date,
    completed: boolean,
    createdAt: Date
  }[],
  meta: {
    hasNext: boolean,
    totalCount: number,
    count: number,
    next: number
  }
}> => {
  const query = await fetch(new URL("/goals", BACKEND_URL), {
    headers: headersWAuth(Astro),
  });

  if (!query.ok) throw new Error(`HTTP ${query.status}`)

  return await query.json()
}
