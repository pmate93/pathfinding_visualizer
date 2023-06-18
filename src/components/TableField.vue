<template>
    <table @click="setButtonPressed">
        <tr v-for="(row, rowIdx) in tableStore.getTable" :key="rowIdx">
            <table-cell
                v-for="(cell, colIdx) in row"
                :key="colIdx"
                :cell="cell"
                @mousedown="handleCellClick(cell.id, { rowIdx, colIdx }, true)"
                @mouseover="handleCellClick(cell.id, { rowIdx, colIdx })"
            />
        </tr>
    </table>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TableCell from "@/components/TableCell.vue";
import { mapStores } from 'pinia';
import { type Cell, CellState, type TableIndexes } from '@/store/TableStore/types';
import { useTableStore } from '@/store/TableStore';

export default defineComponent({
    name: "table-field",
    components: { TableCell },

    computed: {
        ...mapStores(useTableStore),
    },

    data() {
        return {
            isMouseButtonPressed: false,
            isStartCellDragged: false,
            isEndCellDragged: false,
            isWaypointDragged: false,
            lastIndexes: null as TableIndexes | null,
            selectedCellId: -1,
        };
    },

    methods: {
        handleCellClick(cellId: number, newIndexes: TableIndexes, mouseOver?: boolean): void {
            const newCell = this.tableStore.getCellByIndex(newIndexes.rowIdx, newIndexes.colIdx);

            if (mouseOver) {
                this.selectedCellId = cellId;
                this.isMouseButtonPressed = true;
                if (newCell?.state === CellState.START) {
                    this.isStartCellDragged = true;
                }
                else if (newCell?.state === CellState.END) {
                    this.isEndCellDragged = true;
                }
                else if (newCell?.state === CellState.WAYPOINT) {
                    this.isWaypointDragged = true;
                }
            }

            if (this.isStartCellDragged){
                if (!this.isSameCellHovered(newIndexes) && this.isEmptyCell(newCell!)) {
                    this.tableStore.moveStartingCell(newIndexes);
                }
                this.lastIndexes = newIndexes;
            }
            else if (this.isWaypointDragged){
                if (!this.isSameCellHovered(newIndexes) && this.isEmptyCell(newCell!)) {
                    this.tableStore.moveWaypointCell({ ...newIndexes, cellId: this.selectedCellId });
                    this.selectedCellId = cellId;
                }
                this.lastIndexes = newIndexes;
            }
            else if (this.isEndCellDragged){
                if (!this.isSameCellHovered(newIndexes) && this.isEmptyCell(newCell!)) {
                    this.tableStore.moveEndCell(newIndexes);
                }
                this.lastIndexes = newIndexes;
            }
            else if (this.isMouseButtonPressed){
                if (!this.isSameCellHovered(newIndexes)) {
                    this.tableStore.changeWall(newIndexes);
                }
                this.lastIndexes = newIndexes;
            }
        },
        setButtonPressed(): void {
            this.isMouseButtonPressed = false;
            this.isStartCellDragged = false;
            this.isWaypointDragged = false;
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