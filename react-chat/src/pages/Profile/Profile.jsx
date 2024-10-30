import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PersonIcon from "@mui/icons-material/Person";

import "./Profile.scss";

export const Profile = () => {
    const CURRENT_USER = "currentUser";
    const inputRefs = useRef([]);
    const [focusedInputIndex, setFocusedInputIndex] = useState(null);
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [bio, setBio] = useState("");
    const [isChanged, setIsChanged] = useState(false);

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
                name: name,
                username: username,
                bio: bio,
            })
        );

        setIsChanged(false);
    };

    useEffect(() => {
        const currentUser = JSON.parse(localStorage.getItem(CURRENT_USER));
        if (currentUser) {
            setName(currentUser.name);
            setUsername(currentUser.username);
            setBio(currentUser.bio);
        }
    }, []);

    useEffect(() => {
        const currentUser = JSON.parse(localStorage.getItem(CURRENT_USER));
        if (currentUser) {
            if (currentUser.name !== name || currentUser.username !== username || currentUser.bio !== bio) {
                setIsChanged(true);
            } else {
                setIsChanged(false);
            }
        } else {
            if ("" !== name || "" !== username || "" !== bio) {
                setIsChanged(true);
            } else {
                setIsChanged(false);
            }
        }
    }, [name, username, bio]);

    return (
        <>
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
                        <div
                            className={`profile__input-group ${
                                focusedInputIndex === 0 ? "profile__input-group_focused" : ""
                            }`}
                            onClick={() => handleFocusInput(0)}
                        >
                            <label className="profile__label">Имя</label>
                            <input
                                type="text"
                                className="profile__input"
                                ref={el => (inputRefs.current[0] = el)}
                                value={name}
                                onChange={e => setName(e.target.value)}
                                onBlur={handleBlur}
                            />
                        </div>
                        <div
                            className={`profile__input-group ${
                                focusedInputIndex === 1 ? "profile__input-group_focused" : ""
                            }`}
                            onClick={() => handleFocusInput(1)}
                        >
                            <label className="profile__label">Имя пользователя</label>
                            <input
                                type="text"
                                className="profile__input"
                                ref={el => (inputRefs.current[1] = el)}
                                value={username}
                                onChange={e => setUsername(e.target.value)}
                                onBlur={handleBlur}
                            />
                        </div>
                        <div
                            className={`profile__input-group ${
                                focusedInputIndex === 2 ? "profile__input-group_focused" : ""
                            }`}
                            onClick={() => handleFocusInput(2)}
                        >
                            <label className="profile__label">О себе</label>
                            <textarea
                                type="text"
                                className="profile__input profile__textarea"
                                ref={el => (inputRefs.current[2] = el)}
                                value={bio}
                                onChange={e => setBio(e.target.value)}
                                onBlur={handleBlur}
                            />
                        </div>
                        <button
                            className={`profile__save-btn ${isChanged ? "profile__save-btn_active" : ""}`}
                            // disabled={!isChanged}
                            onClick={handleSave}
                        >
                            Сохранить
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};
