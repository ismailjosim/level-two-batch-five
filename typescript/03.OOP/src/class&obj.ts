{
	// * Class
	class Programmer {
		constructor(
			public name: string,
			public age: number,
			public designation: string,
		) {}

		assignProject() {
			console.log(
				`${this.name} has assign to the project of ${this.designation}`,
			)
		}
	}

	const personOne = new Programmer('ismail', 26, 'frontend developer')
	console.log(personOne.assignProject())
}
