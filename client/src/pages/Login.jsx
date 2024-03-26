import { Alert, Button, Form, Row, Col, Stack } from "react-bootstrap";

import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

const Login = () => {
	const { loginInfo, updateLoginInfo, loginUser, loginError, isLoginLoading } =
		useContext(AuthContext);
	return (
		<>
			<Form onSubmit={loginUser}>
				<Row
					style={{
						height: "100vh",
						justifyContent: "center",
						paddingTop: "10%",
					}}>
					<Col xs='6'>
						<Stack gap='3'>
							<h2 style={{ textAlign: "center" }}>LOGIN</h2>

							<Form.Control
								type='email'
								placeholder='Email'
								onChange={(e) => {
									updateLoginInfo({
										...loginInfo,
										email: e.target.value.trim(),
									});
								}}
							/>
							<Form.Control
								type='password'
								placeholder='password'
								onChange={(e) => {
									updateLoginInfo({ ...loginInfo, password: e.target.value });
								}}
							/>
							<Button variant='primary' type='submit'>
								{isLoginLoading ? "Wating..." : "Register"}
							</Button>

							{loginError?.error && (
								<Alert variant='danger'>
									<p>{loginError.message}</p>
								</Alert>
							)}
						</Stack>
					</Col>
				</Row>
			</Form>
		</>
	);
};

export default Login;
