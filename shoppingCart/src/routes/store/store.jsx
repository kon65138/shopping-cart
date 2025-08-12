import styles from './store.module.css';
import { useOutletContext } from 'react-router-dom';

export default function Store() {
  const [items, setItems] = useOutletContext();
  return (
    <>
      <div className={styles.store}>
        {items ? (
          items.map((item) => {
            return (
              <ItemCard
                title={item.title}
                img={item.image}
                price={item.price}
                key={items.id}
              />
            );
          })
        ) : (
          <div className={styles.loading}>Loading...</div>
        )}
      </div>
    </>
  );
}

function ItemCard({ title, img, price }) {
  return (
    <div className={styles.card}>
      <div className={styles.imgContainer}>
        <img className={styles.itemImg} src={img} alt="" />
      </div>
      <div className={styles.itemInfo}>
        <h2 className={styles.itemName}>{title}</h2>
        <div className={styles.itemPrice}>{'£' + price}</div>
        <div className={styles.quantityPlusCart}>
          <label htmlFor="quantity">Quantity:</label>
          <input type="number" id={styles.quantity} maxLength={2} />
          <button className={styles.addToCartBtn}>Add to Cart</button>
        </div>
      </div>
    </div>
  );
}
