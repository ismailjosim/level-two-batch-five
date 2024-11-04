{
	// * Utility type
	// * 1 pick
	type Person = {
		name: string
		age: number
		email: string
		phone?: string
	}

	type Name = Pick<Person, 'name' | 'age'>

	// * 2: omit
	type Contact = Omit<Person, 'name' | 'age'>

	// * Required
	type personReq = Required<Person>

	// * Partial type
	type personPartial = Partial<Person>

	// * readonly
	type ReadonlyType = Readonly<Person>
	const personOne: ReadonlyType = {
		age: 200,
		email: 'ismail@gmail.com',
		name: 'x',
		phone: '014213',
	}

	//personOne.name = 'ismail' // shows error as it is read-only type

	// Record type
	type MyObj = Record<string, string>

	const obj1: MyObj = {
		a: 'b',
		b: 'a',
	}
}
