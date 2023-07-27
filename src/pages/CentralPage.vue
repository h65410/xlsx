<template>
  <q-page class="q-pt-lg">
    <div v-if="!store._file" class="row justify-center">
      <div class="col-auto q-px-sm">
        <div class="text-center text-subtitle1">بريك 1</div>
        <q-time
        v-model="store.p1"
        format24h
        />
      </div>
      <div class="col-auto q-px-sm">
        <div class="text-center text-subtitle1">بريك 2</div>
        <q-time
        v-model="store.p2"
        format24h
        />
      </div>
      <div class="col-auto q-px-sm">
        <div class="text-center text-subtitle1">بريك 3</div>
        <q-time
        v-model="store.p3"
        format24h
        />
      </div>
      <div class="col-auto q-px-sm">
        <div class="text-center text-subtitle1">بريك 4</div>
        <q-time
        v-model="store.p4"
        format24h
        />
      </div>
      <div class="col-12 q-py-lg"></div>
      <q-file v-model="store._file" label="تحميل الملف" accept=".csv" style="width: 99px;" filled />
    </div>
    <div v-else class="row justify-evenly">
      <div class="col-12 text-center text-h6 q-pb-lg q-mb-lg">{{ store.day }} {{ store.date.split('-').reverse().join('-') }}</div>
      <q-card class="col-4">
        <p class="q-pa-sm q-ma-none text-subtitle1">الفترة الصباحية [ من الساعة 9 صباحا وحتى الساعة 4 عصرا ]</p>
        <q-card-section class="q-pt-none">
          <q-table
            :columns="repCols"
            :rows="mRepRows"
            dir="rtl"
            table-class="text-center"
            separator="cell"
            hide-bottom
            hide-header
            dense
            flat
            bordered
          />
          <div class="col-12 q-pa-sm"></div>
          <q-table
            title="التفاصيل"
            :columns="columns"
            :rows="mRows"
            row-key="name"
            dir="rtl"
            separator="cell"
            hide-bottom
            dense
            flat
            bordered
          />
        </q-card-section>
      </q-card>
      <q-card class="col-4">
        <p class="q-pa-sm q-ma-none text-subtitle1">الفترة المسائية [ من الساعة 4 عصرا وحتى الساعة 11 مساء ]</p>
        <q-card-section class="q-pt-none">
          <q-table
            :columns="repCols"
            :rows="eRepRows"
            dir="rtl"
            table-class="text-center"
            separator="cell"
            hide-bottom
            hide-header
            dense
            flat
            bordered
          />
          <div class="col-12 q-pa-sm"></div>
          <q-table
            title="التفاصيل"
            :columns="columns"
            :rows="eRows"
            row-key="name"
            dir="rtl"
            separator="cell"
            hide-bottom
            dense
            flat
            bordered
          />
        </q-card-section>
      </q-card>
      <div class="col-12 text-center q-pt-lg q-mt-lg">
        <q-btn label="تنزيل" @click="downloadPdf" />
        <q-btn label="عرض" class="q-mx-lg" @click="viewPdf" />
        <q-btn label="طباعة" @click="printPdf" />
      </div>
    </div>
    <div class="q-pa-md text-center">
      {{ store.error }}
    </div>
  </q-page>
</template>

<script setup>
import { computed, onBeforeMount, watch } from "vue";
import { useCentralStore } from "../stores/central/index";
import pdfMake from "../assets/pdfmake/pdfmake.min.js";
import pdfFonts from '../assets/pdfmake/vfs_fonts.js';

const store = useCentralStore();

const repCols = [
  {
    name: 'name',
    align: 'left',
    field: row => row.name,
    format: val => `${val}`
  },
  {
    name: 'value',
    align: 'center',
    field: 'value',
    style: "padding: 0 16px"
  },
]

const mRepRows = computed(() => [
  {
    name: 'مجموع المكالمات التي تم الرد عليها',
    value: store.m80A + store.m84A
  },
  {
    name: 'مجموع المكالمات التي لم يتم الرد عليها ( شامل المشغول )',
    value: (store.m80N + store.m80RB + store.m84N + store.m84RB)/2
  },
  {
    name: 'مجموع المكالمات الواردة ( غير شامل اوقات الصلوات )',
    value: (store.m80A + store.m84A) + (store.m80N + store.m80RB + store.m84N + store.m84RB)/2
  },
  {
    name: 'عدد المكالمات الواردة اوقات الصلوات [ الظهر والعصر ]',
    value: store.p12
  },
])

const eRepRows = computed(() => [
  {
    name: 'مجموع المكالمات التي تم الرد عليها',
    value: store.e80A + store.e84A
  },
  {
    name: 'مجموع المكالمات التي لم يتم الرد عليها ( شامل المشغول )',
    value: (store.e80N + store.e80RB + store.e84N + store.e84RB)/2
  },
  {
    name: 'مجموع المكالمات الواردة ( غير شامل اوقات الصلوات )',
    value: (store.e80A + store.e84A) + (store.e80N + store.e80RB + store.e84N + store.e84RB)/2
  },
  {
    name: 'عدد المكالمات الواردة اوقات الصلوات [ المغرب و العشاء ]',
    value: store.p34
  },
])

const columns = [
  {
    name: 'name',
    label: 'التحويلة',
    align: 'center',
    field: row => row.name,
    format: val => `${val}`,
  },
  {
    name: 'answered',
    label: 'تم الرد',
    align: 'center',
    field: 'answered'
  },
  {
    name: 'no_answer',
    label: 'لم يتم الرد',
    align: 'center',
    field: 'no_answer'
  },
  {
    name: 'busy',
    label: 'مشغول',
    align: 'center',
    field: 'busy'
  },
  {
    name: 'busy2',
    label: 'مشغول2',
    align: 'center',
    field: 'busy2'
  },
]

const mRows = computed(() => [
  {
    name: '1080',
    answered: store.m80A,
    no_answer: store.m80N,
    busy: store.m80RB,
    busy2: store.m80GB,

  },
  {
    name: '1084',
    answered: store.m84A,
    no_answer: store.m84N,
    busy: store.m84RB,
    busy2: store.m84GB,

  },
])

const eRows = computed(() => [
  {
    name: '1080',
    answered: store.e80A,
    no_answer: store.e80N,
    busy: store.e80RB,
    busy2: store.e80GB,

  },
  {
    name: '1084',
    answered: store.e84A,
    no_answer: store.e84N,
    busy: store.e84RB,
    busy2: store.e84GB,

  },
])

pdfMake.vfs = pdfFonts.pdfMake.vfs;
pdfMake.fonts = {
  Amiri: {
    normal: 'Amiri-Regular.ttf',
    bold: 'Amiri-Bold.ttf',
  },
  Kufi: {
    normal: 'NotoKufiArabic-Regular.ttf',
    bold: 'NotoKufiArabic-Bold.ttf',
  },
}

const docDefinition = computed(() => {
  return {
    pageSize: 'A4',
    pageMargins: [ 60, 8 ],
    content: [
      {
        text: store.date + ' ' + store.day,
        fontSize: 14,
        alignment: 'right',
        marginTop: 45,
      },
      {
        text: 'والمسائية الصباحية الدوام فترات خلال سنتر الكول لقسم الواردة المكالمات لعدد اليومي التقرير ',
        alignment: 'center',
        bold: true,
        decoration: 'underline',
        fontSize: 14,
        marginRight: 4,
        marginTop: 20,
      },
      {
        text: rtl(' الفترة الصباحية ]  من الساعة 9  صباحا وحتى الساعة 4  عصرا ['),
        alignment: 'right',
        marginRight: 45,
        marginTop: 20,
      },
      {
        columns: [
          {
            marginLeft: 120,
            table: {
              // headers are automatically repeated if the table spans over multiple pages
              // you can declare how many rows should be treated as headers
              headerRows: 1,
              widths: [ 45, 250 ],

              body: [
                [
                  store.m80A + store.m84A,
                  { text: rtl('مجموع المكالمات التي تم الرد عليها'),
                  alignment: 'right',
                  bold: true }
                ],
                [
                  (store.m80N + store.m80RB + store.m84N + store.m84RB)/2,
                  { text: rtl('مجموع المكالمات التي لم يتم الرد عليها )  شامل المشغول ('),
                  alignment: 'right',
                  bold: true }
                ],
                [
                  (store.m80A + store.m84A) + (store.m80N + store.m80RB + store.m84N + store.m84RB)/2,
                  { text: rtl('مجموع المكالمات الواردة )  غير شامل اوقات الصلوات ('),
                  alignment: 'right',
                  bold: true }
                ],
                [
                  store.p12,
                  { text: rtl('عدد المكالمات الواردة اوقات الصلوات ]  الظهر والعصر ['),
                  alignment: 'right',
                  bold: true }
                ],
              ]
            }
          },
        ]
      },
      {
        text: rtl('التفاصيل:-'),
        alignment: 'right',
        marginRight: 45,
        marginTop: 8,
      },
      {
        columns: [
          {
            marginLeft: 210,
            table: {
              // headers are automatically repeated if the table spans over multiple pages
              // you can declare how many rows should be treated as headers
              headerRows: 1,
              widths: [ 45, 45, 45, 50 ],

              body: [
                [
                  { text: 'مشغول' },
                  { text: ' الرد يتم لم ' },
                  { text: 'الرد تم ' },
                  { text: 'التحويلة' },
                ],
                [
                  store.m80RB,
                  store.m80N,
                  store.m80A,
                  { text: '1080' }
                ],
                [
                  store.m84RB,
                  store.m84N,
                  store.m84A,
                  { text: '1080' }
                ]
              ]
            }
          },
        ]
      },
      {
        text: rtl(' الفترة المسائية ]  من الساعة 4  عصرا وحتى الساعة 11  مساء ['),
        alignment: 'right',
        marginRight: 45,
        marginTop: 60,
      },
      {
        columns: [
          {
            marginLeft: 120,
            table: {
              // headers are automatically repeated if the table spans over multiple pages
              // you can declare how many rows should be treated as headers
              headerRows: 1,
              widths: [ 45, 250 ],

              body: [
                [
                  store.e80A + store.e84A,
                  { text: rtl('مجموع المكالمات التي تم الرد عليها'),
                  alignment: 'right',
                  bold: true }
                ],
                [
                  (store.e80N + store.e80RB + store.e84N + store.e84RB)/2,
                  { text: rtl('مجموع المكالمات التي لم يتم الرد عليها )  شامل المشغول ('),
                  alignment: 'right',
                  bold: true }
                ],
                [
                  (store.e80A + store.e84A) + (store.e80N + store.e80RB + store.e84N + store.e84RB)/2,
                  { text: rtl('مجموع المكالمات الواردة )  غير شامل اوقات الصلوات ('),
                  alignment: 'right',
                  bold: true }
                ],
                [
                  store.p34,
                  { text: rtl('عدد المكالمات الواردة اوقات الصلوات ]  الظهر والعصر ['),
                  alignment: 'right',
                  bold: true }
                ],
              ]
            }
          },
        ]
      },
      {
        text: rtl('التفاصيل:-'),
        alignment: 'right',
        marginRight: 45,
        marginTop: 8,
      },
      {
        columns: [
          {
            marginLeft: 210,
            table: {
              // headers are automatically repeated if the table spans over multiple pages
              // you can declare how many rows should be treated as headers
              headerRows: 1,
              widths: [ 45, 45, 45, 50 ],

              body: [
                [
                  { text: 'مشغول' },
                  { text: ' الرد يتم لم ' },
                  { text: 'الرد تم ' },
                  { text: 'التحويلة' },
                ],
                [
                  store.e80RB,
                  store.e80N,
                  store.e80A,
                  { text: '1080' }
                ],
                [
                  store.e84RB,
                  store.e84N,
                  store.e84A,
                  { text: '1080' }
                ]
              ]
            }
          },
        ]
      },
    ],
    defaultStyle: {
      font: 'Amiri',
      alignment: 'center',
    },
    styles: {
		allBold: {
      bold: true,
		}
	},
  }
})

const downloadPdf = async () => {
  pdfMake.createPdf(docDefinition.value).download(`${store.date} ${store.day}`);
}

const viewPdf = async () => {
  pdfMake.createPdf(docDefinition.value).open();
}

const printPdf = async () => {
  pdfMake.createPdf(docDefinition.value).print({ autoPrint: true });
}

function rtl(txt) {
  return txt.split(' ').reverse().join(' ')
}

watch(() => store._file, (val) => {
  store.parseFile()
})

onBeforeMount(() => {
  store.init()
})
</script>

<style>
.q-table th, .q-table td:first-child {
    font-weight: bold;
    font-size: 14px;
}
</style>
