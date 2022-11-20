<template>
    <app-header />
    <router-view />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AppHeader from "@/components/AppHeader.vue";
import TABLE from "@/store/TableStore";
import { mapActions, mapGetters } from "vuex";

const defaultRows = 35;
const defaultCols = 50;

export default defineComponent({
    name: "App",
    components: { AppHeader },

    computed: {
        ...mapGetters(TABLE.NAMESPACE, {
            getTable: TABLE.GETTERS.GET_TABLE,
        })
    },
    methods: {
        ...mapActions(TABLE.NAMESPACE, {
            setTable: TABLE.ACTIONS.SET_TABLE,
        })
    },

    created() {
        this.setTable({rows: defaultRows, cols: defaultCols})
        console.log(this.getTable);
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
