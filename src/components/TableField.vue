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
import { TableIndexes } from '@/store/TableStore/types';

export default defineComponent({
    name: "home-view",
    components: { TableCell },

    computed: {
        ...mapGetters(TABLE.NAMESPACE, {
            getTable: TABLE.GETTERS.GET_TABLE,
        })
    },

    data() {
        return {
            isMouseButtonPressed: false,
            lastIndexes: null as TableIndexes | null,
        };
    },

    methods: {
        ...mapActions(TABLE.NAMESPACE, {
            changeWall: TABLE.ACTIONS.CHANGE_WALL,
        }),

        putWalltoTable(newIndexes: TableIndexes, mouseOver?: boolean): void {
            if (mouseOver) {
                this.isMouseButtonPressed = true;
            }
            if (this.isMouseButtonPressed){
                if (this.lastIndexes !== newIndexes){
                    this.changeWall(newIndexes);
                }
                this.lastIndexes = newIndexes;
            }
        },
        setButtonPressed(): void {
            this.isMouseButtonPressed = false;
            this.lastIndexes = null;
        }
    }
});
</script>

<style scoped>
table {
    border-collapse: collapse;
}
</style>