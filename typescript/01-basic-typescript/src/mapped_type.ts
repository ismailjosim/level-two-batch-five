{
	type AreaNum = {
		height: number
		width: number
	}
	// type AreaStr = {
	// 	height: string
	// 	width: string
	// }

	// create type using mapped type
	type AreaStr = {
		[key in keyof AreaNum]: string
	}
	type AreaBool = {
		[key in keyof AreaNum]: boolean
	}

	// look up type
	type Height = AreaNum['height'] // look up type

	// Here's a basic example of a mapped type that adds readonly modifier to each property of the input type:
	type ReadonlyType<T> = {
		readonly [K in keyof T]: T[K]
	}

	interface Person {
		name: string
		age: number
	}

	const readOnlyPerson: ReadonlyType<Person> = {
		name: 'John',
		age: 30,
	}

	// Attempting to modify properties will result in a TypeScript error
	// readOnlyPerson.name = 'Jane'; // Error: Cannot assign to 'name' because it is a read-only property
}
