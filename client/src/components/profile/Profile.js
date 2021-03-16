import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../layout/Spinner";
import { getProfileById } from "../../redux/profile/profileActions";
import { Link } from "react-router-dom";
import ProfileTop from "./ProfileTop";
import ProfileAbout from "./ProfileAbout";
import ProfileExperience from "./ProfileExperience";
import ProfileEducation from "./ProfileEducation";
import ProfileGithub from "./ProfileGithub";
const Profile = ({ match }) => {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile.profile);
  const loading = useSelector((state) => state.profile.loading);
  const auth = useSelector((state) => state.auth);

  console.log(profile);

  useEffect(() => {
    dispatch(getProfileById(match.params.id));
  }, [dispatch]);
  return "";
  // <div>{profile.experience > 0 ? <div>exp</div> : <div>No exp</div>}</div>
};

export default Profile;
