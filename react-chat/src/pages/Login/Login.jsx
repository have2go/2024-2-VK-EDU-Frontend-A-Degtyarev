import React, { useState, useContext } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

import "./Login.scss";

export const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const user = useContext(UserContext);

    const navigate = useNavigate();

    const handleLogin = e => {
        e.preventDefault();

        fetch("https://vkedu-fullstack-div2.ru/api/auth/", {
            method: "POST",
            body: JSON.stringify({
                username: username,
                password: password,
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
                console.log(res);
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
                        required
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                    />
                    <label className="">Пароль</label>
                    <input
                        type="text"
                        className=""
                        required
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
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
