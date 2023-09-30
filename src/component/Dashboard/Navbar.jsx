import "../../style/Navbar.css";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const auth = getAuth();

  const logOut = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      navigate("/");
    });
  };

  return (
    <div className="nav">
      <h2>
        <span>Red</span>Bank
      </h2>
      <div className="nav-user">
        <div className="nav-link">
          {location.pathname !== "/dashboard" && (
            <Link to={"/dashboard"} className="nav-btn-user">
              Back to Dashboard
            </Link>
          )}

          {location.pathname === "/dashboard" && (
            <button className="nav-btn-out" onClick={logOut}>
              Sign Out
            </button>
          )}
        </div>
        <div className="user-img" id="user-img">
          <img src={auth.currentUser?.photoURL} alt="user-profile-pic" />
        </div>
      </div>
    </div>
  );
}
