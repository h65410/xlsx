<template>
  <div class="col-12 text-center q-pt-lg q-mt-lg">
    <q-btn label="تنزيل" @click="downloadPdf" />
    <q-btn label="عرض" class="q-mx-lg" @click="viewPdf" />
    <q-btn label="طباعة" @click="printPdf" />
    <div class="full-width q-pt-md"></div>
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

function getContent() {
  const date1 = store.data[0]['date']
  const day1 = store.data[0]['day']
  const titles = {
    M: [
      'عدد المكالمات الواردة اوقات الصلوات [ الظهر والعصر ]',
    ],
    E: [
      'عدد المكالمات الواردة اوقات الصلوات [ المغرب والعشاء ]',
    ]
  }

  const content = [
    {
      fontSize: 12,
      alignment: 'right',
      decoration: 'underline',
      marginTop: 120,
      text: [
        {text: date1 },
        ' ',
        {text: day1 },
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
    }
  ]

  const keys = ['M', 'E']
  keys.forEach(k => content.push(
    {
      text: rtl(store.data[0][k]['title']),
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
            store.data[0][k]['A'],
            { text: rtl('مجموع المكالمات التي تم الرد عليها'),
            alignment: 'right',
            bold: true }
          ],
          [
            store.data[0][k]['N'],
            { text: rtl('مجموع المكالمات التي لم يتم الرد عليها ( شامل المشغول )'),
            alignment: 'right',
            bold: true }
          ],
          [
            store.data[0][k]['AN'],
            { text: rtl('مجموع المكالمات الواردة ( غير شامل اوقات الصلوات )'),
            alignment: 'right',
            bold: true }
          ],
          [
            store.data[0][k]['P'],
            { text: rtl(titles[k][0]),
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
      marginLeft: store.emp.withEmp? 108 : 207,
      table: {
        // headers are automatically repeated if the table spans over multiple pages
        // you can declare how many rows should be treated as headers
        headerRows: 1,
        widths: store.emp.withEmp? [ 45, 50, 45, 90, 50 ] : [ 45, 50, 45, 50 ],

        body: store.emp.withEmp? [
          [
            { text: 'مشغول' },
            { text: ' الرد يتم لم ' },
            { text: 'الرد تم ' },
            { text: 'الموظف' },
            { text: 'التحويلة' },
          ],
          [
            store.data[0][k]['RB80'],
            store.data[0][k]['N80'],
            store.data[0][k]['A80'],
            rtl(store.emp[k]['1080']),
            { text: '1080' }
          ],
          [
            store.data[0][k]['RB84'],
            store.data[0][k]['N84'],
            store.data[0][k]['A84'],
            rtl(store.emp[k]['1084']),
            { text: '1084' }
          ]
        ]:
        [
          [
            { text: 'مشغول' },
            { text: ' الرد يتم لم ' },
            { text: 'الرد تم ' },
            { text: 'التحويلة' },
          ],
          [
            store.data[0][k]['RB80'],
            store.data[0][k]['N80'],
            store.data[0][k]['A80'],
            { text: '1080' }
          ],
          [
            store.data[0][k]['RB84'],
            store.data[0][k]['N84'],
            store.data[0][k]['A84'],
            { text: '1084' }
          ]
        ]
      }
    }
  ))

  return content
}

const docDefinition =  {
    pageSize: 'A4',
    pageMargins: [ 60, 8 ],
    content: getContent(),
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
  pdfMake.createPdf(docDefinition).download(`${date1} ${day1}`);
}

const viewPdf = async () => {
  pdfMake.createPdf(docDefinition).open();
}

const printPdf = async () => {
  pdfMake.createPdf(docDefinition).print({ autoPrint: true });
}

function rtl(txt) {
  return (' ' + txt)
    .split(' ')
    .reverse()
    .join(' ')
    .replace(/\]/g, "^").replace(/\[/g, " ]").replace(/\^/g, "[")
    .replace(/\)/g, "^").replace(/\(/g, " )").replace(/\^/g, "(")
}
</script>
