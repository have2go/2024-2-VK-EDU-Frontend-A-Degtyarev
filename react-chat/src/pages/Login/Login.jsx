import React, { useState, useContext } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

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

        fetch("https://vkedu-fullstack-div2.ru/api/auth/", {
            method: "POST",
            body: JSON.stringify({
                username: data.username || undefined,
                password: data.password || undefined,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(res);
            })
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
            .catch(res => {
                console.log("Error: ", res.status, res.statusText);
                res.json().then(json => {
                    const resErrs = {};
                    for (let key in json) {
                        resErrs[key] = json[key];
                        setErrors(resErrs);
                    }
                });
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
                    <Link to={"/register"} className="">
                        Зарегистрируйтесь
                    </Link>
                </div>
            </div>
        </>
    );
};
