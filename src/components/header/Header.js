import React, {useState} from 'react'
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    NavbarText,
  } from 'reactstrap';

export default function Header() {
    const [isOpen,setIsOpen] = useState(false);
    const toggle = ()=>{
        setIsOpen(!isOpen)
    }
  return (
    <div>
        <Navbar expand="md">
        <NavbarBrand href="/">AN NGUYEN</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="me-auto" navbar>
            <NavItem>
              <NavLink href="/student">StudentPage</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/addstudent">AddStudentPage</NavLink>
            </NavItem>
          </Nav>
          <NavbarText>AN NGUYEN</NavbarText>
        </Collapse>
      </Navbar>
    </div>
  )
}
