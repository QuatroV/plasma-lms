import { useEffect, useRef, useState } from "react";

function getOffset(el: Element) {
  const rect = el.getBoundingClientRect();
  return {
    left: rect.left + window.scrollX,
    top: rect.top + window.scrollY,
  };
}

const useNavbarVisible = (lessonContentRef: React.RefObject<HTMLElement>) => {
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const ref = lessonContentRef.current;

  const controlNavbar = () => {
    if (!ref) return;
    console.log("dfsdf", ref?.offsetTop, lastScrollY, getOffset(ref).top);
    if (typeof window !== "undefined") {
      if (getOffset(ref).top > lastScrollY) {
        // if scroll down hide the navbar
        setShow(false);
      } else {
        // if scroll up show the navbar
        setShow(true);
      }

      // remember current page location to use in the next move
      setLastScrollY(ref.offsetTop);
    }
  };

  useEffect(() => {
    if (!ref) return;
    if (typeof window !== "undefined") {
      ref.addEventListener("scroll", controlNavbar);

      // cleanup function
      return () => {
        ref.removeEventListener("scroll", controlNavbar);
      };
    }
  }, [ref]);

  return { visible: show };
};

export default useNavbarVisible;
