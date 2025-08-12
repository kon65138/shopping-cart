import styles from './trolley.module.css';
import { useOutletContext } from 'react-router-dom';

export default function Trolley() {
  const { itm, crt } = useOutletContext();
  const [items, setItems] = itm;
  const [cart, setCart] = crt;
  return (
    <div className={styles.trolley}>
      <h2 className={styles.title}>shopping cart</h2>
      <div className={styles.cartContents}>
        {cart.length > 0 ? (
          cart.map((item) => {
            return (
              <Item
                img={items[item.id - 1].image}
                title={items[item.id - 1].title}
                quant={item.quantity}
                price={items[item.id - 1].price}
                id={item.id}
                cart={cart}
                setCart={setCart}
                key={item.id}
              />
            );
          })
        ) : (
          <div>Cart is empty...</div>
        )}
      </div>
    </div>
  );
}

function Item({ img, title, quant, price, id, cart, setCart }) {
  function updateQuantity(e) {
    let num = parseInt(e.target.value);
    if (num + quant < 100 && num + quant > 0) {
      setCart(
        cart.map((itm) => {
          if (itm.id === id) {
            return { ...itm, quantity: num };
          } else {
            return itm;
          }
        }),
      );
    }
  }
  return (
    <div className={styles.item}>
      <div className={styles.imgContainer}>
        <img src={img} alt="" className={styles.itemImg} />
      </div>
      <h3 className={styles.itemTitle}>{title}</h3>
      <div className={styles.quantityPlusPrice}>
        <label htmlFor="quantity">Quantity:</label>
        <input
          type="number"
          id={styles.quantity}
          maxLength={2}
          onChange={updateQuantity}
          value={quant}
        />
        <div className={styles.price}>
          {(() => {
            const calculatedPrice = price * quant;
            return Math.round(calculatedPrice * 100) / 100;
          })()}
        </div>
      </div>
    </div>
  );
}
