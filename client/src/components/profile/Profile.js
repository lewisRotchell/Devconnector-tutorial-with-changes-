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

  useEffect(() => {
    dispatch(getProfileById(match.params.id));
  }, [dispatch, match.params.id]);

  // if (profile) {
  //   console.log(profile.data);
  //   return (
  //     <Fragment>
  //       <Link to="/profiles" className="btn btn-light">
  //         Back To Profiles
  //       </Link>
  //     </Fragment>
  //   );

  // } else return <Spinner />;

  return (
    <Fragment>
      {profile === null ? (
        <Spinner />
      ) : (
        <Fragment>
          <Link to="/profiles" className="btn btn-light">
            Back To Profiles
          </Link>
          {auth.isAuthenticated &&
            auth.loading === false &&
            auth.user.data._id === profile.data.user._id && (
              <Link to="/edit-profile" className="btn btn-dark">
                Edit Profile
              </Link>
            )}
          <div className="profile-grid my-1">
            <ProfileTop profile={profile.data} />
            <ProfileAbout profile={profile.data} />
            <div className="profile-exp bg-white p-2">
              <h2 className="text-primary">Experience</h2>
              {profile.data.experience.length > 0 ? (
                <Fragment>
                  {profile.data.experience.map((experience) => (
                    <ProfileExperience
                      key={experience._id}
                      experience={experience}
                    />
                  ))}
                </Fragment>
              ) : (
                <h4>No experience credentials</h4>
              )}
            </div>

            <div className="profile-edu bg-white p-2">
              <h2 className="text-primary">Education</h2>
              {profile.data.education.length > 0 ? (
                <Fragment>
                  {profile.data.education.map((education) => (
                    <ProfileEducation
                      key={education._id}
                      education={education}
                    />
                  ))}
                </Fragment>
              ) : (
                <h4>No education credentials</h4>
              )}
            </div>

            {profile.data.githubusername && (
              <ProfileGithub username={profile.data.githubusername} />
            )}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Profile;

// Hi Will, thanks for writing back. It's my fault, I deleted most of the code before pushing it to github in order to try to strip it back and understand why I was getting the error.
