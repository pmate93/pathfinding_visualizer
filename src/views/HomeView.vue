<template>
  <div class="table-container">
    <table-field />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TableField from "@/components/TableField.vue";

export default defineComponent({
    name: "home-view",
    components: {
        TableField,
    },
});
</script>

<style scoped>
.table-container {
  display: flex;
  justify-content: center;
  margin: 30px;
}
</style>
