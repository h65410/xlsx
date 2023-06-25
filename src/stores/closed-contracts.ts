import { defineStore } from 'pinia';

export const useClosedContractsStore = defineStore('closed-contracts', {
  state: () => ({
    date: '' as string,
    companies: [] as any[],
  }),
  getters: {
    // companies: (state) => state.counter * 2,
  },
  actions: {
    increment() {
      // this.counter++;
    },
  },
});

interface Company {
  company_code: string,
  company_name: string,
  contracts: Contract[]
}

interface Contract {
  region: string,
  contract_number: string,
  car_type: string,
  car_plate: string,
  contract_date: string,
  contract_duration: string,
  rent_price: string,
  rent_total: string,
  extra_hour: string,
  extra_klm: string,
  discount: string,
  penalties: string,
  vat: string,
  exchange_amount: string,
  paid_amount: string,
  remain_amount: string
}
