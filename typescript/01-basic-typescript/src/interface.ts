{
	interface Person {
		name: string
		age: number
		address?: string
	}
	// const fatherType = Per

	const personOne: Person = {
		name: 'ismail',
		age: 26,
	}
	const personTwo: Person = {
		name: 'josim',
		age: 26,
		address: 'Dhaka, Bangladesh',
	}

	type Roll = number[]

	// using interface
	interface Roll1 {
		[index: number]: number
	}

	const rollListOne: Roll = [1, 2, 3]

	// using function
	interface FunctionIn {
		(num1: number, num2: number): number
	}

	const add: FunctionIn = (num1, num2) => num1 + num2
}
