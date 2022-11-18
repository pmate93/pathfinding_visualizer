<template>
    <table>
        <tr v-for="(row, index) in defaultRowNumbers" :key="index">
            <table-cell v-for="(col, index) in defaultColNumbers" :key="index" />
        </tr>
     </table>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TableCell from "@/components/TableCell.vue";

export default defineComponent({
    name: "HomeView",
    components: { TableCell },
    
    data() {
        return {
            defaultRowNumbers: 35,
            defaultColNumbers: 50,
        };
    }
});
</script>

<style scoped>
table {
    border-collapse: collapse;
}
</style>