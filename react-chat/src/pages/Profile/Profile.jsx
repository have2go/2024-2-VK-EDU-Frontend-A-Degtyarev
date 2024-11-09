import React, { useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PersonIcon from "@mui/icons-material/Person";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import "./Profile.scss";
import { ConfirmationModal } from "../../components/ConfirmationModal";

export const Profile = () => {
    const inputRefs = useRef([]);
    // const [focusedInputIndex, setFocusedInputIndex] = useState(null);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [bio, setBio] = useState("");
    const [avatar, setAvatar] = useState(null);
    const [isChanged, setIsChanged] = useState(false);
    const [buttonText, setButtontext] = useState("Сохранить");
    const [isModalOpen, setIsModalOpen] = useState(false);

    const modalType = "deleteProfile";
    const maxSize = 9 * 1024 * 1024;

    const user = useContext(UserContext);
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

        if (user.data.first_name !== firstName) body.append("first_name", firstName);
        if (user.data.last_name !== lastName) body.append("last_name", lastName);
        if (user.data.username !== username) body.append("username", username);
        if (user.data.bio !== bio) body.append("bio", bio);
        if (user.data.avatar !== avatar) body.append("avatar", avatar);

        fetch(`https://vkedu-fullstack-div2.ru/api/user/${user.data.id}/`, {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${user.tokens.access}`,
            },
            body: body,
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(res);
            })
            .then(json => {
                console.log(json);
                user.setData(json);
                setIsChanged(false);
                setButtontext("Сохранено!");
            })
            .catch(res => {
                console.log(res);
            });

        setTimeout(() => {
            setButtontext("Сохранить");
        }, 2000);
    };

    const handleConfirmDeletion = () => {
        fetch(`https://vkedu-fullstack-div2.ru/api/user/${user.data.id}/`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${user.tokens.access}`,
                "Content-Type": "application/json",
            },
        })
            .then(res => {
                console.log(res);
                if (res.ok) {
                    navigate(`/login`);
                    return res.json();
                }
                return Promise.reject(res);
            })
            .catch(res => {
                console.log(res);
            });
    };

    useEffect(() => {
        if (user.tokens.access) {
            if (user.data) {
                setFirstName(user.data.first_name);
                setLastName(user.data.last_name);
                setUsername(user.data.username);
                setBio(user.data.bio);
                setAvatar(user.data.avatar);
            }
        } else {
            if (localStorage.getItem("tokens")) {
                const tokens = JSON.parse(localStorage.getItem("tokens"));
                fetch("https://vkedu-fullstack-div2.ru/api/auth/refresh/", {
                    method: "POST",
                    body: JSON.stringify({
                        refresh: tokens.refresh,
                    }),
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
                    .then(response => (response.ok ? response.json() : Promise.reject(response)))
                    .then(json => {
                        user.login(json.access, json.refresh).then(res => {
                            console.log(res);
                            setFirstName(res.first_name);
                            setLastName(res.last_name);
                            setUsername(res.username);
                            setBio(res.bio);
                            setAvatar(res.avatar);
                        });
                    })
                    .catch(console.error);
            } else {
                navigate("/login");
            }
        }
    }, []);

    useEffect(() => {
        if (user.data) {
            if (
                user.data.first_name !== firstName ||
                user.data.last_name !== lastName ||
                user.data.username !== username ||
                user.data.bio !== bio ||
                user.data.avatar !== avatar
            ) {
                setIsChanged(true);
            } else {
                setIsChanged(false);
            }
        }
    }, [firstName, lastName, username, bio, avatar]);

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
                                ref={el => (inputRefs.current[0] = el)}
                                value={firstName}
                                onChange={e => setFirstName(e.target.value)}
                                // onBlur={handleBlur}
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
                                // onBlur={handleBlur}
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
                                // onBlur={handleBlur}
                            />
                        </div>
                        <div
                            className={`profile__input-group profile__input-group_textarea`}
                            // onClick={() => handleFocusInput(3)}
                        >
                            <label className="profile__label">О себе</label>
                            <textarea
                                type="text"
                                className="profile__input profile__textarea"
                                ref={el => (inputRefs.current[3] = el)}
                                value={bio}
                                onChange={e => setBio(e.target.value)}
                                // onBlur={handleBlur}
                            />
                        </div>
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
