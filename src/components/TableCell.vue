<template>
    <td>
        <div :class="classes" :style="borderStyle" />
    </td>
</template>

<script lang="ts">
import { type BorderStyle, type Cell, CellState } from '@/store/TableStore/types';
import { defineComponent, type PropType } from 'vue';
import { mapStores } from 'pinia';
import { useTableStore } from '@/store/TableStore';

export default defineComponent({
    name: 'table-cell',
    components: {},
    props: {
        cell: {
            type: Object as PropType<Cell>,
            required: true,
        },
    },
    computed: {
        ...mapStores(useTableStore),

        classes(): CellState {
            return this.cell.state;
        },
        isWaypoint(): boolean {
            return this.cell.state === CellState.WAYPOINT;
        },
        borderStyle(): string {
            const style = (this.tableStore.getBorderStyles as BorderStyle[]).filter(
                (element: BorderStyle) => element.id === this.cell.borderStyleId,
            );

            if (style.length) {
                return style[0].style;
            }
            return '';
        },
    },
});
</script>

<style scoped>
.wall {
    width: 25px;
    height: 25px;
    background-color: black;
}

.visited {
    width: 25px;
    height: 25px;
    background-color: rgb(75, 134, 243);
}

.path {
    width: 25px;
    height: 25px;
    background-color: rgb(236, 225, 59);
}

.start {
    border: solid rgb(4, 187, 74);
    border-width: 0 4px 4px 0;
    padding: 5px;
    margin-left: 2px;
    transform: rotate(-45deg);
    -webkit-transform: rotate(-45deg);
}

.end {
    border: solid rgb(25, 53, 212);
    border-width: 5px;
    padding: 5px;
    border-radius: 20px;
}

td {
    border: 1px solid black;
    min-width: 26px;
    height: 26px;
    padding: 0px;
    margin: 0px;
    transition: background-color 0.5s, width 0.5s;
}

div {
    width: 0px;
    height: 0px;
    margin: auto;
    background-color: white;
    transition: background-color 0.5s, width 0.5s, height 0.5s;
}

.waypoint {
    padding: 5px;
    border-radius: 20px;
}
</style>
