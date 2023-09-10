import { useContext } from 'react';
import { Alert } from 'react-bootstrap';
import { UserContext } from '~/context/UserContext';

const PrivateRoutes = (props) => {
    console.log(props);
    const { user } = useContext(UserContext);

    if (user && !user.auth) {
        return (
            <>
                <Alert variant="danger" className="mt-3">
                    <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
                    <p>You don't have permission to access this route.</p>
                </Alert>
            </>
        );
    }

    return (
        <>
            {/* Muốn lấy được component con từ component cha thì ta dùng props.children để lấy được chứ ko phải là children, 
                
                  console.log(props); sẽ thấy trong props nó đã chứa sẵn children*/}
            {/* <Route path="/users" element={props.children} /> */}
            {props.children}
        </>
    );
};

export default PrivateRoutes;
