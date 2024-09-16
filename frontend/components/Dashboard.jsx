"use client";

import React, { useEffect, useState } from "react";
import FooterTable from "@/components/FooterTable";
import Table from "@/components/Table";
import HeadTable from "@/components/HeadTable";
import { getProducts } from "@/app/lib/get-products";
import Modal from "@/components/Modal";
import AddProductForm from "@/components/AddProductForm";
import UpdateProductForm from "@/components/UpdateProductForm";
import DeleteProductForm from "./DeleteProductForm";

export default function Dashboard() {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [productsPerPage] = useState(10); // Número de productos por página
    const [totalProducts, setTotalProducts] = useState(0);
    const [typeForm, setTypeForm] = useState(0);
    const [isModalOpen, setModalOpen] = useState(false);
    const [refresh, setRefresh] = useState(0);
    const [productToUpdateOrDelete, setProductToUpdateOrDelete] = useState(null);

    const fetchProducts = async () => {
        const data = await getProducts();
        setProducts(data.products);
        setTotalProducts(data.totalProducts);
    };

    useEffect(() => {
        fetchProducts();
    }, [refresh]);

    const handleClickNext = () => {
        if ((currentPage + 1) * productsPerPage < totalProducts) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handleClickReturn = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleAddProduct = () => {
        setModalOpen(true);
        setTypeForm(1); // 1 para añadir producto
    };

    const handleUpdateProduct = (product) => {
        setModalOpen(true);
        setTypeForm(2); // 2 para editar producto
        setProductToUpdateOrDelete(product);
    };

    const handleDeleteProduct = (product) => {
        setModalOpen(true);
        setTypeForm(3); // 3 para eliminar producto
        setProductToUpdateOrDelete(product);
    };

    const handleRefreshOperation = (value) => {
        setRefresh(value);
    };

    const closeModal = () => {
        setModalOpen(false);
        setProductToUpdateOrDelete(null);
    };

    // Obtener productos de la página actual
    const paginatedProducts = products.slice(
        currentPage * productsPerPage,
        (currentPage + 1) * productsPerPage
    );

    return (
        <div>
            <HeadTable onAddProduct={handleAddProduct} />
            <Table
                products={paginatedProducts}
                onEditProduct={handleUpdateProduct}
                onDeleteProduct={handleDeleteProduct}
            />
            <FooterTable
                totalProducts={totalProducts}
                currentPage={currentPage}
                productsPerPage={productsPerPage}
                onNext={handleClickNext}
                onReturn={handleClickReturn}
            />

            {isModalOpen && (
                <Modal type={typeForm}>
                    {typeForm === 1 ? (
                        <AddProductForm
                            onRefresh={handleRefreshOperation}
                            closeModal={closeModal}
                        />
                    ) : typeForm === 2 ? (
                        <UpdateProductForm
                            product={productToUpdateOrDelete}
                            onRefresh={handleRefreshOperation}
                            closeModal={closeModal}
                        />
                    ) : (
                        <DeleteProductForm
                            product={productToUpdateOrDelete}
                            onRefresh={handleRefreshOperation}
                            closeModal={closeModal}
                        />
                    )}
                </Modal>
            )}
        </div>
    );
}
