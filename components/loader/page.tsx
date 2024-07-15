import Image from "next/image";
import styles from "./page.module.scss";

interface LoaderProps {
  message?: string;
}

const Loader: React.FC<LoaderProps> = ({ message = "Your feed is loading..." }) => {
  return (
    <div className={styles.loaderContainer}>
      <div className={styles.logoContainer}>
        <Image alt="logo" src="/logo.svg" fill />
      </div>
      <p className={styles.message}>{message}</p>
    </div>
  );
};

export default Loader;
