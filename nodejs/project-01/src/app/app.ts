import express, { Request, Response } from 'express'
const app = express()

app.use(express.json())

app.get('/', (req: Request, res: Response) => {
	res.send('basic express default route')
})

app.post('/course', async (req: Request, res: Response) => {
	console.log(req.body)
	res.send('got it')
})

export default app
