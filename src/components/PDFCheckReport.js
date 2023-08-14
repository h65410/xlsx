import { useCentralStore } from "../stores/central/index";
import pdfMake from "../assets/pdfmake/pdfmake.min.js";
import pdfFonts from '../assets/pdfmake/vfs_fonts.js';

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


const store = useCentralStore()

export const downloadPdf = () => {
  const date1 = store.data[0]['date']
  const day1 = store.data[0]['day']

  const getRows = () => {
    const r = [
      [
      {text: "date", style: 'header'},
      {text: "day", style: 'header'},
      {text: "/", style: 'header'},
      {text: "A", style: 'header'},
      {text: "N", style: 'header'},
      {text: "AN", style: 'header'},
      {text: "P", style: 'header'},
      {text: "A80", style: 'header'},
      {text: "N80", style: 'header'},
      {text: "R80", style: 'header'},
      {text: "G80", style: 'header'},
      {text: "A84", style: 'header'},
      {text: "N84", style: 'header'},
      {text: "R84", style: 'header'},
      {text: "G84", style: 'header'},
      {text: "/", style: 'header'},
      {text: "A", style: 'header'},
      {text: "N", style: 'header'},
      {text: "AN", style: 'header'},
      {text: "P", style: 'header'},
      {text: "A80", style: 'header'},
      {text: "N80", style: 'header'},
      {text: "R80", style: 'header'},
      {text: "G80", style: 'header'},
      {text: "A84", style: 'header'},
      {text: "N84", style: 'header'},
      {text: "R84", style: 'header'},
      {text: "G84", style: 'header'},
      {text: "/", style: 'header'},
      {text: "l80", style: 'header'},
      {text: "l84", style: 'header'},
    ].reverse()
  ]
    store.data.forEach(v => {
      r.push([
        v['date'],
        v['day'],
        "/",
        v['M']['A'],
        v['M']['N'],
        v['M']['AN'],
        v['M']['P'],
        v['M']['A80'],
        v['M']['N80'],
        v['M']['RB80'],
        v['M']['GB80'],
        v['M']['A84'],
        v['M']['N84'],
        v['M']['RB84'],
        v['M']['GB84'],
        "/",
        v['E']['A'],
        v['E']['N'],
        v['E']['AN'],
        v['E']['P'],
        v['E']['A80'],
        v['E']['N80'],
        v['E']['RB80'],
        v['E']['GB80'],
        v['E']['A84'],
        v['E']['N84'],
        v['E']['RB84'],
        v['E']['GB84'],
        "/",
        v['lost']['1080'],
        v['lost']['1084'],
      ].reverse())
    })

    return r
  }

  function getWidths() {
    const arr = [50, 35, 1]
    for (let i = 0; i < 12; i++) {
      arr.push(17);
    }
    arr.push(1);
    for (let i = 0; i < 12; i++) {
      arr.push(17);
    }
    arr.push(1);
    arr.push(12);
    arr.push(12);

    return arr.reverse()
  }

  const docDefinition =  {
      pageSize: 'A4',
      pageOrientation: 'landscape',
      pageMargins: [ 8, 8 ],
      content: [
        {
          marginLeft: 2,
          table: {
            headerRows: 1,
            widths: getWidths(),
            body: getRows()
          }
        },
      ],
      defaultStyle: {
        font: 'Almarai',
        fontSize: '10',
        alignment: 'center',
      },
      styles: {
      header: {
        fontSize: '8',
        bold: true,
      }
    },
  }

  pdfMake.createPdf(docDefinition).download(`${date1} ${day1}`);

  store.files = []
}

function rtl(txt) {
  return txt
    .split(' ').reverse().join(' ')
    .replace(/\]/g, "^").replace(/\[/g, " ]").replace(/\^/g, "[")
    .replace(/\)/g, "^").replace(/\(/g, " )").replace(/\^/g, "(")
}
