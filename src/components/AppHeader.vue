<template>
    <nav>
        Pathfinding Visualizer
    </nav>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: "app-header",
    components: {},

    data() {
        return {
        };
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