// Ajustar la función para incluir parámetros de paginación
export const getProducts = async (lastVisible) => {
  const queryParams = new URLSearchParams();
  if (lastVisible) queryParams.append('lastVisible', lastVisible);
  
  const res = await fetch(`http://localhost:3001/api/products?${queryParams.toString()}`);
  const data = await res.json();
  return data;
};
