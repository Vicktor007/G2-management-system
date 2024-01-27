
// import useLoggedIn from "../../customHook/useLoggedIn";

// export const ShowOnLogin = ({ children }) => {
//   const isLoggedIn = useLoggedIn();
  

//   if (isLoggedIn) {
//     return <> {children}</>;
//   }
//   return null;
// };

// export const ShowOnLogout = ({ children }) => {
//   const isLoggedIn = useLoggedIn();
  
//   if (!isLoggedIn) {
//     return <> {children}</>;
//   }
//   return null;
// };


import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/features/auth/authSlice";

export const ShowOnLogin = ({ children }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  if (isLoggedIn) {
    return <> {children}</>;
  }
  return null;
};

export const ShowOnLogout = ({ children }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  if (!isLoggedIn) {
    return <> {children}</>;
  }
  return null;
};

// import { useEffect, useState } from "react";
// import useLoggedIn from "../../customHook/useLoggedIn";

// export const ShowOnLogin = ({ children }) => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const loggedIn = useLoggedIn();

//   useEffect(() => {
//     setIsLoggedIn(loggedIn);
//   }, [loggedIn]);

//   if (isLoggedIn) {
//     return <> {children}</>;
//   }
//   return null;
// };

// export const ShowOnLogout = ({ children }) => {
//   const [isLoggedIn, setIsLoggedIn] = useState(true);
//   const loggedIn = useLoggedIn();

//   useEffect(() => {
//     setIsLoggedIn(loggedIn);
//   }, [loggedIn]);

//   if (!isLoggedIn) {
//     return <> {children}</>;
//   }
//   return null;
// };

// import { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import { selectIsLoggedIn } from "../../redux/features/auth/authSlice";

// export const ShowOnLogin = ({ children }) => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const loggedIn = useSelector(selectIsLoggedIn);

//   useEffect(() => {
//     setIsLoggedIn(loggedIn);
//   }, [loggedIn]);

//   if (isLoggedIn) {
//     return <> {children}</>;
//   }
//   return null;
// };

// export const ShowOnLogout = ({ children }) => {
//   const [isLoggedIn, setIsLoggedIn] = useState(true);
//   const loggedIn = useSelector(selectIsLoggedIn);

//   useEffect(() => {
//     setIsLoggedIn(loggedIn);
//   }, [loggedIn]);

//   if (!isLoggedIn) {
//     return <> {children}</>;
//   }
//   return null;
// };

