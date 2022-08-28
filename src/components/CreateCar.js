const CreateCar = () => {
	return (
		<CarInfoForm 
			heading={`Create a new car`} 
			path={`../${newName}/${setNewName}`} 
			brightness={brightness} 
			formType={'Edit'}
			>
			<Input
				label={"Manufacturer"}
				data={make.split('-').join(' ')}
			/>
			<Input
				label={"Model"}
				data={newName}
				setData={setNewName}
			/>
			<Input
				label={"Year"}
				data={newYear}
				setData={setNewYear}
				type="number"
			/>
			<Input
				label={"Price"}
				data={newPrice}
				setData={setNewPrice}
				type="number"
			/>
			<button id='save'>
				<Link 
					to={newName && newYear && newPrice ? `../${make}/${newName}` : './'} 
					onClick={editingVehicle}
				>Save
				</Link></button>
			<button id='delete'>
				<Link
					to={"/car-search"} 
					onClick={deletingVehicle}
				>Delete
				</Link>
			</button>
		</CarInfoForm>
	)
}

export default CreateCar