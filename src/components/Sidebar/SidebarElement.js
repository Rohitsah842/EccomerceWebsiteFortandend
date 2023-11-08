import styled from 'styled-components';
import { RxCross2 } from "react-icons/rx"
import { NavLink as Link } from "react-router-dom"

export const Side = styled.div`
width: 250px;
 height:100vh;
 position:absolute;
 top:0;
 right:0;
 background-color:#0e0c0c;
 z-index:200;
 @media screen and (min-width: 920px) {
        display: none;
      }
 `;
export const CrossCircled = styled(RxCross2)`
    margin: 15px;
    color: white;
    font-size: 2rem;
 `;
export const SideMenu = styled.div`
  align-items: center;
  margin-right: -24px;

`;

export const NavLink = styled(Link)`
  color: #fff;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 1rem;
  height: 100%;
  cursor: pointer;
  justify-content: center;
  font-size: 1rem;

  &.active {
    color: #15cdfc;
  }
`;

export const SideBtn = styled.span`
  display: flex;
  align-items: center;
  margin-right: 24px;
  justify-content: center;
`;

export const SideBtnLink = styled(Link)`
    font-size: 1rem;
  border-radius: 4px;
  background: #256ce1;
  padding: 10px 22px;
  color: #fff;
  outline: none;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  

  /* Second Nav */
  margin-left: 24px;

  &:hover {
    transition: all 0.2s ease-in-out;
    background: #fff;
    color: #010606;
  }
`;