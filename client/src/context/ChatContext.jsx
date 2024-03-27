/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { createContext, useCallback, useEffect, useState } from "react";
import { baseUrl, postRequest, getRequest } from "../utils/services";

export const ChatContext = createContext();

export const ChatContextProvider = ({ children, user }) => {
	const [userChats, setUserChats] = useState(null);
	const [isUserChatsLoading, setIsUserChatsLoading] = useState(false);
	const [userChatsError, setUserChatsError] = useState(null);

	const [potentialChats, setPotentialChats] = useState([]);

	const [currentChat, setCurrentChat] = useState(null);

	const [messages, setMessages] = useState(null);
	const [isMessagesLoading, setIsMessagesLoading] = useState(false);
	const [messagesError, setMessagesError] = useState(null);

	const [sendTextMessgeError, setSendTextMessgeError] = useState(null);
	const [newMessage, setNewMessage] = useState(null);

	useEffect(() => {
		const getUser = async () => {
			const response = await getRequest(`${baseUrl}/users`);

			if (response.error)
				return console.log("\nError fetching users", response);

			const pChats = response.filter((u) => {
				let isChatCreated = false;

				if (user?._id === u._id) return false;

				if (userChats) {
					isChatCreated = userChats?.some((chat) => {
						return chat.members[0] === u._id || chat.members[1] === u._id;
					});
				}

				return !isChatCreated;
			});

			setPotentialChats(pChats);
		};

		getUser();
	}, [userChats]);

	const creatChat = useCallback(async (firstId, secondId) => {
		const response = await postRequest(
			`${baseUrl}/chats`,
			JSON.stringify({ firstId, secondId }),
		);
		if (response.error) return console.log("Error creating chat", response);

		setUserChats((prev) => [...prev, response]);
	}, []);

	useEffect(() => {
		const getUserCharts = async () => {
			if (user?._id) {
				setIsUserChatsLoading(true);
				setUserChatsError(null);

				const response = await getRequest(`${baseUrl}/chats/${user?._id}`);

				setIsUserChatsLoading(false);

				if (response.error) {
					return setUserChatsError(response);
				}

				setUserChats(response);
			}
		};

		getUserCharts();
	}, [user]);

	useEffect(() => {
		const getMessages = async () => {
			setIsMessagesLoading(true);
			setMessagesError(null);

			const response = await getRequest(
				`${baseUrl}/messages/${currentChat?._id}`,
			);
			console.log(`${baseUrl}/messages/${currentChat?._id}`);

			setIsMessagesLoading(false);

			if (response.error) {
				return setMessagesError(response);
			}

			setMessages(response);
		};

		getMessages();
	}, [currentChat]);

	const sendTextMessage = useCallback(
		async (textMessage, sender, currentChatId, setTextMessage) => {
			setSendTextMessgeError(null);

			const response = await postRequest(
				`${baseUrl}/messages/`,
				JSON.stringify({
					chatId: currentChatId,
					senderId: sender._id,
					text: textMessage,
				}),
			);

			if (response.error) {
				return setSendTextMessgeError(response);
			}

			setNewMessage(response);
			setMessages((prevMessages) => [...prevMessages, response]);
			setTextMessage("");
		},
		[],
	);

	const updateCurrentChat = useCallback((chat) => {
		setCurrentChat(chat);
	});

	return (
		<ChatContext.Provider
			value={{
				userChats,
				isUserChatsLoading,
				userChatsError,
				potentialChats,
				creatChat,
				updateCurrentChat,
				messages,
				currentChat,
				isMessagesLoading,
				messagesError,
				sendTextMessage,
			}}>
			{children}
		</ChatContext.Provider>
	);
};
