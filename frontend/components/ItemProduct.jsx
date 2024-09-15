import Image from "next/image";
import React from "react";
import { SlOptions } from "react-icons/sl";

export default function ItemProduct({ product, id }) {
    return (
        <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
            <td className="py-1 px-6">{product.id}</td>
            <td className="py-1 px-6">
                <Image src={product.image} alt={product.name} width="45" height="45" ></Image>
            </td>
            <td className="py-1 px-6">{product.name}</td>
            <td className="py-1 px-6 max-w-xs">
                <p className="truncate">
                {product.description}
                </p>
            </td>
            <td className="py-1 px-6">$ {product.price}</td>
            <td className="py-1 px-6">
                <SlOptions />
            </td>
        </tr>
    );
}
