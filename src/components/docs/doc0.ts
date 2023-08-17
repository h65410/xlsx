import { rtl } from "../funcs";

export const doc0 = (store: any) => {
  const date1 = store.data[0]["date"];
  const day1 = store.data[0]["day"];

  function getContent() {
    const titles: Record<string, any> = {
      M: ["عدد المكالمات الواردة اوقات الصلوات [ الظهر والعصر ]"],
      E: ["عدد المكالمات الواردة اوقات الصلوات [ المغرب والعشاء ]"],
    };

    const content: Record<string, any>[] = [
      {
        text: "والمسائية الصباحية الدوام فترات خلال سنتر الكول لقسم الواردة المكالمات لعدد اليومي التقرير ",
        alignment: "center",
        font: "Amiri",
        bold: true,
        decoration: "underline",
        fontSize: 14,
        marginRight: 4,
        marginTop: 24,
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
          marginTop: 45,
        },
        {
          marginLeft: 70,
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
                { text: rtl(titles[k][0]), alignment: "right", bold: true },
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
          marginLeft: store.settings.withEmp ? 108 : 207,
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

    return content;
  }

  return {
    pageSize: "A4",
    pageMargins: [60, 8],
    content: [
      {
        fontSize: 12,
        alignment: "right",
        decoration: "underline",
        marginTop: 120,
        text: [{ text: date1 }, " ", { text: day1 }],
      },
      getContent(),
    ],
    defaultStyle: {
      font: "Almarai",
      alignment: "center",
    },
  };
};
