import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn } from 'typeorm'
import { BaseEntity } from 'typeorm/repository/BaseEntity'
import { IsString } from 'class-validator'
import Event from '../events/entity'
import Comment from '../comments/entity'
import User from '../users/entity';

@Entity()
export default class Ticket extends BaseEntity {

    @PrimaryGeneratedColumn()
    id?: number

    @IsString()
    @Column('text', {nullable:false})
    picture: string

    @Column('integer', {nullable:false})
    price: number

    @IsString()
    @Column('text', {nullable:false})
    description: string

    @CreateDateColumn({type:'timestamp'})
    creation_hour: Date

    @ManyToOne(_ => Event, event => event.tickets)
    event: Event

    @ManyToOne(_ => User, user => user.tickets, {eager: true})
    user: User

    @OneToMany(_ => Comment, comment => comment.ticket, {eager: true})
    comments: Comment[]
}