import React from "react";
import styles from "./Header.module.scss";
import { useRouter } from "next/navigation";

export const Header: React.FC = () => {
  const router = useRouter();
  const navigateToHome = () => {
    router.push("/dashboard");
  };
  return (
    <header className={styles.header}>
      <h1 onClick={navigateToHome}>Aloha Earn</h1>
    </header>
  );
};
