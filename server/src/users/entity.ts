import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'
import { BaseEntity } from 'typeorm/repository/BaseEntity'
import { IsString, IsEmail, MinLength } from 'class-validator'
import * as bcrypt from 'bcrypt'
import { Exclude } from 'class-transformer';
import Event from '../events/entity'
import Ticket from '../tickets/entity';
import Comment from '../comments/entity';

@Entity()
export default class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id?: number

    @IsString()
    @MinLength(2)
    @Column("text")
    firstName: string;

    @IsString()
    @MinLength(2)
    @Column("text")
    lastName: string;

    @IsEmail()
    @Column('text', {nullable:false})
    email: string

    @IsString()
    @MinLength(5)
    @Exclude({toPlainOnly:true})
    @Column('text', { nullable:true })
    password: string

    async setPassword(rawPassword: string) {
        const hash = await bcrypt.hash(rawPassword, 10)
        this.password = hash
      }
    
      checkPassword(rawPassword: string): Promise<boolean> {
        return bcrypt.compare(rawPassword, this.password)
      }

    @OneToMany(_ => Event, event => event.user)
    events: Event[]

    @OneToMany(_ => Ticket, ticket => ticket.user)
    tickets: Ticket[]

    @OneToMany(_ => Comment, comment => comment.user)
    comments: Comment[]
}