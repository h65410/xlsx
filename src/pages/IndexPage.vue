<template>
  <q-page class="row items-center justify-evenly">
    <div class="q-gutter-md">
      <q-file filled v-model="file" label="Filled" />
      <q-btn label="Read File" @click="readF" no-caps />
    </div>
  </q-page>
</template>

<script setup lang="ts">
// import { Todo, Meta } from 'components/models';
// import ExampleComponent from 'components/ExampleComponent.vue';
import { ref } from 'vue';
import { read, utils } from 'xlsx';

// interface President {
//   Name: string;
//   Index: number;
// }

const file = ref<any>(null);

const readF = async () => {
  const data = await file.value.arrayBuffer();
  const wb = read(data);
  const rows = utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]) as any;
  console.log(Object.keys(rows[0]))
}

// const f = await (await fetch("https://sheetjs.com/pres.xlsx")).arrayBuffer();
// const wb = read(f);
// const data = utils.sheet_to_json<President>(wb.Sheets[wb.SheetNames[0]]);
// console.log(data);

</script>
