import React, { useEffect, Fragment } from "react";
import { getCurrentProfile } from "../../redux/profile/profileActions";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../layout/Spinner";
import { Link } from "react-router-dom";
import DashBoardActions from "./dashBoardActions";
import { deleteAccount } from "../../redux/auth/authActions";
import Experience from "./Experience";
import Education from "./Education";

const Dashboard = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const { profile, loading } = useSelector((state) => state.profile);
  console.log(profile);
  useEffect(() => {
    dispatch(getCurrentProfile());
  }, []);

  return loading && profile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className="large text-primary">Dashboard</h1>
      <p className="lead">
        <i className="fas fa-user"></i>Welcome {user && user.data.name}
      </p>
      {profile !== null ? (
        <Fragment>
          <DashBoardActions />
          <Experience experience={profile.data.experience} />
          <Education education={profile.data.education} />

          <div className="my-2">
            <button
              className="btn btn-danger"
              onClick={() => dispatch(deleteAccount())}
            >
              <i className="fas-user-minus"></i> Delete My Account
            </button>
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <p>You have not yet set up a profile Please add some info</p>
          <Link to="/create-profile" className="btn btn-primary my-1">
            Create profile
          </Link>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Dashboard;
