<template>
    <td>
        <div :class="classes"/>
    </td>
</template>

<script lang="ts">
import { CellState } from '@/store/TableStore/types';
import { defineComponent, PropType } from 'vue';

export default defineComponent({
    name: "table-cell",
    components: {},
    props: {
        state: {
            type: String as PropType<CellState>,
            required: true,
            default: CellState.EMPTY,
        }
    },
    computed: {
        classes(): string {
            return this.state;
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
    min-width: 25px;
    height: 25px;
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
</style>