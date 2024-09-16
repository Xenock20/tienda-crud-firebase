import React, { useEffect, useState } from 'react';
import Image from 'next/image'; // Si estás usando Next.js
import { AiOutlineLoading } from "react-icons/ai";

export default function ProductImage({ product }) {
  const [isLoading, setIsLoading] = useState(true);

  // Usamos useEffect para ejecutar el setTimeout cuando se monta el componente
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    // Limpieza en caso de que el componente se desmonte antes de los 2 segundos
    return () => clearTimeout(timer);
  }, []);

  return (
    <td className="py-1 px-6">
      {isLoading ? (
        <div className="w-14 h-14 flex justify-center items-center">
          <AiOutlineLoading className="animate-spin text-3xl text-blue-500"/>
        </div>
      ) : (
        <Image
          src={product.image}
          alt={product.name}
          width={43}
          height={43}
          className="object-contain w-max h-14 my-auto"
        />
      )}
    </td>
  );
}
