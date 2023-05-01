
<template>
    <button>
        {{ label }}
    </button>
</template>

<script lang='ts'>
import { defineComponent } from 'vue';
export default defineComponent({
    name: 'header-button',
    props: {
        label: {
            type: String,
            required: true,
        }
    },
});
</script>

<style>

</style>