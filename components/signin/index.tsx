'use client';

import styles from '@/app/page.module.scss';

import Button from '@/components/ui/Button'

import { signIn } from 'next-auth/react';

export default async function SignIn() {
  return (
    <div>
      <div className={styles.flexCenterCol}>
        <h1>Not signed in</h1>
        <Button onClick={() => signIn('twitter')}>Sign in with Twitter</Button>
      </div>
    </div>
  );
}
