{
	const createArrayWithGenerics = <T>(params: T): T[] => {
		return [params]
	}

	// * create string type array
	const arr1 = createArrayWithGenerics<string>('john')
	const arr2 = createArrayWithGenerics<number>(10)

	type User = {
		id: number
		name: string
	}

	const userArrayObj = createArrayWithGenerics<User>({
		id: 22,
		name: 'ismail',
	})

	// with tuple
	const createUser = <T, Q>(params1: T, params2: Q): [T, Q] => {
		return [params1, params2]
	}

	const userOne = createUser<string, number>('ismail', 26)
	// Returns ['ismail', 26] with types [string, number]

	const userTwo = createUser<
		{ name: string; age: number },
		{ name: string; age: number }
	>(
		{
			name: 'ismail',
			age: 26,
		},
		{
			name: 'john',
			age: 30,
		},
	)
}
