import PropTypes from "prop-types";
import "./paymentsuccess.css";
import { Link, useParams } from "react-router-dom";

const PaymentSuccess = ({ user }) => {
  const params = useParams();

  return (
    <div className="payment-success-page">
      {user ? (
        <div className="success-message">
          <h2>Payment Successful</h2>
          <p>Your course subscription has been activated</p>
          <p>Reference No: {params.id}</p>
          <Link to={`/${user._id}/dashboard`} className="common-btn">
            Go to Dashboard
          </Link>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

PaymentSuccess.propTypes = {
  user: PropTypes.shape({
    _id: PropTypes.string.isRequired,
  }),
};

export default PaymentSuccess;
