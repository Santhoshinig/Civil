import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, deleteDoc, doc } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAxOf6aMfBka4TpwzwLvOVpU0__NmMZ2io",
    authDomain: "civil-doctor.firebaseapp.com",
    projectId: "civil-doctor",
    storageBucket: "civil-doctor.firebasestorage.app",
    messagingSenderId: "1043016511371",
    appId: "1:1043016511371:web:0a0d90314e864a2c54498e"
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
