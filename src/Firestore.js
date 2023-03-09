// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import {
    getFirestore, collection, doc, getDocs, setDoc, deleteDoc,
} from 'firebase/firestore/lite';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: 'AIzaSyDpAI5r_jWjU1aNFIqONr_sdHrDJAX7VP0',
    authDomain: 'wheres-wally-789b9.firebaseapp.com',
    projectId: 'wheres-wally-789b9',
    storageBucket: 'wheres-wally-789b9.appspot.com',
    messagingSenderId: '906692154300',
    appId: '1:906692154300:web:327b1ae82ad7d4f58bd1b9',
};

export default function FirestoreFactory(collectionName) {
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    const _collection = collectionName;

    // Saves a new message to Cloud Firestore.
    async function writeDocument(documentName, documentJSON) {
        // Add new project entry to the Firebase database.
        try {
            let json;
            if (typeof documentJSON === 'string') {
                json = JSON.parse(documentJSON);
            }
            else {
                json = documentJSON;
            }

            await setDoc(doc(db, _collection, documentName), {
                ...json,
            });
        }
        catch (error) {
            console.error('Error writing new project to Firebase Database', error);
        }
    }

    async function getDocuments() {
        const finalObj = {};
        const col = collection(db, _collection);
        const snapshot = await getDocs(col);
        const characterList = snapshot.docs.map((_doc) => ({
            [_doc.id]: _doc.data(),
        }));

        characterList.forEach((char) => Object.assign(finalObj, char));
        return finalObj;
    }

    async function deleteDocument(documentName) {
        try {
            await deleteDoc(doc(db, _collection, documentName));
        }
        catch (error) {
            console.error(`Error deleting document: ${documentName}`);
        }
    }

    // Compare radius of circle with distance of its center from given point
    function isInsideCircle(circleX, circleY, radius, x, y) {
        // circle formula (X^2 + Y^2 = radius^2)
        // becomes: (X-x)^2 + (Y-y)^2 <= radius
        if ((x - circleX) * (x - circleX) + (y - circleY) * (y - circleY) <= radius * radius) {
            return true;
        }
        return false;
    }

    async function isCharAtLoc(charName, cursorX, cursorY, targetRadius) {
        try {
            const characterLocs = await getDocuments();
            const charLoc = characterLocs[charName].loc;
            const [charX, charY] = charLoc;

            if (isInsideCircle(cursorX, cursorY, targetRadius, charX, charY)) {
                return true;
            }
            return false;
        }
        catch (error) {
            console.error(`Error validating character location: ${error}`);
        }
        return -1;
    }

    return {
        db,
        writeDocument,
        getDocuments,
        deleteDocument,
        isCharAtLoc,
    };
}
