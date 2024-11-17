import { Server } from 'http'
import app from './app/app'

const port = process.env.PORT || 5000

let server: Server

async function bootStrap() {
	server = app.listen(port, () => {
		console.log(`app listening on port ${port}`)
	})
}

bootStrap()
