{
	// * Generic constraints With keyof operator
	type Vehicle = {
		bike: string
		car: string
		ship: string
	}
	// * Manual Method
	type Owner = 'Bike' | 'Car' | 'Ship'

	type OwnerTwo = keyof Vehicle
	// * Whenever we need to create a union type string using type we can use it both of the above method

	const personOne: Owner = 'Bike'
	const personTwo: OwnerTwo = 'bike'

	// we need to create a function that will take an object and a key. that function will return the value of that key
	const findKeyValues = <X, Y extends keyof X>(obj: X, key: Y) => {
		return obj[key]
	}
	const user = {
		name: 'mr. x',
		age: 25,
		address: 'bd',
	}
	const car = {
		model: 'x3',
		brand: 'tesla',
		price: 10000,
	}

	const res01 = findKeyValues(user, 'name')
	const res02 = findKeyValues(car, 'price')
}
