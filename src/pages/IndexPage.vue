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
          <div class="text-caption">
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
// import { jsPDF } from "jspdf";

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

const columns = [
  {
    name: 'region',
    field: 'region',
    required: true,
    label: t('region'),
    align: 'center',
    headerStyle: 'font-weight: bold',
    sortable: false
  },
  {
    name: 'contract_number',
    field: 'contract_number',
    required: true,
    label: t('contract_number'),
    align: 'center',
    headerStyle: 'font-weight: bold',
    sortable: false
  },
  {
    name: 'car_type',
    field: 'car_type',
    required: true,
    label: t('car_type'),
    align: 'center',
    headerStyle: 'font-weight: bold',
    sortable: false
  },
  {
    name: 'car_plate',
    field: 'car_plate',
    required: true,
    label: t('car_plate'),
    align: 'center',
    headerStyle: 'font-weight: bold',
    sortable: false
  },
  {
    name: 'contract_date',
    field: 'contract_date',
    required: true,
    label: t('contract_date'),
    align: 'center',
    headerStyle: 'font-weight: bold',
    sortable: false
  },
  {
    name: 'contract_duration',
    field: 'contract_duration',
    required: true,
    label: t('contract_duration'),
    align: 'center',
    headerStyle: 'font-weight: bold',
    sortable: false
  },
  {
    name: 'rent_price',
    field: 'rent_price',
    required: true,
    label: t('rent_price'),
    align: 'center',
    headerStyle: 'font-weight: bold',
    sortable: false
  },
  {
    name: 'rent_total',
    field: 'rent_total',
    required: true,
    label: t('rent_total'),
    align: 'center',
    headerStyle: 'font-weight: bold',
    sortable: false
  },
  {
    name: 'extra_hour',
    field: 'extra_hour',
    required: true,
    label: t('extra_hour'),
    align: 'center',
    headerStyle: 'font-weight: bold',
    sortable: false
  },
  {
    name: 'extra_klm',
    field: 'extra_klm',
    required: true,
    label: t('extra_klm'),
    align: 'center',
    headerStyle: 'font-weight: bold',
    sortable: false
  },
  {
    name: 'discount',
    field: 'discount',
    required: true,
    label: t('discount'),
    align: 'center',
    headerStyle: 'font-weight: bold',
    sortable: false
  },
  {
    name: 'penalties',
    field: 'penalties',
    required: true,
    label: t('penalties'),
    align: 'center',
    headerStyle: 'font-weight: bold',
    sortable: false
  },
  {
    name: 'vat',
    field: 'vat',
    required: true,
    label: t('vat'),
    align: 'center',
    headerStyle: 'font-weight: bold',
    sortable: false
  },
  {
    name: 'exchange_amount',
    field: 'exchange_amount',
    required: true,
    label: t('exchange_amount'),
    align: 'center',
    headerStyle: 'font-weight: bold',
    sortable: false
  },
  {
    name: 'paid_amount',
    field: 'paid_amount',
    required: true,
    label: t('paid_amount'),
    align: 'center',
    headerStyle: 'font-weight: bold',
    sortable: false
  },
  {
    name: 'remain_amount',
    field: 'remain_amount',
    required: true,
    label: t('remain_amount'),
    align: 'center',
    headerStyle: 'font-weight: bold',
    sortable: false,
  }
]
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

// const savePdf = () => {
//   const body = window.document.body
//   const doc = new jsPDF({
//   orientation: "landscape"
// });
// doc.html(body, {
//     callback: (pdf) => {
//       pdf.save('a4')
//     },
//     margin: 32, // optional: page margin
//     // optional: other HTMLOptions
//   })
// }

// const f = await (await fetch("https://sheetjs.com/pres.xlsx")).arrayBuffer();
// const wb = read(f);
// const data = utils.sheet_to_json<President>(wb.Sheets[wb.SheetNames[0]]);
// console.log(data);

</script>
