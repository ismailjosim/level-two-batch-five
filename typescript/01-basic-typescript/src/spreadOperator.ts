{
	const list1: string[] = ['data1', 'data2', 'data3']
	const list2: string[] = ['data4', 'data5', 'data6']

	// spread operator
	list1.push(...list2)

	// object spread
	const data1 = {
		nam1: 'john',
		nam2: 'john2',
	}
	const data2 = {
		nam3: 'joh3',
		nam4: 'john4',
	}
	const totalData = {
		...data1,
		...data2,
	}

	// rest operator
	const add = (...numbers: number[]) => {
		let total: number = 0
		for (let i = 0; i < numbers.length; i++) {
			total += numbers[i]
		}
	}
}
