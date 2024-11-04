{
	const newEnrolledStudent = <
		T extends { payment: number; name: string; email: string },
	>(
		student: T,
	) => {
		const courseName = 'Next Level Web Development'
		const rollNumber = Math.round(Math.random() * 6)
		return {
			...student,
			courseName,
			rollNumber,
		}
	}

	const studentOne = newEnrolledStudent({
		name: 'ismail',
		payment: 6500,
		email: 'ismailjosim99@gmail.com',
	})
	console.log(studentOne)
}
