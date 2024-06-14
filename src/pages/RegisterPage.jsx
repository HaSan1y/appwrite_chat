import { useState } from "react";
import { useAuth } from "../utils/AuthContext";
import { Link } from "react-router-dom";

const RegisterPage = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password1, setPassword1] = useState("");
	const [password2, setPassword2] = useState("");
	const { handleRegister } = useAuth();

	const handleInputChange = (event) => {
		const { name, value } = event.target;

		switch (name) {
			case "name":
				setName(value);
				break;
			case "email":
				setEmail(value);
				break;
			case "password1":
				setPassword1(value);
				break;
			case "password2":
				setPassword2(value);
				break;
			default:
				console.error(`Unknown input field: ${name}`);
			// console.log('CREDS:', credentials)
		}
	};
	const handleSubmit = (event) => {
		event.preventDefault();
		try {
			handleRegister(event, { name, email, password1, password2 });
		} catch (error) {
			console.error("Error registering:", error);
		}
	};
	return (
		<div className="auth--container">
			<div className="form--wrapper">
				<form onSubmit={handleSubmit}>
					<div className="field--wrapper">
						<label>Name:</label>
						<input
							required
							type="text"
							name="name"
							value={name}
							placeholder="Enter your name..."
							onChange={(e) => {
								handleInputChange(e);
							}}
						/>
					</div>

					<div className="field--wrapper">
						<label>Email:</label>
						<input
							required
							type="email"
							name="email"
							placeholder="Enter your email..."
							value={email}
							onChange={(e) => {
								handleInputChange(e);
							}}
						/>
					</div>

					<div className="field--wrapper">
						<label>Password:</label>
						<input
							required
							type="password"
							name="password1"
							placeholder="Enter a password..."
							value={password1}
							onChange={(e) => {
								handleInputChange(e);
							}}
						/>
					</div>

					<div className="field--wrapper">
						<label>Confirm password:</label>
						<input
							required
							type="password"
							name="password2"
							placeholder="Comfirm your password..."
							value={password2}
							onChange={(e) => {
								handleInputChange(e);
							}}
						/>
					</div>

					<div className="field--wrapper">
						<input className="btn btn--lg btn--main" type="submit" value="Register" />
						{/* <button type="submit">Register</button> */}
					</div>
				</form>

				<p>
					Already have an account? Login <Link to="/login">here</Link>
				</p>
				<p id="xx" style={{ color: "red" }}></p>
			</div>
		</div>
	);
};

export default RegisterPage;
