import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { menuData } from './data/menuData';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import styled from 'styled-components';
import background from './data/background.png';
import toggleButton from './data/toggleButton.png';

const NavBox = styled.nav`
  width: ${(props) => (props.collapsed ? '60px' : '270px')};
  background-color: #00A8E8;
  background-image: url(${background});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  position: sticky;
  top: 0;
  transition: width 0.3s ease;
  margin: 0;
  padding: 0;

  .navbar-nav {
    padding: 0;
    list-style: none;
  }

  .nav-item {
    padding: 10px;
    margin-bottom: 20px;

    &:hover {
      background-color: rgba(255, 255, 255, 0.1); /* Hover시 배경색을 살짝 밝게 변경 */
      transition: background-color 0.3s ease;
    }
  }

  .nav-link {
    text-decoration: none;
    color: white;
    display: flex;
    align-items: center;
    padding: 14px;
    font-size: 22px;
    white-space: nowrap;
    transition: color 0.3s ease;

    &:hover {
      color: ${(props) => props.activeColor}; /* Hover시 활성화 색상 적용 */
    }
  }

  .icon {
    margin-right: ${(props) => (props.collapsed ? '0' : '10px')};
    transition: margin 0.3s ease;
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
  margin-right: ${(props) => (props.collapsed ? '0px' : '24px')};
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
`;

const IconImage = styled.img`
  width: 40px;
  height: 40px;
`;

const Menu = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  // URL의 첫 번째 경로 부분만 추출하고, `/`인 경우 `main`으로 변경
  const section = location.pathname === '/' ? 'main' : location.pathname.split('/')[1];

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <NavBox collapsed={collapsed} className="navbar navbar-expand-lg flex-column">
      <ToggleBox>
        <TitleBox collapsed={collapsed}>PBL-P</TitleBox>
        <ToggleButton collapsed={collapsed} onClick={toggleSidebar}>
          <IconImage src={toggleButton} alt="Toggle" />
        </ToggleButton>
      </ToggleBox>
      <div className="container-fluid">
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav flex-column">
            {menuData.map((item) => (
              <li
                key={item.id}
                className="nav-item"
                style={{
                  backgroundColor: section === item.route.substring(1) ? 'white' : 'transparent',
                }}
              >
                <Link
                  className="nav-link"
                  to={item.route}
                  style={{
                    color: section === item.route.substring(1) ? item.activeColor : 'white',
                  }}
                >
                  <span className="icon">{item.icon}</span>
                  {!collapsed && item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </NavBox>
  );
};

export default Menu;
