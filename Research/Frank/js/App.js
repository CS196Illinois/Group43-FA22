import BlocksView from "./BlocksView.js";
import BlocksAPI from "./BlocksAPI.js";

export default class App {
    constructor(root) {
        this.blocks = [];
        this.activeBlock = null;
        this.view = new BlocksView(root, this._handlers());

        this._refreshBlocks();
    }

    _refreshBlocks() {
        const blocks = BlocksAPI.getAllBlocks();

        this._setBlocks(blocks);

        if (blocks.length > 0) {
            this._setActiveBlock(blocks[0]);
        }
    }

    _setBlocks(blocks) {
        this.blocks = blocks;
        this.view.updateBlockList(blocks);
        this.view.updateBlockPreviewVisibility(blocks.length > 0);
    }

    _setActiveBlock(block) {
        this.activeBlock = block;
        this.view.updateActiveBlock(block);
    }

    _handlers() {
        return {
            onBlockSelect: blockId => {
                const selectedBlock = this.blocks.find(block => block.id == blockId);
                this._setActiveBlock(selectedBlock);
            },
            onBlockAdd: () => {
                const newBlock = {
                    exercise: "Exercise Name",
                    body: "Description",
                    reps: "Reps amt",
                    sets: "Sets amt"
                };

                BlocksAPI.saveBlock(newBlock);
                this._refreshBlocks();
            },
            onBlockEdit: (exercise, body, reps, sets) => {
                BlocksAPI.saveBlock({
                    id: this.activeBlock.id,
                    exercise,
                    body,
                    reps,
                    sets
                });

                this._refreshBlocks();
            },
            onBlockDelete: blockId => {
                BlocksAPI.deleteBlock(blockId);
                this._refreshBlocks();
            },
        };
    }
}