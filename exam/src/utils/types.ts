interface IData {
    translatedText: string;
    match: number;
}

interface IMatches {
    id: string;
    segment: string;
    translation: string;
    source: string;
    target: string;
    quality: number;
    reference: null;
    "usage-count": number;
    subject: string;
    "created-by": string;
    "last-updated-by": string;
    "create-date": string;
    "last-update-date": string;
    match: number;
}

export interface IApiResponse {
    responseData: IData;
    quotaFinished: boolean;
    mtLangSupported: null | boolean;
    responseDetails: string;
    responseStatus: string;
    responderId: null | number;
    exception_code: string | number | null;
    matches: IMatches[] | "";
}

export interface ICachedInfo {
    fromLanguage: string;
    translatedText: string;
    toLanguage: string;
    text: string;
}

export type LanguageType = {
    code: string;
    language: string;
};
