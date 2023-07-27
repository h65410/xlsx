import { defineStore } from 'pinia';
import Papa from "papaparse";
import { date } from 'quasar';
// import { usePrayerStore } from "../prayer/prayer"

export const useCentralStore = defineStore('central', {
  state: () => ({
    error: "",
    _file: null as any,
    date: '' as string,
    day: '' as string,
    _mo: {} as Record<string, any>,
    _ev: {} as Record<string, any>,
    p1: "12:00",
    p2: "15:25",
    p3: "18:42",
    p4: "20:12",
    p12: 0,
    p34: 0,
  }),
  getters: {
    // mo
    m80A: (state) => Object.values(state._mo).filter(v => v["1080"] == "ANSWERED").length,
    m84A: (state) => Object.values(state._mo).filter(v => v["1084"] == "ANSWERED").length,
    m80N: (state) => Object.values(state._mo).filter(v => v["1080"] == "NO ANSWER" && v["1084"] != "ANSWERED").length,
    m84N: (state) => Object.values(state._mo).filter(v => v["1084"] == "NO ANSWER" && v["1080"] != "ANSWERED").length,
    m80GB: (state) => Object.values(state._mo).filter(v => v["1080"] == "BUSY" && v["1084"] == "ANSWERED").length,
    m84GB: (state) => Object.values(state._mo).filter(v => v["1084"] == "BUSY" && v["1080"] =="ANSWERED" ).length,
    m80RB: (state) => Object.values(state._mo).filter(v => v["1080"] == "BUSY" && v["1084"] == "NO ANSWER").length,
    m84RB: (state) => Object.values(state._mo).filter(v => v["1084"] == "BUSY" && v["1080"] =="NO ANSWER" ).length,
    // ev
    e80A: (state) => Object.values(state._ev).filter(v => v["1080"] == "ANSWERED").length,
    e84A: (state) => Object.values(state._ev).filter(v => v["1084"] == "ANSWERED").length,
    e80N: (state) => Object.values(state._ev).filter(v => v["1080"] == "NO ANSWER" && v["1084"] != "ANSWERED").length,
    e84N: (state) => Object.values(state._ev).filter(v => v["1084"] == "NO ANSWER" && v["1080"] != "ANSWERED").length,
    e80GB: (state) => Object.values(state._ev).filter(v => v["1080"] == "BUSY" && v["1084"] == "ANSWERED").length,
    e84GB: (state) => Object.values(state._ev).filter(v => v["1084"] == "BUSY" && v["1080"] =="ANSWERED" ).length,
    e80RB: (state) => Object.values(state._ev).filter(v => v["1080"] == "BUSY" && v["1084"] == "NO ANSWER").length,
    e84RB: (state) => Object.values(state._ev).filter(v => v["1084"] == "BUSY" && v["1080"] =="NO ANSWER" ).length,
  },
  actions: {
    async init() {
      // try {
      //   const prayerStore = usePrayerStore()
      //   await prayerStore.init()
      //   const prayers = prayerStore.prayers
      //   this.p1 = prayers.filter(v => v.label == "Dhuhr")[0].start
      //   this.p2 = prayers.filter(v => v.label == "Asr")[0].start
      //   this.p3 = prayers.filter(v => v.label == "Maghrib")[0].start
      //   this.p4 = prayers.filter(v => v.label == "Isha'a")[0].start
      // } catch (error: any) {
      //   console.log(error.message)
      // }
    },
    parseFile() {
      Papa.parse<string[]>(this._file, {
        quoteChar: "",
        skipEmptyLines: 'greedy',
        complete: async (results, _file) => {
          const data0 = results.data.filter(row => ["1080", "1084"].includes(row[2]))
          const data: Record<string, any> = {}
          data0.forEach(v => {
            const id = v[19]
            if (!data[id]) data[id] = {id, d: v[12]}
            data[id][v[2].toString()] = v[17]
          })
            const dt = Object.values(data)[0].d.substring(0,10)
            this.date = date.formatDate(date.extractDate(dt, "YYYY-MM-DD"), "YYYY-MM-DD")
            this.day = date.formatDate(date.extractDate(dt, "YYYY-MM-DD"), "dddd")
            const mStart = date.extractDate("9:00", "H:mm")
            const mEnd = date.extractDate("15:59", "H:mm")
            const eStart = date.extractDate("16:00", "H:mm")
            const eEnd = date.extractDate("22:59", "H:mm")
            Object.values(data).forEach((v: any) => {
              const d = date.extractDate(date.formatDate(date.extractDate(v.d, "YYYY-MM-DD HH:mm"), "HH:mm"), "HH:mm")
              const p1Start = date.extractDate(this.p1, "H:mm")
              const p1End = date.addToDate(p1Start, {minutes: 30})
              const p2Start = date.extractDate(this.p2, "H:mm")
              const p2End = date.addToDate(p2Start, {minutes: 30})
              const p3Start = date.extractDate(this.p3, "H:mm")
              const p3End = date.addToDate(p3Start, {minutes: 30})
              const p4Start = date.extractDate(this.p4, "H:mm")
              const p4End = date.addToDate(p4Start, {minutes: 30})
              const isMorning = date.isBetweenDates(d, mStart, mEnd, {inclusiveFrom: true, inclusiveTo: true, onlyDate: false})
              const isEvening = date.isBetweenDates(d, eStart, eEnd, {inclusiveFrom: true, inclusiveTo: true, onlyDate: false})
              const isP1 = date.isBetweenDates(d, p1Start, p1End, {inclusiveFrom: true, inclusiveTo: true, onlyDate: false})
              const isP2 = date.isBetweenDates(d, p2Start, p2End, {inclusiveFrom: true, inclusiveTo: true, onlyDate: false})
              const isP3 = date.isBetweenDates(d, p3Start, p3End, {inclusiveFrom: true, inclusiveTo: true, onlyDate: false})
              const isP4 = date.isBetweenDates(d, p4Start, p4End, {inclusiveFrom: true, inclusiveTo: true, onlyDate: false})
              if (isMorning) {
                if (!isP1 && !isP2) {
                  this._mo[v.id] = v
                } else {
                  this.p12++
                }
              }
              if (isEvening) {
                if (!isP3 && !isP4) {
                  this._ev[v.id] = v
                } else {
                  this.p34++
                }
              }
            });
        },
      })
    },
  },
});
