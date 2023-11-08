import React from 'react'
import { SideMenu, Side, SideBtn, NavLink, SideBtnLink, CrossCircled } from './SidebarElement'
import { RxCross2 } from 'react-icons/rx';

function Sidebar(props) {

    const toggleHandler = () => {
        props.method();
    }

    return (
        <>
            <Side >
                <CrossCircled onClick={toggleHandler} />

                <SideMenu>
                    <NavLink to="/about" activeStyle onClick={toggleHandler}>
                        About</NavLink>
                    <NavLink to="/service" activeStyle onClick={toggleHandler}>
                        Service</NavLink>
                    <NavLink to="/contact-us" activeStyle onClick={toggleHandler}>
                        Contact-us</NavLink>
                    <NavLink to="/sign-up" activeStyle onClick={toggleHandler} >
                        Sign-Up</NavLink>
                    <SideBtn>
                        <SideBtnLink to="/sign-in" onClick={toggleHandler}>Sign-In</SideBtnLink>
                    </SideBtn>
                </SideMenu>
            </Side>
        </>
    )
}

export default Sidebar;
