import { useEffect } from "react";
import "./coursestudy.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { CourseData } from "../../context/CourseContext";
import { server } from "../../main";
import PropTypes from "prop-types"; // Import PropTypes

const CourseStudy = ({ user }) => {
  const params = useParams();
  const navigate = useNavigate();

  const { fetchCourse, course } = CourseData();

  // Redirect if user is not authorized
  useEffect(() => {
    if (
      user &&
      user.role !== "admin" &&
      !user.subscription.includes(params.id)
    ) {
      navigate("/");
    } else {
      fetchCourse(params.id);
    }
  }, [params.id, user, fetchCourse, navigate]); // Added dependencies

  return (
    <>
      {course ? (
        <div className="course-study-page">
          <img
            src={`${server}/${course.image}`}
            alt={course.title}
            width={350}
          />
          <h2>{course.title}</h2>
          <h4>{course.description}</h4>
          <h5>by - {course.createdBy}</h5>
          <h5>Duration - {course.duration} weeks</h5>
          <Link to={`/lectures/${course._id}`}>
            <h2>Lectures</h2>
          </Link>
        </div>
      ) : (
        <p>Loading...</p> // Display a loading message if course is not available
      )}
    </>
  );
};

// Adding PropTypes validation
CourseStudy.propTypes = {
  user: PropTypes.shape({
    _id: PropTypes.string,
    role: PropTypes.string,
    subscription: PropTypes.arrayOf(PropTypes.string),
  }),
};

export default CourseStudy;
