<template>
    <table @click="setButtonPressed">
        <tr v-for="(row, rowIdx) in getTable" :key="rowIdx">
            <table-cell
                v-for="(cell, colIdx) in row"
                :key="colIdx"
                :state="cell.state"
                @mousedown="putWalltoTable({ rowIdx, colIdx }, true)"
                @mouseover="putWalltoTable({ rowIdx, colIdx })"
            />
        </tr>
    </table>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TableCell from "@/components/TableCell.vue";
import { mapActions, mapGetters } from 'vuex';
import TABLE from "@/store/TableStore";
import { Cell, CellState, TableIndexes } from '@/store/TableStore/types';

export default defineComponent({
    name: "table-field",
    components: { TableCell },

    computed: {
        ...mapGetters(TABLE.NAMESPACE, {
            getTable: TABLE.GETTERS.GET_TABLE,
            getCellByIndex: TABLE.GETTERS.GET_CELL_BY_INDEX,
        })
    },

    data() {
        return {
            isMouseButtonPressed: false,
            isStartCellDragged: false,
            isEndCellDragged: false,
            lastIndexes: null as TableIndexes | null,
        };
    },

    methods: {
        ...mapActions(TABLE.NAMESPACE, {
            changeWall: TABLE.ACTIONS.CHANGE_WALL,
            moveStartCell: TABLE.ACTIONS.MOVE_STARTING_CELL,
            moveEndCell: TABLE.ACTIONS.MOVE_END_CELL,
        }),

        putWalltoTable(newIndexes: TableIndexes, mouseOver?: boolean): void {
            const newCell = this.getCellByIndex(newIndexes.rowIdx, newIndexes.colIdx);

            if (mouseOver) {
                this.isMouseButtonPressed = true;
                if (newCell?.state === CellState.START) {
                    this.isStartCellDragged = true;
                }
                else if (newCell?.state === CellState.END) {
                    this.isEndCellDragged = true;
                }
            }
            if (this.isStartCellDragged){
                if (!this.isSameCellHovered(newIndexes) && this.isEmptyCell(newCell)) {
                    this.moveStartCell(newIndexes);
                }
                this.lastIndexes = newIndexes;
            }
            else if (this.isEndCellDragged){
                if (!this.isSameCellHovered(newIndexes) && this.isEmptyCell(newCell)) {
                    this.moveEndCell(newIndexes);
                }
                this.lastIndexes = newIndexes;
            }
            else if (this.isMouseButtonPressed){
                if (!this.isSameCellHovered(newIndexes)) {
                    this.changeWall(newIndexes);
                }
                this.lastIndexes = newIndexes;
            }
        },
        setButtonPressed(): void {
            this.isMouseButtonPressed = false;
            this.isStartCellDragged = false;
            this.isEndCellDragged = false;
            this.lastIndexes = null;
        },
        isSameCellHovered(newIndexes: TableIndexes): boolean {
            return JSON.stringify(this.lastIndexes) === JSON.stringify(newIndexes);
        },
        isEmptyCell(cell: Cell): boolean {
            return cell.state === CellState.EMPTY;
        }
    }
});
</script>

<style scoped>
table {
    border-collapse: collapse;
}
</style>