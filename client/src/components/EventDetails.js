import React, {PureComponent} from 'react';
import { connect } from 'react-redux';
import { fetchEvent } from '../actions/events';
import { fetchSelectedTickets, createTicket } from '../actions/tickets'
import { Link } from "react-router-dom";
import TicketForm from './TicketForm'
import './EventDetails.css'

class EventDetails extends PureComponent{    
    componentWillMount(props) {
        this.props.fetchEvent(this.props.match.params.id) 
        this.props.fetchSelectedTickets(this.props.match.params.id)
    }

    createTicket = (ticket) => {
        ticket.event = this.props.event
        this.props.createTicket(ticket)
    }

    render() {
        const {event} = this.props
        if (!event) return null

        const {tickets} = this.props
        
        return (
            <div className='eventDetailsCenter'>
                <div>                        
                    <h1 className='eventDetailName'>Event: {event.name}</h1>
                    <p className='eventTitleStyle'>{event.description}</p>
                    
                    <img src={event.picture} alt="event" className='imageDetails' width='30%'/> 
                    <p><i><b>Start date</b> {event.start_date}</i> | <i><b>End date</b> {event.end_date}</i></p>    
                    <table className='tableCenter'>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Description</th>
                                <th>Ticket link</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                tickets.map(ticket => (
                                    <tr key={ticket.id}>
                                        <td>{ticket.user.firstName}</td>
                                        <td>{ticket.price}</td> 
                                        <td>{ticket.description}</td>  
                                        <td>
                                            <Link to = {`/tickets/${ticket.id}`}>See ticket</Link>
                                        </td>        
                                    </tr>)) 
                            }
                        </tbody>
                    </table> 

                    {this.props.currentUser && <div className='formCenter'>
                    <h1 className='eventTitle'>Create a new ticket</h1>     
                    <TicketForm onSubmit={this.createTicket} />
                    </div>}
                </div>
            </div>       
        )
    }
}

const mapStateToProps = function (state, props) {
    return {
        event: state.event,
        tickets: state.tickets,
        currentUser: state.currentUser
    }
}

export default connect(mapStateToProps, { fetchEvent , fetchSelectedTickets, createTicket })(EventDetails)