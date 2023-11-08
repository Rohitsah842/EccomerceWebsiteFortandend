import { FaBars, FaSearch } from 'react-icons/fa';
import { NavLink as Link } from 'react-router-dom';
import styled from 'styled-components';

export const Nav = styled.nav`
position: sticky;
top: 0;
  background: #000;
  align-items:center;
  height: 80px;
  display: flex;
  justify-content: space-between;
  padding: 0.5rem calc((10vw - 100px) / 2);
  z-index: 10;

  @media screen and (max-width: 920px) {
    justify-content:normal;
  }
 
`;

export const NavLink = styled(Link)`
  color: #fff;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0 1rem;
  height: 100%;
  cursor: pointer;

  &.active {
    color: #15cdfc;
  }
`;

export const Bars = styled(FaBars)`
  display: none;
  color: #fff;

  @media screen and (max-width: 920px) {
    display: block;
    position: absolute;
    top: 10px;
    right: 0;
    transform: translate(-100%, 75%);
    font-size: 1.8rem;
    cursor: pointer;
  }
`;

export const NavMenu = styled.div`
  display: flex;
  align-items: center;
  margin-right: -24px;


  @media screen and (max-width: 920px) {
    display: none;
  }
`;

export const NavBtn = styled.nav`
  display: flex;
  align-items: center;
  margin-right: 24px;

 
`;

export const NavBtnLink = styled(Link)`
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

export const Img = styled.img`
height: 100%;
    width: 100%;
    padding: 50%,50%;
    border-radius: 50%;
    @media screen and (max-width: 920px) {

        height: 75%;
        font-size: 1.8rem;
        cursor: pointer;
      }
      `;

export const Input = styled.input`
     border-radius: 25px;
     padding-left: 20px;
      height: 50px;
      width:30vw;
      @media screen and (max-width: 920px) {
        width:50vw;
        height: 45px;
      }
      &:focus{
        outline:none;
      }
      `
export const NavInput = styled.span`
    display: flex;
  align-items: center;
  margin-right: -24px;
  background-color: white;
    border-radius: 50px;

`
export const SearchIcon = styled(FaSearch)`
position:abosolut;
padding: 0px 20px;
font-size:large;
top:0;
right:0;
border:none;
border-radius:50%
`
