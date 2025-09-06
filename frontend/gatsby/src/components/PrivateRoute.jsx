import React, { useContext } from "react"
import { navigate } from "gatsby"
import { AuthContext } from "../context/AuthContext";

const PrivateRoute = ({ component: Component, location, ...rest }) => {
    const {user} = useContext(AuthContext);
    console.log("PrivateRoute user:", user);
  if (user?.id && location.pathname !== `/app/login`) {
    navigate("/app/login")
    return null
  }

  return <Component {...rest} />
}

export default PrivateRoute