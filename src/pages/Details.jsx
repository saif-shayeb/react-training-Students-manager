import { FaTable, FaUserGraduate } from "react-icons/fa";
import CustomBtn from "../components/CustomBtn";

function Details({ student, setShowing }) {
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
              <h3 id="birth">{String(student.birthDate || "").split("T")[0]}</h3>
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
        <CustomBtn onClick={() => setShowing(false)}>go back</CustomBtn>
      </div>
    </div>
  );
}
export default Details;
