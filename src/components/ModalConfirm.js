import { Modal, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { deleteUser } from '~/services/UserService';

const ModalConfirm = (props) => {
    const { show, handleCloseDeleteConfirm, handleDeleteUserFromModal, dataUserDelete } = props;
    const confirmDelete = async () => {
        let res = await deleteUser(dataUserDelete.id);
        // console.log(res);
        if (res && +res.statusCode === 204) {
            toast.success('Delete user success!');
            handleCloseDeleteConfirm();
            handleDeleteUserFromModal(dataUserDelete);
        } else {
            toast.error('Delete user error');
        }
    };

    return (
        <>
            <Modal show={show} onHide={handleCloseDeleteConfirm} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Add new user</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="body-add-new">
                        This action can't be undone! Do want to delete this user? <br />
                        <b>email = {dataUserDelete.email}</b>{' '}
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseDeleteConfirm}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => confirmDelete()}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};
export default ModalConfirm;
