import React, { useEffect, useRef, useState, useContext, useCallback } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { UserContext } from "../../context/UserContext";
import { HeaderChat } from "../../components/HeaderChat";
import { Helmet } from "react-helmet-async";
import {
    sendMessage,
    sendVoice,
    getMessages,
    sendGeo,
    sendImages,
    getChatInfo,
    connectCentrifuge,
    subscribeCentrifuge,
} from "../../api/api";
import SendIcon from "@mui/icons-material/Send";
import AttachmentIcon from "@mui/icons-material/Attachment";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import MicIcon from "@mui/icons-material/Mic";
import DeleteIcon from "@mui/icons-material/Delete";
import "./Chat.scss";
import { useNavigate, useParams } from "react-router-dom";
import { Centrifuge } from "centrifuge";
import { Message } from "../../components/Message";

export const Chat = () => {
    const { theme } = useContext(ThemeContext);
    const { id } = useParams();

    const user = useContext(UserContext);
    const navigate = useNavigate();

    const [chatInfo, setChatInfo] = useState(null);
    const [messages, setMessages] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(false);
    const [isEmpty, setIsEmpty] = useState(false);
    const [selectedMessage, setSelectedMessage] = useState(null);
    const [inputValue, setInputValue] = useState("");
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isHeaderModalOpen, setIsHeaderModalOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDragging, setIsDragging] = useState(false);

    const [isRecording, setIsRecording] = useState(false);
    const [audioStream, setAudioStream] = useState(null);
    const [mediaRecorder, setMediaRecorder] = useState(null);
    const [audioBlob, setAudioBlob] = useState(null);
    const [recordingTime, setRecordingTime] = useState(0);
    const timerRef = useRef(null);

    const chatEndRef = useRef(null);
    const chatStartRef = useRef(null);
    const containerRef = useRef(null);
    const observer = useRef();
    const inputRef = useRef();
    const dropdownRef = useRef(null);
    const fileInputRef = useRef();

    const maxSize = 10 * 1024 * 1024;

    const handleSending = e => {
        e.preventDefault();
        handleSendMessage();
    };

    const handleKeyDown = e => {
        if (e.key === "Enter") {
            e.preventDefault();
            handleSending(e);
        }
    };

    const scrollToBottom = () => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const handleDragEnter = e => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    };

    const handleDragLeave = e => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    };

    const handleDrop = e => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
        fileInputRef.current.files = e.dataTransfer.files;
        handleFileUpload();
    };

    const handleDragOver = e => {
        e.preventDefault();
    };

    const handleToggleRecording = event => {
        event.preventDefault();
        if (isRecording) {
            stopRecording();
        } else {
            startRecording();
        }
    };

    const startRecording = async () => {
        if (!audioStream) {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                setAudioStream(stream);
                const recorder = new MediaRecorder(stream);
                setMediaRecorder(recorder);
                recorder.ondataavailable = event => {
                    if (event.data.size > 0) {
                        setAudioBlob(new Blob([event.data], { type: "audio/wav" }));
                    }
                };
                recorder.onstop = () => {
                    stream.getTracks().forEach(track => track.stop());
                    setAudioStream(null);
                };

                recorder.start();
                setIsRecording(true);
                setRecordingTime(0);
                timerRef.current = setInterval(() => {
                    setRecordingTime(prevTime => {
                        return prevTime + 1;
                    });
                }, 1000);
            } catch (error) {
                console.error(error);
                return;
            }
        }
    };

    const stopRecording = () => {
        if (mediaRecorder) {
            mediaRecorder.stop();
            setIsRecording(false);
            if (audioStream) {
                audioStream.getTracks().forEach(track => track.stop());
                setAudioStream(null);
            }
        }
        if (timerRef.current) {
            clearInterval(timerRef.current);
        }
    };

    const formatTime = seconds => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;

        return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
    };

    const handleSendVoice = async () => {
        if (!audioBlob) {
            console.error("Нет записи для отправки");
            return;
        }

        const formData = new FormData();
        formData.append("chat", id);
        formData.append("voice", new File([audioBlob], "voiceMsg.wav", { type: audioBlob.type }));

        sendVoice(user.tokens.access, formData).then(res => {
            setAudioBlob(null);
            setRecordingTime(0);
        });
    };

    const handleSendMessage = async () => {
        if (inputValue.trim()) {
            sendMessage(id, user.tokens.access, inputValue).then(res => {
                setInputValue("");
                inputRef.current.focus();
                setTimeout(() => {
                    scrollToBottom();
                }, 50);
            });
        }
    };

    const fetchMessages = async pageNumber => {
        getMessages(id, user.tokens.access, pageNumber).then(json => {
            setMessages(prevMessages => (pageNumber === 1 ? json.results : [...prevMessages, ...json.results]));
            if (pageNumber === 1) {
                setTimeout(() => {
                    scrollToBottom();
                }, 100);
                setTimeout(() => {
                    setHasMore(json?.next !== null);
                }, 500);
            } else {
                setHasMore(json.next !== null);
            }
        });
    };

    const handleLocationShare = async () => {
        if (!navigator.geolocation) {
            alert("Geolocation не поддерживается вашим браузером.");
            return;
        }

        navigator.geolocation.getCurrentPosition(
            async position => {
                const { latitude, longitude } = position.coords;
                const locationUrl = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;

                sendGeo(id, user.tokens.access, locationUrl).then(json => {
                    setIsMenuOpen(false);
                    setTimeout(() => {
                        scrollToBottom();
                    }, 50);
                });
            },
            error => {
                alert("Не удалось получить местоположение.");
            }
        );
    };

    const handleFileUpload = () => {
        setIsMenuOpen(false);
        setIsModalOpen(true);
    };

    const handleFileSending = async () => {
        const filesArr = Array.from(fileInputRef.current.files);

        const totalSize = filesArr.reduce((acc, file) => acc + file.size, 0);
        if (totalSize > maxSize) {
            setIsModalOpen(false);
            alert("Размер файла не должен превышать 10 МБ.");
            setTimeout(() => {
                fileInputRef.current.value = "";
            }, 250);
            return;
        }

        if (filesArr.length > 5) {
            alert("Вы не можете загрузить больше 5 файлов.");
            setTimeout(() => {
                fileInputRef.current.value = "";
            }, 250);
            return;
        }

        if (!filesArr.length) return;

        const formData = new FormData();
        formData.append("chat", id);

        filesArr.forEach(file => {
            formData.append("files", file);
        });

        sendImages(user.tokens.access, formData).then(res => {
            setTimeout(() => {
                setIsModalOpen(false);
                scrollToBottom();
            }, 500);
        });
    };

    const handlePhotoButtonClick = () => {
        fileInputRef.current.click();
    };

    useEffect(() => {
        if (!user.tokens.access) {
            navigate("/");
        } else {
            inputRef.current.focus();
            getChatInfo(id, user.tokens.access).then(json => setChatInfo(json));

            const centrifuge = new Centrifuge("wss://vkedu-fullstack-div2.ru/connection/websocket/", {
                getToken: ctx => connectCentrifuge(ctx, user.tokens.access).then(data => data.token),
            });

            const subscription = centrifuge.newSubscription(user.data.id, {
                getToken: ctx => subscribeCentrifuge(ctx, user.tokens.access).then(data => data.token),
            });

            subscription.on("publication", ctx => {
                const { event, message } = ctx.data;

                if (event === "create") {
                    setMessages(prevMessages => [message, ...prevMessages]);
                    scrollToBottom();
                } else if (event === "update") {
                    setMessages(prevMessages => prevMessages.map(msg => (msg.id === message.id ? message : msg)));
                } else if (event === "delete") {
                    setMessages(prevMessages => prevMessages.filter(msg => msg.id !== message.id));
                }
            });

            subscription.subscribe();
            centrifuge.connect();

            return () => {
                subscription.unsubscribe();
                centrifuge.disconnect();
            };
        }
    }, []);

    useEffect(() => {
        fetchMessages(page);
    }, [page]);

    useEffect(() => {
        const observerCallback = entries => {
            if (entries[0].isIntersecting && hasMore) {
                setPage(prevPage => prevPage + 1);
            }
        };
        observer.current = new IntersectionObserver(observerCallback);
        if (chatStartRef.current) {
            observer.current.observe(chatStartRef.current);
        }
        return () => observer.current.disconnect();
    }, [hasMore]);

    useEffect(() => {
        if (messages.length === 0) {
            setIsEmpty(true);
        } else {
            setIsEmpty(false);
        }
    }, [messages]);

    useEffect(() => {
        const handleClickOutside = event => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target) &&
                !event.target.closest(".form__send-btn_attachments")
            ) {
                setIsMenuOpen(false);
            }
        };

        if (isMenuOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isMenuOpen]);

    return (
        <>
            <Helmet>
                <title>{chatInfo?.title}</title>
            </Helmet>
            <HeaderChat
                chat={chatInfo}
                selectedMessage={selectedMessage}
                setSelectedMessage={setSelectedMessage}
                handleFileUpload={handleFileUpload}
                isHeaderModalOpen={isHeaderModalOpen}
                setIsHeaderModalOpen={setIsHeaderModalOpen}
            />
            <form className={`form ${theme} ${isHeaderModalOpen ? "form_z-0" : ""}`} action="/">
                <div
                    className={`form__modal ${isModalOpen ? "form__modal_active" : ""}`}
                    onClick={() => {
                        setIsModalOpen(false);
                        setTimeout(() => {
                            fileInputRef.current.value = "";
                        }, 250);
                    }}
                >
                    <div className="form__modal-content" onClick={e => e.stopPropagation()}>
                        {/* {fileInputRef.current?.files &&
                            fileInputRef.current?.files.length > 1 &&
                            Array.from(fileInputRef.current?.files).map((file, i) => {
                                return (
                                    <p key={i} className="form__modal-text">
                                        {file.name}
                                    </p>
                                );
                            })} */}
                        {fileInputRef.current?.files && fileInputRef.current?.files.length > 0 && (
                            <div
                                className={`form__modal-grid ${
                                    fileInputRef.current?.files.length >= 5
                                        ? `form__modal-grid-5`
                                        : `form__modal-grid-${fileInputRef.current?.files.length}`
                                }`}
                            >
                                {Array.from(fileInputRef.current?.files)
                                    .slice(0, 6)
                                    .map((file, i) => {
                                        return (
                                            <img
                                                key={i}
                                                className="form__modal-img"
                                                src={URL.createObjectURL(file)}
                                                draggable={false}
                                            />
                                        );
                                    })}
                            </div>
                        )}
                        <div className="form__modal-buttons">
                            <button
                                type="button"
                                className="form__modal-button form__modal-button_cancel"
                                onClick={() => {
                                    setIsModalOpen(false);
                                    setTimeout(() => {
                                        fileInputRef.current.value = "";
                                    }, 250);
                                }}
                            >
                                Отмена
                            </button>
                            <button
                                type="button"
                                className="form__modal-button form__modal-button_confirm"
                                onClick={handleFileSending}
                            >
                                Отправить
                            </button>
                        </div>
                    </div>
                </div>
                <div
                    className={`form__dragging ${isDragging ? "form__dragging_active" : ""}`}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                ></div>
                <div className="form__input-container">
                    <input
                        className="form__input"
                        placeholder={isRecording ? "Идёт запись..." : "Введите сообщение"}
                        type="text"
                        autoComplete="off"
                        value={inputValue}
                        onChange={e => setInputValue(e.target.value)}
                        ref={inputRef}
                        disabled={isRecording || audioBlob}
                        onKeyDown={handleKeyDown}
                    />
                    {audioBlob && (
                        <audio controls className="form__audio">
                            <source className="form__audio-src" src={URL.createObjectURL(audioBlob)} type="audio/wav" />
                        </audio>
                    )}
                    {inputValue.trim() ? (
                        <button className="form__send-btn icon" onClick={handleSending}>
                            <SendIcon />
                        </button>
                    ) : (
                        <>
                            {isRecording && <p className="form__timer">{formatTime(recordingTime)}</p>}
                            {!isRecording && !audioBlob && (
                                <button
                                    type="button"
                                    className="form__send-btn form__send-btn_attachments icon"
                                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                                >
                                    <AttachmentIcon />
                                </button>
                            )}

                            {!isRecording && audioBlob && (
                                <button
                                    type="button"
                                    className="form__send-btn form__send-btn_delete icon"
                                    onClick={() => {
                                        setAudioBlob(null);
                                        setRecordingTime(0);
                                    }}
                                >
                                    <DeleteIcon />
                                </button>
                            )}
                            <button
                                type="button"
                                className={`form__send-btn form__send-btn_voice icon ${
                                    isRecording ? "form__send-btn_voice_recording" : ""
                                }`}
                                onClick={!isRecording && audioBlob ? handleSendVoice : handleToggleRecording}
                            >
                                {!isRecording && audioBlob ? (
                                    <SendIcon />
                                ) : (
                                    <MicIcon className={`${isRecording ? "form__mic_recording" : ""}`} />
                                )}
                            </button>
                            <div>{isRecording && <div></div>}</div>
                        </>
                    )}
                    <div
                        ref={dropdownRef}
                        className={`form__dropdown form__dropdown ${isMenuOpen ? "form__dropdown_active" : ""}`}
                    >
                        <button type="button" className="form__dropdown-element" onClick={handleLocationShare}>
                            <LocationOnIcon className="form__dropdown-icon" />
                            Местоположение
                        </button>
                        <button type="button" className="form__dropdown-element" onClick={handlePhotoButtonClick}>
                            <PhotoCameraIcon className="form__dropdown-icon" />
                            Фото
                            <input
                                type="file"
                                accept="image/*"
                                multiple
                                ref={fileInputRef}
                                style={{ display: "none" }}
                                onChange={handleFileUpload}
                            />
                        </button>
                    </div>
                </div>
                <div className="form__bottom-spacer"></div>
            </form>
            <div
                className="messages"
                ref={containerRef}
                // onDragOver={handleDragOver}

                onDragEnter={handleDragEnter}
            >
                <div ref={chatEndRef} />
                {messages?.map(msg => {
                    return (
                        <Message
                            key={msg.id}
                            user={user}
                            msg={msg}
                            selectedMessage={selectedMessage}
                            setSelectedMessage={setSelectedMessage}
                        />
                    );
                })}
                <div ref={chatStartRef} />
            </div>
            <div className="bg"></div>
            {isEmpty && <div className="empty-chat">Нет сообщений</div>}
        </>
    );
};
