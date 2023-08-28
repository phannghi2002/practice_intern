import { useState } from 'react';
import { Container } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';
import './App.scss';
import Header from './components/Header';
import ModalAddNew from './components/ModalAddNew';
import TableUsers from './components/TableUsers';

function App() {
    const [isShowModalAddNew, setIsShowModalAddNew] = useState(false);
    const handleClose = () => {
        setIsShowModalAddNew(false);
    };

    return (
        <>
            <div className="app-container">
                <Header />

                <Container>
                    <div className="my-3 add-user">
                        <span> List Users:</span>
                        <button className="btn btn-success" onClick={() => setIsShowModalAddNew(true)}>
                            Add new user
                        </button>
                    </div>

                    <TableUsers />
                </Container>

                <ModalAddNew show={isShowModalAddNew} handleClose={handleClose} />
            </div>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </>
    );
}

export default App;
