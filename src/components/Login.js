import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { handleLoginRedux } from '~/redux/actions/userAction';

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isShowPassword, setIsShowPassword] = useState(false);

    const isLoading = useSelector((state) => state.user.isLoading);
    const account = useSelector((state) => state.user.account);

    const dispatch = useDispatch();

    const handleLogin = async () => {
        if (!email || !password) {
            toast.error('Email or password is required');
            return;
        }

        dispatch(handleLoginRedux(email, password));
    };

    const handleGoBack = () => {
        navigate('/');
    };

    const handlePressEnter = (e) => {
        // console.log(e);
        if (e && e.key === 'Enter') {
            handleLogin();
        }
    };

    // useEffect(() => {
    //     let token = localStorage.getItem('token');
    //     if (token) {
    //         navigate('/');
    //         toast.success('Login successful');
    //     }

    //     //if write function then occur error: Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in a useEffect cleanup function.
    //     // Cleanup function
    //     return () => {
    //         // Cancel any subscriptions or asynchronous tasks here
    //     };
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, []);

    useEffect(() => {
        if (account && account.auth) {
            navigate('/');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [account]);

    return (
        <>
            <div className="login-container col-12 col-sm-4">
                <div className="title">Login</div>
                <div className="text"> Email or Username (eve.holt@reqres.in)</div>

                <input
                    type="text"
                    placeholder="Email or username"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <div className="input_password">
                    <input
                        type={isShowPassword ? 'text' : 'password'}
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onKeyDown={(e) => handlePressEnter(e)}
                    />

                    <i
                        className={isShowPassword ? 'fa-solid fa-eye' : 'fa-solid fa-eye-slash'}
                        onClick={() => setIsShowPassword(!isShowPassword)}
                    ></i>
                </div>

                <button
                    className={email && password ? 'active' : ''}
                    disabled={!(email && password)}
                    onClick={() => handleLogin()}
                >
                    {isLoading && <i className="fas fa-spinner fa-pulse"></i>}
                    &nbsp; Login
                </button>
                <div className="back">
                    <i className="fa-solid fa-chevron-left"></i>
                    <span onClick={handleGoBack}> Go back</span>
                </div>
            </div>
        </>
    );
};
export default Login;
