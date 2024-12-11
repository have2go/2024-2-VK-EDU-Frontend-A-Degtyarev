import { useEffect, useState, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../../context/ThemeContext";
import CloseIcon from "@mui/icons-material/Close";
import PersonIcon from "@mui/icons-material/Person";
import "./NewChatModal.scss";
import { useUsersStore, useCurrentUserStore } from "../../store/store";
import { toast } from "react-toastify";
import { LazyImage } from "../LazyImage";
import cn from "classnames";
import { BeatLoader } from "react-spinners";
// import { debounce } from "lodash";

export const NewChatModal = ({ isModalOpen, handleToggleModal }) => {
    const { theme } = useContext(ThemeContext);

    const { userData, tokens } = useCurrentUserStore();
    const { users, fetchUsers } = useUsersStore();

    const [inputValue, setInputValue] = useState("");
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [selectedUser, setSelectedUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const inputRef = useRef(null);
    const lastElementRef = useRef(null);
    const dropdownRef = useRef(null);
    const observer = useRef();

    const classes = {
        newchat: cn("newchat", theme, { newchat_active: isModalOpen }),
        newchatDropdownItem: isSelected =>
            cn("newchat__dropdown-item", { "newchat__dropdown-item_selected": isSelected }),
        newchatSubmitBtn: cn("newchat__submit-btn", { "newchat__submit-btn_disabled": !selectedUser }),
    };

    // const fetchUsers = async (searchTerm = "", pageNumber = 1) => {
    //     const response = await fetch(
    //         `https://vkedu-fullstack-div2.ru/api/users/?search=${searchTerm}&page=${pageNumber}`,
    //         {
    //             headers: {
    //                 Authorization: `Bearer ${tokens.access}`,
    //                 "Content-Type": "application/json",
    //             },
    //         }
    //     );
    //     if (response.ok) {
    //         const data = await response.json();
    //         const arrToRender = data.results.filter(el => {
    //             return el.id !== userData.id;
    //         });
    //         setUsers(prevUsers => (pageNumber === 1 ? arrToRender : [...prevUsers, ...arrToRender]));
    //         setHasMore(data.next !== null);
    //     }
    // };

    const submitCreation = e => {
        e.preventDefault();
        setIsLoading(true);
        fetch(`https://vkedu-fullstack-div2.ru/api/chats/`, {
            method: "POST",
            body: JSON.stringify({
                members: [selectedUser.id],
                is_private: true,
                title: "test",
            }),
            headers: {
                Authorization: `Bearer ${tokens.access}`,
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
                setIsLoading(false);
                res.json().then(json => {
                    Object.keys(json).forEach(key => {
                        toast(json?.[key]);
                    });
                });
            });
    };

    const handleNameChange = e => {
        setInputValue(e?.target?.value);
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

    const loadUsers = async () => {
        if (tokens.access) {
            const result = await fetchUsers(inputValue, page, tokens.access, userData.id);
            setHasMore(result.hasMore);
        }
    };

    useEffect(() => {
        if (isModalOpen) {
            loadUsers();
        }
    }, [isModalOpen, inputValue, page]);

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
        <div className={classes.newchat} onClick={handleCloseModal} inert="true">
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
                            className={classes.newchatDropdownItem(selectedUser?.id === user.id)}
                            onClick={() => handleUserSelect(user)}
                        >
                            {user.avatar ? (
                                <LazyImage className={"newchat__dropdown-img"} src={user.avatar} alt={"avatar"} />
                            ) : (
                                <span className="icon newchat__avatar-icon">
                                    <PersonIcon sx={{ fontSize: 28 }} />
                                </span>
                            )}
                            <div className="newchat__user-info">
                                <span className="newchat__fullname">{user.first_name + " " + user.last_name}</span>
                                <span className="newchat__username">{"@" + user.username}</span>
                            </div>
                        </div>
                    ))}
                    <div ref={lastElementRef} className="newchat__loading-indicator">
                        {hasMore ? "Загрузка..." : "Больше пользователей нет"}
                    </div>
                </div>
                <button className={classes.newchatSubmitBtn} type="submit" disabled={!selectedUser}>
                    {isLoading ? <BeatLoader cssOverride={{ margin: "5px auto 0" }} size={10} /> : "Создать чат"}
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
