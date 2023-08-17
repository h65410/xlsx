import { defineStore } from "pinia";
import Papa from "papaparse";
import { date } from "quasar";
import { useAppStore } from "../app";

export const useCentralStore = defineStore("central", {
  state: () => ({
    processing: false,
    files: [] as any[],
    data: [] as any[],
    duty0: getDuty(0),
    duty5: getDuty(5),
    duty6: getDuty(6),
    settings: getSettings(),
  }),
  getters: {
    //
  },
  actions: {
    saveDuty(day: 0 | 5 | 6) {
      const dn: "duty0" | "duty5" | "duty6" = `duty${day}`;
      localStorage.setItem(dn, JSON.stringify(this[dn]));
    },
    saveSettings() {
      localStorage.setItem("settings", JSON.stringify(this.settings));
    },
    parseFile() {
      this.processing = true;
      const data1: any[] = [];
      this.files.forEach((file) => {
        Papa.parse(file, {
          skipEmptyLines: "greedy",
          header: true,
          complete: (results: any) => {
            try {
              const data: Record<string, any> = {};
              const AHPath = new Intl.DateTimeFormat(
                "en-SA-u-ca-islamic-umalqura",
                { year: "numeric" }
              )
                .format(new Date())
                .split(" ")[0];
              const AH = require(`../../assets/${AHPath}.json`);
              const d0 = results.data[0]["Start Time"]
                .split(" ")[0]
                .substring(0, 10);
              const dw = date.getDayOfWeek(d0);
              const dx = [5, 6].includes(dw) ? dw : 0;
              const duty = getDuty(dx);
              const mDutyStart = date.formatDate(
                date.extractDate(duty["M"]["start"], "H:mm"),
                "h:mm"
              );
              const mDutyEnd = date.formatDate(
                date.extractDate(duty["M"]["end"], "H:mm"),
                "h:mm"
              );
              const eDutyStart = date.formatDate(
                date.extractDate(duty["E"]["start"], "H:mm"),
                "h:mm"
              );
              const eDutyEnd = date.formatDate(
                date.extractDate(duty["E"]["end"], "H:mm"),
                "h:mm"
              );
              const AHDay = AH[d0];
              const mStart = date.extractDate(duty["M"]["start"], "H:mm");
              const mEnd = date.subtractFromDate(
                date.extractDate(duty["M"]["end"], "H:mm"),
                { minutes: 1 }
              );
              const eStart = date.extractDate(duty["E"]["start"], "H:mm");
              const eEnd = date.subtractFromDate(
                date.extractDate(duty["E"]["end"], "H:mm"),
                { minutes: 1 }
              );
              const p1Start = date.extractDate(AHDay[4], "H:mm");
              const p1End = date.addToDate(p1Start, { minutes: 30 });
              const p2Start = date.extractDate(AHDay[5], "H:mm");
              const p2End = date.addToDate(p2Start, { minutes: 30 });
              const p3Start = date.extractDate(AHDay[6], "H:mm");
              const p3End = date.addToDate(p3Start, { minutes: 30 });
              const p4Start = date.extractDate(AHDay[7], "H:mm");
              const p4End = date.addToDate(p4Start, { minutes: 30 });
              results.data
                .filter((v: any) =>
                  ["1080", "1084"].includes(v["Dest Channel Extension"])
                )
                .filter((v: any) => v["Action Type"] == "RINGGROUP[6405]")
                .forEach((v: any) => {
                  const id = v["Unique ID"];
                  const d = v["Start Time"];
                  if (!data[id]) data[id] = { id };
                  if (
                    !data[id]["d"] ||
                    !(date.getDateDiff(d, data[id]["d"], "minutes") > 0)
                  ) {
                    data[id]["d"] = d;
                  }
                  if (!data[id][v["Dest Channel Extension"]]) {
                    data[id][v["Dest Channel Extension"]] = v["Disposition"];
                  }
                });

              const lost80 = Object.values(data).filter((v) => !v["1080"]);
              const lost84 = Object.values(data).filter((v) => !v["1084"]);

              if (lost80.length > 0) console.log("lost80:", lost80);
              if (lost84.length > 0) console.log("lost84:", lost84);

              // Fix Disconnected
              Object.keys(data).forEach((k) => {
                if (!data[k]["1080"]) data[k]["1080"] = "NO ANSWER";
                if (!data[k]["1084"]) data[k]["1084"] = "NO ANSWER";
              });

              Object.values(data)
                .filter((v) => !(v["1080"] == "BUSY" && v["1084"] == "BUSY"))
                .forEach((v) => {
                  const dd = date.extractDate(
                    data[v["id"]]["d"].split(" ")[1].substring(0, 5),
                    "HH:mm"
                  );
                  if (
                    date.isBetweenDates(dd, mStart, mEnd, {
                      inclusiveFrom: true,
                      inclusiveTo: true,
                      onlyDate: false,
                    })
                  )
                    data[v["id"]]["a"] = "am";
                  if (
                    date.isBetweenDates(dd, eStart, eEnd, {
                      inclusiveFrom: true,
                      inclusiveTo: true,
                      onlyDate: false,
                    })
                  )
                    data[v["id"]]["a"] = "pm";
                  // p
                  switch (true) {
                    case date.isBetweenDates(dd, p1Start, p1End, {
                      inclusiveFrom: true,
                      inclusiveTo: true,
                      onlyDate: false,
                    }):
                      data[v["id"]]["p"] = "p1";
                      break;
                    case date.isBetweenDates(dd, p2Start, p2End, {
                      inclusiveFrom: true,
                      inclusiveTo: true,
                      onlyDate: false,
                    }):
                      data[v["id"]]["p"] = "p2";
                      break;
                    case date.isBetweenDates(dd, p3Start, p3End, {
                      inclusiveFrom: true,
                      inclusiveTo: true,
                      onlyDate: false,
                    }):
                      data[v["id"]]["p"] = "p3";
                      break;
                    case date.isBetweenDates(dd, p4Start, p4End, {
                      inclusiveFrom: true,
                      inclusiveTo: true,
                      onlyDate: false,
                    }):
                      data[v["id"]]["p"] = "p4";
                      break;
                    default:
                      data[v["id"]]["p"] = "";
                  }
                });

              const data0 = Object.values(data);
              const _MP = data0.filter(
                (v) => v["a"] == "am" && ["p1", "p2"].includes(v["p"])
              );
              const _M = data0.filter(
                (v: any) => v["a"] == "am" && v["p"] == ""
              );
              const M: Record<string, any> = { P: _MP.length };
              M["A80"] = _M.filter((v: any) => v["1080"] == "ANSWERED").length;
              M["N80"] = _M.filter(
                (v: any) => v["1080"] == "NO ANSWER" && v["1084"] != "ANSWERED"
              ).length;
              M["RB80"] = _M.filter(
                (v: any) => v["1080"] == "BUSY" && v["1084"] == "NO ANSWER"
              ).length;
              M["GB80"] = _M.filter(
                (v: any) => v["1080"] == "BUSY" && v["1084"] == "ANSWERED"
              ).length;
              M["A84"] = _M.filter((v: any) => v["1084"] == "ANSWERED").length;
              M["N84"] = _M.filter(
                (v: any) => v["1084"] == "NO ANSWER" && v["1080"] != "ANSWERED"
              ).length;
              M["RB84"] = _M.filter(
                (v: any) => v["1084"] == "BUSY" && v["1080"] == "NO ANSWER"
              ).length;
              M["GB84"] = _M.filter(
                (v: any) => v["1084"] == "BUSY" && v["1080"] == "ANSWERED"
              ).length;
              M["A"] = M["A80"] + M["A84"];
              M["N"] = (M["N80"] + M["RB80"] + M["N84"] + M["RB84"]) / 2;
              M["AN"] = M["A"] + M["N"];
              M["title"] = `الفترة الصباحية [ من الساعة ${
                mDutyStart == mDutyEnd ? "--:-- " : mDutyStart + " صباحا"
              } وحتى الساعة ${
                mDutyStart == mDutyEnd ? "--:--" : mDutyEnd + " عصرا"
              } ]`;

              const _EP = data0.filter(
                (v) => v["a"] == "pm" && ["p3", "p4"].includes(v["p"])
              );
              const _E = data0.filter(
                (v: any) => v["a"] == "pm" && v["p"] == ""
              );
              const E: Record<string, any> = { P: _EP.length };
              E["A80"] = _E.filter((v: any) => v["1080"] == "ANSWERED").length;
              E["N80"] = _E.filter(
                (v: any) => v["1080"] == "NO ANSWER" && v["1084"] != "ANSWERED"
              ).length;
              E["RB80"] = _E.filter(
                (v: any) => v["1080"] == "BUSY" && v["1084"] == "NO ANSWER"
              ).length;
              E["GB80"] = _E.filter(
                (v: any) => v["1080"] == "BUSY" && v["1084"] == "ANSWERED"
              ).length;
              E["A84"] = _E.filter((v: any) => v["1084"] == "ANSWERED").length;
              E["N84"] = _E.filter(
                (v: any) => v["1084"] == "NO ANSWER" && v["1080"] != "ANSWERED"
              ).length;
              E["RB84"] = _E.filter(
                (v: any) => v["1084"] == "BUSY" && v["1080"] == "NO ANSWER"
              ).length;
              E["GB84"] = _E.filter(
                (v: any) => v["1084"] == "BUSY" && v["1080"] == "ANSWERED"
              ).length;
              E["A"] = E["A80"] + E["A84"];
              E["N"] = (E["N80"] + E["RB80"] + E["N84"] + E["RB84"]) / 2;
              E["AN"] = E["A"] + E["N"];
              E["title"] = `الفترة المسائية [ من الساعة ${
                eDutyStart == eDutyEnd ? "--:-- " : eDutyStart + " عصرا"
              } وحتى الساعة ${
                eDutyStart == eDutyEnd ? "--:--" : eDutyEnd + " مساء"
              } ]`;

              data1.push({
                date: d0,
                day: date.formatDate(d0, "dddd"),
                lost: {
                  "1080": lost80.length,
                  "1084": lost84.length,
                },
                duty,
                M,
                E,
              });

              if (data1.length == this.files.length) {
                this.data = data1.sort((a, b) =>
                  new Date(a["date"]) > new Date(b["date"]) ? -1 : 1
                );
                // console.log(JSON.stringify(this.data))
                setTimeout(() => {
                  this.processing = false;
                }, 2000);
              }
            } catch (error: any) {
              console.log(error);
              useAppStore().error = error.message;
            }
          },
        });
      });
    },
  },
});

function getDuty(day: any) {
  let str = "";
  switch (day) {
    case 5:
      str =
        localStorage.getItem("duty5") ||
        JSON.stringify({
          M: {
            start: "16:00",
            end: "23:00",
            startLabel: "بداية الدوام الصباحي",
            endLabel: "نهاية الدوام الصباحي",
            "1080": "برزان الشمري",
            "1084": "نواف الحربي",
          },
          E: {
            start: "16:00",
            end: "23:00",
            startLabel: "بداية الدوام المسائي",
            endLabel: "نهاية الدوام المسائي",
            "1080": "ضيدان العجمي",
            "1084": "صالح البقمي",
          },
        });
      break;
    case 6:
      str =
        localStorage.getItem("duty6") ||
        JSON.stringify({
          M: {
            start: "09:00",
            end: "16:30",
            startLabel: "بداية الدوام الصباحي",
            endLabel: "نهاية الدوام الصباحي",
            "1080": "برزان الشمري",
            "1084": "نواف الحربي",
          },
          E: {
            start: "16:30",
            end: "23:30",
            startLabel: "بداية الدوام المسائي",
            endLabel: "نهاية الدوام المسائي",
            "1080": "ضيدان العجمي",
            "1084": "صالح البقمي",
          },
        });
      break;

    default:
      str =
        localStorage.getItem("duty0") ||
        JSON.stringify({
          M: {
            start: "08:30",
            end: "16:30",
            startLabel: "بداية الدوام الصباحي",
            endLabel: "نهاية الدوام الصباحي",
            "1080": "برزان الشمري",
            "1084": "نواف الحربي",
          },
          E: {
            start: "16:30",
            end: "23:30",
            startLabel: "بداية الدوام المسائي",
            endLabel: "نهاية الدوام المسائي",
            "1080": "ضيدان العجمي",
            "1084": "صالح البقمي",
          },
        });
      break;
  }

  return JSON.parse(str);
}

function getSettings() {
  const str =
    localStorage.getItem("settings") ||
    JSON.stringify({
      withEmp: true,
    });

  return JSON.parse(str);
}
