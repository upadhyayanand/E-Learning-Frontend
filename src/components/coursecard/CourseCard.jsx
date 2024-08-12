import "./courseCard.css";
import PropTypes from "prop-types";
import { server } from "../../main";
import { UserData } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { CourseData } from "../../context/CourseContext";

const CourseCard = ({ course }) => {
  const navigate = useNavigate();
  const { user, isAuth } = UserData();
  const { fetchCourses } = CourseData();

  const deleteHandler = async (id) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      try {
        const { data } = await axios.delete(`${server}/api/course/${id}`, {
          headers: {
            token: localStorage.getItem("token"),
          },
        });

        toast.success(data.message);
        fetchCourses();
      } catch (error) {
        toast.error(error.response.data.message);
      }
    }
  };

  const renderButton = () => {
    if (isAuth) {
      if (user.role !== "admin") {
        return user.subscription.includes(course._id) ? (
          <button
            onClick={() => navigate(`/course/study/${course._id}`)}
            className="common-btn"
          >
            Study
          </button>
        ) : (
          <button
            onClick={() => navigate(`/course/${course._id}`)}
            className="common-btn"
          >
            Get Started
          </button>
        );
      } else {
        return (
          <button
            onClick={() => navigate(`/course/study/${course._id}`)}
            className="common-btn"
          >
            Study
          </button>
        );
      }
    } else {
      return (
        <button onClick={() => navigate("/login")} className="common-btn">
          Get Started
        </button>
      );
    }
  };

  return (
    <div className="course-card">
      <img
        src={`${server}/${course.image}`}
        alt={course.title}
        className="course-image"
      />
      <h3>{course.title}</h3>
      <p>Instructor: {course.createdBy}</p>
      <p>Duration: {course.duration} weeks</p>
      <p>Price: ₹{course.price}</p>
      {renderButton()}
      <br />
      {user && user.role === "admin" && (
        <button
          onClick={() => deleteHandler(course._id)}
          className="common-btn"
          style={{ background: "red" }}
        >
          Delete
        </button>
      )}
    </div>
  );
};

CourseCard.propTypes = {
  course: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    createdBy: PropTypes.string.isRequired,
    duration: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
};

export default CourseCard;
