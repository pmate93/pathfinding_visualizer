<template>
    <app-header />
    <router-view />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AppHeader from "@/components/AppHeader.vue";
import TABLE from "@/store/TableStore";
import { mapActions, mapGetters } from "vuex";

const defaultRows = 10;
const defaultCols = 10;

export default defineComponent({
    name: "app",
    components: { AppHeader },

    computed: {
        ...mapGetters(TABLE.NAMESPACE, {
            getTable: TABLE.GETTERS.GET_TABLE,
        })
    },
    methods: {
        ...mapActions(TABLE.NAMESPACE, {
            setTable: TABLE.ACTIONS.SET_TABLE,
            setStartingCell: TABLE.ACTIONS.SET_STARTING_CELL,
            setEndCell: TABLE.ACTIONS.SET_END_CELL,
        })
    },

    created() {
        this.setTable({ rows: defaultRows, cols: defaultCols });
        this.setStartingCell({ rowIdx: 2, colIdx: 2 });
        this.setEndCell({ rowIdx: 4, colIdx: 4 });
    }
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
