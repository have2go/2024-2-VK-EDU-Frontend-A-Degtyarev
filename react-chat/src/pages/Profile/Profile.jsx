import React, { useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { saveProfile, deleteProfile, refreshTokens } from "../../api/api";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PersonIcon from "@mui/icons-material/Person";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import "./Profile.scss";
import { ConfirmationModal } from "../../components/ConfirmationModal";

export const Profile = () => {
    const inputRefs = useRef([]);
    // const [focusedInputIndex, setFocusedInputIndex] = useState(null);
    const [avatar, setAvatar] = useState(null);
    const [isChanged, setIsChanged] = useState(false);
    const [buttonText, setButtontext] = useState("Сохранить");
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [errors, setErrors] = useState({});
    const [data, setData] = useState({});

    const modalType = "deleteProfile";
    const maxSize = 9 * 1024 * 1024;

    const user = useContext(UserContext);
    const navigate = useNavigate();

    const handleChange = event => {
        const name = event.target.name;
        const value = event.target.value?.trim();

        const currentErrors = { ...errors, [name]: null };
        const hasErrors = Object.values(currentErrors).some(value => value !== null);

        if (user.data[name] !== value && !hasErrors) {
            setIsChanged(true);
        } else {
            setIsChanged(false);
        }

        setErrors(currentErrors);
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
        console.log(selectedFile);
    };

    const handleFocusInput = index => {
        // setFocusedInputIndex(index);
        if (inputRefs.current[index]) {
            inputRefs.current[index].focus();
        }
    };

    // const handleBlur = () => {
    //     setFocusedInputIndex(null);
    // };

    const handleSave = () => {
        setButtontext("Сохранение...");

        const body = new FormData();

        for (let key in user.data) {
            if (key !== "avatar" && user.data[key] !== data[key]) body.append(key, data[key]);
        }
        if (user.data.avatar !== avatar) body.append("avatar", avatar);

        saveProfile(user.data.id, user.tokens.access, body)
            .then(json => {
                user.setData(json);
                setIsChanged(false);
                setButtontext("Сохранено!");
            })
            .catch(err => {
                setIsChanged(false);
                setButtontext("Сохранить");
                if (typeof err === "object") setErrors({ ...err });
            });

        setTimeout(() => {
            setButtontext("Сохранить");
        }, 2000);
    };

    const handleConfirmDeletion = () => {
        deleteProfile(user.data.id, user.tokens.access)
            .then(res => navigate(`/login`))
            .catch(err => console.log(err));
    };

    useEffect(() => {
        if (user.tokens.access) {
            if (user.data) {
                setData({
                    username: user.data.username,
                    first_name: user.data.first_name,
                    last_name: user.data.last_name,
                    bio: user.data.bio,
                });
                setAvatar(user.data.avatar);
            }
        } else {
            if (localStorage.getItem("tokens")) {
                const tokens = JSON.parse(localStorage.getItem("tokens"));

                refreshTokens(tokens.refresh)
                    .then(json => {
                        user.login(json.access, json.refresh).then(res => {
                            setData({
                                username: res.username,
                                first_name: res.first_name,
                                last_name: res.last_name,
                                bio: res.bio,
                            });
                            setAvatar(res.avatar);
                        });
                    })
                    .catch(err => console.log(err));
            } else {
                navigate("/login");
            }
        }
    }, []);

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
                            {avatar ? (
                                <img
                                    src={user.data.avatar === avatar ? avatar : URL.createObjectURL(avatar)}
                                    alt="avatar"
                                    className="profile__avatar-img"
                                />
                            ) : (
                                <span className="icon">
                                    <PersonIcon sx={{ fontSize: 38 }} />
                                </span>
                            )}
                            <div className="profile__avatar-edit">
                                <input
                                    id="avatarInput"
                                    type="file"
                                    accept="image/*"
                                    className="profile__avatar-input"
                                    onChange={handleFileChange}
                                />
                                <label htmlFor="avatarInput" className="profile__avatar-btn">
                                    <EditIcon sx={{ fontSize: 28 }} />
                                </label>
                            </div>
                        </div>
                        <div className={`profile__input-group`} onClick={() => handleFocusInput(0)}>
                            <label className="profile__label">Имя</label>
                            <input
                                type="text"
                                className="profile__input"
                                name="first_name"
                                ref={el => (inputRefs.current[0] = el)}
                                value={data.first_name}
                                onChange={handleChange}
                                // onBlur={handleBlur}
                            />
                        </div>
                        {errors.first_name && <span className="register__error">{errors.first_name}</span>}
                        <div className={`profile__input-group`} onClick={() => handleFocusInput(1)}>
                            <label className="profile__label">Фамилия</label>
                            <input
                                type="text"
                                className="profile__input"
                                name="last_name"
                                ref={el => (inputRefs.current[1] = el)}
                                value={data.last_name}
                                onChange={handleChange}
                                // onBlur={handleBlur}
                            />
                        </div>
                        {errors.last_name && <span className="register__error">{errors.last_name}</span>}
                        <div className={`profile__input-group`} onClick={() => handleFocusInput(2)}>
                            <label className="profile__label">Имя пользователя</label>
                            <input
                                type="text"
                                className="profile__input"
                                name="username"
                                ref={el => (inputRefs.current[2] = el)}
                                value={data.username}
                                onChange={handleChange}
                                // onBlur={handleBlur}
                            />
                        </div>
                        {errors.username && <span className="register__error">{errors.username}</span>}
                        <div
                            className={`profile__input-group profile__input-group_textarea`}
                            // onClick={() => handleFocusInput(3)}
                        >
                            <label className="profile__label">О себе</label>
                            <textarea
                                type="text"
                                className="profile__input profile__textarea"
                                name="bio"
                                maxLength={450}
                                ref={el => (inputRefs.current[3] = el)}
                                value={data.bio}
                                onChange={handleChange}
                                // onBlur={handleBlur}
                            />
                        </div>
                        {errors.bio && <span className="register__error">{errors.bio}</span>}
                        <div className="profile__buttons">
                            <button
                                className={`profile__save-btn ${isChanged ? "profile__save-btn_active" : ""} ${
                                    buttonText === "Сохранено!" ? "profile__save-btn_saved" : ""
                                }`}
                                disabled={!isChanged}
                                onClick={handleSave}
                            >
                                {buttonText}
                            </button>
                            <button className="profile__delete-btn" onClick={() => setIsModalOpen(true)}>
                                <DeleteIcon color="error" />
                            </button>
                        </div>
                    </div>
                </div>
                <ConfirmationModal
                    isModalOpen={isModalOpen}
                    setIsModalOpen={setIsModalOpen}
                    modalType={modalType}
                    handleConfirm={handleConfirmDeletion}
                />
            </div>
        </>
    );
};
