import ItemProduct from "@/components/ItemProduct";
import { getProducts } from "./lib/get-products";

export default async function HomePage() {
    const { products, totalProducts, lastVisible } = await getProducts();

    return (
        <div className="bg-white m-2 p-3 rounded-lg border bg-card text-card-foreground shadow-sm">
            <div className="flex flex-col space-y-1.5 p-2 sm:flex-row sm:justify-between">
                <div>
                    <h3 className="text-2xl font-semibold leading-none tracking-tight text-gray-600">
                        Lista de productos
                    </h3>
                    <p className="text-sm text-muted-foreground text-gray-400">
                        Administre sus productos.
                    </p>
                </div>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Agregar Producto
                </button>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                    <thead>
                        <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                            <th className="py-2 px-6 text-gray-500 text-xm font-bold text-left">
                                #
                            </th>
                            <th className="py-2 px-6 text-gray-500 text-xm font-bold text-left">
                                Imagen
                            </th>
                            <th className="py-2 px-6 text-gray-500 text-xm font-bold text-left">
                                Nombre
                            </th>
                            <th className="py-2 px-6 text-gray-500 text-xm font-bold text-left">
                                Descripcion
                            </th>
                            <th className="py-2 px-6 text-gray-500 text-xm font-bold text-left">
                                Precio
                            </th>
                            <th className="py-2 px-6 text-gray-500 text-xm font-bold text-left"></th>
                        </tr>
                    </thead>
                    <tbody id="productTableBody" className="text-gray-700">
                        {products.map((product, index) => (
                            <ItemProduct
                                produt={product}
                                key={index}
                                id={index}
                            ></ItemProduct>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="flex items-center px-4 py-1 pt-0 mt-4">
                <form className="flex items-center w-full justify-between">
                    <div className="text-xs text-muted-foreground text-gray-500">
                        Mostrando <strong>{products.length}</strong> de{" "}
                        <strong>{totalProducts}</strong> productos
                    </div>
                    <div className="flex text-gray-700">
                        <button
                            className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3"
                            type="submit"
                            disabled=""
                        >
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
                                className="lucide lucide-chevron-left mr-2 h-4 w-4"
                            >
                                <path d="m15 18-6-6 6-6"></path>
                            </svg>
                            Anterior
                        </button>
                        <button
                            className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3"
                            type="submit"
                        >
                            Siguiente
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
                                className="lucide lucide-chevron-right ml-2 h-4 w-4"
                            >
                                <path d="m9 18 6-6-6-6"></path>
                            </svg>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
