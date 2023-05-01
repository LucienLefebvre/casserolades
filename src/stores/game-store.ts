import { defineStore } from 'pinia';

export const useGameStore = defineStore('sounds', {
  state: () => ({
    activeCell: -1,
  }),
  getters: {},
  actions: {
    generateRandomNumberBetween0and9(): number {
      return Math.floor(Math.random() * 10);
    },

    setActiveCell(cell: number) {
      this.activeCell = cell;
    },

    setRandomActiveCell() {
      this.activeCell = this.generateRandomNumberBetween0and9();
    },
  },
});
