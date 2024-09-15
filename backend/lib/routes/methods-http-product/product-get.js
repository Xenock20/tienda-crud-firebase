"use strict";
const router = require("express").Router();
const { collection, getDoc, query, orderBy, startAfter, limit, getDocs, getCountFromServer, doc } = require('firebase/firestore');
const { db } = require("../../config/firebase.config"); // Importar la configuración de Firestore
const logger = require("../../logger");

// Obtener todos los productos
async function getProducts(req, res) {
    try {
        const productsRef = collection(db, 'products');
        let productsQuery;
        const pageSize = parseInt(req.query.pageSize) || 10; // Tamaño de página por defecto es 10
        const lastVisible = req.query.lastVisible; // ID del último producto de la página anterior

        // Obtener el número total de productos en la colección
        const snapshot = await getCountFromServer(productsRef);
        const totalProducts = snapshot.data().count;

        // Si existe un "lastVisible", empezar desde ese producto
        if (lastVisible && lastVisible != 0) {
            const lastVisibleDoc = await getDoc(doc(db, 'products', lastVisible));
            productsQuery = query(productsRef, orderBy('id'), startAfter(lastVisibleDoc), limit(pageSize));
        } else {
            // Si no existe "lastVisible", cargar los primeros productos
            productsQuery = query(productsRef, orderBy('id'), limit(pageSize));
        }

        const querySnapshot = await getDocs(productsQuery);

        // Crear un array con los productos
        const products = [];
        let lastProduct = null;
        let firstProduct = null; // Usado internamente para la lógica de la página anterior
        
        querySnapshot.forEach((doc, index) => {
            products.push({ id: doc.id, ...doc.data() });
            lastProduct = doc; // Guardamos el último documento de la página actual
            if(parseInt(lastProduct.id) != 10){
                firstProduct = doc; // Guardamos el último documento de la página actual
            } else {
                firstProduct = 0; // Guardamos el último documento de la página actual
            }
        });

        // Aquí puedes usar `firstProduct` internamente para manejar la lógica de paginación hacia atrás si lo necesitas.

        // Enviar respuesta con productos paginados y total de productos, sin el `firstVisible`
        res.status(200).json({
            products,
            nextPage: parseInt(lastProduct.id) != totalProducts ? parseInt(lastProduct.id) : null, // El ID del último documento (para avanzar)
            returnPage: firstProduct ? (parseInt(firstProduct.id) - products.length) - 10 : null, // El ID del último documento (para avanzar)
            totalProducts // Número total de productos
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
