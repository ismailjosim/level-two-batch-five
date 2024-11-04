{
	// Generic with interface
	interface Developer<T> {
		name: string
		device: {
			brand: string
			model: string
			purchasePrice: number
		}
		DevRole: T
	}

	const frontendDeveloper: Developer<string> = {
		name: 'ismail',
		device: {
			brand: 'HP',
			model: 'G6',
			purchasePrice: 35000,
		},
		DevRole: 'Frontend Developer',
	}

	const fullstackDeveloper: Developer<{ role1: string; role2: string }> = {
		name: 'ismail',
		device: {
			brand: 'HP',
			model: 'G6',
			purchasePrice: 35000,
		},
		DevRole: {
			role1: 'Frontend developer',
			role2: 'Backend developer',
		},
	}
}
