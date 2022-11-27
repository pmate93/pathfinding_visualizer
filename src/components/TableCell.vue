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