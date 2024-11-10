

import { useRouter } from 'next/router';
import styles from '../styles/Home.module.css'
import { getCookie } from '../utils/cookie';
import { useEffect } from 'react';
import ProductsPage from '../components/templates/ProductsPage';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const token = getCookie("token");

    if (!token) {
      router.push("/login");
    }
  }, [router]);

  return (
   <ProductsPage />
  )
}
