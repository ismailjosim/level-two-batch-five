{
	// Access
	class BankAccount {
		constructor(
			public name: string,
			protected id: number,
			private _balance: number,
		) {}
		showBalance() {
			console.log(`Your Current Balance is: ${this._balance}`)
		}
	}
	class StudentAccount extends BankAccount {
		test() {
			this.id
			this.name
			// this.balance // it will show error is it will protected and only can accessible inside it's parent class
		}
	}
}
