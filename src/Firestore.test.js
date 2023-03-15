import FirestoreFactory from './Firestore';

describe.skip('Test Firestore connectivity, including read & write operations', () => {
    let fs;
    beforeEach(() => {
        fs = new FirestoreFactory('characters');
    });

    test('Firestore connection exists', () => {
        expect(fs).toBeDefined();
    });

    test('Write character doc', async () => {
        fs.writeDocument('connectivityTest', {
            x: 50,
            y: 50,
            w: 50,
            h: 50,
        });

        const docs = await fs.getDocuments();
        expect(docs.connectivityTest).toBeDefined();
    });

    test('Delete character doc', async () => {
        // Create a doc to be later deleted
        await fs.writeDocument('weirdWally', { loc: [33, 33] });
        const resBefore = await fs.getDocuments();
        expect(resBefore.weirdWally).toBeDefined();

        await fs.deleteDocument('weirdWally');
        const resAfter = await fs.getDocuments();
        expect(resAfter).not.toHaveProperty('weirdWally');
    });

    test('Retrieve existing data in collection', async () => {
        const docs = await fs.getDocuments();
        expect(Object.values(docs).length).toBe(6);
    });
});

describe('Validate character is at location using Firestore', () => {
    let testCharName;
    let selectionRadius;
    let fs;
    beforeEach(() => {
        testCharName = 'testChar';
        selectionRadius = 25;
        fs = new FirestoreFactory('characters');
    });

    test('Character bounding box (BB) inside selection circle', async () => {
        const cursorX = 150;
        const cursorY = 150;

        const result = await fs.isCharAtLoc(testCharName, cursorX, cursorY, selectionRadius);
        expect(result).toBe(true);
    });

    test('Character BB is on the edge of selection circle', async () => {
        const cursorX = 75;
        const cursorY = 100;

        const result = await fs.isCharAtLoc(testCharName, cursorX, cursorY, selectionRadius);
        expect(result).toBe(true);
    });

    test('Character BB is completely outside selection circle', async () => {
        const cursorX = 50;
        const cursorY = 50;

        const result = await fs.isCharAtLoc(testCharName, cursorX, cursorY, selectionRadius);
        expect(result).toBe(false);
    });

    test('Character BB is just outside selection circle', async () => {
        const cursorX = 74;
        const cursorY = 100;

        const result = await fs.isCharAtLoc(testCharName, cursorX, cursorY, selectionRadius);
        expect(result).toBe(false);
    });
});
