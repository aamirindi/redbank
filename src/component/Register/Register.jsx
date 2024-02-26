import { useState } from "react";
import "../../style/Register.css";
import { getAuth } from "firebase/auth";
import { db } from "../../Firebase";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import bg from "../Register/image_processing20211206-11342-1yapvpw.gif";
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
      <div className="left">
        <form onSubmit={submitHandler} className="animation slide_left">
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
              className="input-dob"
              value={formData.dob}
              onChange={handleChange}
              type="date"
              name="dob"
              id="dob"
              required
            />
          </div>
          <div className="radio-group">
            <label htmlFor="bloodgroup">Select Blood Group:</label>
            <select
              id="bloodgroup"
              name="bloodgroup"
              value={formData.bloodgroup}
              onChange={handleChange}
              required>
              <option value="">Select</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
            </select>
          </div>
          <div className="radio-group">
            <label htmlFor="gender">Select Gender:</label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required>
              <option value="">Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          <div className="radio-group">
            <label htmlFor="bloodDonation">Interested in donating Blood?</label>
            <select
              id="bloodDonation"
              name="bloodDonation"
              value={formData.bloodDonation}
              onChange={handleChange}
              required>
              <option value="">Select</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>
          <div className="radio-group">
            <label htmlFor="recovered">
              Covid Recovered? (for plasma donation)
            </label>
            <select
              id="recovered"
              name="recovered"
              value={formData.recovered}
              onChange={handleChange}
              required>
              <option value="">Select</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>
          <div className="button">
            <button>Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
