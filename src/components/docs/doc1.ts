import { rtl } from "../funcs";

export const doc1 = (store: any) => {
  const date1 = store.data[0]["date"];
  const day1 = store.data[0]["day"];

  function getContent() {
    const cap: Record<string, any> = {
      M: ["عدد المكالمات الواردة اوقات الصلوات [ الظهر والعصر ]"],
      E: ["عدد المكالمات الواردة اوقات الصلوات [ المغرب والعشاء ]"],
    };

    const content: Record<string, any>[] = [
      {
        text: rtl(
          "التقرير اليومي لعدد المكالمات الواردة لقسم الكول سنتر خلال فترات الدوام الصباحية والمسائية"
        ),
        alignment: "center",
        font: "Amiri",
        bold: true,
        decoration: "underline",
        // decorationStyle: 'double',
        // decorationColor: '#555',
        // lineHeight: 1.5,
        fontSize: 14,
        marginTop: 12,
      },
    ];

    const keys = ["M", "E"];
    keys.forEach((k) =>
      content.push(
        {
          text: rtl(store.data[0][k]["title"]),
          alignment: "right",
          font: "Amiri",
          fontSize: 12,
          marginRight: 45,
          marginTop: 24,
        },
        {
          marginLeft: 45,
          table: {
            headerRows: 1,
            widths: [45, 300],

            body: [
              [
                store.data[0][k]["A"],
                {
                  text: rtl("مجموع المكالمات التي تم الرد عليها"),
                  alignment: "right",
                  bold: true,
                },
              ],
              [
                store.data[0][k]["N"],
                {
                  text: rtl(
                    "مجموع المكالمات التي لم يتم الرد عليها ( شامل المشغول )"
                  ),
                  alignment: "right",
                  bold: true,
                },
              ],
              [
                store.data[0][k]["AN"],
                {
                  text: rtl(
                    "مجموع المكالمات الواردة ( غير شامل اوقات الصلوات )"
                  ),
                  alignment: "right",
                  bold: true,
                },
              ],
              [
                store.data[0][k]["P"],
                { text: rtl(cap[k][0]), alignment: "right", bold: true },
              ],
            ],
          },
        },
        {
          text: rtl("التفاصيل:-"),
          alignment: "right",
          marginRight: 45,
          marginTop: 8,
        },
        {
          marginLeft: store.settings.withEmp ? 82 : 182,
          table: {
            headerRows: 1,
            widths: store.settings.withEmp
              ? [45, 50, 45, 90, 50]
              : [45, 50, 45, 50],

            body: store.settings.withEmp
              ? [
                  [
                    { text: "مشغول" },
                    { text: " الرد يتم لم " },
                    { text: "الرد تم " },
                    { text: "الموظف" },
                    { text: "التحويلة" },
                  ],
                  [
                    store.data[0][k]["RB80"],
                    store.data[0][k]["N80"],
                    store.data[0][k]["A80"],
                    rtl(store.data[0]["duty"][k]["1080"]),
                    { text: "1080" },
                  ],
                  [
                    store.data[0][k]["RB84"],
                    store.data[0][k]["N84"],
                    store.data[0][k]["A84"],
                    rtl(store.data[0]["duty"][k]["1084"]),
                    { text: "1084" },
                  ],
                ]
              : [
                  [
                    { text: "مشغول" },
                    { text: " الرد يتم لم " },
                    { text: "الرد تم " },
                    { text: "التحويلة" },
                  ],
                  [
                    store.data[0][k]["RB80"],
                    store.data[0][k]["N80"],
                    store.data[0][k]["A80"],
                    { text: "1080" },
                  ],
                  [
                    store.data[0][k]["RB84"],
                    store.data[0][k]["N84"],
                    store.data[0][k]["A84"],
                    { text: "1084" },
                  ],
                ],
          },
          layout: {
            hLineStyle: function () {
              return { dash: { length: 1 } };
            },
            vLineStyle: function () {
              return { dash: { length: 1 } };
            },
          },
        }
      )
    );

    content.push(
      {
        text: rtl("مشرف ادارة الجودة"),
        alignment: "left",
        marginTop: 45,
        marginLeft: 40,
        fontSize: 10,
      },
      {
        text: rtl("محمد الحبابي"),
        alignment: "left",
        marginTop: 24,
        marginLeft: 54,
        fontSize: 10,
      },
      {
        text: "",
        alignment: "left",
        marginTop: 22,
        marginLeft: 40,
      }
    );

    return content;
  }

  return {
    pageSize: "A4",
    pageMargins: [0, 0],
    content: [
      {
        fontSize: 12,
        alignment: "right",
        decoration: "underline",
        decorationStyle: "double",
        decorationColor: "#444",
        lineHeight: 1.7,
        marginTop: 148,
        marginRight: 72,
        text: [
          {
            text: "م",
            font: "Amiri",
          },
          {
            font: "Amiri",
            // text: (new Date(date1)).toLocaleString('ar-SA')
            text: date1
              .split("-")
              .map((v: any) => new Intl.NumberFormat("ar-SA").format(v))
              .join("-")
              .replace(/\٬/g, "")
              .split("")
              .reverse()
              .join(""),
          },
          " ",
          { text: day1 },
        ],
      },
      {
        marginTop: 32,
        marginLeft: 62,
        table: {
          widths: [450],
          body: [[getContent()]],
        },
        layout: {
          hLineWidth: function (i: number, node: any) {
            return i === 0 || i === node.table.body.length ? 2 : 1;
          },
          vLineWidth: function (i: number, node: any) {
            return i === 0 || i === node.table.widths.length ? 2 : 1;
          },
          // hLineColor: function (i: number, node: any) {
          // 	return 'black';
          // },
          // vLineColor: function (i: number, node: any) {
          // 	return 'black';
          // },
          // hLineStyle: function (i: number, node: any) {
          // 	if (i === 0 || i === node.table.body.length) {
          // 		return null;
          // 	}
          // 	return {dash: {length: 10, space: 4}};
          // },
          // vLineStyle: function (i: number, node: any) {
          // 	if (i === 0 || i === node.table.widths.length) {
          // 		return null;
          // 	}
          // 	return {dash: {length: 4}};
          // },
          // paddingLeft: function(i: number, node: any) { return 4; },
          // paddingRight: function(i: number, node: any) { return 4; },
          // paddingTop: function(i: number, node: any) { return 2; },
          // paddingBottom: function(i: number, node: any) { return 2; },
          // fillColor: function (i: number, node: any) { return null; }
        },
      },
    ],
    defaultStyle: {
      font: "Almarai",
      alignment: "center",
    },
    styles: {
      allBold: {
        bold: true,
      },
    },
  };
};
