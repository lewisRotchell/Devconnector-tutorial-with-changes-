import React, { Fragment } from "react";
import { useDispatch } from "react-redux";
import formatDate from "../../utils/formatDate";
import { deleteEducation } from "../../redux/profile/profileActions";

const Education = ({ education }) => {
  const dispatch = useDispatch();
  const educations = education.map((ed) => (
    <tr key={ed._id}>
      <td>{ed.school}</td>
      <td className="hide-sm">{ed.degree}</td>
      <td>
        {formatDate(ed.from)} - {ed.to ? formatDate(ed.to) : "Now"}
      </td>
      <td>
        <button
          onClick={() => dispatch(deleteEducation(ed._id))}
          className="btn btn-danger"
        >
          Delete
        </button>
      </td>
    </tr>
  ));
  return (
    <Fragment>
      <h2 className="my-2">Education Credentials</h2>
      <table className="table">
        <thead>
          <tr>
            <th>School</th>
            <th className="hide-sm">Degree</th>
            <th className="hide-sm">Years</th>
            <th />
          </tr>
        </thead>
        <tbody>{educations}</tbody>
      </table>
    </Fragment>
  );
};

export default Education;
