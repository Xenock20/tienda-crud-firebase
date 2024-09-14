"use strict";
const router = require("express").Router();
const { collection, getDocs, doc, getDoc } = require("firebase/firestore");
const { db } = require("../config/firebase.config"); // Importar la configuración de Firestore
const logger = require("../logger");

// Obtener todos los productos
async function getProducts(req, res) {
    try {
        const productsCollection = collection(db, "products");
        const productsSnapshot = await getDocs(productsCollection);
        const productsList = productsSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));

        res.status(200).json(productsList);
    } catch (error) {
        logger.error(`GET getProducts error: ${error}`);
        res.status(500).json({ error: "Error fetching products" });
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
