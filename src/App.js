import { Container } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';
import './App.scss';
import Header from '~/components/Header';

import { UserContext } from '~/context/UserContext';
import { useContext, useEffect } from 'react';
import AppRoutes from './routes/AppRoutes';

function App() {
    const { user, loginContext } = useContext(UserContext);
    console.log(user);

    //  Câu lệnh này giúp cho ta khi đăng nhập xong thì nếu ta refresh thì nó ko bị mất dữ liệu, giải thích tại sao khi ta refresh thì nó lại
    //không mất dữ liệu như sau: khi ta thực hiện F5 thì có nghĩa nó sẽ thực hiện render lại giao diện, mà khi render lại giao diện thì
    //email và auth sẽ có giá trị là email: '', auth: false. Do đó khi ta thực hiện render thì nó sẽ không có data để mà gọi API render
    //giao diện nên nó sẽ mất dữ liệu, còn khi ta thực hiện cái hàm này có nghĩa là ta đã thực hiện login rồi và mới nhấn F5, mà ta đã
    //lưu giá trị của nó vào localStorage thì cho dù ta F5 thì nó vẫn sẽ không bị mất trừ khi ta thực hiện xóa. Do đó khi ta ấn F5 thì
    //token và email vẫn còn trong localStorage nên ta thực hiện lại hàm loginContext lấy giá trị của email và token trong localStorage
    // để render lại giao diện.
    useEffect(() => {
        if (localStorage.getItem('token')) loginContext(localStorage.getItem('email'), localStorage.getItem('token'));

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <>
            <div className="app-container">
                <Header />
                <Container>
                    <AppRoutes />
                </Container>
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
