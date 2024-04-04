import { Request, Response, NextFunction } from 'express'
import Token from '../models/token.entity'
import bcrypt from 'bcrypt'

export default async function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const { authorization } = req.headers

  if (!authorization) return res.status(401).json({ error: 'Token não fornecido' })

  const token = await Token.findOneBy({ token: authorization })
  if (!token) return res.status(401).json({ error: 'Token inválido' })

  if (token.expiresAt < new Date()) {
    await token.remove()
    return res.status(401).json({ error: 'Token expirado' })
  }

  next()
}
