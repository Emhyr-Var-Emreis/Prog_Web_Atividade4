import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'
import User from './user.entity'

@Entity()
export default class Token extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  token!: string

  @Column({ name: 'refresh_token' })
  refreshToken!: string

  @Column({ name: 'expires_at' })
  expiresAt!: Date

  @ManyToOne(() => User, user => user.tokens)
  user!: User
}
