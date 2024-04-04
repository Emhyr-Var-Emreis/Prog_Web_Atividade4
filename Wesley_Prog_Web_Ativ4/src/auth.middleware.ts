import { DataSource } from 'typeorm'
import dotenv from 'dotenv'
import { join } from 'path'
import User from '../models/user.entity'
import Task from '../models/task.entity'
import Token from '../models/token.entity'

dotenv.config()

const dataBase = new DataSource({
  type: 'sqlite',
  database: process.env.DATABASE || './src/database/database.sqlite',
  entities: [
    join(__dirname, '..', 'models/*.{ts,js}'),
    User,
    Task,
    Token
  ],
  logging: true,
  synchronize: true
})

dataBase.initialize()
  .then(() => {
    console.log(`Banco de dados inicializado`);
  })
  .catch((err) => {
    console.error(`Erro ao inicializar o banco de dados`, err);
  })

export default dataBase
