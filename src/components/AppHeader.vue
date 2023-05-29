<template>
    <nav>
        Pathfinding Visualizer
        <header-button label="Start" @click="start" />
        <header-button label="Add waypoint" @click="addWaypoint" />
        <header-button label="Reset" @click="$emit('OnReset')" />
    </nav>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapState, mapActions } from 'pinia';
import { useTableStore, useUtilityStore, TABLE, UTILITY } from '@/store';
import HeaderButton from './HeaderButton.vue';

export default defineComponent({
    components: { HeaderButton },
    name: "app-header",

    computed: {
        ...mapState(useTableStore, {
            getStartCell: TABLE.GETTERS.GET_STARTING_CELL,
            getEndCell: TABLE.GETTERS.GET_END_CELL,
            hasWaypoint: TABLE.GETTERS.HAS_WAYPOINT,
        }),
    },

    methods: {
        ...mapActions(useTableStore, {
            visualizeDijkstra: TABLE.ACTIONS.VISUALIZE_DIJKSTRA,
            setWaypoint: TABLE.ACTIONS.SET_WAYPOINT,
        }),
        ...mapActions(useUtilityStore, {
            setResetValue: UTILITY.ACTIONS.SET_RESET_VALUE,
        }),

        start(): void {
            this.setResetValue(false);

            const startCellId = this.getStartCell()?.id;
            const endCellId = this.getEndCell()?.id;
            if (startCellId && endCellId){
                this.visualizeDijkstra({ startCellId, endCellId });

            }
        },
        addWaypoint(): void {
            this.setWaypoint({ rowIdx: 25, colIdx: 25 });
        },
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