import "../../style/Navbar.css";
import { getAuth, signOut } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";
import { db } from "../../Firebase";
import { useState, useEffect } from "react";

export default function Navbar() {
  const navigate = useNavigate();
  const auth = getAuth();

  const [users, setUsers] = useState([]);
  const [url, setUrl] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const snapshot = await getDocs(collection(db, "user"));
        const userData = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setUsers(userData);
      } catch (error) {
        console.error("Error fetching documents:", error);
      }
      // console.log(users);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const userData = () => {
      for (var i = 0; i < users.length; i++) {
        if (users[i].author.id == auth.currentUser.uid) {
          // console.log(users[i].author.id, auth.currentUser.uid);
          setUrl(users[i].id);
          break;
        }
      }
      // console.log(url);
    };

    userData();
  }, [users]);

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
          {location.pathname !== "/dashboard" && <></>}
          {location.pathname === "/dashboard" && (
            <Link to={`/updateuser/${url}`} className="nav-btn-update">
              Update User
            </Link>
          )}

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
