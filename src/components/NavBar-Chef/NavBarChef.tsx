import { Container,  Dropdown,  Nav, Navbar } from "react-bootstrap";
import { Person } from "react-bootstrap-icons";
import { useNavigate } from 'react-router-dom';
import useIsLoggedIn from "../../hooks/useisLoggedIn";


const NavBarChef: React.FC = () => {
  const navigate = useNavigate();
  const isLoggedIn: boolean = useIsLoggedIn();

  function onLogOut(){
    window.localStorage.removeItem('isLoggedIn');
    navigate('/');
  }

  //Render
  return (
    <Navbar expand="lg" bg="light">
      <Container>
        <Navbar.Brand href="#">
          <img src="src/assets/images/Logo.svg" alt="Logo el buen sabor" id="LogoNavPrincipal" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarNav" />
        <Navbar.Collapse id="navbarNav">
          <Nav className="ml-auto">
            <Nav.Link onClick={() => navigate('/Pedidos')}>Mis Pedidos</Nav.Link>
            <Nav.Link onClick={() => navigate('/stock')}>Stock</Nav.Link>
            <Nav.Link onClick={() => navigate('/RubroManufacturado')}>Rubro</Nav.Link>
            
          </Nav>    
        </Navbar.Collapse>
        <Nav className="ml-auto justify-content-center mt-3 mb-0 gap-3">
        <Dropdown>
            <Dropdown.Toggle variant="light" id="dropdownMenu2" className="btnCuenta">
              Chef Rocco
              <Person />
            </Dropdown.Toggle>
            <Dropdown.Menu aria-labelledby="dropdownMenu2">
              {isLoggedIn && <Dropdown.Item onClick={onLogOut}>Salir </Dropdown.Item>}
            </Dropdown.Menu>
          </Dropdown>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavBarChef;
