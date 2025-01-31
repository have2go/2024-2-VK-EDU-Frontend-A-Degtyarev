import { useEffect, useRef, useState, useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { HeaderChat } from "../../components/HeaderChat";
import { Helmet } from "react-helmet-async";
import {
    sendImages,
    sendGeo,
    sendVoice,
    refreshTokens,
    getChatInfo,
    sendMessage,
    getMessages,
} from "../../api/requests";
import SendIcon from "@mui/icons-material/Send";
import AttachmentIcon from "@mui/icons-material/Attachment";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import MicIcon from "@mui/icons-material/Mic";
import DeleteIcon from "@mui/icons-material/Delete";
import ClearIcon from "@mui/icons-material/Clear";
import "./Chat.scss";
import { useNavigate, useParams } from "react-router-dom";
import { Message } from "../../components/Message";
import { useCurrentUserStore, useMessagesStore } from "../../store/store";
import { PuffLoader } from "react-spinners";
import { toast } from "react-toastify";
import { LazyImage } from "../../components/LazyImage";
import cn from "classnames";

export const Chat = () => {
    const { theme } = useContext(ThemeContext);
    const { id } = useParams();

    const { tokens, login, logout } = useCurrentUserStore();
    const { messages, setMessages, setChatId } = useMessagesStore();

    const navigate = useNavigate();

    const [chatInfo, setChatInfo] = useState(null);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(false);
    const [isEmpty, setIsEmpty] = useState(false);
    const [selectedMessage, setSelectedMessage] = useState(null);
    const [inputValue, setInputValue] = useState("");
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [isMessagesLoading, setIsMessagesLoading] = useState(false);
    const [isChatInfoLoading, setIsChatInfoLoading] = useState(false);

    const [isRecording, setIsRecording] = useState(false);
    const [audioStream, setAudioStream] = useState(null);
    const [mediaRecorder, setMediaRecorder] = useState(null);
    const [audioBlob, setAudioBlob] = useState(null);
    const [recordingTime, setRecordingTime] = useState(0);

    const timerRef = useRef(null);
    const chatEndRef = useRef(null);
    const chatStartRef = useRef(null);
    const containerRef = useRef(null);
    const observer = useRef(null);
    const inputRef = useRef(null);
    const dropdownRef = useRef(null);
    const fileInputRef = useRef(null);
    const sendButtonRef = useRef(null);

    const maxSize = 10 * 1024 * 1024;

    const classes = {
        form: cn("form", theme, { "form_z-0": isConfirmationModalOpen }),
        formModal: cn("form__modal", { form__modal_active: isModalOpen }),
        formModalGrid: length => {
            const gridClass = length >= 5 ? "form__modal-grid-5" : `form__modal-grid-${length}`;
            return cn("form__modal-grid", gridClass);
        },
        formDragging: cn("form__dragging ", { form__dragging_active: isDragging }),
        formSendBtn: cn("form__send-btn form__send-btn_voice icon", { "form__send-btn_voice_recording": isRecording }),
        formMicRecording: cn({ form__mic_recording: isRecording }),
        formDropdown: cn("form__dropdown", { form__dropdown_active: isMenuOpen }),
    };

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

        sendVoice(tokens.access, formData).then(() => {
            setAudioBlob(null);
            setRecordingTime(0);
        });
    };

    const handleSendMessage = async () => {
        if (inputValue.trim()) {
            sendMessage(id, tokens.access, inputValue).then(() => {
                setInputValue("");
                inputRef.current.focus();
                setTimeout(() => scrollToBottom(), 50);
            });
        }
    };

    const fetchMessages = async pageNumber => {
        if (pageNumber === 1) setIsMessagesLoading(true);

        const validToken = tokens.access || JSON.parse(localStorage.getItem("tokens")).access;

        getMessages(validToken, { chat: id, page: pageNumber }).then(json => {
            if (setIsMessagesLoading) setIsMessagesLoading(false);
            setMessages(pageNumber === 1 ? json.results : [...messages, ...json.results]);
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
            toast("Определение геолокации не поддерживается вашим браузером.");
            return;
        }

        navigator.geolocation.getCurrentPosition(
            async position => {
                const { latitude, longitude } = position.coords;
                const locationUrl = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;

                sendGeo(tokens.access, id, locationUrl).then(() => {
                    setIsMenuOpen(false);
                    setTimeout(() => {
                        scrollToBottom();
                    }, 50);
                });
            },
            () => {
                toast("Не удалось получить местоположение.");
            }
        );
    };

    const handleFileUpload = () => {
        setUploadedFiles(Array.from(fileInputRef.current.files));
        fileInputRef.current.value = "";
        setIsMenuOpen(false);
        setIsModalOpen(true);
    };

    const handleFileSending = async () => {
        const totalSize = uploadedFiles.reduce((acc, file) => acc + file.size, 0);

        if (totalSize > maxSize) {
            toast("Размер файлов не должен превышать 10 МБ.");
            return;
        }

        if (uploadedFiles.length > 5) {
            toast("Вы не можете загрузить больше 5 файлов.");
            return;
        }

        if (!uploadedFiles.length) return;

        const formData = new FormData();
        formData.append("chat", id);

        uploadedFiles.forEach(file => {
            formData.append("files", file);
        });

        sendImages(tokens.access, formData).then(() => {
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
        const localTokens = localStorage.getItem("tokens");
        if (!tokens.access && localTokens) {
            const parsedTokens = JSON.parse(localTokens);
            refreshTokens(parsedTokens.refresh)
                .then(res => {
                    refreshTokens(res.refresh).then(async res => {
                        await login(res.access, res.refresh);
                        inputRef.current.focus();
                        setIsChatInfoLoading(true);
                        getChatInfo(id, res.access).then(json => {
                            setChatInfo(json);
                            setIsChatInfoLoading(false);
                        });
                        setChatId(id);
                    });
                })
                .catch(() => {
                    logout();
                    localStorage.removeItem("tokens");
                    navigate("/login", { replace: true });
                });
        } else {
            inputRef.current.focus();
            setIsChatInfoLoading(true);
            getChatInfo(id, tokens.access).then(json => {
                setChatInfo(json);
                setIsChatInfoLoading(false);
            });
            setChatId(id);
        }
    }, []);

    useEffect(() => {
        fetchMessages(page);
    }, [page, tokens.access]);

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
                isConfirmationModalOpen={isConfirmationModalOpen}
                setIsConfirmationModalOpen={setIsConfirmationModalOpen}
                isChatInfoLoading={isChatInfoLoading}
            />
            <form className={classes.form} action="/">
                <div
                    className={classes.formModal}
                    onClick={() => {
                        setIsModalOpen(false);
                        setTimeout(() => {
                            fileInputRef.current.value = "";
                        }, 250);
                    }}
                >
                    <div className="form__modal-content" onClick={e => e.stopPropagation()}>
                        {uploadedFiles.length && (
                            <div className={classes.formModalGrid(uploadedFiles.length)}>
                                {uploadedFiles.slice(0, 6).map((file, i) => {
                                    return (
                                        <div key={i} className="form__modal-grid-el">
                                            {uploadedFiles.length > 1 && (
                                                <button
                                                    type="button"
                                                    className="form__modal-delete"
                                                    onClick={() =>
                                                        setUploadedFiles(uploadedFiles.filter(el => el !== file))
                                                    }
                                                >
                                                    <ClearIcon
                                                        className="form__modal-delete-icon"
                                                        sx={{ fontSize: 26 }}
                                                    />
                                                </button>
                                            )}
                                            <LazyImage
                                                className={"form__modal-img"}
                                                src={URL.createObjectURL(file)}
                                                draggable={false}
                                            />
                                        </div>
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
                    className={classes.formDragging}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onDragOver={e => e.preventDefault()}
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
                        <button
                            type="button"
                            className="form__send-btn icon"
                            onClick={handleSending}
                            ref={sendButtonRef}
                        >
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
                                className={classes.formSendBtn}
                                onClick={!isRecording && audioBlob ? handleSendVoice : handleToggleRecording}
                            >
                                {!isRecording && audioBlob ? (
                                    <SendIcon />
                                ) : (
                                    <MicIcon className={classes.formMicRecording} />
                                )}
                            </button>
                        </>
                    )}
                    <div ref={dropdownRef} className={classes.formDropdown}>
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
            <div className="messages" ref={containerRef} onDragEnter={handleDragEnter}>
                <div ref={chatEndRef} />
                {isMessagesLoading ? (
                    <PuffLoader
                        color={theme === "dark" ? "#cfbff5" : "#5b22b4"}
                        cssOverride={{ margin: "auto" }}
                        size={100}
                    />
                ) : (
                    messages?.map(msg => {
                        return (
                            <Message
                                key={msg.id}
                                msg={msg}
                                selectedMessage={selectedMessage}
                                setSelectedMessage={setSelectedMessage}
                            />
                        );
                    })
                )}
                <div ref={chatStartRef} />
            </div>
            <div className="bg"></div>
            {isEmpty && !isMessagesLoading && <div className="empty-chat">Нет сообщений</div>}
        </>
    );
};
