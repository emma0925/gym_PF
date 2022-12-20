import {Link, Outlet} from "react-router-dom";

const Layout = () => {
    return (
        <>
            <nav>
                <Link to="/register">Register</Link>
                <Link to="/updateprofile">Update Profile</Link>
                <Link to="/login">Login</Link>
                <Link to="/retrieveprofile">Get Profile Info</Link>
                <Link to="/studiosub">Create Studio Subscription</Link>
                <Link to="/usersub">Create User Subscription</Link>
                <Link to="/viewstudiosub">View Studio Subscription</Link>
                <Link to="/viewusersub">View User Subscription</Link>
                <Link to = "/display_all">test</Link>
                <Link to = "/userData">test</Link>
            </nav>
            <Outlet />
        </>
    )
}

export default Layout;