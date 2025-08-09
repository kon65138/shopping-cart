import styles from './root.module.css';
// import icons as react components
import { ShoppingCart } from 'lucide-react';

export default function Root() {
  return (
    <>
      <div className={styles.navBar}>
        <h1>Miles' Store</h1>
        <div className={styles.navBtns}>
          <button className={styles.navBtn}>
            Home <hr color="black" />
          </button>
          <button className={styles.navBtn}>
            Store <hr color="black" />
          </button>
        </div>
        <button className={styles.iconBtn}>
          <ShoppingCart />
        </button>
      </div>
      <div className="page"></div>
    </>
  );
}
