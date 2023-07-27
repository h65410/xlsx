<template>
  <!-- <q-page class="row items-center justify-evenly"> -->
    <q-page class="row justify-start q-py-sm">
      <div v-for="company in store.companies" style="height: 25.51cm;">
        <q-table
      :rows="company.contracts"
      :columns="columns"
      separator="cell"
      class="q-mr-sm"
      flat
      bordered
      style="width: 1400px;"
    >
      <template v-slot:top>
        <q-img src="header.jpg" fit="fill" />
        <div class="row text-h6 q-pt-md" style="width: 100%;">
          <div>
            كشف حساب ( {{ company.company_name }} ) لغاية {{ store.date }}
          </div>
          <q-space />
          <div class="text-caption cursor-pointer">
            الكود {{ company.company_id }}
          </div>
        </div>
      </template>
    <template v-slot:bottom-row>
        <q-tr>
          <q-td colspan="100%" style="height: 1px;padding: 0;">
          </q-td>
        </q-tr>
      </template>
      <template v-slot:bottom>
        <div class="col-12 text-right text-subtitle1">
          الإجمالي {{ new Intl.NumberFormat().format(company.total) }}
        </div>
      </template>
    </q-table>
      </div>
    <div v-if="file == null" class="q-ma-sm">
      <q-file filled v-model="file" label="Filled" />
      <!-- <q-btn label="print" @click="savePdf" /> -->
    </div>
    <!-- <div v-else>
      <q-select
        filled
        v-model="model"
        :options="options"
        style="width: 500px; padding-bottom: 32px"
      />
    </div> -->
    <!-- <div v-if="company">
      <q-table
      :rows="company.contracts"
      :columns="columns"
      separator="cell"
      class="q-mr-sm"
      flat
      bordered
      style="width: 1400px;"
    >
      <template v-slot:top>
        <q-img src="header.jpg" fit="fill" />
        <div class="row text-h6 q-pt-md" style="width: 100%;">
          <div>
            كشف حساب ( {{ company.company_name }} ) لغاية {{ store.date }}
          </div>
          <q-space />
          <div class="text-caption">
            الكود {{ model.value }}
          </div>
        </div>
      </template>
    <template v-slot:bottom-row>
        <q-tr>
          <q-td colspan="100%" style="height: 1px;padding: 0;">
          </q-td>
        </q-tr>
      </template>
      <template v-slot:bottom>
        <div class="col-12 text-right text-subtitle1">
          الإجمالي {{ new Intl.NumberFormat().format(company.total) }}
        </div>
      </template>
    </q-table>
    </div> -->
  </q-page>
</template>

<script setup lang="ts">
// import { Todo, Meta } from 'components/models';
// import ExampleComponent from 'components/ExampleComponent.vue';
import { computed, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import {useClosedContractsStore} from "../stores/closed-contracts"
import { read, utils } from 'xlsx';
import { QTableProps } from 'quasar';

const { t } = useI18n({ useScope: 'global' })
const store = useClosedContractsStore()

// const model = ref<any>(null)
// const options = computed(() => {
//   const _options = [] as any[];
//   Object.keys(store.companies).forEach((v: any) => {
//     _options.push({
//       label: store.companies[v].company_name + ' - ' + v,
//       value: v
//     })
//   })
//   model.value = _options[0]
//   return _options
// })

const columns: QTableProps['columns'] = [
  'region',
  'contract_number',
  'car_type',
  'car_plate',
  'contract_date',
  'contract_duration',
  'rent_price',
  'rent_total',
  'extra_hour',
  'extra_klm',
  'discount',
  'penalties',
  'vat',
  'exchange_amount',
  'paid_amount',
  'remain_amount'
].map(v => {
  return {
    name: v,
    field: v,
    required: true,
    label: t(v),
    align: 'center',
    headerStyle: 'font-weight: bold',
    sortable: false
  }
})
// const company = computed(() => store.companies[model.value?.value])

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
      companies[row['B']].total += contract.remain_amount
    } else if(row['B']) {
      companies[row['B']] = {
        company_id: row['B'],
        company_name: row['E'],
        contracts: [contract],
        total: contract.remain_amount
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
