<template>
    <app-header />
    <router-view />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AppHeader from "@/components/AppHeader.vue";
import TABLE from "@/store/TableStore";
//import { mapActions, mapGetters } from "vuex";
import { useTableStore } from '@/store/UserStore/TableStore';
import { mapState, mapActions, mapGetters } from 'pinia';
import { useUserStore } from "./store/UserStore/UserStore";

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
        console.log(this.setTable);
        type asd = ReturnType<typeof this.setTable>;
        this.setTable(defaultRows as any, defaultCols as any);
        this.setTable(30, 30);
        console.log(this.getTable, 'favsfavs');
        //this.setStartingCell({ rowIdx: 2, colIdx: 2 });
        //this.setEndCell({ rowIdx: 4, colIdx: 4 });
    },

    /* setup() {
        const userStore = useUserStore();
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
