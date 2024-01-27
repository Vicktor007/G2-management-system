import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Card from "../../components/card/Card";
import { SpinnerImg } from "../../components/loader/Loader";
import useRedirectLoggedOutUser from "../../customHook/useRedirectLoggedOutUser";
import { SET_NAME, SET_USER } from "../../redux/features/auth/authSlice";
import { deleteUserAccount, getUser } from "../../services/authService";
import "./Profile.scss";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { toast } from "react-toastify";

const Profile = () => {
  useRedirectLoggedOutUser("/login");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);


  const deleteUser = async (id) => {
    
    await deleteUserAccount(id);
    toast.success("User Account Deleted successfully");
    await navigate("/")
  };

  const confirmDelete = (id) => {
    confirmAlert({
      title: "Delete Your Account",
      message: "Are you sure you want to delete Your Account?.",
      buttons: [
        {
          label: "Delete",
          onClick: () => deleteUser(id),
        },
        {
          label: "Cancel",
          
        },
      ],
    });
  };


  useEffect(() => {
   
    setIsLoading(true);
    async function getUserData() {
      const data = await getUser();
      

      setProfile(data);
      setIsLoading(false);
      await dispatch(SET_USER(data));
      await dispatch(SET_NAME(data.name));
    }
    getUserData();
  }, [dispatch]);


  

  return (
    <div className="profile --my2 --pad displayflex">
      {isLoading && <SpinnerImg />}
      <>
        {!isLoading && profile === null ? (
          <p>Something went wrong, please reload the page...</p>
        ) : (
          <Card cardClass={"card --flex-dir-column"}>
            <span className="profile-photo">
              <img src={profile?.photo} alt="profilepic" />
            </span>
            <span className="profile-data">
              <p>
                <b>Name : </b> {profile?.name}
              </p>
              <p>
                <b>Email : </b> {profile?.email}
              </p>
              <p>
                <b>Phone : </b> {profile?.phone}
              </p>
              <p>
                <b>Bio : </b> {profile?.bio}
              </p>
              <div className="actions">
                <Link to="/edit-profile" >
                  <button className="--btn --btn-primary edit-profile">Edit Profile</button>
                </Link>
                <button className="--btn --btn-primary badge" onClick={() => confirmDelete(profile?.id)}>Delete Acccount</button>
              </div>
            </span>
            

          </Card>
        )}
      </>
    </div>
  );
};

export default Profile;
