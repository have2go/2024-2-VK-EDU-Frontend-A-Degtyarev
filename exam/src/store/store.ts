import { create } from "zustand";
import * as T from "../utils/types";

type TranslationHistoryState = {
    history: T.ICachedInfo[];
    addTranslation: (fromLanguage: string, toLanguage: string, text: string, translatedText: string) => void;
    setHistory: (history: T.ICachedInfo[]) => void;
};

export const useTranslationStore = create<TranslationHistoryState>(set => ({
    history: [],
    addTranslation: (fromLanguage, toLanguage, text, translatedText) =>
        set(state => ({
            history: [{ fromLanguage, toLanguage, translatedText, text }, ...state.history].slice(0, 100),
        })),
    setHistory: history => set({ history }),
}));
