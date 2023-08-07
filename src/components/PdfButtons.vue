<template>
  <div class="col-12 text-center q-pt-lg q-mt-lg">
    <q-btn label="تنزيل" @click="downloadPdf" />
    <q-btn label="عرض" class="q-mx-lg" @click="viewPdf" />
    <q-btn label="طباعة" @click="printPdf" />
  </div>
</template>

<script setup>
import { useCentralStore } from "../stores/central/index";
import pdfMake from "../assets/pdfmake/pdfmake.min.js";
import pdfFonts from '../assets/pdfmake/vfs_fonts.js';

const store = useCentralStore()

pdfMake.vfs = pdfFonts.pdfMake.vfs;
pdfMake.fonts = {
  Amiri: {
    normal: 'Amiri-Regular.ttf',
    bold: 'Amiri-Bold.ttf',
  },
  Almarai: {
    normal: 'Almarai-Regular.ttf',
    bold: 'Almarai-Bold.ttf',
    extraBold: 'Almarai-ExtraBold.ttf',
  },
}

const docDefinition =  {
    pageSize: 'A4',
    pageMargins: [ 60, 8 ],
    content: [
      {
        fontSize: 12,
        alignment: 'right',
        decoration: 'underline',
        marginTop: 120,
        text: [
          {text: store.date },
          ' ',
          {text: store.day },
        ],
      },
      {
        text: 'والمسائية الصباحية الدوام فترات خلال سنتر الكول لقسم الواردة المكالمات لعدد اليومي التقرير ',
        alignment: 'center',
        font: 'Amiri',
        bold: true,
        decoration: 'underline',
        fontSize: 14,
        marginRight: 4,
        marginTop: 45,
      },
      {
        text: rtl(' الفترة الصباحية ]  من الساعة 9  صباحا وحتى الساعة 4  عصرا ['),
        alignment: 'right',
        font: 'Amiri',
        fontSize: 12,
        marginRight: 45,
        marginTop: 45,
      },
      {
        marginLeft: 70,
        table: {
          // headers are automatically repeated if the table spans over multiple pages
          // you can declare how many rows should be treated as headers
          headerRows: 1,
          widths: [ 45, 300 ],

          body: [
            [
              store.data['M']['A'],
              { text: rtl('مجموع المكالمات التي تم الرد عليها'),
              alignment: 'right',
              bold: true }
            ],
            [
              store.data['M']['N'],
              { text: rtl('مجموع المكالمات التي لم يتم الرد عليها )  شامل المشغول ('),
              alignment: 'right',
              bold: true }
            ],
            [
              store.data['M']['AN'],
              { text: rtl('مجموع المكالمات الواردة )  غير شامل اوقات الصلوات ('),
              alignment: 'right',
              bold: true }
            ],
            [
              store.data['M']['P'],
              { text: rtl('عدد المكالمات الواردة اوقات الصلوات ]  الظهر والعصر ['),
              alignment: 'right',
              bold: true }
            ],
          ]
        }
      },
      {
        text: rtl('التفاصيل:-'),
        alignment: 'right',
        marginRight: 45,
        marginTop: 8,
      },
      {
        marginLeft: 205,
        table: {
          // headers are automatically repeated if the table spans over multiple pages
          // you can declare how many rows should be treated as headers
          headerRows: 1,
          widths: [ 45, 50, 45, 50 ],

          body: [
            [
              { text: 'مشغول' },
              { text: ' الرد يتم لم ' },
              { text: 'الرد تم ' },
              { text: 'التحويلة' },
            ],
            [
              store.data['M']['RB80'],
              store.data['M']['N80'],
              store.data['M']['A80'],
              { text: '1080' }
            ],
            [
              store.data['M']['RB84'],
              store.data['M']['N84'],
              store.data['M']['A84'],
              { text: '1084' }
            ]
          ]
        }
      },
      {
        text: rtl(' الفترة المسائية ]  من الساعة 4  عصرا وحتى الساعة 11  مساء ['),
        alignment: 'right',
        font: 'Amiri',
        fontSize: 12,
        marginRight: 45,
        marginTop: 60,
      },
      {
        marginLeft: 70,
        table: {
          // headers are automatically repeated if the table spans over multiple pages
          // you can declare how many rows should be treated as headers
          headerRows: 1,
          widths: [ 45, 300 ],

          body: [
            [
              store.data['E']['A'],
              { text: rtl('مجموع المكالمات التي تم الرد عليها'),
              alignment: 'right',
              bold: true }
            ],
            [
              store.data['E']['N'],
              { text: rtl('مجموع المكالمات التي لم يتم الرد عليها )  شامل المشغول ('),
              alignment: 'right',
              bold: true }
            ],
            [
              store.data['E']['AN'],
              { text: rtl('مجموع المكالمات الواردة )  غير شامل اوقات الصلوات ('),
              alignment: 'right',
              bold: true }
            ],
            [
              store.data['E']['P'],
              { text: rtl('عدد المكالمات الواردة اوقات الصلوات ]  الظهر والعصر ['),
              alignment: 'right',
              bold: true }
            ],
          ]
        }
      },
      {
        text: rtl('التفاصيل:-'),
        alignment: 'right',
        marginRight: 45,
        marginTop: 8,
      },
      {
        marginLeft: 205,
        table: {
          // headers are automatically repeated if the table spans over multiple pages
          // you can declare how many rows should be treated as headers
          headerRows: 1,
          widths: [ 45, 50, 45, 50 ],

          body: [
            [
              { text: 'مشغول' },
              { text: ' الرد يتم لم ' },
              { text: 'الرد تم ' },
              { text: 'التحويلة' },
            ],
            [
              store.data['E']['RB80'],
              store.data['E']['N80'],
              store.data['E']['A80'],
              { text: '1080' }
            ],
            [
              store.data['E']['RB84'],
              store.data['E']['N84'],
              store.data['E']['A84'],
              { text: '1084' }
            ]
          ]
        }
      },
    ],
    defaultStyle: {
      font: 'Almarai',
      alignment: 'center',
    },
    styles: {
		allBold: {
      bold: true,
		}
	},
}

const downloadPdf = async () => {
  pdfMake.createPdf(docDefinition).download(`${store.date} ${store.day}`);
}

const viewPdf = async () => {
  pdfMake.createPdf(docDefinition).open();
}

const printPdf = async () => {
  pdfMake.createPdf(docDefinition).print({ autoPrint: true });
}

function rtl(txt) {
  return txt.split(' ').reverse().join(' ')
}
</script>
