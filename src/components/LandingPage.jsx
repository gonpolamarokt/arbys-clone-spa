import { Link } from 'react-router-dom';

function LandingPage() {
  return (
    <main>
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">Taberna El Rocinante</p>
            <h1>Traditional Spanish kitchen with a true tavern soul.</h1>
            <p>
              Order classic tapas, hearty platos, and house drinks inspired by old
              Castilla table culture.
            </p>
            <div className="hero-actions">
              <Link to="/menu" className="btn btn-primary">
                Start Order
              </Link>
              <a href="#deals" className="btn btn-secondary">
                View Deals
              </a>
            </div>
          </div>
          <div className="hero-highlight" aria-hidden="true">
            <div className="deal-card" id="deals">
              <p className="deal-title">Tabla de la Casa</p>
              <p className="deal-price">$34.99</p>
              <p>Dulcinea + Patatas Bravas + Cervantes&apos; Cerveza</p>
            </div>
          </div>
        </div>
      </section>

      <section className="features container">
        <article>
          <h3>Tapas de Siempre</h3>
          <p>Small plates built from classic recipes with garlic, paprika, and olive oil.</p>
        </article>
        <article>
          <h3>Hearty Platos</h3>
          <p>Traditional mains like Dulcinea and paella for a complete meal.</p>
        </article>
        <article>
          <h3>Bebidas de Taberna</h3>
          <p>Pair every dish with house beer, tinto de verano, or horchata.</p>
        </article>
      </section>
    </main>
  );
}

export default LandingPage;
