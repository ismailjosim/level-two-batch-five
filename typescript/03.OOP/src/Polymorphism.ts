{
	class Person {
		getSleep() {
			console.log('Normal Person Sleep For 8 Hours A Day')
		}
	}
	class Student extends Person {
		getSleep() {
			console.log('Student Sleep For 7 Hours A Day')
		}
	}
	class Developer extends Person {
		getSleep() {
			console.log('Developer Sleep For 6 Hours A Day')
		}
	}

	const getSleepingHours = (params: Person) => {
		params.getSleep()
	}

	const person1 = new Person()
	const person2 = new Student()
	const person3 = new Developer()

	getSleepingHours(person1) // Normal Person Sleep For 8 Hours A Day
	getSleepingHours(person2) // Student Sleep For 7 Hours A Day
	getSleepingHours(person3) // Developer Sleep For 6 Hours A Day

	// kono ekta class er method jodi different extends function er modde different different behave kora takei bola hoi polymorphism.

	// example 02
	class Shape {
		getArea(): number {
			return 0
		}
	}
	class Circle extends Shape {
		constructor(public radius: number) {
			super()
		}
		getArea(): number {
			return Math.PI * this.radius * this.radius
		}
	}
	class Rectangle extends Shape {
		constructor(public width: number, public height: number) {
			super()
		}
		getArea(): number {
			return this.width * this.height
		}
	}

	const getShapeArea = (param: Shape) => {
		console.log(param.getArea())
	}

	const shape1 = new Shape()
	const shape2 = new Circle(10)
	const shape3 = new Rectangle(10, 20)

	getShapeArea(shape1)
	getShapeArea(shape2)
	getShapeArea(shape3)
}
