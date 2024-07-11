"use client"
import Main from '@/components/main';
import styles from './page.module.scss';
import { getServerSession } from 'next-auth/next';
import { useGlobalContext } from '@/contexts/AppContext'
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { useEffect, useState } from 'react';
import Button from '@/components/ui/Button';
import { useRouter } from 'next/navigation';
import { useSelectedCategories, userSelectedCategories } from "@/hooks/categories"


export default function Dashboard() {
  const defaultCategories = [
    "Law",
    "OCR",
    "Real Estate",
    "Contracts",
  ]
  const router = useRouter();
  const { mutate } = useSelectedCategories();
  const { state, setState } = useGlobalContext();
  const [selectCategories, setSelectCategories] = useState([])

  const { data, isLoading, error } = userSelectedCategories();

  useEffect(() => {
    console.log("data::", data, isLoading, error)
    if(data) {
      setSelectCategories(data.categories)
    }
  }, [data, isLoading])

  const toggleSelection = (category) => {
    let newCategory = []
    if(selectCategories.includes(category)) {
      newCategory = selectCategories.filter(cate => cate !== category)
    } else {
      newCategory = [...selectCategories, category]
    }
    setSelectCategories([...newCategory])
    
  }

  const goToDashboard = () => {
    router.push('/dashboard');
    setState((prevState: any) => ({
      ...prevState,
      onboarded: selectCategories,
    }));
    console.log(":::mutate...", mutate)
    mutate(selectCategories)
  }

  return (
    <div className={styles.container}>
      {/* <h1>Onboarding</h1> */}
      <h1>Select Category</h1>
      <div className={styles.flexCategories}>
        {defaultCategories.map(category => (
          <span 
            className={[styles.tag, selectCategories.includes(category) ? styles.activeTag : ''].join(" ")} 
            onClick={() => {
              toggleSelection(category)
          }}>{category}</span>  
        ))}
      </div>
      <Button customStyle={{width: "25%"}} onClick={goToDashboard}>Next</Button>
    </div>
  );
}
