{
	class Animal {
		constructor(public name: string, public breed: string) {}
		makeSound() {
			console.log('Making Sound!')
		}
	}
	class Dog extends Animal {
		constructor(name: string, breed: string) {
			super(name, breed)
		}
		makeBark() {
			console.log('The dog is barking!')
		}
	}
	class Cat extends Animal {
		constructor(name: string, breed: string) {
			super(name, breed)
		}
		makeMeow() {
			console.log('The Cat is Meowing!')
		}
	}

	const dog = new Dog('german Shepard', 'german')
	const cat = new Cat('Bholu', 'cat')
	// dog.makeSound()
	// cat.makeMeow()

	// if we want to use tag handler in smart way
	const isDog = (animal: Animal): animal is Dog => {
		return animal instanceof Dog
	}
	const isCat = (animal: Animal): animal is Cat => {
		return animal instanceof Cat
	}

	const getAnimal = (animal: Animal) => {
		if (isDog(animal)) {
			return animal.makeBark()
		} else if (isCat(animal)) {
			return animal.makeMeow()
		} else {
			return animal.makeSound()
		}
	}
	getAnimal(dog)
	getAnimal(cat)
}
