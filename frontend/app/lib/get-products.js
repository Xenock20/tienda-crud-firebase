export const getProducts = ( async () => {
  const res = await fetch('http://localhost:3001/api/products')
  const data = await res.json()
  return data;
})