import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity()
export class Cliente {
  @PrimaryGeneratedColumn()
    id: number

  @Column()
    name: string

  @Column({ unique: true })
    email: string

  @Column()
    password: string

  @Column({ unique: true })
    phone: string
}
