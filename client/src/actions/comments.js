import * as request from 'superagent';
import { isExpired } from '../jwt'
import { logout } from './users'

const baseUrl = 'http://localhost:4000'

export const FETCHED_SELECTED_COMMENTS = 'FETCHED_SELECTED_COMMENTS'
export const ADD_COMMENT = 'ADD_COMMENT'

export const fetchSelectedComments = (ticketId) => (dispatch) => {
    request
    .get(`${ baseUrl }/tickets/comments/${ ticketId }`)
    .then( response => dispatch({
        type: FETCHED_SELECTED_COMMENTS,
        payload: response.body.comments
    }))
    .catch(err => alert(err))
}

export const createComment = (comment) => (dispatch, getState) => {
    const state = getState()
    const jwt = state.currentUser.jwt
  
    if (isExpired(jwt)) return dispatch(logout())
  
    request
      .post(`${baseUrl}/comments`)
      .set('Authorization', `Bearer ${jwt}`)
      .send(comment)
      .then(response => dispatch({
          type: ADD_COMMENT,
          payload: response.body
      }))
      .catch(err => console.error(err))
  }