<template>
  <div v-if="store.data[0]" class="col-12 text-center q-pt-lg q-mt-lg">
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
import { doc0 } from "./docs/doc0"
import { doc1 } from "./docs/doc1"

const store = useCentralStore()

const props = defineProps(["docI"])

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
  Kufi: {
    normal: 'NotoKufiArabic-Regular.ttf',
    bold: 'NotoKufiArabic-Bold.ttf',
  },
}

const date1 = store.data[0]['date']
const day1 = store.data[0]['day']

const docs = [
  doc0(store),
  doc1(store)
]

const downloadPdf = async () => {
  pdfMake.createPdf(docs[props.docI]).download(`${date1} ${day1}`);
}

const viewPdf = async () => {
  pdfMake.createPdf(docs[props.docI]).open();
}

const printPdf = async () => {
  pdfMake.createPdf(docs[props.docI]).print({ autoPrint: true });
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
