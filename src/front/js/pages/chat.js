import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/chat.css";
import { Navbar } from "../component/navbar";
import { Footer } from "../component/footer";

export const Chat = () => {
    const { store, actions } = useContext(Context);
    const [chats, setChats] = useState([]);
    const [messages, setMessages] = useState([]);
    const [messageInput, setMessageInput] = useState("");
    const [activeChatId, setActiveChatId] = useState(null);
    const [activeChat, setActiveChat] = useState(null); 

    const userId = store.lectorId;

    useEffect(() => {
        actions.getLector();
    }, []);

    useEffect(() => {
        if (userId) {
            console.log("User ID:", userId);
        }
    }, [userId]);

    useEffect(() => {
        fetch(`${process.env.BACKEND_URL}/api/chat`)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                if (Array.isArray(data)) {
                    const filteredChats = data.filter(chat => 
                        chat.id_lector_1 == userId || chat.id_lector_2 == userId
                    );
                    console.log(filteredChats)
                    setChats(filteredChats);
                } else {
                    console.error("Unexpected response format:", data);
                    setChats([]);
                }
            })
            .catch(error => {
                console.error("There was an error fetching the chats!", error);
            });
    }, [userId]);

    useEffect(() => {
        if (activeChatId) {
            fetch(`${process.env.BACKEND_URL}/api/chat/${activeChatId}`)
                .then(response => response.json())
                .then(data => {
                    if (data) {
                        setActiveChat(data);
                        console.log(data);
                    } else {
                        console.error("Unexpected response format:", data);
                        setActiveChat(null);
                    }
                })
                .catch(error => {
                    console.error("There was an error fetching the active chat!", error);
                });
        }
    }, [activeChatId]);

    useEffect(() => {
        if (activeChatId) {
            fetch(`${process.env.BACKEND_URL}/api/message?chat_id=${activeChatId}`)
                .then(response => response.json())
                .then(data => {
                    if (Array.isArray(data)) {
                        setMessages(data);
                    } else {
                        console.error("Unexpected response format:", data);
                        setMessages([]);
                    }
                })
                .catch(error => {
                    console.error("There was an error fetching the messages!", error);
                });
        } else {
            setMessages([]);
        }
    }, [activeChatId]);

    const handleSendMessage = () => {
        if (messageInput.trim() && userId && activeChatId && activeChat) {
            const otherLectorId = activeChat.id_lector_1 === userId ? activeChat.id_lector_2 : activeChat.id_lector_1;
    
            const newMessage = {
                id_lector_1: userId,
                id_lector_2: otherLectorId,
                chat_id: activeChatId,
                origin: userId,
                message: messageInput,
                date: new Date().toLocaleDateString(),
                hour: new Date().toLocaleTimeString(),
            };
    
            fetch(`${process.env.BACKEND_URL}/api/message`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newMessage),
            })
                .then(response => response.json())
                .then(data => {
                    if (data && data.message) {
                       
                        setMessages(prevMessages => [...prevMessages, data.message]);
                        setMessageInput("");
    
                        setChats(prevChats => 
                            prevChats.map(chat => 
                                chat.id === activeChatId ? { ...chat, lastMessage: data.message } : chat
                            )
                        );
                    } else {
                        console.error("Estructura de respuesta inesperada:", data);
                    }
                })
                .catch(error => {
                    console.error("Hubo un error al enviar el mensaje!", error);
                });
        }
    };
    
    const handleSelectChat = (chatId) => {
        setActiveChatId(chatId);
        setMessages([]); 
    
        fetch(`${process.env.BACKEND_URL}/api/message?chat_id=${chatId}`)
            .then(response => response.json())
            .then(data => {
                if (Array.isArray(data)) {
                    setMessages(data); 
                } else {
                    console.error("Unexpected response format:", data);
                    setMessages([]);
                }
            })
            .catch(error => {
                console.error("Hubo un error al obtener los mensajes del chat seleccionado!", error);
            });
    };
    
  
    if (!userId) {
        return <div>Loading chat...</div>;
    }

    return (
        <>
        <Navbar />
        <div className="container">
            <div className="row clearfix">
                <div className="col-lg-12">
                    <div className="card chat-app">
                        <div id="plist" className="people-list">
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"><i className="fa fa-search"></i></span>
                                </div>
                                <input type="text" className="form-control" placeholder="Search..." />
                            </div>
                            <ul className="list-unstyled chat-list mt-2 mb-0">
                                {chats.map(chat => chat?.id && (
                                    <li className="clearfix" key={chat.id} onClick={() => handleSelectChat(chat.id)}>
                                        <img src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="avatar" />
                                        <div className="about">
                                            <div className="name">{chat.id_lector_1}</div>
                                            <div className="status">
                                                <i className="fa fa-circle online"></i> online
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="chat">
                            <div className="chat-header clearfix">
                                <div className="row">
                                    <div className="col-lg-6">
                                        <a onClick={(e) => e.preventDefault()} data-toggle="modal" data-target="#view_info">
                                            <img src="https://bootdey.com/img/Content/avatar/avatar2.png" alt="avatar" />
                                        </a>
                                        <div className="chat-about">
                                            <h6 className="m-b-0">Chat with {activeChat ? activeChat.id_lector_1 : '...'} and {activeChat ? activeChat.id_lector_2 : '...'}</h6>
                                            <small>Last seen: a few minutes ago</small>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="chat-history">
                                <ul className="m-b-0">
                                    {Array.isArray(messages) && messages.map((message, index) => (
                                        <React.Fragment key={index}>
                                            <li className="clearfix">
                                                <div className={`message-data ${message.origin === userId ? 'text-right' : ''}`}>
                                                    {message.origin !== userId && (
                                                        <img />
                                                    )}
                                                    {message.origin !== userId && (
                                                        <span className="message-data-time">{message.hour}, {message.date}</span>
                                                    )}
                                                </div>
                                            </li>

                                            <li className="clearfix">
                                                <div className={`message ${message.origin === userId ? 'my-message float-right' : 'other-message float-left'}`}>
                                                    {message.origin === userId && (
                                                        <span className="message-data-time-right mx-5">{message.hour}, {message.date}</span>
                                                    )}
                                                    {message.message}
                                                </div>
                                            </li>
                                        </React.Fragment>
                                    ))}
                                </ul>
                            </div>



                            <div className="chat-message clearfix">
                                <div className="input-group mb-0">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"><i className="fa fa-send"></i></span>
                                    </div>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter text here..."
                                        value={messageInput}
                                        onChange={(e) => setMessageInput(e.target.value)}
                                    />
                                    <div className="input-group-append">
                                        <button className="btn btn-primary" onClick={handleSendMessage}>Send</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Footer />
        </>
    );
};


