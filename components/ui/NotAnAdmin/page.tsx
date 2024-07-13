import Image from "next/image";
import styles from "./page.module.scss";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface NotAnAdminProps {
  label: string;
}

const NotAnAdmin = ({ label }: NotAnAdminProps) => {
  const router = useRouter();

  const promise = async () => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
  };

  const request = () => {
    toast
      .promise(promise(), {
        loading: "Requesting Access...",
        success: <b>Access Requested</b>,
        error: <b>Error Requesting Access</b>,
      })
      .then(() => {
        router.push("/");
      });
  };

  return (
    <div className={styles.notAnAdmin}>
      <div className={styles.image}>
        <Image alt="notAnAdmin" src="/logo.svg" fill />
      </div>
      <div className={styles.label}>{label}</div>
      <button onClick={request} className={styles.access}>
        Request Access
      </button>
    </div>
  );
};

export default NotAnAdmin;
