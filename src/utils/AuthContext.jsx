import { createContext, useState, useEffect, useContext } from "react";
import { account } from "../appwriteConfig";
import { useNavigate } from "react-router";
import { ID } from "appwrite";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [loading, setLoading] = useState(true);
	const [user, setUser] = useState(null);
	const navigate = useNavigate();

	useEffect(() => {
		getUserOnLoad();
	}, []);

	const getUserOnLoad = async () => {
		try {
			const accountDetails = await account.get();
			setUser(accountDetails);
		} catch (error) {
			if (error.code === 401) {
				setUser(null);
			} else {
				setUser(null);
			}
		} finally {
			setLoading(false);
		}
	};

	const handleUserLogin = async (e, credentials) => {
		e.preventDefault();
		console.log("CREDS:", credentials);

		try {
			await account.createEmailPasswordSession(credentials.email, credentials.password);
			let accountDetails = await account.get();
			setUser(accountDetails);
			navigate("/");
		} catch (error) {
			if (error.code === 400 || error.code === 401) {
				console.log("register error try again check your input ");
				document.getElementById("xx").innerText = error;
			} else {
				console.error(error);
			}
		}
	};

	const handleLogout = async () => {
		try {
			await account.deleteSession("current");
			setUser(null);
			navigate("/login");
		} catch (error) {
			console.error(error);
		}
	};

	const handleRegister = async (e, credentials) => {
		e.preventDefault();
		/*console.log("Handle Register triggered!", credentials);*/

		if (credentials.password1 !== credentials.password2) {
			alert("Passwords did not match!");
			return;
		}

		try {
			let response = await account.create(ID.unique(), credentials.email, credentials.password1, credentials.name);
			console.log("User registered!", response);

			await account.createEmailPasswordSession(credentials.email, credentials.password1);
			let accountDetails = await account.get();
			setUser(accountDetails);
			navigate("/");
		} catch (error) {
			console.error(error, "errrrrrrrrrr");
			document.getElementById("xx").innerText = error;
		}
	};

	const contextData = {
		user,
		handleUserLogin,
		handleLogout,
		handleRegister,
	};

	return <AuthContext.Provider value={contextData}>{loading ? <p>Loading...</p> : children}</AuthContext.Provider>;
};

export const useAuth = () => {
	return useContext(AuthContext);
};

export default { AuthProvider, useAuth };
