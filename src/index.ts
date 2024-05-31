import express from 'express'
import clientesRouter from './routes/clientes'

const app = express()

app.use(express.json())

const PORT = 3000

app.use('/clientes', clientesRouter)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
