{
	// generic type

	// with number
	const rollNumbers: number[] = [1, 2, 3]
	const rollNumberWithGeneric: Array<number> = [1, 2, 3]

	// with string
	const persons: Array<string> = ['MR. x']

	// with boolean
	const boolArray: Array<boolean> = [true, false, true]

	// to make it reuseable
	type GenericType<T> = Array<T>
	const rollNumber: GenericType<number> = [1, 2, 3]
	const people: GenericType<string> = ['MR. x']
	const presents: GenericType<boolean> = [true, false, true]

	// make array of object
	const users: GenericType<{ name: string; age: number }> = [
		{ name: 'mr.x', age: 26 },
		{ name: 'mr.x', age: 26 },
		{ name: 'mr.x', age: 26 },
		{ name: 'mr.x', age: 26 },
	]

	// create tuple using generic
	type GenericTuple<X, Y> = [X, Y]

	const couple: GenericTuple<string, string> = ['MR.x ', 'MRS. X']

	const students: GenericTuple<string, number> = ['ismail', 26]
}
