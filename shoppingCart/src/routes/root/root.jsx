import { Outlet, Link } from 'react-router-dom';
import styles from './root.module.css';
// import icons as react components
import { ShoppingCart } from 'lucide-react';

export default function Root() {
  return (
    <>
      <div className={styles.navBar}>
        <h1>Miles' Store</h1>
        <div className={styles.navBtns}>
          <Link to="/" className={styles.navBtn}>
            Home <hr color="black" />
          </Link>
          <Link to="store" className={styles.navBtn}>
            Store <hr color="black" />
          </Link>
        </div>
        <Link to="trolley" className={styles.iconBtn}>
          <ShoppingCart />
        </Link>
      </div>
      <Outlet />
    </>
  );
}
