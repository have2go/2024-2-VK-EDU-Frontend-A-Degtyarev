import React, { useState, useContext } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { login } from "../../api/api";

import "./Login.scss";

export const Login = () => {
    const [errors, setErrors] = useState({});
    const [data, setData] = useState({});

    const handleChange = event => {
        const name = event.target.name;
        const value = event.target.value?.trim();

        setErrors({ ...errors, [name]: null });
        setData({ ...data, [name]: value });
    };

    const user = useContext(UserContext);

    const navigate = useNavigate();

    const handleLogin = e => {
        e.preventDefault();

        login(data.username, data.password)
            .then(json => {
                user.login(json.access, json.refresh);
                localStorage.setItem(
                    "tokens",
                    JSON.stringify({
                        access: json.access,
                        refresh: json.refresh,
                    })
                );
                navigate("/");
            })
            .catch(err => {
                if (typeof err === "object") setErrors({ ...err });
            });
    };
    return (
        <>
            <Helmet>
                <title>Вход</title>
            </Helmet>
            <div className="login">
                <h1 className="login__title">Авторизация</h1>
                <form className="login__form" onSubmit={handleLogin}>
                    <label className="">Логин</label>
                    <input
                        type="text"
                        className=""
                        name="username"
                        // required
                        value={data.username}
                        onChange={handleChange}
                    />
                    {errors.username && <span className="login__error">{errors.username}</span>}
                    <label className="">Пароль</label>
                    <input
                        type="password"
                        className=""
                        name="password"
                        // required
                        value={data.password}
                        onChange={handleChange}
                    />
                    {errors.password && <span className="login__error">{errors.password}</span>}
                    <button className="login__submit-btn">Войти</button>
                </form>
                <div className="login__already-member">
                    Нет аккаунта?{" "}
                    <Link to={"/register"} className="login__link">
                        Зарегистрируйтесь
                    </Link>
                </div>
                {errors.detail && <span className="login__error">{errors.detail}</span>}
            </div>
        </>
    );
};
