import styles from './home.module.css';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <>
      <div className={styles.home}>
        <h2 className={styles.homeText}>The future of shopping</h2>
        <Link to="store" className={styles.shopNowBtn}>
          SHOP NOW
        </Link>
      </div>
    </>
  );
}
