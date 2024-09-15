import React from "react";

export default function ItemProduct({ produt, id }) {
    return (
        <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
            <td className="py-1 px-6">{id + 1}</td>
            <td className="py-1 px-6">
                <img src={produt.image} alt={produt.name} width="45" height="45" />
            </td>
            <td className="py-1 px-6">{produt.name}</td>
            <td className="py-1 px-6 max-w-xs">
                <p className="truncate">
                {produt.description}
                </p>
            </td>
            <td className="py-1 px-6">$ {produt.price}</td>
            <td className="py-1 px-6">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="lucide lucide-ellipsis h-4 w-4"
                >
                    <circle cx="12" cy="12" r="1"></circle>
                    <circle cx="19" cy="12" r="1"></circle>
                    <circle cx="5" cy="12" r="1"></circle>
                </svg>
            </td>
        </tr>
    );
}
