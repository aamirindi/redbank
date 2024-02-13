import { useState } from "react";
import "../../style/Register.css";
import { getAuth } from "firebase/auth";
import { db } from "../../Firebase";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import bg from "../Register/1_KJACFKJ0GKtnhgR7OmlPFA.gif";
import useAnimation from "../../hooks/useAnimation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";

// eslint-disable-next-line react/prop-types
function Register({ isAuth }) {
  useAnimation("animation");
  const auth = getAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    phonenumber: "",
    dob: "",
    bloodgroup: "",
    gender: "",
    bloodDonation: "",
    recovered: "",
    author: { id: auth.currentUser.uid, email: auth.currentUser.email },
  });

  // console.log(auth.currentUser.uid);

  const handleChange = (e) => {
    // console.log("Handle Change")
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // console.log(formData.name);
  };
  useEffect(() => {
    if (!isAuth) {
      navigate("/");
    }
  }, []);
  const formRef = collection(db, "user");

  const submitHandler = async (e) => {
    e.preventDefault();
    const confirm = window.confirm("Please verify the details!");
    if (confirm) {
      await addDoc(formRef, formData);
      toast.success("Details saved successfully :)", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      console.log("data submitted");
      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    }
  };

  return (
    <div className="register">
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="right animation slide_right">
        <img src={bg} alt="" />
      </div>
      <form onSubmit={submitHandler} className="left animation slide_left">
        <div className="header">
          <h1>Enter your details,</h1>
          <p>Sign up to get Started!</p>
        </div>
        <div className="input-group">
          <input
            value={formData.name}
            onChange={handleChange}
            type="text"
            name="name"
            placeholder="Full Name"
            required
          />
        </div>
        <div className="input-group">
          <input
            value={formData.phonenumber}
            onChange={handleChange}
            type="number"
            name="phonenumber"
            placeholder="Phone Number"
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="dob" className="dob">
            Date of birth:
          </label>
          <input
            className="dob"
            value={formData.dob}
            onChange={handleChange}
            type="date"
            name="dob"
            id="dob"
            required
          />
        </div>
        <div className="radio-group">
          <label>Select Blood Group:</label>
          <div className="duo">
            <div>
              <input
                type="radio"
                id="A+"
                name="bloodgroup"
                value="A+"
                checked={formData.bloodgroup === "A+"}
                onChange={handleChange}
                required
              />
              <label htmlFor="A+">A+</label>
            </div>
            <div>
              <input
                type="radio"
                id="A-"
                name="bloodgroup"
                value="A-"
                checked={formData.bloodgroup === "A-"}
                onChange={handleChange}
                required
              />
              <label htmlFor="A-">A-</label>
            </div>
          </div>
          <div className="duo">
            <div>
              <input
                type="radio"
                id="B+"
                name="bloodgroup"
                value="B+"
                checked={formData.bloodgroup === "B+"}
                onChange={handleChange}
                required
              />
              <label htmlFor="B+">B+</label>
            </div>
            <div>
              <input
                type="radio"
                id="B-"
                name="bloodgroup"
                value="B-"
                checked={formData.bloodgroup === "B-"}
                onChange={handleChange}
                required
              />
              <label htmlFor="B-">B-</label>
            </div>
          </div>
          <div className="duo">
            <div>
              <input
                type="radio"
                id="O+"
                name="bloodgroup"
                value="O+"
                checked={formData.bloodgroup === "O+"}
                onChange={handleChange}
                required
              />
              <label htmlFor="O+">O+</label>
            </div>
            <div>
              <input
                type="radio"
                id="O-"
                name="bloodgroup"
                value="O-"
                checked={formData.bloodgroup === "O-"}
                onChange={handleChange}
                required
              />
              <label htmlFor="O-">O-</label>
            </div>
          </div>
          <div className="duo">
            <div>
              <input
                type="radio"
                id="AB+"
                name="bloodgroup"
                value="AB+"
                checked={formData.bloodgroup === "AB+"}
                onChange={handleChange}
                required
              />
              <label htmlFor="AB+">AB+</label>
            </div>
            <div>
              <input
                type="radio"
                id="AB-"
                name="bloodgroup"
                value="AB-"
                checked={formData.bloodgroup === "AB-"}
                onChange={handleChange}
                required
              />
              <label htmlFor="AB-">AB-</label>
            </div>
          </div>
        </div>
        <div className="radio-group">
          <label>Select Gender:</label>
          <div>
            <input
              type="radio"
              id="Male"
              name="gender"
              value="Male"
              checked={formData.gender === "Male"}
              onChange={handleChange}
              required
            />
            <label htmlFor="Male">Male</label>
          </div>
          <div>
            <input
              type="radio"
              id="Female"
              name="gender"
              value="Female"
              checked={formData.gender === "Female"}
              onChange={handleChange}
              required
            />
            <label htmlFor="Female">Female</label>
          </div>
        </div>
        <div className="radio-group">
          <label>Interested in donating Blood?</label>
          <div>
            <input
              type="radio"
              id="YesDonation"
              name="bloodDonation"
              value="Yes"
              checked={formData.bloodDonation === "Yes"}
              onChange={handleChange}
              required
            />
            <label htmlFor="YesDonation">Yes</label>
          </div>
          <div>
            <input
              type="radio"
              id="NoDonation"
              name="bloodDonation"
              value="No"
              checked={formData.bloodDonation === "No"}
              onChange={handleChange}
              required
            />
            <label htmlFor="NoDonation">No</label>
          </div>
        </div>
        <div className="radio-group">
          <label>Covid Recovered? (for plasma donation)</label>
          <div>
            <input
              type="radio"
              id="YesRecovered"
              name="recovered"
              value="Yes"
              checked={formData.recovered === "Yes"}
              onChange={handleChange}
              required
            />
            <label htmlFor="YesRecovered">Yes</label>
          </div>
          <div>
            <input
              type="radio"
              id="NoRecovered"
              name="recovered"
              value="No"
              checked={formData.recovered === "No"}
              onChange={handleChange}
              required
            />
            <label htmlFor="NoRecovered">No</label>
          </div>
        </div>
        <div className="button">
          <button>Submit</button>
        </div>
      </form>
    </div>
  );
}

export default Register;
