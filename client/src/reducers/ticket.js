import { FETCHED_DETAILED_TICKET, UPDATE_TICKET} from "../actions/tickets";

export default function (state = null, action) {
    switch (action.type) {
      case FETCHED_DETAILED_TICKET:
        return action.payload
      
      case UPDATE_TICKET:
          if (state.id === action.payload.id) {
            return action.payload
          }
          else return state
          
      default:
        return state
    }
  }