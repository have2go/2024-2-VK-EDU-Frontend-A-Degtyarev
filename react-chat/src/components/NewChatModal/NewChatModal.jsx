import React, { useEffect, useState, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../../context/ThemeContext";
import { UserContext } from "../../context/UserContext";
import CloseIcon from "@mui/icons-material/Close";
import PersonIcon from "@mui/icons-material/Person";
import "./NewChatModal.scss";

export const NewChatModal = ({ isModalOpen, handleToggleModal, createNewChat }) => {
    const { theme } = useContext(ThemeContext);
    const user = useContext(UserContext);
    const [inputValue, setInputValue] = useState("");
    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [selectedUser, setSelectedUser] = useState(null);

    const navigate = useNavigate();

    const inputRef = useRef(null);
    const lastElementRef = useRef(null);
    const dropdownRef = useRef(null);
    const observer = useRef();

    const fetchUsers = async (searchTerm = "", pageNumber = 1) => {
        const response = await fetch(
            `https://vkedu-fullstack-div2.ru/api/users/?search=${searchTerm}&page=${pageNumber}`,
            {
                headers: {
                    Authorization: `Bearer ${user.tokens.access}`,
                    "Content-Type": "application/json",
                },
            }
        );
        if (response.ok) {
            const data = await response.json();
            const arrToRender = data.results.filter(el => {
                return el.id !== user.data.id;
            });
            setUsers(prevUsers => (pageNumber === 1 ? arrToRender : [...prevUsers, ...arrToRender]));
            setHasMore(data.next !== null);
        }
    };

    const submitCreation = e => {
        e.preventDefault();

        fetch(`https://vkedu-fullstack-div2.ru/api/chats/`, {
            method: "POST",
            body: JSON.stringify({
                members: [selectedUser.id],
                is_private: true,
                title: "test",
            }),
            headers: {
                Authorization: `Bearer ${user.tokens.access}`,
                "Content-Type": "application/json",
            },
        })
            .then(res => {
                console.log(res);
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(res);
            })
            .then(json => {
                handleCloseModal();
                navigate(`/chat/${json.id}`);
            })
            .catch(res => {
                res.json().then(json => {
                    Object.keys(json).forEach(key => alert(json?.[key]?.[0]));
                });
            });
    };

    const handleNameChange = e => {
        setInputValue(e.target.value);
        setSelectedUser(null);
        setPage(1);
        if (dropdownRef.current) {
            dropdownRef.current.scrollTop = 0;
        }
    };

    const handleUserSelect = user => {
        setSelectedUser(prevSelected => (prevSelected?.id === user.id ? null : user));
    };

    const handleCloseModal = () => {
        handleToggleModal();
        setTimeout(() => {
            setPage(1);
            setSelectedUser(null);
            setInputValue("");
            if (dropdownRef.current) {
                dropdownRef.current.scrollTop = 0;
            }
        }, 200);
    };

    useEffect(() => {
        if (isModalOpen && user.tokens.access) {
            fetchUsers();
        }
    }, [isModalOpen, user.tokens.access]);

    useEffect(() => {
        fetchUsers(inputValue, page);
    }, [inputValue, page]);

    useEffect(() => {
        const observerCallback = entries => {
            if (entries[0].isIntersecting && hasMore) {
                setPage(prevPage => prevPage + 1);
            }
        };

        observer.current = new IntersectionObserver(observerCallback);
        if (lastElementRef.current) {
            observer.current.observe(lastElementRef.current);
        }

        return () => observer.current.disconnect();
    }, [hasMore]);

    return (
        <div
            className={`${theme} newchat ${isModalOpen ? "newchat_active" : ""}`}
            onClick={handleCloseModal}
            inert="true"
        >
            <form className="newchat__form" onSubmit={submitCreation} onClick={e => e.stopPropagation()}>
                <input
                    type="text"
                    className="newchat__name"
                    placeholder="Имя собеседника"
                    autoComplete="off"
                    value={inputValue}
                    onChange={handleNameChange}
                    ref={inputRef}
                />
                <div className="newchat__dropdown" ref={dropdownRef}>
                    {users.map((user, i) => (
                        <div
                            key={i}
                            className={`newchat__dropdown-item ${
                                selectedUser?.id === user.id ? "newchat__dropdown-item_selected" : ""
                            }`}
                            onClick={() => handleUserSelect(user)}
                        >
                            {user.avatar ? (
                                <img className="newchat__dropdown-img" src={user.avatar} alt="avatar" />
                            ) : (
                                <span className="icon newchat__avatar-icon">
                                    <PersonIcon sx={{ fontSize: 28 }} />
                                </span>
                            )}

                            <span className="newchat__username">{user.username}</span>
                        </div>
                    ))}
                    <div ref={lastElementRef} className="newchat__loading-indicator">
                        {hasMore ? "Загрузка..." : "Больше пользователей нет"}
                    </div>
                </div>
                <button
                    className={`newchat__submit-btn ${selectedUser ? "" : "newchat__submit-btn_disabled"}`}
                    type="submit"
                    disabled={!selectedUser}
                >
                    Создать чат
                </button>
                <button className="newchat__close-btn" onClick={handleCloseModal} type="button">
                    <span className="icon">
                        <CloseIcon sx={{ fontSize: 32 }} />
                    </span>
                </button>
            </form>
        </div>
    );
};
