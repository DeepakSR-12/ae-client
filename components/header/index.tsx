import React, { useEffect, useState } from "react";
import styles from "./Header.module.scss";

export const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const contentElement = document.querySelector<HTMLElement>(".content");
      if (contentElement) {
        const contentOffsetTop = contentElement.offsetTop;

        if (window.scrollY > contentOffsetTop - window.innerHeight) {
          setScrolled(true);
        } else {
          setScrolled(false);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}>
      <img src="/earn.png" alt="aloha-earn" />
    </header>
  );
};
