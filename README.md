# Uber-for-tickets

An app created for browsing, editing and adding events and buying tickets for the same. Every event and ticket can be added or edited if user is signed in. Also, every signed in user can post comments for every ticket. If user is not signed in, he will be able only to see the events, tickets for those events and comments for those tickets, but now to add or edit them. 
User can sign up, log in, and if signed up, create new events, tickets or comments.

For every ticket there is a ticket details page, where user can see who posted that ticket, what is the price for it, a picture of a ticket, fraud risk percentage, description and comments for that ticket. 

Fraud risk percentage will show to users the risk they are taking when buying that ticket. The percentage is calculated using the following algorithm:
  - if the ticket is the only ticket of the author, add 10%
  - if the ticket price is lower than the average ticket price for that event, that's a risk
  - if a ticket is X% cheaper than the average price, add X% to the risk
  - if a ticket is X% more expensive than the average price, deduct X% from the risk, with a maximum of 10% deduction
  - if the ticket was added during business hours (9-17), deduct 10% from the risk, if not, add 10% to the risk
  - if there are >3 comments on the ticket, add 5% to the risk

The app is built with React & Redux on the frontend, and Typescript, Koa, routing-controllers and TypeORM in the backend.

![example](https://media.giphy.com/media/8YZtDR59HD2TxQQcer/giphy.gif)
