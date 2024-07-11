'use client';

import styles from '@/app/page.module.scss';

import Button from '@/components/ui/Button'

import { signOut } from 'next-auth/react';

export default async function SignedIn({ session }: { session: any }) {
	return (
		<div>
			<div className={styles.flexCenterCol}>
				<h1>Signed in as {session.user?.name}</h1>
				<Button onClick={() => signOut()}>Sign out</Button>
			</div>
		</div>
	);
}
