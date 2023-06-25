<template>
  <!-- <q-page class="row items-center justify-evenly"> -->
    <q-page class="row justify-start">
    <div v-if="file == null" class="q-ma-sm">
      <q-file filled v-model="file" label="Filled" />
    </div>
  </q-page>
</template>

<script setup lang="ts">
// import { Todo, Meta } from 'components/models';
// import ExampleComponent from 'components/ExampleComponent.vue';
import { ref, watch } from 'vue';
import {useClosedContractsStore} from "../stores/closed-contracts"
import { read, utils } from 'xlsx';

const store = useClosedContractsStore()

// interface President {
//   Name: string;
//   Index: number;
// }

const file = ref<any>(null);

watch(file, async (val) => {
  const data = await file.value.arrayBuffer();
  const wb = read(data);
  const sheetName = wb.SheetNames[1];
  const rows = utils.sheet_to_json(wb.Sheets[sheetName], {header: "A"}) as any;

  const companies = {} as any
  rows.forEach((row: any) => {
    const contract = {
      region: row['C'],
      contract_number: row['D'],
      car_type: row['F'],
      car_plate: row['G'],
      contract_date: row['H'],
      contract_duration: row['I'],
      rent_price: row['J'],
      rent_total: row['K'],
      extra_hour: row['L'],
      extra_klm: row['M'],
      discount: row['N'],
      penalties: row['O'],
      vat: row['P'],
      exchange_amount: row['Q'],
      paid_amount: row['R'],
      remain_amount: row['S']
    }

    if (companies[row['B']]) {
      companies[row['B']].contracts.push(contract)
    } else if(row['B']) {
      companies[row['B']] = {
        company_name: row['E'],
        contracts: [contract]
      }
    }
  });

  store.date = sheetName;
  store.companies = companies;
})

// const f = await (await fetch("https://sheetjs.com/pres.xlsx")).arrayBuffer();
// const wb = read(f);
// const data = utils.sheet_to_json<President>(wb.Sheets[wb.SheetNames[0]]);
// console.log(data);

</script>
