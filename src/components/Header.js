import { Nav, Navbar, NavDropdown, Container } from 'react-bootstrap';
import { useLocation, NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import logoApp from '~/assets/images/logo192.png';
import { useContext } from 'react';
import { UserContext } from '~/context/UserContext';

const Header = (props) => {
    const { logout, user } = useContext(UserContext);
    // const [hideHeader, setHideHeader] = useState(false);

    let location = useLocation();
    const navigate = useNavigate();
    const handleLogout = () => {
        logout();
        navigate('/');
        toast.success('Logout successful');
    };

    return (
        <>
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand href="/">
                        <img
                            src={logoApp}
                            width="30"
                            height="30"
                            className="d-inline-block align-top"
                            alt="React Bootstrap logo"
                        />

                        <span> Profile's App</span>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto" activeKey={location.pathname}>
                            {/* activeKey={location.pathname} do bold word when clicked */}
                            {/* <Nav.Link href="/">Home</Nav.Link>
                            <Nav.Link href="/users">Manager Users</Nav.Link> */}
                            {/* <Nav.Link> */}

                            {((user && user.auth) || window.location.pathname === '/') && (
                                <>
                                    <NavLink to="/" className="nav-link">
                                        Home
                                    </NavLink>
                                    {/* </Nav.Link> */}
                                    {/* <Nav.Link> */}
                                    <NavLink to="/users" className="nav-link">
                                        Manager Users
                                    </NavLink>
                                </>
                            )}
                            {/* </Nav.Link> */}
                        </Nav>

                        <Nav>
                            {user && user.email && <span className="nav-link">Welcome to {user.email}</span>}
                            <NavDropdown title="Setting" id="basic-nav-dropdown">
                                {/* thêm user bởi vì nếu không có user nghĩa là undefined thì user.auth sẽ bị sai nghĩa là undefined.auth do đó nó sẽ chết cả giao diện */}
                                {user && user.auth ? (
                                    <NavDropdown.Item onClick={() => handleLogout()}>Logout</NavDropdown.Item>
                                ) : (
                                    <NavLink to="/login" className="dropdown-item">
                                        Login
                                    </NavLink>
                                )}
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
};

export default Header;
