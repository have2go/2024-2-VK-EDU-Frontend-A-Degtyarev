import { useEffect } from "react";
import { Translator } from "./pages/Translator";
import { History } from "./pages/History";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useTranslationStore } from "./store/store";
import TranslateUtils from "./utils";
import "react-toastify/dist/ReactToastify.css";
import "./App.scss";
import { Header } from "./components/Header";

function App() {
    const { setHistory } = useTranslationStore(state => state);

    useEffect(() => {
        const history = TranslateUtils.getHistory();

        history.forEach(el => {
            const fullLangFrom = TranslateUtils.languages.find(lang => lang.code === el.fromLanguage)?.language;
            const fullLangTo = TranslateUtils.languages.find(lang => lang.code === el.toLanguage)?.language;

            if (fullLangFrom && fullLangTo) {
                el.fromLanguage = fullLangFrom;
                el.toLanguage = fullLangTo;
            }
        });

        setHistory(history);
    }, [setHistory]);

    return (
        <div className="app">
            <ToastContainer position="top-right" autoClose={5000} closeOnClick theme="dark" style={{ zIndex: 1000 }} />
            <Header />
            <Routes>
                <Route path="/" element={<Translator />} />
                <Route path="/history" element={<History />} />
            </Routes>
        </div>
    );
}

export default App;
