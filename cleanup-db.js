const { initializeApp } = require('firebase/app');
const { getFirestore, collection, getDocs, deleteDoc, doc } = require('firebase/firestore');

const firebaseConfig = {
    apiKey: "AIzaSyAzDFQSBTsefhZjQ54O-oYdPidzeI6sU8M",
    authDomain: "civildoctor-bf649.firebaseapp.com",
    projectId: "civildoctor-bf649",
    storageBucket: "civildoctor-bf649.firebasestorage.app",
    messagingSenderId: "699788183616",
    appId: "1:699788183616:web:1c738c204124815c2cb7a5",
    measurementId: "G-7BYMWETNDB"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function clearProducts() {
    try {
        console.log('Fetching products to delete...');
        const productsCollection = collection(db, 'products');
        const snapshot = await getDocs(productsCollection);

        if (snapshot.empty) {
            console.log('No products found to delete.');
            process.exit(0);
        }

        console.log(`Found ${snapshot.size} products. Starting deletion...`);

        const deletePromises = snapshot.docs.map(productDoc => {
            console.log(`Deleting product: ${productDoc.id}`);
            return deleteDoc(doc(db, 'products', productDoc.id));
        });

        await Promise.all(deletePromises);
        console.log('Successfully deleted all products from Firebase.');
        process.exit(0);
    } catch (error) {
        console.error('Error clearing products:', error);
        process.exit(1);
    }
}

clearProducts();
