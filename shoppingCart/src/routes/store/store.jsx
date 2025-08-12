import styles from './store.module.css';
import { useOutlet, useOutletContext } from 'react-router-dom';
import { useState } from 'react';

export default function Store() {
  const { itm, crt } = useOutletContext();
  const [items, setItems] = itm;
  const [cart, setCart] = crt;
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
                id={item.id}
                cart={cart}
                setCart={setCart}
                key={item.id}
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

function ItemCard({ title, img, price, id, cart, setCart }) {
  const [quant, setQuant] = useState(1);

  function updateQuantity(e) {
    const num = parseInt(e.target.value);
    if (num > 99 || num < 0) {
      return;
    }
    setQuant(num);
  }
  function handleBtn(e) {
    for (const item of cart) {
      if (item.id === id) {
        if (item.quantity + quant < 100 && item.quantity + quant > 0) {
          setCart(
            cart.map((itm) => {
              if (itm.id === id) {
                return { ...itm, quantity: itm.quantity + quant };
              } else {
                return itm;
              }
            }),
          );
        } else {
          return;
        }
        return;
      }
    }
    if (quant > 0 && quant < 100) {
      setCart([...cart, { id: id, quantity: quant }]);
    }
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
          <button className={styles.addToCartBtn} onClick={handleBtn}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
