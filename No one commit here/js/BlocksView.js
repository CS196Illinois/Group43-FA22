export default class BlocksView {
    constructor(root, { onBlockSelect, onBlockAdd, onBlockEdit, onBlockDelete } = {}) {
        this.root = root;
        this.onBlockSelect = onBlockSelect;
        this.onBlockAdd = onBlockAdd;
        this.onBlockEdit = onBlockEdit;
        this.onBlockDelete = onBlockDelete;
        this.root.innerHTML = `
            <div class="blocks__sidebar">
                <button class="blocks__add" type="button">Add Block</button>
                <div class="blocks__list"></div>
            </div>
            <div class="blocks__preview">
                <input class="blocks__exercise" type="text" placeholder="Routine">
                <div class="newExercise">
                    <textarea class="blocks__body">description</textarea>
                    <textarea class="blocks__reps">description</textarea>
                    <textarea class="blocks__sets">description</textarea>
                </div>
                <button class="addex"> Add Exercise </button>
            </div>
        `;

        const btnAddBlock = this.root.querySelector(".blocks__add");
        const inpTitle = this.root.querySelector(".blocks__exercise");
        const inpBody = this.root.querySelector(".blocks__body");
        const inpReps = this.root.querySelector(".blocks__reps");
        const inpSets = this.root.querySelector(".blocks__sets");
        const addex = this.root.querySelector("addex");
        
        btnAddBlock.addEventListener("click", () => {
            this.onBlockAdd();
        });

        [inpTitle, inpBody, inpReps, inpSets].forEach(inputField => {
            inputField.addEventListener("blur", () => {
                const updatedTitle = inpTitle.value.trim();
                const updatedBody = inpBody.value.trim();
                const updatedReps = inpReps.value.trim();
                const updatedSets = inpSets.value.trim();

                this.onBlockEdit(updatedTitle, updatedBody, updatedReps, updatedSets);
            });
        });

        this.updateBlockPreviewVisibility(false);
    }

    _createListItemHTML(id, exercise, body, reps, sets) {
        const MAX_BODY_LENGTH = 60;

        return `
            <div class="blocks__list-item" data-block-id="${id}">
                <div class="blocks__small-exercise">${exercise}</div>
                <span class="blocks__small-body">
                    ${body.substring(0, MAX_BODY_LENGTH)}
                    ${body.length > MAX_BODY_LENGTH ? "..." : ""}
                </span>
                <span class="blocks__small-reps">
                    ${reps.substring(0, MAX_BODY_LENGTH)}
                    ${reps.length > MAX_BODY_LENGTH ? "..." : ""}
                </span>
                <span class="blocks__small-body">
                    ${sets.substring(0, MAX_BODY_LENGTH)}
                    ${sets.length > MAX_BODY_LENGTH ? "..." : ""}
                </span>

            </div>
        `;
    }

    updateBlockList(blocks) {
        const blocksListContainer = this.root.querySelector(".blocks__list");

        // Empty list
        blocksListContainer.innerHTML = "";

        for (const block of blocks) {
            const html = this._createListItemHTML(block.id, block.exercise, block.body, block.reps, block.sets, new Date(block.updated));

            blocksListContainer.insertAdjacentHTML("beforeend", html);
        }

        // Add select/delete events for each list item
        blocksListContainer.querySelectorAll(".blocks__list-item").forEach(blockListItem => {
            blockListItem.addEventListener("click", () => {
                this.onBlockSelect(blockListItem.dataset.blockId);
            });

            blockListItem.addEventListener("dblclick", () => {
                const doDelete = confirm("Are you sure you want to delete this block?");

                if (doDelete) {
                    this.onBlockDelete(blockListItem.dataset.blockId);
                }
            });
        });
    }

    updateActiveBlock(block) {
        this.root.querySelector(".blocks__exercise").value = block.exercise;
        this.root.querySelector(".blocks__body").value = block.body;
        this.root.querySelector(".blocks__reps").value = block.reps;
        this.root.querySelector(".blocks__sets").value = block.sets;

        this.root.querySelectorAll(".blocks__list-item").forEach(blockListItem => {
            blockListItem.classList.remove("blocks__list-item--selected");
        });

        this.root.querySelector(`.blocks__list-item[data-block-id="${block.id}"]`).classList.add("blocks__list-item--selected");
    }

    updateBlockPreviewVisibility(visible) {
        this.root.querySelector(".blocks__preview").style.visibility = visible ? "visible" : "hidden";
    }
}