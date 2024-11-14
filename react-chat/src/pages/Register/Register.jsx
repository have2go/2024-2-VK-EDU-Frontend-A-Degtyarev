import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";

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

        if (data.username) body.append("username", data.username);
        if (data.password) body.append("password", data.password);
        if (data.first_name) body.append("first_name", data.first_name);
        if (data.last_name) body.append("last_name", data.last_name);
        if (data.bio) body.append("bio", data.bio);
        if (avatar) body.append("avatar", avatar);

        setButtonText("Подождите...");
        await fetch("https://vkedu-fullstack-div2.ru/api/register/", {
            method: "POST",
            body: body,
        })
            .then(res => {
                if (res.ok) {
                    setButtonText("Успех!");
                    console.log(res);
                    setTimeout(() => {
                        navigate(`/login`);
                    }, 1500);

                    return;
                }
                return Promise.reject(res);
            })
            .catch(res => {
                console.log("Error: ", res.status, res.statusText);
                setButtonText("Зарегистрироваться");
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
                <title>Регистрация</title>
            </Helmet>
            <div className="register">
                <h1 className="register__title">Регистрация</h1>
                <form className="register__form" onSubmit={handleRegister}>
                    <label className="">Логин</label>
                    <input
                        type="text"
                        name="username"
                        className=""
                        // required
                        // minLength={1}
                        // maxLength={150}
                        value={data.username}
                        onChange={handleChange}
                    />
                    {errors.username && <span className="register__error">{errors.username}</span>}
                    <label className="">Пароль</label>
                    <input
                        type="password"
                        name="password"
                        className=""
                        // required
                        // minLength={8}
                        // maxLength={150}
                        value={data.password}
                        onChange={handleChange}
                    />
                    {errors.password && <span className="register__error">{errors.password}</span>}
                    <label className="">Имя</label>
                    <input
                        type="text"
                        className=""
                        name="first_name"
                        // required
                        // minLength={1}
                        // maxLength={150}
                        value={data.first_name}
                        onChange={handleChange}
                    />
                    {errors.first_name && <span className="register__error">{errors.first_name}</span>}
                    <label className="">Фамилия</label>
                    <input
                        type="text"
                        className=""
                        name="last_name"
                        // required
                        // minLength={1}
                        // maxLength={150}
                        value={data.last_name}
                        onChange={handleChange}
                    />
                    {errors.last_name && <span className="register__error">{errors.last_name}</span>}
                    <label className="">О себе</label>
                    <textarea
                        type="text"
                        className=""
                        name="bio"
                        maxLength={450}
                        value={data.bio}
                        onChange={handleChange}
                    />
                    {errors.bio && <span className="register__error">{errors.bio}</span>}
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
