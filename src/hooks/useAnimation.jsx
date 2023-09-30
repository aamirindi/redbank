import { useEffect } from "react";

export default function useAnimation(classname) {
  const handleScroll = () => {
    const elements = document.querySelectorAll(`.${classname}`);
    elements.forEach((element) => {
      const { top } = element.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      if (top < windowHeight * 1) {
        if (element.classList.contains("slide_right")) {
          element.classList.add("animate_2");
        } else if (element.classList.contains("slide_left")) {
          element.classList.add("animate_3");
        } else if (element.classList.contains("fade_in")) {
          element.classList.add("fadein");
        } else if (element.classList.contains("slide_up")) {
          element.classList.add("animate");
        }
      }
    });
  };

  useEffect(() => {
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return handleScroll();
}
