import React, { useEffect, useState } from "react";
import styles from "./Header.module.scss";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { UserButton } from "@clerk/nextjs";

export const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();
  const path = usePathname();
  const isAdminPage = path.includes("admin");

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
    <div className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}>
      <Image
        onClick={() => router.push("/")}
        src="/logo.svg"
        alt="aloha-earn"
        width={180}
        height={56}
        className={styles.image}
      />
      {isAdminPage ? (
        <UserButton afterSignOutUrl="/" />
      ) : (
        <button className={styles.admin} onClick={() => router.push("/admin")}>
          Admin Page
        </button>
      )}
    </div>
  );
};
