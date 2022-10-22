export default class BlocksAPI {
    static getAllBlocks() {
        const blocks = JSON.parse(localStorage.getItem("workout-blocks") || "[]");

        return blocks;
    }

    static saveBlock(blockToSave) {
        const blocks = BlocksAPI.getAllBlocks();
        const existing = blocks.find(block => block.id == blockToSave.id);

        // Edit/Update
        if (existing) {
            existing.exercise = blockToSave.exercise;
            existing.body = blockToSave.body;
            existing.reps = blockToSave.reps;
            existing.sets = blockToSave.sets;
        } else {
            blockToSave.id = Math.floor(Math.random() * 1000000);
            blockToSave.updated = new Date().toISOString();
            blocks.push(blockToSave);
        }

        localStorage.setItem("workout-blocks", JSON.stringify(blocks));
    }

    static deleteBlock(id) {
        const blocks = BlocksAPI.getAllBlocks();
        const newBlocks = blocks.filter(block => block.id != id);

        localStorage.setItem("workout-blocks", JSON.stringify(newBlocks));
    }
}