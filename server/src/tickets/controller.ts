import { JsonController, Get, Param, Body, Post, HttpCode, Put, NotFoundError, Authorized, CurrentUser } from 'routing-controllers'
import Ticket from './entity'
import User from '../users/entity';
//import Event from '../events/entity';


@JsonController()
export default class TicketController {
    
    @Get('/tickets/:id')
    getTicket(
        @Param('id') id: number
    ) {
        return Ticket.findOne(id)
    }

    @Get('/events/tickets/:event_id')
    async allTickets(
        @Param('event_id') id: number
    ) {
        const tickets = await Ticket.find({where: {event: id}})
        return { tickets }
    }

    @Get('/tickets-all')
    async allUserTickets() {
        const allTickets = await Ticket.find()
        return { allTickets }
    }
    
    @Authorized()
    @Post('/tickets')
    @HttpCode(201)
    async createTicket(
        @CurrentUser() user: User,
        @Body() ticket: Ticket
        ) {
            if(user instanceof User) ticket.user = user
            return ticket.save()
        }

    //@Authorized()
    @Put('/tickets/:id')
    async updateTicket(
        @Param('id') id: number,
        //@CurrentUser() user: User,
        @Body() update: Partial<Ticket>
        ) {
        const ticket = await Ticket.findOne(id)
        if (!ticket) throw new NotFoundError('Cannot find this ticket')

        //if(user instanceof User) ticket.user = user

        return Ticket.merge(ticket, update).save()
        }

}