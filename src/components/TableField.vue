<template>
    <table>
        <tr v-for="(row, index) in getTable" :key="index">
            <table-cell 
                v-for="(cell, index) in row" 
                :key="index" 
                :state="cell.state" 
                @click="putWalltoTable(cell.id)" 
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
    name: "HomeView",
    components: { TableCell },

    computed: {
        ...mapGetters(TABLE.NAMESPACE, {
            getTable: TABLE.GETTERS.GET_TABLE,
        })
    },
    
    data() {
        return {
        };
    },

    methods: {
        ...mapActions(TABLE.NAMESPACE, {
            putWall: TABLE.ACTIONS.PUT_WALL,
        }),

        putWalltoTable(cellId: number): void {
            this.putWall(cellId);
        },
    }
});
</script>

<style scoped>
table {
    border-collapse: collapse;
}
</style>