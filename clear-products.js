import { db } from './src/firebase/config';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';

async function clearProducts() {
    try {
        console.log('Fetching products to delete...');
        const productsCollection = collection(db, 'products');
        const snapshot = await getDocs(productsCollection);

        if (snapshot.empty) {
            console.log('No products found to delete.');
            return;
        }

        console.log(`Found ${snapshot.size} products. Starting deletion...`);

        const deletePromises = snapshot.docs.map(productDoc => {
            console.log(`Deleting product: ${productDoc.id}`);
            return deleteDoc(doc(db, 'products', productDoc.id));
        });

        await Promise.all(deletePromises);
        console.log('Successfully deleted all products from Firebase.');
    } catch (error) {
        console.error('Error clearing products:', error);
    }
}

clearProducts();
