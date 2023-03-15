<template>
    <nav>
        Pathfinding Visualizer
        <button @click="start">
            start
        </button>
    </nav>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapGetters } from 'vuex';
import TABLE from "@/store/TableStore";

export default defineComponent({
    name: "app-header",
    components: {},

    data() {
        return {
        };
    },
    computed: {
        ...mapGetters(TABLE.NAMESPACE, {
            getShortestPathWithDjikstra: TABLE.GETTERS.GET_SHORTEST_PATH_WITH_DJIKSTRA,
            getStartCell: TABLE.GETTERS.GET_STARTING_CELL,
            getEndCell: TABLE.GETTERS.GET_END_CELL,
        })
    },

    methods: {
        start(): void {
            this.getShortestPathWithDjikstra(this.getStartCell().id, this.getEndCell().id);
        }
    }
});
</script>

<style scoped>
nav {
    padding: 20px;
    background-color: #2c3e50;
    color: white;
}

nav a {
    font-weight: bold;
    color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>