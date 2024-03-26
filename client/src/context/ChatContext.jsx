/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import { baseUrl, postRequest, getRequest } from "../utils/services";

export const ChatContext = createContext();

export const ChatContextProvider = ({ children, user }) => {
	const [userChats, setUserChats] = useState(null);
	const [isUserChatsLoading, setIsUserChatsLoading] = useState(false);
	const [userChatsError, setUserChatsError] = useState(null);

	// console.log(userChats);

	useEffect(() => {
		const getUserCharts = async () => {
			setIsUserChatsLoading(true);
			setUserChatsError(null);

			if (user?._id) {
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

	return (
		<ChatContext.Provider
			value={{ userChats, isUserChatsLoading, userChatsError }}>
			{children}
		</ChatContext.Provider>
	);
};
