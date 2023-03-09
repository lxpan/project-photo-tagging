import FirestoreFactory from './Firestore';

describe.skip('Test Firestore connectivity, including read & write operations', () => {
    let fs;
    beforeEach(() => {
        fs = new FirestoreFactory('characters');
    });

    test('Firestore connection exists', () => {
        expect(fs).toBeDefined();
    });

    test('Write character doc', () => {
        fs.writeDocument('test', {
            name: 'Wally',
            loc: [100, 100],
        });
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
        const res = await fs.getDocuments();
        // console.log(res);
        expect(res.test).toBeDefined();
    });
});

describe('Validate character is at location using Firestore', () => {
    test('Character is inside the selection box', async () => {
        const fs = new FirestoreFactory('characters');
        const cursorX = 25;
        const cursorY = 25;
        const radius = 25;

        const result = await fs.isCharAtLoc('Wally', cursorX, cursorY, radius);
        expect(result).toBe(true);
    });

    test('Character is outside selection circle', async () => {
        const fs = new FirestoreFactory('characters');
        const cursorX = 10;
        const cursorY = 10;
        const radius = 25;

        const result = await fs.isCharAtLoc('Wally', cursorX, cursorY, radius);
        expect(result).toBe(false);
    });

    test('Character is on the selection circle', async () => {
        const fs = new FirestoreFactory('characters');
        const cursorX = 10;
        const cursorY = 35;
        const radius = 25;

        const result = await fs.isCharAtLoc('Wally', cursorX, cursorY, radius);
        expect(result).toBe(true);
    });
});
