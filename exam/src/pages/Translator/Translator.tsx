import { useEffect, useState } from "react";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
import HistoryIcon from "@mui/icons-material/History";
import TranslateUtils from "../../utils";
import { Helmet } from "react-helmet-async";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

import "./Translator.scss";

interface SelectValues {
    selectFrom: string;
    selectTo: string;
}

export const Translator: React.FC = () => {
    const [selectValues, setSelectValues] = useState<SelectValues>({
        selectFrom: "English",
        selectTo: "Russian",
    });
    const [toTranslateInput, setToTranslateInput] = useState<string>("");
    const [translatedInput, setTranslatedInput] = useState<string>("");

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>): void => {
        const { id, value } = e.target;
        setSelectValues({
            ...selectValues,
            [id]: value,
        });
    };

    const handleSwap = (): void => {
        if (translatedInput) {
            setToTranslateInput(translatedInput);
            setTranslatedInput("");

            const translateFrom = TranslateUtils.languages.find(
                (lang: { language: string; code: string }) => lang.language === selectValues.selectFrom
            )?.code;
            const translateTo = TranslateUtils.languages.find(
                (lang: { language: string; code: string }) => lang.language === selectValues.selectTo
            )?.code;

            if (translateFrom && translateTo) {
                TranslateUtils.translate(translatedInput, translateTo, translateFrom)
                    .then((text: string) => setTranslatedInput(text))
                    .catch((err: Error) => {
                        toast(err.message);
                    });
            }
        }

        setSelectValues(prev => ({
            selectFrom: prev.selectTo,
            selectTo: prev.selectFrom,
        }));
    };

    const handleTranslate = () => {
        const translateFrom = TranslateUtils.languages.find(
            (lang: { language: string; code: string }) => lang.language === selectValues.selectFrom
        )?.code;
        const translateTo = TranslateUtils.languages.find(
            (lang: { language: string; code: string }) => lang.language === selectValues.selectTo
        )?.code;

        if (translateFrom && translateTo) {
            TranslateUtils.translate(toTranslateInput, translateFrom, translateTo)
                .then((text: string) => setTranslatedInput(text))
                .catch((err: Error) => {
                    toast(err.message);
                });
        }
    };

    useEffect(() => {
        if (toTranslateInput === "") {
            setTranslatedInput("");
        }
    }, [toTranslateInput]);

    return (
        <>
            <Helmet>
                <title>Переводчик</title>
            </Helmet>
            <section className="translate">
                <div className="translate__languages">
                    <div className="translate__language">
                        <select
                            className="translate__select"
                            value={selectValues.selectFrom}
                            onChange={handleChange}
                            id="selectFrom"
                        >
                            {TranslateUtils.languages.map((lang, i) => (
                                <option key={i} value={lang.language}>
                                    {lang.language}
                                </option>
                            ))}
                        </select>
                    </div>
                    <button type="button" className="translate__swap-btn" onClick={handleSwap}>
                        <span className="translate__swap-icon">
                            <ChangeCircleIcon sx={{ fontSize: 35 }} />
                        </span>
                    </button>
                    <div className="translate__language">
                        <select
                            className="translate__select"
                            value={selectValues.selectTo}
                            onChange={handleChange}
                            id="selectTo"
                        >
                            {TranslateUtils.languages.map((lang, i) => (
                                <option key={i} value={lang.language}>
                                    {lang.language}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="translate__container">
                    <textarea
                        className="translate__input translate__textarea translate__from"
                        name="translateFrom"
                        maxLength={450}
                        value={toTranslateInput}
                        onChange={e => setToTranslateInput(e.target.value)}
                    />
                    <textarea
                        className="translate__input translate__textarea translate__from"
                        name="translateFrom"
                        maxLength={450}
                        readOnly
                        value={translatedInput}
                    />
                </div>
                <button type="button" className="translate__btn" onClick={handleTranslate}>
                    Перевести
                </button>
                <Link to={"/history"} className="translate__link">
                    <HistoryIcon sx={{ fontSize: 35 }} />
                </Link>
            </section>
        </>
    );
};
