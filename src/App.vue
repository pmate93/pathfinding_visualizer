<template>
    <app-header />
    <router-view />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AppHeader from "@/components/AppHeader.vue";
import TABLE from "@/store/UserStore";
import { useTableStore } from '@/store/UserStore/TableStore';
import { mapActions, mapGetters } from 'pinia';

const defaultRows = 35;
const defaultCols = 50;

export default defineComponent({
    name: "app",
    components: { AppHeader },

    computed: {
        ...mapGetters(useTableStore, {
            getTable: TABLE.GETTERS.GET_TABLE,
        })
    },
    methods: {
        ...mapActions(useTableStore, {
            setTable: TABLE.ACTIONS.SET_TABLE,
            setStartingCell: TABLE.ACTIONS.SET_STARTING_CELL,
            setEndCell: TABLE.ACTIONS.SET_END_CELL,
        })
    },

    created() {
        this.setTable(defaultRows, defaultCols);
        this.setStartingCell({ rowIdx: 2, colIdx: 2 });
        this.setEndCell({ rowIdx: 4, colIdx: 4 });
    },

    /* setup() {
        const userStore = useUserStore();
        const TableStore = useTableStore();
        TableStore.setTable(1, 1);

        console.log(userStore.favs);

        return {
            userStore
        };
    } */
});
</script>
<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}
body {
    margin: 0px;
}
</style>
