import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";

import "./Register.scss";

export const Register = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [bio, setBio] = useState("");
    const [avatar, setAvatar] = useState(null);
    const maxSize = 9 * 1024 * 1024;

    const [buttonText, setButtonText] = useState("Зарегистрироваться");

    const navigate = useNavigate();

    const handleFileChange = event => {
        const selectedFile = event.target.files[0];

        if (selectedFile && selectedFile.size > maxSize) {
            alert("Размер файла не должен превышать 9 МБ.");
            event.target.value = "";
            setAvatar(null);
        } else {
            setAvatar(selectedFile);
        }
    };

    const handleRegister = async e => {
        e.preventDefault();

        const body = new FormData();

        body.append("username", username);
        body.append("password", password);
        body.append("first_name", firstName);
        body.append("last_name", lastName);
        if (bio !== "") body.append("bio", bio);
        if (avatar) body.append("avatar", avatar);

        setButtonText("Подождите...");
        await fetch("https://vkedu-fullstack-div2.ru/api/register/", {
            method: "POST",
            body: body,
        })
            .then(response => {
                if (response.ok) {
                    setButtonText("Успех!");

                    setTimeout(() => {
                        navigate(`/login`);
                    }, 1500);

                    return;
                }
                return Promise.reject(response);
            })
            .catch(response => {
                console.log("Error: ", response.status, response.statusText);
                setButtonText("Зарегистрироваться");
                response.json().then(json => {
                    console.log("Err response: ", json);
                });
            });
    };

    return (
        <>
            <Helmet>
                <title>Регистрация</title>
            </Helmet>
            <div className="register">
                <h1 className="register__title">Регистрация</h1>
                <form className="register__form" onSubmit={handleRegister}>
                    <label className="">Логин</label>
                    <input
                        type="text"
                        className=""
                        required
                        minLength={1}
                        maxLength={150}
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                    />
                    <label className="">Пароль</label>
                    <input
                        type="text"
                        className=""
                        required
                        minLength={8}
                        maxLength={150}
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    <label className="">Имя</label>
                    <input
                        type="text"
                        className=""
                        required
                        minLength={1}
                        maxLength={150}
                        value={firstName}
                        onChange={e => setFirstName(e.target.value)}
                    />
                    <label className="">Фамилия</label>
                    <input
                        type="text"
                        className=""
                        required
                        minLength={1}
                        maxLength={150}
                        value={lastName}
                        onChange={e => setLastName(e.target.value)}
                    />
                    <label className="">О себе</label>
                    <textarea
                        type="text"
                        className=""
                        maxLength={450}
                        value={bio}
                        onChange={e => setBio(e.target.value)}
                    />
                    <label className="">Аватар</label>
                    <input type="file" accept="image/*" className="" onChange={handleFileChange} />
                    <button className="register__submit-btn">{buttonText}</button>
                </form>
                <div className="register__already-member">
                    Есть аккаунт?{" "}
                    <Link to={"/login"} className="">
                        Авторизуйтесь
                    </Link>
                </div>
            </div>
        </>
    );
};
