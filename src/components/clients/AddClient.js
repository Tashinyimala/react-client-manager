import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import inputComponent from '../../utils/inputComponent';
import PropTypes from 'prop-types';

export class AddClient extends Component {
  state = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    balance: ''
  };

  onChange = event =>
    this.setState({ [event.target.name]: event.target.value });

  onSubmit = event => {
    event.preventDefault();

    const newClient = this.state;
    const { firestore, history } = this.props;

    // If no balance, make 0
    if (newClient.balance === '') newClient.balance = 0;

    firestore
      .add({ collection: 'clients' }, newClient)
      .then(() => history.push('/'));
  };

  render() {
    const { firstName, lastName, email, phone, balance } = this.state;
    const { disableBalanceOnAdd } = this.props.settings;

    return (
      <div>
        <div className="row">
          <div className="col-md-6">
            <Link to="/" className="btn btn-link">
              <i className="fas fa-arrow-circle-left" /> Back to Dashboard
            </Link>
          </div>
        </div>
        <div className="card">
          <div className="card-header">Add Client</div>
          <div className="card-body">
            <form onSubmit={this.onSubmit}>
              {inputComponent()}
              {inputComponent(
                this.onChange,
                'firstName',
                'First Name',
                'firstName',
                firstName
              )}
              {inputComponent(
                this.onChange,
                'lastName',
                'Last Name',
                'lastName',
                lastName
              )}
              {inputComponent(this.onChange, 'email', 'Email', 'email', email)}
              {inputComponent(
                this.onChange,
                'phone',
                'Phone',
                'phone',
                phone,
                10
              )}
              <div className="form-group">
                <label htmlFor="balance"> Balance</label>
                <input
                  type="text"
                  className="form-control"
                  name="balance"
                  onChange={this.onChange}
                  value={balance}
                  disabled={disableBalanceOnAdd}
                />
              </div>
              <input
                type="submit"
                value="Submit"
                className="btn btn-primary btn-block"
              />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

AddClient.propTypes = {
  firestore: PropTypes.object.isRequired,
  settings: PropTypes.object.isRequired
};

export default compose(
  firestoreConnect(),
  connect((state, props) => ({
    settings: state.settings
  }))
)(AddClient);
