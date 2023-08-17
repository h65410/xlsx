<template>
  <q-page class="q-pt-lg q-px-sm">
    <div class="row justify-center">
      <q-file
        v-model="files[0]"
        label="تحميل الملف"
        accept=".csv"
        style="width: 99px"
        filled
      />
    </div>
    <div class="row justify-center">
      <q-table :rows="data[0]" :pagination="[0]" />
    </div>
  </q-page>
</template>

<script setup>
import { watch, ref } from "vue";
import { getData } from "../stores/central/getData";

const files = ref([]);

const data = ref([]);
watch(
  () => files.value[0],
  async () => {
    try {
      data.value = await getData(files.value);
    } catch (error) {
      console.log("Error: ", error);
    }
  }
);
</script>

<style>
.q-table th,
.q-table td:first-child {
  font-weight: bold;
  font-size: 14px;
}
</style>
