import { FETCHED_SELECTED_TICKETS, ADD_TICKET, UPDATE_TICKET, FETCH_ALL_TICKETS } from "../actions/tickets";

export default function (state = [], action) {
    switch (action.type) {
      case FETCHED_SELECTED_TICKETS:
        return action.payload
      case ADD_TICKET:
        return [...state, action.payload]
      case UPDATE_TICKET:
        return state.map(ticket => {
          if (ticket.id === action.payload.id) {
            return action.payload
          }
          else return ticket
        })
      case FETCH_ALL_TICKETS:
        return action.payload
      default:
        return state
    }
  }