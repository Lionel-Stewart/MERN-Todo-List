import React, { Component } from 'react';
import PropTypes from 'prop-types';

//Components
import DeleteButton from '../components/DeleteButton';

//Redux
import { connect } from 'react-redux';
import { deleteTodo } from '../actions/todoActions';

class DeleteButtonContainer extends Component {

  onDeleteClick = () => {
    this.props.deleteTodo(this.props.id)
  }

  render(){
    return (
      <DeleteButton
        onDeleteClick={this.onDeleteClick}
      />
    );
  }
}

DeleteButtonContainer.propTypes = {
  id: PropTypes.string.isRequired,
  deleteTodo: PropTypes.func.isRequired
}; 

const mapStateToProps = state => ({
  todo: state.todo
});

export default connect(
  mapStateToProps,
  { deleteTodo }
)(DeleteButtonContainer);