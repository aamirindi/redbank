import "../../style/Carousel.css";
import fact1 from "./fact_1.jpg";
import fact2 from "./fact_2.jpg";
import fact3 from "./fact_3.jpg";
import fact4 from "./fact_4.jpg";

export default function Carousel() {
  return (
    <div>
      <div className="pic-ctn">
        <img src={fact1} alt="" className="pic" />
        <img src={fact2} alt="" className="pic" />
        <img src={fact3} alt="" className="pic" />
        <img src={fact4} alt="" className="pic" />
        <img src={fact2} alt="" className="pic" />
      </div>
    </div>
  );
}
