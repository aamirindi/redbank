import "../../style/SignIn.css";
import logo from "./logo.png";
import { useNavigate } from "react-router-dom";
import { signInWithPopup } from "firebase/auth";
import useAnimation from "../../hooks/useAnimation";
import { db, auth, provider } from "../../Firebase";
import { collection, getDocs, where, query } from "firebase/firestore";
import googleLogo from "./image8-2.jpg";

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
    // console.log(q);

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
      <div className="sign-in">
        <h1 className="animation fade_in">
          Red<span>Bank</span>
        </h1>
        <img
          className="centered-image animation "
          src={logo}
          alt="SignIn logo"
          height={400}
          width={400}
        />

        <button className="btn animation slide_up" onClick={googleClick}>
          <img src={googleLogo} alt="" width="17%" />
          <p>Sign Up with Google</p>
        </button>
      </div>
    </div>
  );
}
