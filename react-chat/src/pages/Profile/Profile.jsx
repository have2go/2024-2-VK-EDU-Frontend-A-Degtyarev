import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PersonIcon from "@mui/icons-material/Person";

import "./Profile.scss";

export const Profile = () => {
    const CURRENT_USER = "currentUser";
    const inputRefs = useRef([]);
    const [focusedInputIndex, setFocusedInputIndex] = useState(null);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [bio, setBio] = useState("");
    const [isChanged, setIsChanged] = useState(false);
    const [buttonText, setButtontext] = useState("Сохранить");

    const handleFocusInput = index => {
        setFocusedInputIndex(index);
        if (inputRefs.current[index]) {
            inputRefs.current[index].focus();
        }
    };

    const handleBlur = () => {
        setFocusedInputIndex(null);
    };

    const handleSave = () => {
        localStorage.setItem(
            CURRENT_USER,
            JSON.stringify({
                firstName: firstName,
                lastName: lastName,
                username: username,
                bio: bio,
            })
        );

        setIsChanged(false);
        setButtontext("Сохранено!");

        setTimeout(() => {
            setButtontext("Сохранить");
        }, 3000);
    };

    useEffect(() => {
        const currentUser = JSON.parse(localStorage.getItem(CURRENT_USER));
        if (currentUser) {
            setFirstName(currentUser.firstName);
            setLastName(currentUser.lastName);
            setUsername(currentUser.username);
            setBio(currentUser.bio);
        }
    }, []);

    useEffect(() => {
        const currentUser = JSON.parse(localStorage.getItem(CURRENT_USER));
        if (currentUser) {
            if (
                currentUser.firstName !== firstName ||
                currentUser.lastName !== lastName ||
                currentUser.username !== username ||
                currentUser.bio !== bio
            ) {
                setIsChanged(true);
            } else {
                setIsChanged(false);
            }
        } else {
            if ("" !== firstName || "" !== lastName || "" !== username || "" !== bio) {
                setIsChanged(true);
            } else {
                setIsChanged(false);
            }
        }
    }, [firstName, lastName, username, bio]);

    return (
        <>
            <Helmet>
                <title>Профиль</title>
            </Helmet>
            <header className="header header_profile">
                <Link to={"/"} className="header__back-btn">
                    <span className="icon header__back">
                        <ArrowBackIcon sx={{ fontSize: 30 }} />
                    </span>
                </Link>
                <h1 className="header__title">Профиль</h1>
            </header>
            <div className="content profile">
                <div className="profile__content">
                    <div className="profile__container">
                        <div className="profile__avatar">
                            <span className="icon">
                                <PersonIcon sx={{ fontSize: 38 }} />
                            </span>
                        </div>
                        <div className={`profile__input-group`} onClick={() => handleFocusInput(0)}>
                            <label className="profile__label">Имя</label>
                            <input
                                type="text"
                                className="profile__input"
                                ref={el => (inputRefs.current[0] = el)}
                                value={firstName}
                                onChange={e => setFirstName(e.target.value)}
                                onBlur={handleBlur}
                            />
                        </div>
                        <div className={`profile__input-group`} onClick={() => handleFocusInput(1)}>
                            <label className="profile__label">Фамилия</label>
                            <input
                                type="text"
                                className="profile__input"
                                ref={el => (inputRefs.current[1] = el)}
                                value={lastName}
                                onChange={e => setLastName(e.target.value)}
                                onBlur={handleBlur}
                            />
                        </div>
                        <div className={`profile__input-group`} onClick={() => handleFocusInput(2)}>
                            <label className="profile__label">Имя пользователя</label>
                            <input
                                type="text"
                                className="profile__input"
                                ref={el => (inputRefs.current[2] = el)}
                                value={username}
                                onChange={e => setUsername(e.target.value)}
                                onBlur={handleBlur}
                            />
                        </div>
                        <div className={`profile__input-group`} onClick={() => handleFocusInput(3)}>
                            <label className="profile__label">О себе</label>
                            <textarea
                                type="text"
                                className="profile__input profile__textarea"
                                ref={el => (inputRefs.current[3] = el)}
                                value={bio}
                                onChange={e => setBio(e.target.value)}
                                onBlur={handleBlur}
                            />
                        </div>
                        <button
                            className={`profile__save-btn ${isChanged ? "profile__save-btn_active" : ""} ${
                                buttonText === "Сохранено!" ? "profile__save-btn_saved" : ""
                            }`}
                            disabled={!isChanged}
                            onClick={handleSave}
                        >
                            {buttonText}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};
