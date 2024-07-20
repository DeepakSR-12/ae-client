import styles from "./page.module.scss";
import { Flex, Spin } from "antd";

interface LoaderProps {
  message?: string;
}

const Loader: React.FC<LoaderProps> = ({
  message = "Your feed is loading...",
}) => {
  return (
    <div className={styles.loaderContainer}>
      <div className={styles.logoContainer}>
        <Flex justify="center" align="center">
          <Spin size="large" />
        </Flex>
      </div>
      <p className={styles.message}>{message}</p>
    </div>
  );
};

export default Loader;
