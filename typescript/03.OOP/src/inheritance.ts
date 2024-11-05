{
	// inheritance: inherit from Parent Class
	class Student {
		constructor(
			public name: string,
			public age: number,
			public address: string,
		) {}
		callMethod() {
			console.log('method is called')
		}
	}

	class LevelOne extends Student {
		constructor(
			name: string,
			age: number,
			address: string,
			public designation: string,
		) {
			super(name, age, address) //* The super() function calls the parent class constructor, passing the name, age, and address arguments to initialize the inherited properties.
		}
		getStudentInfo() {
			console.log(
				`Student Name is ${this.name}. Age: ${this.age} and address is: ${this.address}. and his current designation: ${this.designation}`,
			)
		}
	}

	const student = new LevelOne('ismail', 20, 'bd', 'frontend developer')
	// student.callMethod()
}
