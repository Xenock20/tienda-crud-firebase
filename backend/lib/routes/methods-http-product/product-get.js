"use strict";
const router = require("express").Router();
const { collection, getDoc, query, orderBy, getDocs, getCountFromServer, doc } = require('firebase/firestore');
const { db } = require("../../config/firebase.config"); // Importar la configuración de Firestore
const logger = require("../../logger");

async function getProducts(req, res) {
    try {
        const productsRef = collection(db, 'products');
        let productsQuery;

        // Obtener el número total de productos en la colección
        const snapshot = await getCountFromServer(productsRef);
        const totalProducts = snapshot.data().count;
        productsQuery = query(productsRef, orderBy('id'));

        const querySnapshot = await getDocs(productsQuery);

        // Crear un array con los productos
        const products = [];
        
        querySnapshot.forEach((doc, index) => {
            products.push({ id: doc.id, ...doc.data() });
        });

        if(products.length < 10){
            lastProductId = null;
        }

        // Enviar respuesta con productos paginados y total de productos
        res.status(200).json({
            products,
            totalProducts 
        });
    } catch (error) {
        logger.error(`GET getProducts error: ${error}`);
        res.status(500).json({ error: 'Error fetching products' });
    }
}


// Obtener un producto específico por ID
async function getProduct(req, res) {
    try {
        const productId = req.params.id;
        const productDoc = await getDoc(doc(db, "products", productId));

        if (!productDoc.exists()) {
            return res.status(404).json({ error: "Product not found" });
        }

        res.status(200).json({
            id: productDoc.id,
            ...productDoc.data(),
        });
    } catch (error) {
        logger.error(`GET getProduct error: ${error}`);
        res.status(500).json({ error: "Error fetching product" });
    }
}

router.get("/product/:id", getProduct);
router.get("/products", getProducts);

module.exports = router;
