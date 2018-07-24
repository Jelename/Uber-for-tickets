import React, { PureComponent } from 'react'
import './SignupForm.css'

export default class SignupForm extends PureComponent {
	state = {}

	handleSubmit = (e) => {
		e.preventDefault()
		this.props.onSubmit(this.state)
	}

	handleChange = (event) => {
    const {name, value} = event.target

    this.setState({
      [name]: value
    })
  }

	render() {
		return (
      <div className="signup-form">
  			<form onSubmit={this.handleSubmit}>
			  {/* <label>
                    Name
                    <input type="text" name="name" value={
                        this.state.name || ''
                    } onChange={ this.handleChange } />
                </label><br /> */}

  				<label>
                    Email <br />
                    <input type="email" name="email" value={
                        this.state.email || ''
                    } onChange={ this.handleChange } />
                </label><br />
  					
  				<label>
                    Password <br />
  					<input type="password" name="password" value={
  						this.state.password || ''
  					} onChange={ this.handleChange } />
  				</label><br />

  				<label>
                    Confirm password <br />
  					<input type="password" name="confirmPassword" value={
  						this.state.confirmPassword || ''
  					} onChange={ this.handleChange } />
  				</label><br />

  				{
  					this.state.password &&
  					this.state.confirmPassword &&
  					this.state.password !== this.state.confirmPassword &&
  					<p style={{color:'red'}}>The passwords do not match!</p>
  				}

  				<button type="submit" className='btn'>Sign up</button>
  			</form>
      </div>
		)
	}
}
