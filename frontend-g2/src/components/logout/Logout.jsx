import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SET_LOGIN } from "../../redux/features/auth/authSlice";
import { BiLogOut } from "react-icons/bi";
import { logoutUser } from "../../redux/features/auth/authService";

const Logout = ({classes, isOpen}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const name = useSelector(selectName);

  const logout = async () => {
    await logoutUser();
    await dispatch(SET_LOGIN(false));
    navigate("/");
  };

  return (
    <>
    <button onClick={logout} className={`--btn --btn-danger width-in ${classes}`}>
      <span className="icon"><BiLogOut /></span>
      {isOpen && <span>Logout</span> }
          
        </button>
        </>
  );
};

export default Logout;
