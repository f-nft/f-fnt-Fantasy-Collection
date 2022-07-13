import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'sf-font';
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import {connectWallet,disconnectWallet} from '../AppFunctional'
import {useEffect,useState} from 'react'
import './MyNavBar.css';
import NetworkOptions from './NetwokOptions';
import { Modal } from 'react-bootstrap';
function MyNavBar() {
    const[loggedin,setLoggedin]=useState(true)
     const [show, setShow] = useState(false);

     const handleClose = () => setShow(false);
     const handleShow = () => setShow(true);
    useEffect(() => {
      setLoggedin(localStorage.getItem("isWalletConnected"));
      if (loggedin) {
        
      } else
       setLoggedin(false);
    }, [loggedin]);
    return (
        <div>
      <Navbar collapseOnSelect expand="lg" bg="light" variant="light" className="CustomNav" >

          <Navbar.Brand href="#home">
            Brand Logo here
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mx-auto">
               <ul className='navbar-nav me-auto mb-2 px-3 mb-md-0' style={{ fontSize: '22px' }}>
                        <li className='nav-item'>
                            <a className='nav-link active' aria-current='page' to='/'style={{color:"#e50303"}}>Dashboard</a>
                        </li>
                        <li className='nav-item'>
                            <a className='nav-link' to='/about' style={{color:"#e50303"}}>List NFTs</a>
                        </li>
                        <li className='nav-item'>
                            <a className='nav-link' to='/'style={{color:"#e50303"}}>Upgrade NFTs</a>
                        </li>
                    </ul>
            </Nav>
                {loggedin==="false" ? (
                    <div className="p-3">
                        <Button id="connectbtn"  onClick={connectWallet} style={{ fontSize: "17px", border: "0.2px", borderRadius: "15px",fontFamily: "Rambla",backgroundColor:"#e50303" }}>
                            Connect Your Wallet
                        </Button>
                    </div>
                ) : (
                    <div className="p-3">
                        <Button id="connectbtn" onClick={disconnectWallet} style={{ fontSize: "17px", border: "0.2px", borderRadius: "15px", boxShadow: "1px 1px 5px #000000", fontFamily: "Rambla",backgroundColor:"#e50303" }}>
                                Disconnect Wallet
                            </Button>
                    </div>
                )}
                 <div className="p-3">
                 <Button id="connectbtn" onClick={handleShow} style={{ fontSize: "17px", border: "0.2px", borderRadius: "15px", fontFamily: "Rambla",backgroundColor:"#e50303" }}>
                                Select Network
                            </Button>
                            </div>
          </Navbar.Collapse>
      </Navbar>
         <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Select Network</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <NetworkOptions/>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
        </div>
    );
}
export default MyNavBar;




/* 
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink } from 'react-router-dom';
import { useEffect } from 'react';

function CollapsibleExample() {
  return (
 <nav className='navbar navbarfont navbarglow navbar-expand-md navbar-dark bg-dark mb-4'>

            <div className='container-fluid'>
                <img className='react-logo' src='FNFT.png' width='8%' />
                <a className='navbar-brand px-5' style={{ fontWeight: '800', fontSize: '22px' }} to='/'></a>
                <img className='react-logo' src='FNFT.png' width='8%' />
                <Button className='navbar-toggler' type='Button' data-bs-toggle='collapse' data-bs-target='/navbarCollapse' aria-controls='navbarCollapse' aria-expanded='false' aria-label='Toggle navigation'>
                    <span className='navbar-toggler-icon'></span>
                </Button>
                <div className='collapse navbar-collapse' id='navbarCollapse'>
                    <ul className='navbar-nav me-auto mb-2 px-3 mb-md-0' style={{ fontSize: '22px' }}>
                        <li className='nav-item'>
                            <a className='nav-link active' aria-current='page' to='/'>Dashboard</a>
                        </li>
                        <li className='nav-item'>
                            <arguments className='nav-link' to='/'>List NFTs</arguments>
                        </li>
                        <li className='nav-item'>
                            <a className='nav-link' to='/'>Upgrade NFTs</a>
                        </li>
                    </ul>
                </div>
            </div>
    
            <div className='px-5'>
                <input id='connectbtn' type='Button' className='connectbutton' style={{ fontSize: '15px', border: '0.2px', borderRadius: '14px', boxShadow: '1px 1px 5px #000000', fontFamily: 'Rambla' }} value='Connect Your Wallet' />
            </div>
        </nav>
  );
}

export default CollapsibleExample; */