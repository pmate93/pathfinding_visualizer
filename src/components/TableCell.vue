<template>
    <td :class="classes"></td>
</template>

<script lang="ts">
import { cellState } from '@/store/TableStore/types';
import { defineComponent, PropType } from 'vue';

export default defineComponent({
    name: "TableCell",
    components: {},
    props: {
        state: {
            type: String as PropType<cellState>,
            required: true,
            default: cellState.EMPTY,
        }
    },
    computed: {
        classes(): string {
            return this.state;
        },
    },
});
</script>

<style>
.wall {
    background-color: black;
}

td {
    border: 1px solid black;
    width: 25px;
    height: 25px;
}
</style>