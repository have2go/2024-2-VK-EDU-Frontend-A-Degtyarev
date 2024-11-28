import React, { useState, useContext, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../api/api";
import { useCurrentUserStore } from "../../store/store";
import { ThemeSwitch } from "../../components/ThemeSwitch/ThemeSwitch";
import { toast } from "react-toastify";

import "./Login.scss";

export const Login = () => {
    const { login, tokens } = useCurrentUserStore();

    const navigate = useNavigate();

    const [errors, setErrors] = useState({});
    const [data, setData] = useState({});

    const handleChange = event => {
        const name = event.target.name;
        const value = event.target.value?.trim();

        setErrors({ ...errors, [name]: null });
        setData({ ...data, [name]: value });
    };

    const handleLogin = e => {
        e.preventDefault();

        auth(data.username, data.password)
            .then(json => {
                login(json.access, json.refresh);
                localStorage.setItem(
                    "tokens",
                    JSON.stringify({
                        access: json.access,
                        refresh: json.refresh,
                    })
                );
            })
            .catch(err => {
                if (errors.detail) toast(errors.detail);
                if (typeof err === "object") setErrors({ ...err });
            });
    };

    useEffect(() => {
        if (tokens?.access) {
            navigate("/", { replace: true });
        }
    }, [tokens]);

    return (
        <>
            <Helmet>
                <title>Вход</title>
            </Helmet>
            <div className="login">
                <h1 className="login__title">Авторизация</h1>
                <form className="login__form" onSubmit={handleLogin}>
                    <div className="login__input-container">
                        <label className="login__label">Логин</label>
                        <input
                            type="text"
                            className="login__input"
                            name="username"
                            // required
                            value={data.username}
                            onChange={handleChange}
                        />
                    </div>
                    <span className="login__error">{errors.username && errors.username}</span>
                    <div className="login__input-container">
                        <label className="login__label">Пароль</label>
                        <input
                            type="password"
                            className="login__input"
                            name="password"
                            // required
                            value={data.password}
                            onChange={handleChange}
                        />
                    </div>

                    <span className="login__error">{errors.password && errors.password}</span>
                    <button className="login__submit-btn">Войти</button>
                </form>
                <div className="login__already-member">
                    Нет аккаунта?{" "}
                    <Link to={"/register"} className="login__link">
                        Зарегистрироваться
                    </Link>
                </div>
                <div className="login__theme-switch-box">
                    <ThemeSwitch />
                </div>
            </div>
        </>
    );
};
