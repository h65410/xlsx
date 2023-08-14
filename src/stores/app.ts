import { defineStore } from 'pinia';

export const useAppStore = defineStore('app', {
  state: () => ({
    error: '',
  }),
  getters: {
    // doubleCount: (state) => state.counter * 2,
  },
  actions: {
    // increment() {
    //   this.counter++;
    // },
  },
});
