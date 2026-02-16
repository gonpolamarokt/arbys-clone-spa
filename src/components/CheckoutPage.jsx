import { Link } from 'react-router-dom';

const currency = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD'
});

function CheckoutPage({
  items,
  cart,
  subtotal,
  tax,
  total,
  onAddToOrder,
  onUpdateQuantity,
  onRemoveItem
}) {
  const selectedIds = new Set(cart.map((item) => item.id));
  const addOnItems = items
    .filter((item) => !selectedIds.has(item.id))
    .slice(0, 4);

  if (cart.length === 0) {
    return (
      <main className="container page-space empty-state">
        <h1>Your order is empty</h1>
        <p>Add dishes or drinks to continue to checkout.</p>
        <Link to="/menu" className="btn btn-primary">
          Browse Menu
        </Link>
      </main>
    );
  }

  return (
    <main className="container page-space checkout-grid">
      <section className="order-summary">
        <h1>Order Summary</h1>
        <div className="summary-list">
          {cart.map((item) => (
            <article key={item.id} className="summary-item">
              <div className="summary-item-main">
                <img className="summary-thumb" src={item.image} alt={item.name} />
                <div>
                  <h3>{item.name}</h3>
                  <p>{currency.format(item.price)}</p>
                </div>
              </div>
              <div className="item-controls">
                <button onClick={() => onUpdateQuantity(item.id, -1)} aria-label={`Decrease ${item.name}`}>
                  -
                </button>
                <span>{item.quantity}</span>
                <button onClick={() => onUpdateQuantity(item.id, 1)} aria-label={`Increase ${item.name}`}>
                  +
                </button>
                <button className="remove" onClick={() => onRemoveItem(item.id)}>
                  Remove
                </button>
              </div>
            </article>
          ))}
        </div>
        <div className="totals">
          <p>
            <span>Subtotal</span>
            <span>{currency.format(subtotal)}</span>
          </p>
          <p>
            <span>Tax</span>
            <span>{currency.format(tax)}</span>
          </p>
          <p className="total-row">
            <span>Total</span>
            <span>{currency.format(total)}</span>
          </p>
        </div>
        <div className="checkout-actions">
          <Link to="/menu" className="btn btn-secondary">
            Add More Items
          </Link>
          <Link to="/checkout" className="btn btn-primary">
            Checkout
          </Link>
        </div>
      </section>
      <section className="addons-wrap">
        <h2>Add-ons for you</h2>
        {addOnItems.length === 0 ? (
          <p>All menu items are already in your bag.</p>
        ) : (
          <div className="addons-list">
            {addOnItems.map((item) => (
              <article key={item.id} className="addon-item">
                <img className="summary-thumb" src={item.image} alt={item.name} />
                <div className="addon-copy">
                  <h3>{item.name}</h3>
                  <p>{currency.format(item.price)}</p>
                </div>
                <button className="btn btn-primary addon-btn" onClick={() => onAddToOrder(item)}>
                  Add
                </button>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

export default CheckoutPage;
