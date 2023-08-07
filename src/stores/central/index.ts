import { defineStore } from 'pinia';
import Papa from "papaparse";
import { date } from 'quasar';

export const useCentralStore = defineStore('central', {
  state: () => ({
    error: "",
    processing: false,
    files: [] as any[],
    data: null as any,
    date: '' as string,
    day: '' as string,
    checkData: [] as any[],
  }),
  getters: {
    //
  },
  actions: {
    parseFile() {
      this.processing = true
      this.files.forEach(file => {
        Papa.parse(file, {
          skipEmptyLines: 'greedy',
          header: true,
          complete: (results: any) => {
            try {
              const data: Record<string, any> = {}
              const AHPath = new Intl.DateTimeFormat('en-SA-u-ca-islamic-umalqura', { year: "numeric" }).format(new Date()).split(' ')[0]
              const AH = require(`../../assets/${AHPath}.json`)
              const d0 = results.data[0]['Start Time'].split(' ')[0].substring(0, 10)
              const AHDay = AH[d0]
              const mStart = date.extractDate("9:00", "H:mm")
              const mEnd = date.extractDate("15:59", "H:mm")
              const eStart = date.extractDate("16:00", "H:mm")
              const eEnd = date.extractDate("22:59", "H:mm")
              const p1Start = date.extractDate(AHDay[4], "H:mm")
              const p1End = date.addToDate(p1Start, {minutes: 30})
              const p2Start = date.extractDate(AHDay[5], "H:mm")
              const p2End = date.addToDate(p2Start, {minutes: 30})
              const p3Start = date.extractDate(AHDay[6], "H:mm")
              const p3End = date.addToDate(p3Start, {minutes: 30})
              const p4Start = date.extractDate(AHDay[7], "H:mm")
              const p4End = date.addToDate(p4Start, {minutes: 30})
              results.data
                .filter((v: any) => ['1080', '1084'].includes(v['Dest Channel Extension']))
                .filter((v: any) => v['Action Type'] == 'RINGGROUP[6405]')
                .forEach((v: any) => {
                const id = v['Unique ID']
                const d = v['Start Time']
                if (!data[id]) data[id] = {id}
                if (!data[id]['d'] || !(date.getDateDiff(d, data[id]['d'], 'minutes') > 0)) {
                  data[id]['d'] = d
                }
                if (!data[id][v['Dest Channel Extension']]) {
                  data[id][v['Dest Channel Extension']] = v['Disposition']
                }
              })

              Object.values(data)
                .filter(v => !(v['1080'] == 'BUSY' && v['1084'] == 'BUSY'))
                .forEach(v => {
                const dd = date.extractDate(data[v['id']]['d'].split(' ')[1].substring(0, 5), "HH:mm")
                if (date.isBetweenDates(dd, mStart, mEnd, {inclusiveFrom: true, inclusiveTo: true, onlyDate: false}))
                data[v['id']]['a'] = "am"
                if (date.isBetweenDates(dd, eStart, eEnd, {inclusiveFrom: true, inclusiveTo: true, onlyDate: false}))
                data[v['id']]['a'] = "pm"
                // p
                switch (true) {
                  case date.isBetweenDates(dd, p1Start, p1End, {inclusiveFrom: true, inclusiveTo: true, onlyDate: false}):
                    data[v['id']]['p'] = 'p1'
                    break;
                  case date.isBetweenDates(dd, p2Start, p2End, {inclusiveFrom: true, inclusiveTo: true, onlyDate: false}):
                    data[v['id']]['p'] = 'p2'
                    break;
                  case date.isBetweenDates(dd, p3Start, p3End, {inclusiveFrom: true, inclusiveTo: true, onlyDate: false}):
                    data[v['id']]['p'] = 'p3'
                    break;
                  case date.isBetweenDates(dd, p4Start, p4End, {inclusiveFrom: true, inclusiveTo: true, onlyDate: false}):
                    data[v['id']]['p'] = 'p4'
                    break;
                  default:
                  data[v['id']]['p'] = ''
                }
              })

              const data0 = Object.values(data)
              const _MP = data0.filter(v => v['a'] == 'am' && ['p1', 'p2'].includes(v['p']))
              const _M = data0.filter((v: any) => v['a'] == 'am' && v['p'] == '')
              const M: Record<string, any> = {P: _MP.length}
              M['A80'] = _M.filter((v: any) => v['1080'] == 'ANSWERED').length
              M['N80'] = _M.filter((v: any) => v["1080"] == "NO ANSWER" && v["1084"] != "ANSWERED").length
              M['RB80'] = _M.filter((v: any) => v["1080"] == "BUSY" && v["1084"] == "NO ANSWER").length
              M['GB80'] = _M.filter((v: any) => v["1080"] == "BUSY" && v["1084"] == "ANSWERED" ).length
              M['A84'] = _M.filter((v: any) => v['1084'] == 'ANSWERED').length
              M['N84'] = _M.filter((v: any) => v["1084"] == "NO ANSWER" && v["1080"] != "ANSWERED").length
              M['RB84'] = _M.filter((v: any) => v["1084"] == "BUSY" && v["1080"] == "NO ANSWER").length
              M['GB84'] = _M.filter((v: any) => v["1084"] == "BUSY" && v["1080"] == "ANSWERED" ).length
              M['A'] = M['A80'] + M['A84']
              M['N'] = (M['N80'] + M['RB80'] + M['N84'] + M['RB84'])/2
              M['AN'] = M['A'] + M['N']
              M['details'] = [
                  {
                    name: '1080',
                    answered: M['A80'],
                    no_answer: M['N80'],
                    busy: M['RB80'],
                    busy2: M['GB80'],

                  },
                  {
                    name: '1084',
                    answered: M['A84'],
                    no_answer: M['N84'],
                    busy: M['RB84'],
                    busy2: M['GB84'],

                  },
                ]
              const _EP = data0.filter(v => v['a'] == 'pm' && ['p3', 'p4'].includes(v['p']))
              const _E = data0.filter((v: any) => v['a'] == 'pm' && v['p'] == '')
              const E: Record<string, any> = {P: _EP.length}
              E['A80'] = _E.filter((v: any) => v['1080'] == 'ANSWERED').length
              E['N80'] = _E.filter((v: any) => v["1080"] == "NO ANSWER" && v["1084"] != "ANSWERED").length
              E['RB80'] = _E.filter((v: any) => v["1080"] == "BUSY" && v["1084"] == "NO ANSWER").length
              E['GB80'] = _E.filter((v: any) => v["1080"] == "BUSY" && v["1084"] == "ANSWERED" ).length
              E['A84'] = _E.filter((v: any) => v['1084'] == 'ANSWERED').length
              E['N84'] = _E.filter((v: any) => v["1084"] == "NO ANSWER" && v["1080"] != "ANSWERED").length
              E['RB84'] = _E.filter((v: any) => v["1084"] == "BUSY" && v["1080"] == "NO ANSWER").length
              E['GB84'] = _E.filter((v: any) => v["1084"] == "BUSY" && v["1080"] == "ANSWERED" ).length
              E['A'] = E['A80'] + E['A84']
              E['N'] = (E['N80'] + E['RB80'] + E['N84'] + E['RB84'])/2
              E['AN'] = E['A'] + E['N']
              E['details'] = [
                  {
                    name: '1080',
                    answered: E['A80'],
                    no_answer: E['N80'],
                    busy: E['RB80'],
                    busy2: E['GB80'],

                  },
                  {
                    name: '1084',
                    answered: E['A84'],
                    no_answer: E['N84'],
                    busy: E['RB84'],
                    busy2: E['GB84'],

                  },
                ]

              if (this.files.length > 1) {
                this.checkData.push({
                  date: d0,
                  day: date.formatDate(d0, "dddd"),
                  MA: M['A'],
                  MN: M['N'],
                  MAN: M['AN'],
                  MP: M['P'],
                  MA80: M['A80'],
                  MN80: M['N80'],
                  MRB80: M['RB80'],
                  MGB80: M['GB80'],
                  MA84: M['A84'],
                  MN84: M['N84'],
                  MRB84: M['RB84'],
                  MGB84: M['GB84'],
                  EA: E['A'],
                  EN: E['N'],
                  EAN: E['AN'],
                  EP: E['P'],
                  EA80: E['A80'],
                  EN80: E['N80'],
                  ERB80: E['RB80'],
                  EGB80: E['GB80'],
                  EA84: E['A84'],
                  EN84: E['N84'],
                  ERB84: E['RB84'],
                  EGB84: E['GB84'],
                })
              } else {
                setTimeout(() => {
                  this.data = {M, E}
                  this.date = d0
                  this.day = date.formatDate(d0, "dddd")
                  this.processing = false
                }, 2500)
              }
            } catch (error: any) {
              this.error = error.message
            }
          }
        })
      })
    },
  },
});
