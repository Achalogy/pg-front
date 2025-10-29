export default (Astro: any) => {
  const cookie = Astro.cookies.get("token")
  if(!cookie || !cookie.value) 
    throw new Error("There is no Token")
  const token = cookie?.value;

  return ({
    Authorization: `Bearer ${token}`,
  })
}