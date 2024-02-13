import useAnimation from "../../hooks/useAnimation";
import "../../style/Dashboard.css";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Navbar from "./Navbar";
import Carousels from "../Carousel/Carousel";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
import { Link } from "react-router-dom";

// eslint-disable-next-line react/prop-types
export default function Dashboard({ isAuth, setIsAuth }) {
  const auth = getAuth();
  useAnimation("animation");
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (data) => {
      setIsAuth(data);
    });

    if (!isAuth) {
      navigate("/");
    }
  }, []);

  return (
    <>
      <Navbar setIsAuth={setIsAuth} />
      <div className="content">
        <div className="left animation fade_in">
          <h2>Hey {auth.currentUser?.displayName},</h2>
          <p>
            Looking for <span>Blood</span>?
          </p>
        </div>
        <div className="right animation slide_right ">
          <h4 className="heartbeat">
            <span>Blood</span> Facts
          </h4>
          <div className="carousel ">
            <Carousels />
          </div>
        </div>
      </div>
      <div className="bottom">
        <Link to="/nearbyrequests" className="request animation slide_left ">
          🔍Find Donors🗺️
          <p>Live requests of nearBy 10km area</p>
        </Link>
        <Link to="/finddonors" className="donors animation slide_right ">
          Interested in donating Blood🩸?
          <p>Blood donation form</p>
        </Link>
      </div>
      <Link to="/allrequests" className="all_requests animation slide_up ">
        All Requests
        <p>Live Requests All Over India</p>
      </Link>
      <Footer />
    </>
  );
}
