
const Input = ({ label, type, data, setData }) => {
	return (
		<div className='input'>
			<label htmlFor={label.toLowerCase()}>{label}:</label>
			<input 
				className={!data ? 'red_color_outline' : ''}
				id={label.toLowerCase()}
				value={data} 
				placeholder={
					label === "Manufacturer" ? 
					"e.g. BMW, Ford, Volkswagen" : 
					label === "Model" ? 
					'e.g. 128, 325, X5' : 
					label === "Year" ? 
					2020 : 55000
				} 
				type={type || 'text'} 
				onChange={(e) => setData(e.currentTarget.value)}
			/>
			<p id='error'><small>{!data ? 'Field cannot be empty' : ''}</small></p>
		</div>
	)
}

export default Input