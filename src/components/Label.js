const Label = ({ label, name, data, number, readonly, error }) => {
	return (
		<label
			className={
				readonly ? "form__label form__label--readonly" : "form__label"
			}
		>
			{label}
			{readonly ? (
				<input readOnly value={data} name={name} className="form__input" />
			) : (
				<input
					defaultValue={data}
					name={name}
					className={
						error ? "form__input form__input--error" : "form__input"
					}
					onInput={(e) => {
						if (number) {
							e.currentTarget.value = e.currentTarget.value.replace(
								/[^0-9]/g,
								""
							);
						} else {
							e.currentTarget.value = e.currentTarget.value.replace(
								/[^a-zA-Z0-9 ]/g,
								""
							);
						}
					}}
				/>
			)}
			{error && <div className="form__error">Required</div>}
		</label>
	);
};

export default Label;
