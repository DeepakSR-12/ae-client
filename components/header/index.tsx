import React from 'react';
import styles from './Header.module.scss';
import Avatar from '@/components/ui/Avatar'
import { useGlobalContext } from '@/contexts/AppContext'
import { useRouter } from 'next/navigation';
import { ThemeProvider, useTheme } from '@/contexts/ThemeContext';

const ThemeToggleButton: React.FC = () => {
  const { toggleTheme } = useTheme();
  return <button onClick={toggleTheme}>Toggle Theme</button>;
};


export const Header: React.FC = () => {
  const router = useRouter();
  const { state } = useGlobalContext();
  const navigateToHome = () => {
    // if(state?.onboarded) {
    //   router.push('/dashboard')
    // } else {
    //   router.push('/onboarding')
    // }
    router.push('/dashboard')
  }
  return (
    <header className={styles.header}>
      <h1 onClick={navigateToHome}>Aloha Earn</h1>
      {state.user && (
        <div className={styles.profile}>
          <Avatar
            url={state.user.image}
            name={state.user.name}
            onClick={() => router.push('/profile')}
          />
          {/* <p className={styles.name}>{state.user.name}</p> */}
        </div>
      )}
      {/* <ThemeToggleButton /> */}
      {/* Add navigation links here */}
    </header>
  );
};
