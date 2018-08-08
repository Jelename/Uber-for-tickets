import React, {PureComponent} from 'react';
import { connect } from 'react-redux';
import { fetchTicket, updateTicket, fetchAllTickets } from '../actions/tickets'
import { fetchSelectedComments, createComment } from '../actions/comments'
import CommentForm from './CommentForm'
import TicketForm from './TicketForm'
import Button from '@material-ui/core/Button'
import './TicketDetails.css'

class TicketDetails extends PureComponent{

    state = {
        edit: false
    }

    componentDidMount() {
        
        this.props.fetchTicket(this.props.match.params.id)
        this.props.fetchAllTickets()
        this.props.fetchSelectedComments(this.props.match.params.id)
        
    }

    createComment = (comment) => {
        comment.ticket = this.props.ticket
        this.props.createComment(comment)
    }

    toggleEdit = () => {
        this.setState({
          edit: !this.state.edit
        })
    }

    updateTicket = (ticket) => {
        this.props.updateTicket(this.props.match.params.id, ticket)
        this.toggleEdit()
    }

    getAuthorRisk() {       
        const author = this.props.ticket.user.id
        const allAuthors = this.props.tickets.map(function(ticket) {return ticket.user.id})
        const numTickets = allAuthors.filter(function(item) {return item === author})

        if (numTickets.length === 1) {
            return 10
        } else {
            return 0
        }
    }
    
    getAveragePriceRisk() {
        const sum = this.props.tickets.map(function(item) { return item.price })
        console.log(this.props.tickets)
        const total = sum.reduce(function(a, b) { return a + b })
        const avg = total / this.props.tickets.length
        const risk = -1 * (100 * this.props.ticket.price / avg - 100)

        if (risk < -10) {
            return -10
        } else {
            return risk
        }
    }

    getTimeRisk() {
        const hour = this.props.ticket.creation_hour.slice(11, 13)

        if (hour > 8 && hour < 17) {
            return -10
        } else {
            return 10
        }
    }

    getCommentRisk() {
        const numComments = this.props.comments.length
        if (numComments > 3) {
            return 5
        } else {
            return 0
        }
    }

    finalRisk() {
        const total = this.getAveragePriceRisk() + this.getCommentRisk() + this.getTimeRisk() + this.getTimeRisk()
        const totalRounded = Number(total).toFixed(2);
        
        if (totalRounded < 5) {
            return 5
        } else if (totalRounded > 5 && total < 95) {
            return totalRounded
        } else {
            return 95
        }
    }

    render() {
        const {ticket} = this.props 
        if (!ticket) return null

        const {comments} = this.props 

        return(
            <div>
                {
                    this.props.currentUser &&
                    this.state.edit &&
                    <TicketForm initialValues={ticket} onSubmit={this.updateTicket} className='updateTicket'/>
                }

                {
                    !this.state.edit && 
                    <div className='ticketStyle'>
                        <h1 className='ticketDetailsName'><span className='ticketStyle'>Ticket from:</span> {ticket.user.firstName}</h1> 
                        <h4 className='fraudRiskText'>Fraud risk of the ticket is: <span className='fraudRisk'>{this.finalRisk()}%</span></h4>
                        <h2 className='priceTicket'><span className='priceStyle'>price:</span> EUR {ticket.price}</h2> <br />
                        <img src={ticket.picture} alt='ticket' width='30%'/> 
                        <p className='ticketDesc'>description: {ticket.description}</p>
                        {this.props.currentUser && <button className='btnTicket' onClick={this.toggleEdit}>Edit your ticket</button>}
                    </div>
                }

                <div className='comments'>
                    <h3>Comments</h3>
                    { comments.map(comment => (<div key={comment.id} className="commentList">
                    <p className='commentText'><span className='commentStyle'>{comment.user.firstName}:</span> {comment.content}</p>
                    {/* <hr className='styleLine' /> */}
                    </div>)) }  
                </div>

                {
                    this.props.currentUser && <div className='commentsForm'>
                    <h2 className='titleTitle'>Create a new comment</h2>     
                    <CommentForm onSubmit={this.createComment} />
                    </div>
                }
           </div>
        )
    }
} 

const mapStateToProps = function (state) {
    return {
        ticket: state.ticket,
        comments: state.comments,
        tickets: state.tickets,
        currentUser: state.currentUser
    }
}

export default connect(mapStateToProps, { fetchTicket, fetchSelectedComments, createComment, updateTicket, fetchAllTickets })(TicketDetails)