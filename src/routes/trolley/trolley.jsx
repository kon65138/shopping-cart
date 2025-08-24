import styles from './trolley.module.css';
import { useOutletContext } from 'react-router-dom';
import { useState, useMemo } from 'react';

export default function Trolley() {
  const { itm, crt } = useOutletContext();
  const [items, setItems] = itm;
  const [cart, setCart] = crt;
  function handleCheckout() {
    setCart([]);
  }

  const totalPrice = Number.parseFloat(
    useMemo(() => {
      return cart.reduce((runningTotal, item) => {
        return runningTotal + items[item.id - 1].price * item.quantity;
      }, 0);
    }, [cart, items]),
  ).toFixed(2);

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
          <div className={styles.empty}>Cart is empty...</div>
        )}
      </div>
      <div className={styles.checkout}>
        <div className={styles.subTotalCont}>
          <div>Subtotal:</div>
          <div className={styles.subTotal}>£{totalPrice}</div>
        </div>
        <button className={styles.checkoutBtn} onClick={handleCheckout}>
          Checkout
        </button>
      </div>
    </div>
  );
}

function Item({ img, title, quant, price, id, cart, setCart }) {
  const [editing, setEditing] = useState(false);
  return (
    <div className={styles.item}>
      {editing ? (
        <EditPopup
          editItemName={title}
          quantity={quant}
          id={id}
          cart={cart}
          setCart={setCart}
          setEditing={setEditing}
        />
      ) : (
        ''
      )}
      <div className={styles.imgContainer}>
        <img src={img} alt="" className={styles.itemImg} />
      </div>
      <h3 className={styles.itemTitle}>{title}</h3>
      <div className={styles.quantityPlusPrice}>
        <label htmlFor="quantity">Quantity:</label>
        <div className={styles.quantity}>{quant}</div>
        <button className={styles.editBtn} onClick={() => setEditing(!editing)}>
          Edit
        </button>
        <div className={styles.price}>
          £
          {(() => {
            const calculatedPrice = price * quant;
            return Number.parseFloat(calculatedPrice).toFixed(2);
          })()}
        </div>
      </div>
    </div>
  );
}

function EditPopup({ editItemName, quantity, id, cart, setCart, setEditing }) {
  const [inputValue, setInputValue] = useState(quantity);
  function removeItem() {
    setCart(cart.filter((item) => id !== item.id));
    setEditing(false);
  }
  function submitEdit() {
    if (inputValue > 0) {
      setCart(
        cart.map((item) => {
          if (id === item.id) {
            return { ...item, quantity: parseInt(inputValue) };
          } else {
            return item;
          }
        }),
      );
      setEditing(false);
    } else {
      return;
    }
  }
  return (
    <div className={styles.editBox}>
      <h4 className={styles.editItemName}>{editItemName}</h4>
      <div className={styles.editQuantityCont}>
        <label htmlFor="editQuantity">Quantity:</label>
        <input
          type="number"
          id={styles.editQuantity}
          maxLength={2}
          value={inputValue}
          onChange={(e) => {
            if (e.target.value >= 0 && e.target.value < 100) {
              setInputValue(e.target.value);
            } else {
              return;
            }
          }}
        />
      </div>
      <div className={styles.editBoxButtons}>
        <button className={styles.deleteItem} onClick={removeItem}>
          Remove from cart
        </button>
        <button className={styles.submitEdit} onClick={submitEdit}>
          Submit edit
        </button>
      </div>
    </div>
  );
}
