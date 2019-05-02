import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Input
} from 'reactstrap';

const EditTodoModal = (props) => {
  return (
    <span>
      <span className='edit button' title='edit todo' onClick={props.toggle}>
        <i className='fa fa-edit'></i>
      </span>

      <Modal isOpen={props.isOpen} toggle={props.toggle}>
        <ModalHeader toggle={props.toggle}> Update Todo </ModalHeader>
        <ModalBody>
          <Form onSubmit={props.onSubmit} required>
            <FormGroup>
              <Input
                type="text"
                name="newGoal"
                value={props.goal}
                placeholder="Update Todo"
                onChange={props.onChange}
                maxLength="24"
              />
            </FormGroup>

            <Button color="dark" className="update-button" block>
              Save
            </Button>
          </Form>
        </ModalBody>
      </Modal>
    </span>
  );
}

EditTodoModal.propTypes = {
  goal: PropTypes.string.isRequired,
  toggle: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired
};

export default EditTodoModal;