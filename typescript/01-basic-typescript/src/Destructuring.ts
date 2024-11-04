{
	// Example user object
	const user = {
		id: 1,
		name: 'John Doe',
		email: 'johndoe@example.com',
		age: 30,
		address: {
			street: '123 Main St',
			city: 'Anytown',
			country: 'USA',
		},
		phoneNumbers: ['123-456-7890', '098-765-4321'],
		isActive: true,
		createdAt: new Date(),
	}

	const {
		name,
		address: { street, city, country },
	} = user

	// array destructure
	const friends: string[] = [
		'Alice',
		'Bob',
		'Charlie',
		'Diana',
		'Ethan',
		'Fiona',
		'George',
		'Hannah',
		'Ian',
		'Julia',
	]
	const [first, second, , fourth, ...others] = friends
}
