import { create } from "zustand";

import { Card } from "@/types/card";

export type CardsState = {
  cards: Card[];
  addCard: (card: Card) => void;
};

export const useCardStore = create<CardsState>((set) => ({
  cards: [],
  addCard: (card) => set((state) => ({ cards: [...state.cards, card] })),
}));
