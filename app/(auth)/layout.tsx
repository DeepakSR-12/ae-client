import styles from './layout.module.scss'

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={styles.authLayout}>{children}</div>
  );
};

export default AuthLayout;
