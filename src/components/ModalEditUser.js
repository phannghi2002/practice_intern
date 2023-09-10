import { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { putUpdateUser } from '~/services/UserService';

const ModalEditUser = (props) => {
    const { show, handleCloseEdit, handleEditUserFromModal, dataUserEdit } = props;
    const [name, setName] = useState('');
    const [job, setJob] = useState('');

    const [email, setEmail] = useState('');
    const [lastName, setLastName] = useState('');

    const handleEditUser = async () => {
        //console.log(dataUserEdit);
        let res = await putUpdateUser(name, job, dataUserEdit.id);
        if (res && res.updatedAt) {
            //suscess
            console.log(res);
            handleEditUserFromModal({ first_name: name, id: dataUserEdit.id, last_name: lastName, email: email });

            handleCloseEdit();
            toast.success('Updated success!');
        }
        // console.log(res);
    };

    useEffect(() => {
        if (show) {
            setName(dataUserEdit.first_name);
            setEmail(dataUserEdit.email);
            setLastName(dataUserEdit.last_name);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dataUserEdit]);
    return (
        <>
            <Modal show={show} onHide={handleCloseEdit} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit a user</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="body-add-new">
                        <div>
                            <div className="mb-3">
                                <label className="form-label">First Name: </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter name: "
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div className="b-3">
                                <label className="form-label">Job: </label>

                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter job: "
                                    value={job}
                                    onChange={(e) => setJob(e.target.value)}
                                />
                            </div>

                            <div className="b-3">
                                <label className="form-label">Email: </label>

                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter email: "
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>

                            <div className="b-3">
                                <label className="form-label">Last Name: </label>

                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter lastname: "
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseEdit}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleEditUser()}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};
export default ModalEditUser;
