// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import {
    getFirestore, collection, doc, getDocs, setDoc, deleteDoc,
} from 'firebase/firestore/lite';
import boundingBoxes from './charBoxes';

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

    function writeBoundingBoxes() {
        const fs = FirestoreFactory('characters');
        Object.entries(boundingBoxes).forEach(([key, value]) => {
            fs.writeDocument(key, value);
        });

        fs.getDocuments().then((results) => console.log(results));
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

    // return true if the rectangle and circle are colliding
    function rectCircleColliding(circle, rect) {
        const distX = Math.abs(circle.x - rect.x - rect.w / 2);
        const distY = Math.abs(circle.y - rect.y - rect.h / 2);

        if (distX > rect.w / 2 + circle.r) {
            return false;
        }
        if (distY > rect.h / 2 + circle.r) {
            return false;
        }

        if (distX <= rect.w / 2) {
            return true;
        }
        if (distY <= rect.h / 2) {
            return true;
        }

        const dx = distX - rect.w / 2;
        const dy = distY - rect.h / 2;
        return dx * dx + dy * dy <= circle.r * circle.r;
    }

    async function isCharAtLoc(charName, cursorX, cursorY, targetRadius) {
        try {
            const characterLocs = await getDocuments();
            const charLoc = characterLocs[charName];
            // console.log(charLoc);

            const {
                x, y, w, h,
            } = charLoc;

            const rect = {
                x,
                y,
                w,
                h,
            };

            const circle = {
                x: cursorX,
                y: cursorY,
                r: targetRadius,
            };

            // console.log('Cursor:', cursorX, cursorY);
            // console.log('Rect:', rect);
            // console.log('Circle:', circle);

            if (rectCircleColliding(circle, rect)) {
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
