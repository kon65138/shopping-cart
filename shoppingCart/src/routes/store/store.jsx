import styles from './store.module.css';
import { useOutletContext } from 'react-router-dom';
import { useState } from 'react';

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
  const [quant, setQuant] = useState(1);

  function updateQuantity(e) {
    if (e.target.value > 99 || e.target.value < 1) {
      return;
    }
    setQuant(e.target.value);
  }
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
          <input
            type="number"
            id={styles.quantity}
            maxLength={2}
            onChange={updateQuantity}
            value={quant}
          />
          <button className={styles.addToCartBtn}>Add to Cart</button>
        </div>
      </div>
    </div>
  );
}
