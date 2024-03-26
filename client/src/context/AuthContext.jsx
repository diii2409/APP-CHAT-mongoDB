import { createContext, useCallback, useEffect, useState } from "react";
import { baseUrl, postRequest } from "../utils/services";

export const AuthContext = createContext();

// Hãy bật cái comment này khi hoàn thành project
// eslint-disable-next-line react/prop-types

export const AuthContextProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [registerError, setRegisterError] = useState(null);
	const [isRegisterLoading, setIsRegisterLoading] = useState(false);
	const [registerInfo, setRegisterInfo] = useState({
		name: "",
		email: "",
		password: "",
	});

	useEffect(() => {
		const user = localStorage.getItem("user");

		setUser(JSON.parse(user));
	}, []);

	const updateRegisterInfo = useCallback((info) => {
		setRegisterInfo(info);
	}, []);

	const registerUser = useCallback(
		async (e) => {
			e.preventDefault();
			setIsRegisterLoading(true);
			setRegisterError(null);

			const response = await postRequest(
				`${baseUrl}/users/register`,
				JSON.stringify(registerInfo),
			);

			setIsRegisterLoading(false);

			if (response.error) {
				return setRegisterError(response);
			}
			localStorage.setItem("user", JSON.stringify(response));
			setUser(response);
		},
		[registerInfo],
	);

	const logoutUser = useCallback(() => {
		localStorage.removeItem("user");
		setUser(null);
	}, []);

	return (
		<AuthContext.Provider
			value={{
				user,
				registerInfo,
				updateRegisterInfo,
				registerUser,
				registerError,
				isRegisterLoading,
				logoutUser,
			}}>
			{children}
		</AuthContext.Provider>
	);
};
