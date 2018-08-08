import React, {PureComponent} from 'react'
import Button from '@material-ui/core/Button'
import './CommentForm.css'

export default class CommentForm extends PureComponent {
	state = {}

	handleSubmit = (e) => {
		e.preventDefault()
		this.props.onSubmit(this.state)
	}

	handleChange = (comment) => {
    const {name, value} = comment.target

        this.setState({
            [name]: value
        })
    }

	render() {
		const initialValues = this.props.initialValues || {}
		return (
			<form onSubmit={this.handleSubmit} className='commentForm'>
				<div>
					<label htmlFor="content">Text</label><br />
					<input name="content" id="content" value={
						this.state.content !== undefined ? this.state.content : initialValues.content || ''
					} onChange={ this.handleChange } />
				</div>

				<button className='btn' type="submit">Save</button>
			</form>
		)
	}
}
