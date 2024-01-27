import { useDispatch } from "react-redux";
import { SET_LOGIN } from "../redux/features/auth/authSlice";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { getLoginStatus } from "../services/authService";



const useLoggedIn = () => {
const dispatch = useDispatch();

  useEffect(() => {
    const loggedIn = async () => {
      const isLoggedIn = await getLoginStatus();

      dispatch(SET_LOGIN(isLoggedIn));

      if (!isLoggedIn ) {
        toast.info("Session expired, please login to continue.");
        
        return;
      }
    };
    loggedIn();
  }, [dispatch]);
};

export default useLoggedIn;
