import React from "react";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";

export default function FooterTable({
    productsLength,
    totalProducts,
    lastVisible,
    firstVisible,
    onNext,
    onReturn,
}) {
    return (
        <div className="flex items-center px-4 py-1 pt-0 mt-4">
            <div className="flex items-center w-full justify-between">
                <div className="text-xs text-muted-foreground text-gray-500">
                    {productsLength == null ? (
                        <>
                            Mostrando{" "}
                            <strong>{totalProducts - firstVisible + 1}</strong> -
                            <strong>{totalProducts}</strong> productos
                        </>
                    ) : (
                        <>
                            Mostrando <strong>{productsLength - 9}</strong> -{" "}
                            <strong>{productsLength}</strong> de{" "}
                            <strong>{totalProducts}</strong> productos
                        </>
                    )}
                </div>
                <div className="flex text-gray-700">
                    <button
                        onClick={onReturn}
                        className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3"
                        disabled={!firstVisible && firstVisible != 0} // Deshabilitar si no hay página anterior
                    >
                        <IoIosArrowBack />
                        Anterior
                    </button>
                    <button
                        onClick={onNext}
                        className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3"
                        disabled={!lastVisible} // Deshabilitar si no hay página siguiente
                    >
                        Siguiente
                        <IoIosArrowForward />
                    </button>
                </div>
            </div>
        </div>
    );
}
