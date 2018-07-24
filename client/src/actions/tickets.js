import * as request from 'superagent';
import { isExpired } from '../jwt'
import { logout } from './users'

const baseUrl = 'http://localhost:4000'

export const FETCHED_SELECTED_TICKETS = 'FETCHED_SELECTED_TICKETS'
export const FETCHED_DETAILED_TICKET = 'FETCHED_DETAILED_TICKET'
export const ADD_TICKET = 'ADD_TICKET'
export const UPDATE_TICKET = 'UPDATE_TICKET'
export const FETCH_ALL_TICKETS = 'FETCH_ALL_TICKETS'

export const fetchSelectedTickets = (eventId) => (dispatch) => {
    request
    .get(`${ baseUrl }/events/tickets/${ eventId }`)
    .then( response => dispatch({
        type: FETCHED_SELECTED_TICKETS,
        payload: response.body.tickets
    }))
    .catch(err => alert(err))
}

export const fetchTicket = (ticketId) => (dispatch) => {
    request 
    .get(`${ baseUrl }/tickets/${ ticketId }`)
    .then( response => dispatch({
        type: FETCHED_DETAILED_TICKET,
        payload: response.body
    }))
    .catch(err => alert(err))
}

export const createTicket = (ticket) => (dispatch, getState) => {
    const state = getState()
    const jwt = state.currentUser.jwt
  
    if (isExpired(jwt)) return dispatch(logout())
  
    request
      .post(`${baseUrl}/tickets`)
      .set('Authorization', `Bearer ${jwt}`)
      .send(ticket)
      .then(response => dispatch({
          type: ADD_TICKET,
          payload: response.body
      }))
      .catch(err => console.error(err))
  }

  export const updateTicket = (ticketId, updates) => (dispatch) => {
    request
      .put(`${baseUrl}/tickets/${ticketId}`)
      .send(updates)
      .then(response => dispatch({
        type: UPDATE_TICKET,
        payload: response.body
      }))
  }

  export const fetchAllTickets = () => (dispatch) => {
    request
    .get(`${ baseUrl }/tickets-all`)
    .then( response => dispatch({
        type: FETCH_ALL_TICKETS,
        payload: response.body.allTickets
    }))
    .catch(err => alert(err))
}

