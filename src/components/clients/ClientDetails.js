import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import PropTypes from 'prop-types';
import Spinner from '../layouts/Spinner';
import classnames from 'classnames';

class ClientDetails extends Component {
  state = {
    showBalanceUpdate: false,
    balanceUpdateAmount: ''
  };

  onChange = event =>
    this.setState({ [event.target.name]: event.target.value });

  balanceSubmit = event => {
    event.preventDefault();

    const { client, firestore } = this.props;
    const { balanceUpdateAmount } = this.state;

    const clientUpdate = {
      balance: parseFloat(balanceUpdateAmount)
    };

    // Update in firestore
    firestore.update({ collection: 'clients', doc: client.id }, clientUpdate);
  };

  // Delete Client
  onDeleteClick = event => {
    const { client, firestore, history } = this.props;

    firestore
      .delete({ collection: 'clients', doc: client.id })
      .then(history.push('/'));
  };

  render() {
    const { client } = this.props;
    const { showBalanceUpdate, balanceUpdateAmount } = this.state;

    let balanceForm = '';

    // If Balance form should display
    if (showBalanceUpdate) {
      balanceForm = (
        <form onSubmit={this.balanceSubmit}>
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              name="balanceUpdateAmount"
              placeholder="Add New Balance"
              value={balanceUpdateAmount}
              onChange={this.onChange}
            />
            <div className="input-group-append">
              <input
                type="submit"
                value="Update"
                className="btn btn-outline-dark"
              />
            </div>
          </div>
        </form>
      );
    } else {
      balanceForm = null;
    }

    if (client) {
      const { firstName, lastName, email, phone, id, balance } = client;

      return (
        <div>
          {/* Back to dashboard Link */}
          <div className="row">
            <div className="col-md-6">
              <Link to="/" className="btn btn-link">
                <i className="fas fa-arrow-circle-left"> Back to Dashboard</i>
              </Link>
            </div>

            {/* Edit & Delete buttons */}
            <div className="col-md-6">
              <div className="btn-group float-right">
                <Link to={`/client/edit/${client.id}`} className="btn btn-dark">
                  Edit
                </Link>
                <button className="btn btn-danger" onClick={this.onDeleteClick}>
                  Delete
                </button>
              </div>
            </div>
          </div>
          <hr />

          {/* Client Details */}
          <div className="card">
            <h3 className="card-header">
              {firstName} {lastName}
            </h3>
            <div className="card-body">
              <div className="row">
                <div className="col-md-8 col-ms-6">
                  <h4>
                    CLIENT ID: <span className="text-secondary">{id}</span>
                  </h4>
                </div>

                {/* Balance */}
                <div className="col-md-4 col-ms-6">
                  <h3 className="pull-right">
                    Balance:{' '}
                    <span
                      className={classnames({
                        'text-danger': balance > 0,
                        'text-success': balance === 0
                      })}
                    >
                      £{parseFloat(balance).toFixed(2)}
                    </span>{' '}
                    {/* Edit Balance Pencil Toggle */}
                    <small>
                      <a
                        href="#!"
                        onClick={() =>
                          this.setState({
                            showBalanceUpdate: !this.state.showBalanceUpdate
                          })
                        }
                      >
                        <i className="fas fa-pencil-alt" />
                      </a>
                    </small>
                  </h3>

                  {/* Balanceform */}
                  {balanceForm}
                </div>
              </div>
              <hr />

              {/* Details */}
              <ul className="list-group">
                <li className="list-group-item">
                  <b>Contact Email: </b>
                  <span className="text-secondary">{email}</span>
                </li>{' '}
                <br />
                <li className="list-group-item">
                  <b>Contact Phone: </b>
                  <span className="text-secondary">{phone}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      );
    } else {
      return <Spinner />;
    }
  }
}

ClientDetails.propTypes = {
  firestore: PropTypes.object.isRequired
};

export default compose(
  firestoreConnect(props => [
    { collection: 'clients', storeAs: 'client', doc: props.match.params.id }
  ]),
  connect(({ firestore: { ordered } }, props) => ({
    client: ordered.client && ordered.client[0]
  }))
)(ClientDetails);
