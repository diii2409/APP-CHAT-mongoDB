/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/rules-of-hooks */
import { Stack } from "react-bootstrap";
import { useFetchRecipientUser } from "../../hooks/useFetchRecipient";
import avatar from "../../assets/avtDefault.svg";
import { useContext } from "react";
import { ChatContext } from "../../context/ChatContext";

const UserChat = ({ chat, user }) => {
	const { recipientUser } = useFetchRecipientUser(chat, user);
	const { onlineUsers } = useContext(ChatContext);

	const isOnline = onlineUsers.some(
		(user) => user.userId === recipientUser?._id,
	) && <span className='user-online'></span>;

	return (
		<Stack
			direction='horizontal'
			gap={3}
			className='user-card align-items-center p-2 justify-content-between'
			role='button'>
			<div className='d-flex '>
				<div className='me-2'>
					<img src={avatar} height={35} style={{ borderRadius: "50%" }} />
				</div>
				<div className='text-content'>
					<div className='name'>{recipientUser?.name} </div>
					<div
						className='text'
						style={{
							whiteSpace: "nowrap",
							overflow: "hidden",
							textOverflow: "ellipsis",
						}}>
						Text Messages
					</div>
				</div>
			</div>
			<div className='d-flex flex-column align-items-end'>
				<div className='date'>24/09/2003</div>
				<div className='this-user-notifications'>2</div>
				{/* <span className='user-online'></span> */}
				{isOnline}
			</div>
		</Stack>
	);
};

export default UserChat;
