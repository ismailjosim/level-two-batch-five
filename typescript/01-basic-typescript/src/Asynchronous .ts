{
	// function fetchData(): Promise<string> {
	// 	return new Promise((resolve, reject) => {
	// 		// Simulate fetching data asynchronously
	// 		const data = 'data found'
	// 		if (data) {
	// 			setTimeout(() => {
	// 				resolve('Data fetched successfully')
	// 			}, 2000)
	// 		} else {
	// 			reject('Failed To Fetch Data')
	// 		}
	// 	})
	// }

	// fetchData().then((data) => {
	// 	console.log(data) // Output: Data fetched successfully
	// })

	type Todo = {
		id: number
		userId: number
		title: string
		completed: boolean
	}

	const getTodo = async (): Promise<Todo> => {
		const res = await fetch('https://jsonplaceholder.typicode.come/todos/1')
		const data = await res.json()
		return data
	}
	console.log(getTodo())
}
