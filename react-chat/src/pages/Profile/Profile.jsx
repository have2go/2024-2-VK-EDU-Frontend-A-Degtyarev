import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { saveProfile, deleteProfile, refreshTokens } from "../../api/api";
import { useCurrentUserStore } from "../../store/store";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PersonIcon from "@mui/icons-material/Person";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import LogoutIcon from "@mui/icons-material/Logout";

import "./Profile.scss";
import { ConfirmationModal } from "../../components/ConfirmationModal";
import { replace } from "lodash";
import { LazyImage } from "../../components/LazyImage";
import { toast } from "react-toastify";

export const Profile = () => {
    const { userData, setUserData, tokens, login, logout } = useCurrentUserStore();

    const inputRefs = useRef([]);
    // const [focusedInputIndex, setFocusedInputIndex] = useState(null);
    const [avatar, setAvatar] = useState(null);
    const [isChanged, setIsChanged] = useState(false);
    const [buttonText, setButtontext] = useState("Сохранить");
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [errors, setErrors] = useState({});
    const [data, setData] = useState({});

    const modalType = "deleteProfile";
    const maxSize = 10 * 1024 * 1024;

    const navigate = useNavigate();

    const handleChange = event => {
        const name = event.target.name;
        const value = event.target.value?.trim();

        const currentErrors = { ...errors, [name]: null };
        const hasErrors = Object.values(currentErrors).some(value => value !== null);

        if (userData[name] !== value && !hasErrors) {
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
            alert("Размер файла не должен превышать 10 МБ.");
            event.target.value = "";
            setAvatar(userData.avatar);
        } else {
            setAvatar(selectedFile);
            setIsChanged(true);
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

        for (let key in userData) {
            if (key !== "avatar" && userData[key] !== data[key]) body.append(key, data[key]);
        }
        if (userData.avatar !== avatar) body.append("avatar", avatar);

        saveProfile(userData.id, tokens.access, body)
            .then(json => {
                setUserData(json);
                setIsChanged(false);
                toast("Сохранено!");
            })
            .catch(err => {
                setIsChanged(false);
                setButtontext("Сохранить");
                if (typeof err === "object") setErrors({ ...err });
            })
            .finally(() => setButtontext("Сохранить"));
    };

    const handleConfirmDeletion = () => {
        deleteProfile(userData.id, tokens.access)
            .then(res => {
                toast("Пользователь удалён");
                handleLogout();
            })
            .catch(err => console.log(err));
    };

    function handleLogout() {
        logout();
        localStorage.removeItem("tokens");
        navigate("/login", { replace: true });
    }

    useEffect(() => {
        if (tokens.access) {
            if (userData) {
                setData({
                    username: userData.username,
                    first_name: userData.first_name,
                    last_name: userData.last_name,
                    bio: userData.bio,
                });
                setAvatar(userData.avatar);
            }
        } else {
            const tokens = localStorage.getItem("tokens");

            if (tokens) {
                const parsedTokens = JSON.parse(tokens);

                refreshTokens(parsedTokens.refresh)
                    .then(json => {
                        return login(json.access, json.refresh);
                    })
                    .then(res => {
                        setData({
                            username: res.username,
                            first_name: res.first_name,
                            last_name: res.last_name,
                            bio: res.bio,
                        });
                        setAvatar(res.avatar);
                    })
                    .catch(() => handleLogout());
            } else {
                handleLogout();
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
                                <LazyImage
                                    src={typeof avatar === "string" ? avatar : URL.createObjectURL(avatar)}
                                    alt={"avatar"}
                                    className={"profile__avatar-img"}
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
                                    accept="image/jpeg, image/png"
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
                        <button
                            className={`profile__save-btn ${isChanged ? "profile__save-btn_active" : ""} ${
                                buttonText === "Сохранено!" ? "profile__save-btn_saved" : ""
                            }`}
                            disabled={!isChanged}
                            onClick={handleSave}
                        >
                            {buttonText}
                        </button>
                        <div className="profile__buttons">
                            <button className="profile__delete-btn" onClick={() => setIsModalOpen(true)}>
                                <DeleteIcon />
                            </button>
                            <button
                                className="profile__logout-btn"
                                onClick={async () => {
                                    await logout();
                                    localStorage.removeItem("tokens");
                                    navigate("/login", { replace: true });
                                }}
                            >
                                <LogoutIcon />
                            </button>
                        </div>
                    </div>
                </div>
                <ConfirmationModal
                    isConfirmationModalOpen={isModalOpen}
                    setIsConfirmationModalOpen={setIsModalOpen}
                    modalType={modalType}
                    handleConfirm={handleConfirmDeletion}
                />
            </div>
        </>
    );
};
