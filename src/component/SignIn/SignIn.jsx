import "../../style/SignIn.css";
import logo from "./logo.png";
import { useNavigate } from "react-router-dom";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../Firebase";
import useAnimation from "../../hooks/useAnimation";
import { db } from "../Firebase";
import { collection, getDocs, where, query } from "firebase/firestore";

// eslint-disable-next-line react/prop-types
export default function SignIn({ setIsAuth }) {
  const navigate = useNavigate();
  useAnimation("animation");

  const googleClick = () => {
    signInWithPopup(auth, provider).then((result) => {
      localStorage.setItem("isAuth", true);
      setIsAuth(true);
      getUser(result.user.uid);
    });
  };

  const getUser = (uid) => {
    const collectionRef = collection(db, "user");
    const q = query(collectionRef, where("author.id", "==", uid));

    getDocs(q)
      .then((querySnapshot) => {
        if (!querySnapshot.empty) {
          querySnapshot.forEach((doc) => {
            navigate("/dashboard");
          });
        } else {
          navigate("/register");
        }
      })
      .catch((error) => {
        console.error("Error querying Firestore:", error);
      });
  };

  return (
    <div className="centered-container">
      <img
        className="centered-image animation slide_up"
        src={logo}
        alt="SignIn logo"
        height={400}
        width={400}
      />

      <button className="btn animation slide_up" onClick={googleClick}>
        SignIn using Google
      </button>
    </div>
  );
}
