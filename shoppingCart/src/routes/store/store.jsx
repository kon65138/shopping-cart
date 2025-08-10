import styles from './store.module.css';
import { useEffect, useState } from 'react';

export default function Store() {
  const [items, setItems] = useState();
  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then((response) => response.json())
      .then((data) => setItems(data));
  }, []);
  return (
    <>
      <div className={styles.store}>
        {items.map((item) => {
          return (
            <ItemCard title={item.title} img={item.image} price={item.price} />
          );
        })}
      </div>
    </>
  );
}

function ItemCard({ title, img, price }) {
  return (
    <div className={styles.card}>
      <img src={img} alt="" />
      <h2 className={styles.itemName}>{title}</h2>
      <div className={styles.itemPrice}>{price}</div>
      <div className={styles.quantity}>
        <label htmlFor="quantity">Quantity:</label>
        <input type="number" id={styles.quantity} />
      </div>
      <button className={styles.addToCartBtn}>Add to Cart</button>
    </div>
  );
}
