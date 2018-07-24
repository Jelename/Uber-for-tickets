import 'reflect-metadata'
import {createKoaServer, Action} from "routing-controllers"
import setupDb from './db'
import EventController from './events/controller'
import TicketController from './tickets/controller'
import CommentController from './comments/controller'
import UserController from './users/controller'
import { verify } from './jwt'
import User from './users/entity'
import LoginController from './logins/controller'

const app = createKoaServer({
  cors: true,
  controllers: [
    EventController,
    TicketController,
    CommentController,
    UserController,
    LoginController
   ],
   authorizationChecker: (action: Action) => {
    const header: string = action.request.headers.authorization

    if (header && header.startsWith('Bearer ')) {
      const [ , token ] = header.split(' ')
      return !!(token && verify(token))
    }
    else
    return false
  },
  currentUserChecker: async (action: Action) => {
    const header: string = action.request.headers.authorization
    if (header && header.startsWith('Bearer ')) {
      const [ , token ] = header.split(' ')
      
      if (token) {
        const {id} = verify(token)
        return User.findOne(id)
      }
    }
    return undefined
  }
})

setupDb()
  .then(_ =>
    app.listen(4000, () => console.log('Listening on port 4000'))
  )
  .catch(err => console.error(err))