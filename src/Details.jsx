import React from "react";
import { FaTable, FaUserGraduate } from "react-icons/fa";
function Details({ student, setDetails }) {
  return (
    <div className="details-container" data-testid="details-container">
      <div className="card details-card">
        <div className="details-header">
          <FaUserGraduate className="details-main-icon" />
          <h2 className="details-title">Student Details</h2>
        </div>
        {student && (
          <div className="details-filled">
            <div>
              <label htmlFor="name">Name</label>
              <h3 id="name">{student.firstName + " " + student.lastName}</h3>
            </div>
            <div>
              <label htmlFor="birth">Birth-Date</label>
              <h3 id="birth">{student.birthDate}</h3>
            </div>
            <div>
              <label htmlFor="email">email</label>
              <h3 id="email">{student.email}</h3>
            </div>
            <div>
              <label htmlFor="gpa">GPA</label>
              <h3 id="gpa">{student.gpa}</h3>
            </div>
          </div>
        )}
        {!student && (
          <div className="details-empty">
            <FaTable className="placeholder-icon" />
            <p>
              Please select a student from the <strong>Students Table</strong>{" "}
              to view their detailed academic profile and personal information.
            </p>
            <div className="coming-soon-badge">Feature Expanding Soon</div>
          </div>
        )}
        <button onClick={() => setDetails(false)} className="back-btn">
          go back
        </button>
      </div>
    </div>
  );
}
export default Details;
