const { doc, getDoc, updateDoc, setDoc } = require("firebase/firestore");
const { db } = require("../config/firebase.config"); // Firebase Firestore y Storage


// Función para obtener el siguiente ID secuencial
async function getNextProductId() {
    const counterRef = doc(db, "counters", "products_counter");

    try {
        const counterDoc = await getDoc(counterRef);

        if (!counterDoc.exists()) {
            // Si el documento no existe, lo creamos con el ID inicial
            await setDoc(counterRef, { sequence: 1 });
            return 1;
        }

        const { sequence } = counterDoc.data();
        const newSequence = sequence + 1;

        // Actualizar el contador con el nuevo ID
        await updateDoc(counterRef, { sequence: newSequence });

        return newSequence;
    } catch (error) {
        logger.error(`Error getting next product ID: ${error}`);
        throw new Error("Error generating new product ID");
    }
}

module.exports = {
  getNextProductId
}
