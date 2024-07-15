import Image from "next/image";
import styles from "./page.module.scss";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface PlaceholderProps {
  label: string;
  path?: string;
}

const Placeholder = ({ label, path }: PlaceholderProps) => {
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
    <div className={styles.placeholder}>
      <div className={styles.image}>
        <Image alt="placeholder" src="/logo.svg" fill />
      </div>
      <div className={styles.label}>{label}</div>
      {path ? (
        <button onClick={() => router.push(path)} className={styles.access}>
          Go to Admin
        </button>
      ) : (
        <button onClick={request} className={styles.access}>
          Request Access
        </button>
      )}
    </div>
  );
};

export default Placeholder;
