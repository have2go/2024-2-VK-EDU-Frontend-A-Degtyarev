import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
import TranslateUtils from "../../../ts/utils/index";
import cn from "classnames";

import "./Translate.scss";
import { toast } from "react-toastify";

export const Translate = () => {
    const [selectValues, setSelectValues] = useState({
        selectFrom: "English",
        selectTo: "Russian",
    });
    const [toTranslateInput, setToTranslateInput] = useState("");
    const [translatedInput, setTranslatedInput] = useState("");

    const translateBtn = cn("translate__btn", { translate__btn_active: toTranslateInput !== "" });

    const handleChange = e => {
        const { id, value } = e.target;
        setSelectValues({
            ...selectValues,
            [id]: value,
        });
    };

    const handleSwap = () => {
        if (translatedInput) {
            setToTranslateInput(translatedInput);
            setTranslatedInput("");

            const translateFrom = TranslateUtils.languages.find(lang => lang.language === selectValues.selectFrom).code;
            const translateTo = TranslateUtils.languages.find(lang => lang.language === selectValues.selectTo).code;

            TranslateUtils.translate(translatedInput, translateTo, translateFrom)
                .then(text => setTranslatedInput(text))
                .catch(err => {
                    toast(err.message);
                });
        }

        setSelectValues(prev => ({
            selectFrom: prev.selectTo,
            selectTo: prev.selectFrom,
        }));
    };

    const handleTranslate = () => {
        const translateFrom = TranslateUtils.languages.find(lang => lang.language === selectValues.selectFrom).code;
        const translateTo = TranslateUtils.languages.find(lang => lang.language === selectValues.selectTo).code;

        TranslateUtils.translate(toTranslateInput, translateFrom, translateTo)
            .then(text => setTranslatedInput(text))
            .catch(err => {
                toast(err.message);
            });
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
            <header className="header header_profile">
                <Link to={"/"} className="header__back-btn">
                    <span className="icon header__back">
                        <ArrowBackIcon sx={{ fontSize: 30 }} />
                    </span>
                </Link>
                <h1 className="header__title">Переводчик</h1>
            </header>
            <div className={`content content_translate`}>
                <div className="translate__content">
                    <div className="translate__languages">
                        <div className="translate__language">
                            <label htmlFor="selectFrom">Перевод с</label>
                            <select
                                className="translate__select"
                                id="selectFrom"
                                value={selectValues.selectFrom}
                                onChange={handleChange}
                            >
                                {TranslateUtils.languages.map((lang, i) => (
                                    <option key={i} value={lang.language}>
                                        {lang.language}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <button type="button" className="translate__swap-btn" onClick={handleSwap}>
                            <span className="icon translate__swap">
                                <ChangeCircleIcon sx={{ fontSize: 35 }} />
                            </span>
                        </button>
                        <div className="translate__language">
                            <label htmlFor="selectFrom">На</label>
                            <select
                                className="translate__select"
                                id="selectTo"
                                value={selectValues.selectTo}
                                onChange={handleChange}
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
                        <div className={`translate__input-group translate__input-group_textarea`}>
                            <textarea
                                type="text"
                                className="translate__input translate__textarea translate__from"
                                name="translateFrom"
                                maxLength={450}
                                value={toTranslateInput}
                                onChange={e => setToTranslateInput(e.target.value)}
                            />
                        </div>
                        <div className={`translate__input-group translate__input-group_textarea`}>
                            <textarea
                                type="text"
                                className="translate__input translate__textarea translate__from"
                                name="translateFrom"
                                maxLength={450}
                                readOnly
                                value={translatedInput}
                            />
                        </div>
                    </div>
                    <button type="button" className={translateBtn} onClick={handleTranslate}>
                        Перевести
                    </button>
                </div>
            </div>
        </>
    );
};
