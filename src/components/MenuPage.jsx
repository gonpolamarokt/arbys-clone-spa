import { Link } from 'react-router-dom';

const currency = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD'
});

function MenuPage({ items, onAddToOrder, cartCount, subtotal }) {
  const categories = [...new Set(items.map((item) => item.category))];

  const renderCard = (item) => (
    <article key={item.id} className="item-card">
      <div className="item-image-wrap">
        <img src={item.image} alt={item.name} />
        {item.spicy && <span className="badge">Picante</span>}
      </div>
      <div className="item-body">
        <div className="item-topline">
          <h3>{item.name}</h3>
          <p>{currency.format(item.price)}</p>
        </div>
        <p>{item.description}</p>
        <button className="btn btn-primary" onClick={() => onAddToOrder(item)}>
          Add to Order
        </button>
      </div>
    </article>
  );

  return (
    <main className="container page-space">
      <section className="menu-header">
        <div>
          <p className="eyebrow">Carta de la Casa</p>
          <h1>Build Your El Rocinante Order</h1>
          <p>Choose from tapas, platos tradicionales, ensalada, and bebidas.</p>
        </div>
        <aside className="mini-cart">
          <p>Items in Order: {cartCount}</p>
          <p>Subtotal: {currency.format(subtotal)}</p>
          <Link to="/bag" className="btn btn-secondary">
            Go to Checkout
          </Link>
        </aside>
      </section>

      {categories.map((category) => (
        <section className="menu-section" key={category}>
          <h2>{category}</h2>
          <div className="items-grid">
            {items.filter((item) => item.category === category).map(renderCard)}
          </div>
        </section>
      ))}
    </main>
  );
}

export default MenuPage;
