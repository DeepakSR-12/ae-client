'use client';
import SignIn from '@/components/signin';
import SignedIn from '@/components/signedin';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Main({ session }: {session: any}) {
	const router = useRouter();
	console.log("sessionLL", session)
	useEffect(() => {
		if (session) {
			router.push('/onboarding');
		} else {
			router.push('/');
		}
	}, [])
	return (
		<div>
			{!session ? (
				<SignIn />
			) : (
				<SignedIn session={session} />
			)}
		</div>
	);
}
