import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../style/Carousel.css";

export default function Carousel() {
  const data = [
    {
      content:
        "Every year our nation requires about 5 Crore units of blood, out of which only a meager 2.5 Crore units of blood are available.",
    },
    {
      content:
        "The gift of blood is the gift of life. There is no substitute for human blood.",
    },
    {
      content: "Every two seconds someone needs blood.",
    },
    {
      content:
        "The average adult has about 10 pints of blood, but a typical whole-blood donation is only 1 pint.",
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="slider">
      <div>
        <Slider {...settings}>
          {data.map((d, index) => (
            <div
              key={index}
              className="card-carousel  text-black shadow-lg rounded-xl">
              <h2>Blood need</h2>
              <p>{d.content}</p>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}
