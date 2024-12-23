import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { Helmet } from "react-helmet-async";
import { useTranslationStore } from "../../store/store";

import "./History.scss";

export const History: React.FC = () => {
    const { history, setHistory } = useTranslationStore(state => state);

    const clearHistory = (): void => {
        setHistory([]);
        localStorage.removeItem("translations");
    };
    return (
        <>
            <Helmet>
                <title>История</title>
            </Helmet>
            <div className="history">
                <button
                    className={`history__clear-btn ${history?.length > 0 ? "history__clear-btn_active" : ""}`}
                    onClick={clearHistory}
                    disabled={history?.length === 0}
                >
                    Очистить историю
                </button>
                {history?.length > 0 ? (
                    history.map((el, i) => {
                        return (
                            <div className="history__element" key={i}>
                                <div className="history__languages">
                                    <p className="history__lang">{el.fromLanguage}</p>
                                    <ArrowRightAltIcon sx={{ fontSize: 18 }} />
                                    <p className="history__lang">{el.toLanguage}</p>
                                </div>
                                <div className="history__text-container">
                                    <p className="history__text history__text_from">{el.translatedText}</p>
                                    <p className="history__text history__text_to">{el.text}</p>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <p className="history__nothing">Тут ничего нет</p>
                )}
            </div>
        </>
    );
};
