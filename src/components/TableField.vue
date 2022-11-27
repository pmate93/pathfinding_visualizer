<template>
    <table @click="setButtonPressed">
        <tr v-for="(row, index) in getTable" :key="index">
            <table-cell
                v-for="(cell, index) in row"
                :key="index"
                :state="cell.state"
                @mousedown="putWalltoTable(cell.id, true)"
                @mouseover="putWalltoTable(cell.id)"
            />
        </tr>
    </table>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TableCell from "@/components/TableCell.vue";
import { mapActions, mapGetters } from 'vuex';
import TABLE from "@/store/TableStore";

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
            lastCellId: null as number | null,
        };
    },

    methods: {
        ...mapActions(TABLE.NAMESPACE, {
            changeWall: TABLE.ACTIONS.CHANGE_WALL,
        }),

        putWalltoTable(cellId: number, mouseOver?: boolean): void {
            if (mouseOver) {
                this.isMouseButtonPressed = true;
            }
            if (this.isMouseButtonPressed){
                if (this.lastCellId !== cellId){
                    this.changeWall(cellId);
                }
                this.lastCellId = cellId;
            }
        },
        setButtonPressed(): void {
            this.isMouseButtonPressed = false;
            this.lastCellId = null;
        }
    }
});
</script>

<style scoped>
table {
    border-collapse: collapse;
}
</style>