import React, { useEffect, useRef, useState } from "react";
import "./Carousel.scss";
import ArrowLeftIcon from "./ArrowLeftIcon";
import ArrowRightIcon from "./ArrowRightIcon";

export interface CarouselProps {
  /**
   * when arrows are shown
   */
  arrow?: "always" | "hover" | "never";
  /**
   * display direction
   */
  // direction: PropTypes.oneOf(["horizontal", "vertical"]),
  /**
   * whether automatically loop the slides
   */
  autoplay?: boolean;
  /**
   * index of the initially active slide (starting from 0)
   */
  initialIndex?: number;
  /**
   * interval of the auto loop, in milliseconds
   */
  interval?: number;
  /**
   * position of the indicators
   */
  // indicatorPosition: PropTypes.oneOf(["outside", "none"]),
  /**
   * display the items in loop
   */
  loop?: boolean;
  /**
   * pause autoplay when hover
   */
  pauseOnHover?: boolean;
  height?: string | number;
  width?: string | number;
  children?: React.ReactNode;
}

export const Carousel: React.FunctionComponent<CarouselProps> = ({
  height,
  width,
  initialIndex,
  autoplay,
  interval,
  // indicatorPosition,
  arrow,
  loop,
  // direction,
  pauseOnHover,
  children,
}: // style,
CarouselProps) => {
  const [slideWidth, setSlideWidth] = useState(0);
  const [slideNumbers, setSlideNumbers] = useState(0);
  const [slideIndex, setSlideIndex] = useState(initialIndex);
  const [showButton, setShowButton] = useState<{
    prev: boolean;
    next: boolean;
  }>({ prev: false, next: false });
  const [isPaused, setIsPaused] = useState(false);
  const trackRef = useRef<HTMLUListElement>(null);

  const mode =
    arrow === "always"
      ? "maze-carousel-arrow--always"
      : arrow === "never"
      ? "maze-carousel-arrow--never"
      : "maze-carousel-arrow--hover";

  const updateBtn = (index) => {
    if (slideNumbers <= 1) setShowButton({ prev: false, next: false });
    if (index == 0) {
      setShowButton({ prev: false, next: true });
    } else if (index == slideNumbers - 1) {
      setShowButton({ prev: true, next: false });
    } else {
      setShowButton({ prev: true, next: true });
    }
  };

  const next = () => {
    if (slideIndex >= slideNumbers - 1) {
      return;
    }
    setSlideIndex(slideIndex + 1);
    updateBtn(slideIndex + 1);
  };

  const prev = () => {
    if (slideIndex <= 0) {
      return;
    }
    setSlideIndex(slideIndex - 1);
    updateBtn(slideIndex - 1);
  };

  const handleResize = () => {
    trackRef.current &&
      setSlideWidth(trackRef.current.children[0].getBoundingClientRect().width);
  };

  useEffect(() => {
    const slides = trackRef.current.children;
    setSlideNumbers(slides.length);
    updateBtn(slideIndex);
    const slideWidth = slides[0].getBoundingClientRect().width;
    setSlideWidth(slideWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [slideNumbers]);

  // Autoplay
  useEffect(() => {
    let timer;
    if (autoplay) {
      timer = setInterval(() => {
        setSlideIndex((index) => {
          if (loop && index >= slideNumbers - 1) {
            updateBtn(0);
            return 0;
          }
          if (index > slideNumbers - 2 || isPaused) {
            return index;
          } else {
            updateBtn(index + 1);
            return index + 1;
          }
        });
      }, interval);
    }
    return () => clearInterval(timer);
  }, [slideNumbers, isPaused]);

  return (
    <div
      className={["maze-carousel", mode].join(" ")}
      onMouseEnter={() => {
        if (pauseOnHover) setIsPaused(true);
      }}
      onMouseLeave={() => {
        if (pauseOnHover) setIsPaused(false);
      }}
      style={{ height: height, width: width }}
    >
      <button
        className="maze-carousel-button maze-carousel-button--left"
        onClick={prev}
        style={{
          display: showButton.prev ? "block" : "none",
        }}
      >
        <ArrowLeftIcon />
      </button>
      <div className="maze-carousel-track-container">
        <ul
          className="maze-carousel-track"
          ref={trackRef}
          style={{
            transform: "translateX(-" + slideIndex * slideWidth + "px)",
          }}
        >
          {React.Children.map(children, (item, index) => (
            <li
              className="maze-carousel-slide current-slide"
              style={{ left: slideWidth * index + "px" }}
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
      <button
        className="maze-carousel-button maze-carousel-button--right"
        onClick={next}
        style={{
          display: showButton.next ? "block" : "none",
        }}
      >
        <ArrowRightIcon />
      </button>

      <div className="maze-carousel-nav">
        {React.Children.map(children, (item, index) => (
          <button
            onClick={() => {
              setSlideIndex(index);
              updateBtn(index);
            }}
            className={`maze-carousel-indicator ${
              index === slideIndex ? "current-slide" : ""
            } `}
          ></button>
        ))}
      </div>
    </div>
  );
};

Carousel.defaultProps = {
  height: 350,
  width: "auto",
  initialIndex: 0,
  autoplay: true,
  interval: 3000,
  arrow: "hover",
  loop: true,
  // direction: "horizontal",
  pauseOnHover: true,
};
