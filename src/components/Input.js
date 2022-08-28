import { useState } from "react";

const Input = ({ label, type, data, setData, styles }) => {
	const [error, setError] = useState(false);
	return (
		<div className={`input ${styles || ''}`}>
			<label htmlFor={label.toLowerCase()}>{label}:</label>
			<input 
				id={label.toLowerCase()}
				value={data} 
				type={type || 'text'} 
				onChange={(e) => {
					setData(e.currentTarget.value);
					if (e.currentTarget.value.length > 0) {
						e.currentTarget.classList.remove('red_color_outline');
						setError(false);
					}
				}}
				placeholder={
					label === "Manufacturer" ? 
					"e.g. BMW, Ford, Volkswagen" : 
					label === "Model" ? 
					'e.g. 128, 325, X5' : 
					label === "Year" ? 
					2020 : 55000
				} 
				onBlur={(e) => {
					if (e.currentTarget.value.trim().length <= 0) {
						e.currentTarget.classList.add('red_color_outline');
						setData('')
						setError(true);
					}
				}}
			/>
			{error ? <p id='error'><small>Field cannot be empty</small></p> : null} 
		</div>
	)
}

export default Input