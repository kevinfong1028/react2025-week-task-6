import { useState } from "react";
import { Outlet, NavLink } from "react-router";

function App() {
    const handleActiveLink = ({ isActive }) => {
        console.log("isActive", isActive);
        return `h5 text-decoration-none mx-2 ${isActive ? "active" : ""}`;
    };
    return (
        <>
            <ul className="d-flex border list-unstyled p-2 bg-secondaryX text-lightX">
                <li>
                    <NavLink className={handleActiveLink} to="/">
                        Home
                    </NavLink>
                </li>{" "}
                |
                <li>
                    <NavLink className={handleActiveLink} to="/products">
                        Products
                    </NavLink>
                </li>{" "}
                |
                <li>
                    <NavLink className={handleActiveLink} to="/cart">
                        Cart
                    </NavLink>
                </li>
            </ul>
            <Outlet></Outlet>
        </>
    );
}

export default App;
