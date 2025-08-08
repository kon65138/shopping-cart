import styles from './root.module.css';
// import icons as react components
import { ShoppingCart } from 'lucide-react';

export default function Root() {
  return (
    <>
      <div className={styles.navBar}>
        <h1>Miles' Store</h1>
        <button className={styles.navBtn}>Home</button>
        <button className={styles.navBtn}>Store</button>
        <button className={styles.iconBtn}>
          <ShoppingCart />
        </button>
      </div>
      <div className="page"></div>
    </>
  );
}
