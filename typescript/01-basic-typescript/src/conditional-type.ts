{
	type a1 = number
	type a2 = undefined

	type x = a1 extends null ? true : false

	type y = a1 extends null ? true : a2 extends undefined ? undefined : any

	type TypeName<T> = T extends string
		? 'string'
		: T extends number
		? 'number'
		: 'object'

	let name1: TypeName<string> // 'string'
	let name2: TypeName<number> // 'number'
	let name3: TypeName<boolean> // 'object'

	type Sheikh = {
		bike: string
		car: string
		ship: string
		plane: string
	}

	type CheckVehicle<T> = T extends keyof Sheikh ? true : false

	type HasPlane = CheckVehicle<'plane'> // type = true
	type HasOil = CheckVehicle<'oil'> // type = false
}
