import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { menuData } from './data/menuData';
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap CSS
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Bootstrap JS
import styled from 'styled-components';

const NavBox = styled.nav`
  width: ${(props) => (props.collapsed ? '80px' : '260px')};
  height: 100vh;
  background-color: #00A8E8;
  position: sticky;
  top: 0;
  transition: width 0.3s ease; /* Smooth transition */
  margin: 0;
  padding: 0;

  .navbar-nav {
    padding: 0;
    list-style: none;
  }

  .nav-item {
    padding: 10px;
  }

  .nav-link {
    text-decoration: none;
    color: white;
    display: flex;
    align-items: center;
  }

  .icon {
    margin-right: ${(props) => (props.collapsed ? '0' : '10px')};
    transition: margin 0.3s ease;
  }

  .nav-item.active .nav-link,
  .nav-item.active {
    background-color: white;
    color: #E65F2B;
  }

  .container-fluid {
    width: 100%;
    padding: 0;
  }

  .collapse .navbar-collapse,
  ul {
    width: 100%;
  }
`;

const TitleBox = styled.div`
  width: 100%;
  height: 120px;
  display: ${(props) => (props.collapsed ? 'none' : 'flex')};
  justify-content: center;
  align-items: center;
  font-family: 'Abel';
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  font-style: normal;
  font-weight: 400;
  font-size: 36px;
  line-height: 46px;
  color: white;
  transition: display 0.3s ease;
`;

const ToggleBox = styled.div`
  display: flex;
  width: 100%;
  justify-content: ${(props) => (props.collapsed ? '' : 'center')};
`;

const ToggleButton = styled.button`
  background: transparent;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  transition: left 0.3s ease;
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Menu = () => {
  const [collapsed, setCollapsed] = useState(false); // State for collapsing
  const location = useLocation();
  
  // URL의 첫 번째 경로 부분만 추출하고, `/`인 경우 `main`으로 변경
  const section = location.pathname === '/' ? 'main' : location.pathname.split('/')[1];

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <>
      <NavBox collapsed={collapsed} className="navbar navbar-expand-lg flex-column">
        <ToggleBox>
          <TitleBox collapsed={collapsed}>PBL-P</TitleBox>
          <ToggleButton collapsed={collapsed} onClick={toggleSidebar}>
            <i className="fa-solid fa-bars"></i>
          </ToggleButton>
        </ToggleBox>
        <div className="container-fluid">
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav flex-column">
              {menuData.map((item) => (
                <li
                  key={item.id}
                  className={`nav-item ${
                    section === item.route.substring(1) ? 'active' : ''
                  }`}
                >
                  <Link className="nav-link" to={item.route}>
                    <span className="icon">{item.icon}</span>
                    {!collapsed && item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </NavBox>
    </>
  );
};

export default Menu;