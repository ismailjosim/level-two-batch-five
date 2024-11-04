{
	const kiloToGm = (value: string | number): string | number | undefined => {
		if (typeof value === 'string') {
			return parseFloat(value) * 1000
		}
		if (typeof value === 'number') {
			return value * 1000
		}
	}
	const numberRes = kiloToGm(1000) as number
	const strRes = kiloToGm(1000) as string
	let value: any = 'hello'
	let length: number = (value as string).length
}
