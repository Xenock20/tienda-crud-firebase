"use strict";
const router = require("express").Router();
const { collection, getDocs, query, orderBy, limit, startAfter, getDoc, doc } = require("firebase/firestore");
const { db } = require("../../config/firebase.config"); // Importar la configuración de Firestore
const logger = require("../../logger");

// Obtener todos los productos
async function getProducts(req, res) {
    try {
        const productsRef = collection(db, 'products');
        let productsQuery;
        const pageSize = parseInt(req.query.pageSize) || 10; // Tamaño de página por defecto es 10
        const lastVisible = req.query.lastVisible; // ID del último producto de la página anterior

        // Si existe un "lastVisible", empezar desde ese producto
        if (lastVisible) {
            const lastVisibleDoc = await getDoc(doc(db, 'products', lastVisible));
            productsQuery = query(productsRef, orderBy('name'), startAfter(lastVisibleDoc), limit(pageSize));
        } else {
            // Si no existe "lastVisible", cargar los primeros productos
            productsQuery = query(productsRef, orderBy('name'), limit(pageSize));
        }

        const querySnapshot = await getDocs(productsQuery);

        // Crear un array con los productos
        const products = [];
        let lastProduct = null;
        querySnapshot.forEach((doc) => {
            products.push({ id: doc.id, ...doc.data() });
            lastProduct = doc; // Guardamos el último documento
        });

        res.status(200).json({
            products,
            lastVisible: lastProduct ? lastProduct.id : null, // El ID del último documento
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
