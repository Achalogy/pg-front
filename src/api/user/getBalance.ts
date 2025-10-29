const { BACKEND_URL } = import.meta.env;
import headersWAuth from "../..//utils/headersWAuth";

export default async (Astro: any): Promise<{
  balance: number,
  income: number,
  expense: number
}> => {

  const query = await fetch(new URL("/user/balance", BACKEND_URL), {
    headers: headersWAuth(Astro),
  });

  if (!query.ok) throw new Error(`HTTP ${query.status}`)

  return await query.json()
}
