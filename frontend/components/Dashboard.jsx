"use client";

import React, { useEffect, useState } from "react";
import FooterTable from "@/components/FooterTable";
import Table from "@/components/Table";
import HeadTable from "@/components/HeadTable";
import { getProducts } from "@/app/lib/get-products";

export default function Dashboard() {
    const [products, setProducts] = useState([]);
    const [nextPage, setNextPage] = useState(null);
    const [returnPage, setReturnPage] = useState(null);
    const [totalProducts, setTotalProducts] = useState(0);

    const fetchProducts = async (lastVisibleId) => {
        const data = await getProducts(lastVisibleId);
        setProducts(data.products);
        setTotalProducts(data.totalProducts);
        setNextPage(data.nextPage);
        setReturnPage(data.returnPage);
    };

    useEffect(() => {
        fetchProducts(null);
    }, []);

    const handleClickNext = () => {
        fetchProducts(nextPage);
    };

    const handleClickReturn = () => {
        fetchProducts(returnPage);
    };

    return (
        <>
            <HeadTable />
            <Table products={products} />
            <FooterTable
                productsLength={nextPage}
                totalProducts={totalProducts}
                lastVisible={nextPage}
                firstVisible={returnPage}
                onNext={handleClickNext}
                onReturn={handleClickReturn}
            />
        </>
    );
}
