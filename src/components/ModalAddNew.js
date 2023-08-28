import { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
const ModalAddNew = (props) => {
    const { show, handleClose } = props;
    const [name, setName] = useState('');
    const [job, setJob] = useState('');

    const handleSaveUser = () => {
        console.log(name, job);
    };

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add new user</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="body-add-new">
                        <div>
                            <div class="mb-3">
                                <label className="form-label">Name: </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter name: "
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div class="b-3">
                                <label className="form-label">Job: </label>

                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter job: "
                                    value={job}
                                    onChange={(e) => setJob(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleSaveUser()}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};
export default ModalAddNew;
