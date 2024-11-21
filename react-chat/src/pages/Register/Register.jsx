import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../../api/api";

import "./Register.scss";

export const Register = () => {
    const [avatar, setAvatar] = useState(null);
    const maxSize = 9 * 1024 * 1024;

    const [errors, setErrors] = useState({});
    const [data, setData] = useState({});

    const [buttonText, setButtonText] = useState("Зарегистрироваться");

    const navigate = useNavigate();

    const handleChange = event => {
        const name = event.target.name;
        const value = event.target.value?.trim();

        setErrors({ ...errors, [name]: null });
        setData({ ...data, [name]: value });
    };

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

        for (let key in data) {
            if (key) body.append(key, data[key]);
        }
        if (avatar) body.append("avatar", avatar);

        setButtonText("Подождите...");

        await register(body)
            .then(res => {
                setButtonText("Успех!");
                setTimeout(() => {
                    navigate(`/login`);
                }, 1500);
            })
            .catch(err => {
                setButtonText("Зарегистрироваться");
                if (typeof err === "object") setErrors({ ...err });
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
                    <div className="register__input-container">
                        <label className="register__label">Логин</label>
                        <input
                            type="text"
                            name="username"
                            className="register__input"
                            // required
                            // minLength={1}
                            // maxLength={150}
                            value={data.username}
                            onChange={handleChange}
                        />
                    </div>
                    <span className="register__error">{errors.username && errors.username}</span>
                    <div className="register__input-container">
                        <label className="register__label">Пароль</label>
                        <input
                            type="password"
                            name="password"
                            className="register__input"
                            // required
                            // minLength={8}
                            // maxLength={150}
                            value={data.password}
                            onChange={handleChange}
                        />
                    </div>
                    <span className="register__error">{errors.password && errors.password}</span>
                    <div className="register__input-container">
                        <label className="register__label">Имя</label>
                        <input
                            type="text"
                            className="register__input"
                            name="first_name"
                            // required
                            // minLength={1}
                            // maxLength={150}
                            value={data.first_name}
                            onChange={handleChange}
                        />
                    </div>
                    <span className="register__error">{errors.first_name && errors.first_name}</span>
                    <div className="register__input-container">
                        <label className="register__label">Фамилия</label>
                        <input
                            type="text"
                            className="register__input"
                            name="last_name"
                            // required
                            // minLength={1}
                            // maxLength={150}
                            value={data.last_name}
                            onChange={handleChange}
                        />
                    </div>
                    <span className="register__error">{errors.last_name && errors.last_name}</span>
                    <div className="register__input-container">
                        <label className="register__label">О себе</label>
                        <textarea
                            type="text"
                            className="register__input register__textarea"
                            name="bio"
                            maxLength={450}
                            value={data.bio}
                            onChange={handleChange}
                        />
                    </div>
                    <span className="register__error">{errors.bio && errors.bio}</span>
                    <label className="">Аватар</label>
                    <input type="file" accept="image/*" className="" onChange={handleFileChange} />
                    <button className="register__submit-btn">{buttonText}</button>
                </form>
                <div className="register__already-member">
                    Есть аккаунт?{" "}
                    <Link to={"/login"} className="register__link">
                        Авторизуйтесь
                    </Link>
                </div>
            </div>
        </>
    );
};
