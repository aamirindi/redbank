import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../Firebase";
import { getDoc, doc } from "firebase/firestore";
import NavBar from "./Navbar";
import "../../style/SingleRequests.css";
import useAnimation from "../../hooks/useAnimation";

export default function Single_Request() {
  // console.log(useParams());
  const { id } = useParams();
  const [data, setData] = useState({});
  //   const colRef = collection(db, "findDonors");
  // console.log("ID:", id);
  const singleData = doc(db, "findDonors", id);
  useAnimation("animation");

  useEffect(() => {
    const singleFetch = () => {
      getDoc(singleData).then((doc) => {
        const fetchedData = doc.data();
        // console.log("Fetched Data:", fetchedData);
        setData(fetchedData);
      });
    };
    singleFetch();
  }, [id]);

  return (
    <>
      <NavBar />
      <div className="single-requests-container">
        <div className="header animation slide_up">
          <h1>Single Request</h1>
        </div>
        <div className="cards__item">
          <div className="card animation slide_left">
            <div className="card__content">
              <div className="card__title">
                Blood Group : <span>{data.bloodgroup}</span>
              </div>
              <br />
              <hr />
              <br />
              <p className="card__text">
                Name : <span>{data.name}</span>
              </p>
              <p className="card__text">
                Phone Number : <span>{data.phonenumber}</span>
              </p>
              <p className="card__text">
                Age : <span>{data.age}</span>
              </p>
              <p className="card__text">
                Covid Recovered : <span>{data.recovered}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
