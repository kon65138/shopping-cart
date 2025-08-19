import { Outlet, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import styles from './root.module.css';
// import icons as react components
import { ShoppingCart } from 'lucide-react';

export default function Root() {
  const [items, setItems] = useState();
  const [cart, setCart] = useState([]);
  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then((response) => response.json())
      .then((data) => setItems(data));
  }, []);
  return (
    <>
      <div className={styles.navBar}>
        <h1 id={styles.title}>Miles' Store</h1>
        <div className={styles.navBtns}>
          <Link to="/" className={styles.navBtn}>
            Home <hr color="black" />
          </Link>
          <Link to="store" className={styles.navBtn}>
            Store <hr color="black" />
          </Link>
        </div>
        <Link to="trolley" className={styles.iconBtn}>
          <div className={styles.cartNumber}>{cart.length}</div>
          <ShoppingCart />
        </Link>
      </div>
      <Outlet context={{ itm: [items, setItems], crt: [cart, setCart] }} />
    </>
  );
}
