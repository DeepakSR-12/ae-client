"use client"
import Main from '@/components/main';
import Image from 'next/image';
import styles from './page.module.scss';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { useState } from 'react';
import { useGlobalContext } from '@/contexts/AppContext'
import Button from '@/components/ui/Button';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useCachedUserInfo } from '@/hooks/signin';

export default function Dashboard() {
	const { state } = useGlobalContext();
	const cachedUserInfo = useCachedUserInfo();
	console.log("cachedUserInfo", cachedUserInfo)
	const router = useRouter();
	const goToDashboard = () => {
		signOut({ callbackUrl: '/' })
		// router.push('/');
	}
	const goToSelectCategory = () => {
		router.push('/onboarding');
	}

	const goToEarningCalls = () => {
		router.push('/earningcalls');
	}

	return (
		<div className={styles.container}>
			{state.user && (
				<div className={styles.center}>
					<img
						src={state.user.image}
						alt="user image"
						width={50}
						height={50}
					/>
					<h1>Name: {state.user.name}</h1>
					<h1>Token Earned: {cachedUserInfo?.[0]?.userDetails?.tokenEarned}</h1>
				</div>
			)}
			<div className={styles.centerbtngrp}>
				<Button variant='primary' customStyle={{ width: "200px", height: "50px" }} onClick={goToEarningCalls}>Earning Calls Dashboard</Button>
				<Button variant='primary' customStyle={{ width: "200px", height: "50px" }} onClick={goToSelectCategory}>Select Category</Button>
				<Button variant='secondary' customStyle={{ width: "200px", height: "50px" }} onClick={goToDashboard}>Sign Out</Button>
			</div>
		</div>
	);
}
