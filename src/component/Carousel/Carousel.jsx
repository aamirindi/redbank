import "../../style/Carousel.css";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import fact1 from "./fact_1.jpg";
import fact2 from "./fact_2.jpg";
import fact3 from "./fact_3.jpg";
import fact4 from "./fact_4.jpg";

export default function Carousels() {
  return (
    <div className="carousel-img">
      <Carousel infiniteLoop autoPlay interval={1200} centerMode>
        <img src={fact1} alt="" />
        <img src={fact2} alt="" />
        <img src={fact3} alt="" />
        <img src={fact4} alt="" />
        <img src={fact2} alt="" />
      </Carousel>
    </div>
  );
}
