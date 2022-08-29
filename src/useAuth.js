import { useEffect, useState } from 'react';
import axios from 'axios';

const useAuth = () => {
	const [accessToken, setAccessToken] = useState();
	const [expiresIn, setExpiresIn] = useState();

	useEffect(() => {
		axios({
			method: "post",
			url: 'https://api.baasic.com/beta/simple-vehicle-app/login',
			headers: {
				"Content-Type": "application/x-www-form-urlencoded"
			},
			data: new URLSearchParams({
				grant_type: "password",
				username: "Leonardo.Yakub",
				password: "Freeze0485."
			})
		}).then(res => {
			setAccessToken(res.data.access_token);
			setExpiresIn(res.data.expires_in);
		})
		.catch(err => console.error(err));
	}, []);

	useEffect(() => {
		if (!accessToken || !expiresIn) return
		const interval = setInterval(() => {
			axios({
				method: "put",
				url: "https://api.baasic.com/beta/simple-vehicle-app/login",
				headers: {
					Authorization: `bearer ${accessToken}`,
				},
				data: {
					type: "bearer",
					token: accessToken,
				} 
			}).then(res => {
				setAccessToken(res.data.access_token);
			})
			.catch(err => console.error(err));
		}, (expiresIn - 60) * 1000);
		return () => clearInterval(interval);
	}, [accessToken, expiresIn]);
	
	return accessToken;
}

export default useAuth