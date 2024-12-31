import * as T from "./types";
import { useTranslationStore } from "../store/store";
import { languages } from "./languages";

const API: string = "https://api.mymemory.translated.net";
const TRANSLATIONS = "translations";
const HISTORY = "history";

const moveToTop = (cached: { keys: string[]; data: Record<string, T.ICachedInfo> }, text: string): void => {
    cached.keys = cached.keys.filter(key => key !== text);
    cached.keys.push(text);
};

const addNewTranslation = (
    cached: { keys: string[]; data: Record<string, T.ICachedInfo> },
    text: string,
    fromLanguage: string,
    toLanguage: string,
    translatedText: string
): void => {
    cached.keys.push(text);
    cached.data[text] = {
        fromLanguage: fromLanguage,
        translatedText: translatedText,
        toLanguage: toLanguage,
        text: text,
    };
};

const removeLeastRecent = (cached: { keys: string[]; data: Record<string, T.ICachedInfo> }): void => {
    if (cached.keys.length > 100) {
        const oldestKey = cached.keys.shift();
        if (oldestKey) {
            delete cached.data[oldestKey];
        }
    }
};

const addToHistory = (text: string, fromLanguage: string, toLanguage: string, translatedText: string): void => {
    const storedHistory: string | null = localStorage.getItem(HISTORY);
    const history: T.ICachedInfo[] = storedHistory ? JSON.parse(storedHistory) : [];

    history.unshift({
        text,
        fromLanguage,
        toLanguage,
        translatedText,
    });

    localStorage.setItem(HISTORY, JSON.stringify(history));
};

export const getHistory = (): T.ICachedInfo[] => {
    const storedHistory: string | null = localStorage.getItem(HISTORY);
    return storedHistory ? JSON.parse(storedHistory) : [];
};

const getCachedTranslation = (
    cached: { keys: string[]; data: Record<string, T.ICachedInfo> },
    text: string
): Promise<string> => {
    moveToTop(cached, text);
    removeLeastRecent(cached);

    localStorage.setItem(TRANSLATIONS, JSON.stringify(cached));

    console.log("Возвращаю закешированный перевод!!!");
    return Promise.resolve(cached.data[text].translatedText);
};

const getFullLangNames = (fromLanguage: string, toLanguage: string) => {
    const fullLangFrom = languages.find(lang => lang.code === fromLanguage)?.language;
    const fullLangTo = languages.find(lang => lang.code === toLanguage)?.language;

    return [fullLangFrom, fullLangTo];
};

export const translate = (text: string, fromLanguage: string, toLanguage: string): Promise<string> => {
    const storedData: string | null = localStorage.getItem(TRANSLATIONS);
    const cached: {
        keys: string[];
        data: Record<string, T.ICachedInfo>;
    } = storedData ? JSON.parse(storedData) : { keys: [], data: {} };

    if (
        cached.keys.includes(text) &&
        cached.data[text].fromLanguage === fromLanguage &&
        cached.data[text].toLanguage === toLanguage
    ) {
        return getCachedTranslation(cached, text).then(translatedText => {
            addToHistory(text, fromLanguage, toLanguage, translatedText);

            const [fullLangFrom, fullLangTo] = getFullLangNames(fromLanguage, toLanguage);
            if (fullLangFrom && fullLangTo) {
                useTranslationStore.getState().addTranslation(fullLangFrom, fullLangTo, text, translatedText);
            }

            return translatedText;
        });
    }

    console.log("Не нашёл перевода в кэше, делаю запрос...");
    return fetch(`${API}/get?q=${text}&langpair=${fromLanguage}|${toLanguage}`)
        .then(response => response.json())
        .then((data: T.IApiResponse) => {
            const translatedText = data.responseData.translatedText;
            if (data.responseStatus === "403") {
                throw new Error(translatedText);
            }

            const [fullLangFrom, fullLangTo] = getFullLangNames(fromLanguage, toLanguage);
            if (fullLangFrom && fullLangTo) {
                useTranslationStore.getState().addTranslation(fullLangFrom, fullLangTo, text, translatedText);
            }

            addNewTranslation(cached, text, fromLanguage, toLanguage, translatedText);
            removeLeastRecent(cached);
            localStorage.setItem(TRANSLATIONS, JSON.stringify(cached));

            addToHistory(text, fromLanguage, toLanguage, translatedText);

            return translatedText;
        })
        .catch(err => Promise.reject(err));
};

export { languages } from "./languages";
