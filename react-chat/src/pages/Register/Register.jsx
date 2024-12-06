import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import { ThemeSwitch } from "../../components/ThemeSwitch/ThemeSwitch";
import { register, auth } from "../../api/api";
import { useCurrentUserStore } from "../../store/store";
import { toast } from "react-toastify";
import PersonIcon from "@mui/icons-material/Person";
import EditIcon from "@mui/icons-material/Edit";

import "./Register.scss";

export const Register = () => {
    const { login } = useCurrentUserStore();

    const [avatar, setAvatar] = useState(null);
    const maxSize = 10 * 1024 * 1024;

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
            toast("Размер файла не должен превышать 10 МБ.");
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
                setButtonText("Успех! Заходим...");
                auth(data.username, data.password).then(json => {
                    login(json.access, json.refresh);
                    localStorage.setItem(
                        "tokens",
                        JSON.stringify({
                            access: json.access,
                            refresh: json.refresh,
                        })
                    );
                    navigate("/", { replace: true });
                });
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
                    <div className="register__bio-container">
                        <div className="register__input-container register__input-container_textarea">
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
                        <div className="register__avatar">
                            {avatar ? (
                                <img
                                    src={typeof avatar === "string" ? avatar : URL.createObjectURL(avatar)}
                                    alt="avatar"
                                    className="register__avatar-img"
                                />
                            ) : (
                                <span className="icon">
                                    <PersonIcon sx={{ fontSize: 38 }} />
                                </span>
                            )}
                            <div className="register__avatar-edit">
                                <input
                                    id="avatarInput"
                                    type="file"
                                    accept="image/jpeg, image/png"
                                    className="register__avatar-input"
                                    onChange={handleFileChange}
                                />
                                <label htmlFor="avatarInput" className="register__avatar-btn">
                                    <EditIcon sx={{ fontSize: 28 }} />
                                </label>
                            </div>
                        </div>
                    </div>
                    <span className="register__error">{errors.bio && errors.bio}</span>
                    <button
                        className={`register__submit-btn ${
                            buttonText === "Успех! Заходим..." ? "register__submit-btn_done" : ""
                        }`}
                    >
                        {buttonText}
                    </button>
                </form>
                <div className="register__already-member">
                    <p className="">Есть аккаунт?</p>
                    <Link to={"/login"} className="register__link">
                        Войти
                    </Link>
                </div>
                <div className="register__theme-switch-box">
                    <ThemeSwitch />
                </div>
            </div>
        </>
    );
};
