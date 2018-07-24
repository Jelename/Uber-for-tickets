import React, {PureComponent} from 'react'
import './TicketForm.css'

export default class TicketForm extends PureComponent {
	state = {}

	handleSubmit = (e) => {
		e.preventDefault()
		this.props.onSubmit(this.state)
	}

	handleChange = (ticket) => {
    const {name, value} = ticket.target

    this.setState({
      [name]: value
    })
  }

	render() {
		const initialValues = this.props.initialValues || {}
		return (
			<form onSubmit={this.handleSubmit} className='ticketForm'>
				<div>
					<label htmlFor="picture">Picture</label><br />
					<input name="picture" id="picture" value={
						this.state.picture !== undefined ? this.state.picture : initialValues.picture || ''
					} onChange={ this.handleChange } />
				</div>

                <div>
					<label htmlFor="price">Price</label><br />
					<input name="price" id="price" value={
						this.state.price !== undefined ? this.state.price : initialValues.price || ''
					} onChange={ this.handleChange } />
				</div>

				<div>
					<label htmlFor="description">Description</label><br />
					<input name="description" id="description" value={
						this.state.description !== undefined ? this.state.description : initialValues.description || ''
					} onChange={ this.handleChange } />
				</div>

				<button type="submit" className='btn'>Save</button>
			</form>
		)
	}
}
