import React, {PureComponent} from 'react';
import { connect } from 'react-redux';
import { fetchAllEvents, createEvent } from '../actions/events';
import { Link } from 'react-router-dom';
import EventForm from './EventForm'
import './EventList.css'

class EventsList extends PureComponent{

    createEvent = (event) => {
        this.props.createEvent(event)
    }

    componentWillMount() {
        this.props.fetchAllEvents()
    }


    render() {
        const {events} = this.props 

        return(
            <div className='holder'>
               <h1 id='title'>Events</h1> 
                <div className='flexContainer'>
                    { events.map(event => (<div key={event.id} className="eventsItems">
                        <img src={event.picture} alt='event' className='imageFlex'/>
                        <p className='eventName'><Link to = {`/events/${event.id}`} className='link'>{event.name}</Link></p>
                    </div>)) }   
                </div>
                
                {this.props.currentUser && <div className='formBackground'>
                <h1 className='eventTitle'>Create a new event</h1>     
                <EventForm onSubmit={this.createEvent} />
                </div>}
            </div>
        )
    }
} 

const mapStateToProps = function (state) {
    return {
        events: state.events,
        currentUser: state.currentUser
    }
}

export default connect(mapStateToProps, { fetchAllEvents, createEvent })(EventsList)