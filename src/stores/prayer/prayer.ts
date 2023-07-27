import { defineStore } from 'pinia';
import { date } from 'quasar';
import APi from "../api"
import { Prayers } from "../../components/models"

export const usePrayerStore = defineStore('prayer', {
  state: () => ({
    date: '' as string,
    day: '' as string,
    prayers: [] as Prayers[],
  }),
  getters: {
    // companies: (state) => state.counter * 2,
  },
  actions: {
    async init() {
      const result = await APi("/riyadh")._getAll()
      this.date = date.formatDate(result["date"], "YYYY-MM-DD")
      this.day = date.formatDate(result["date"], "dddd")
      const rt = result["today"]

      this.prayers = [
        {
          label: "Dhuhr",
          start: rt["Dhuhr"],
          end: getEnd("Dhuhr")
        },
        {
          label: "Asr",
          start: rt["Asr"],
          end: getEnd("Asr")
        },
        {
          label: "Maghrib",
          start: rt["Maghrib"],
          end: getEnd("Maghrib")
        },
        {
          label: "Isha'a",
          start: rt["Isha'a"],
          end: getEnd("Isha'a")
        }
      ]

      function getEnd(key: string) {
        return date.formatDate(date.addToDate(date.extractDate(rt[key], "HH:mm"), {minutes: 30}), "HH:mm")
      }
    },
  },
});
