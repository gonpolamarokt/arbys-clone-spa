import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const currency = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD'
});

function DeliveryDetailsPage({ cart, subtotal, tax, total, onPlaceOrder }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    experience: 'Shoppable Ads',
    firstName: '',
    lastName: '',
    email: '',
    paymentMethod: '',
    cardholderFirstName: '',
    cardholderLastName: '',
    cardNumber: '',
    zipcode: ''
  });
  const needsCardDetails =
    formData.paymentMethod === 'Debit/Credit Card' || formData.paymentMethod === 'Gift Card';

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (cart.length === 0) {
      return;
    }

    const orderId = `ER-${Math.floor(100000 + Math.random() * 900000)}`;
    const etaTime = new Date();
    etaTime.setMinutes(etaTime.getMinutes() + 20);
    const etaMinutes = etaTime.toLocaleTimeString([], {
      hour: 'numeric',
      minute: '2-digit'
    });

    onPlaceOrder({
      orderId,
      etaMinutes,
      customer: formData,
      items: cart,
      total
    });

    const confirmationPath =
      formData.experience === 'Rokt Thanks' ? '/rokt-thanks' : '/shoppable-ads';
    navigate(confirmationPath);
  };

  if (cart.length === 0) {
    return (
      <main className="container page-space empty-state">
        <h1>Your order is empty</h1>
        <p>Add dishes or drinks to continue.</p>
        <Link to="/menu" className="btn btn-primary">
          Browse Menu
        </Link>
      </main>
    );
  }

  return (
    <main className="container page-space checkout-page">
      <form className="checkout-submit-form" onSubmit={handleSubmit}>
        <div className="checkout-grid">
          <div className="checkout-left-column">
            <section className="page-banner">
              <h1>Checkout</h1>
            </section>

            <section className="checkout-form-wrap">
              <h2>Contact Info</h2>
              <div className="checkout-form">
                <label>
                  <span className="label-text">
                    First Name <span className="required-asterisk">*</span>
                  </span>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    placeholder="Jane"
                  />
                </label>
                <label>
                  <span className="label-text">
                    Last Name <span className="required-asterisk">*</span>
                  </span>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    placeholder="Doe"
                  />
                </label>
                <label>
                  <span className="label-text">
                    Email <span className="required-asterisk">*</span>
                  </span>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    title="Please enter a valid email address."
                    placeholder="jane@example.com"
                  />
                </label>
              </div>
            </section>

            <section className="payment-info-wrap">
              <h2>Payment Info</h2>
              <label>
                Payment Method
                <select
                  className="payment-select"
                  name="paymentMethod"
                  value={formData.paymentMethod}
                  onChange={handleChange}
                  required
                >
                  <option value="">Choose Payment</option>
                  <option>Apple Pay</option>
                  <option>Google Pay</option>
                  <option>Debit/Credit Card</option>
                  <option>Gift Card</option>
                </select>
              </label>
              {needsCardDetails && (
                <div className="checkout-form">
                  <label>
                    Cardholder first name
                    <input
                      type="text"
                      name="cardholderFirstName"
                      value={formData.cardholderFirstName}
                      onChange={handleChange}
                      required={needsCardDetails}
                      placeholder="Jane"
                    />
                  </label>
                  <label>
                    Cardholder last name
                    <input
                      type="text"
                      name="cardholderLastName"
                      value={formData.cardholderLastName}
                      onChange={handleChange}
                      required={needsCardDetails}
                      placeholder="Doe"
                    />
                  </label>
                  <label>
                    Card number
                    <input
                      type="text"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleChange}
                      required={needsCardDetails}
                      inputMode="numeric"
                      pattern="^[0-9]{16}$"
                      minLength={16}
                      maxLength={16}
                      title="Please enter exactly 16 digits."
                      placeholder="4111111111111111"
                    />
                  </label>
                  <label>
                    Zipcode
                    <input
                      type="text"
                      name="zipcode"
                      value={formData.zipcode}
                      onChange={handleChange}
                      required={needsCardDetails}
                      inputMode="numeric"
                      pattern="^[0-9]{5}$"
                      minLength={5}
                      maxLength={5}
                      title="Please enter exactly 5 digits."
                      placeholder="10001"
                    />
                  </label>
                </div>
              )}
            </section>

            <section className="checkout-submit-wrap">
              <button type="submit" className="btn btn-primary full-width place-order-btn">
                PLACE ORDER
              </button>
              <p className="checkout-footnote">
                By clicking &quot;PLACE ORDER&quot;, you authorize the store listed to charge your
                payment method for the full amount and you agree to our{' '}
                <a
                  href="https://youtu.be/dQw4w9WgXcQ"
                  target="_blank"
                  rel="noreferrer"
                >
                  Terms &amp; Conditions
                </a>{' '}
                and{' '}
                <a
                  href="https://www.youtube.com/watch?v=zcGgnA-297o"
                  target="_blank"
                  rel="noreferrer"
                >
                  Privacy Policy
                </a>
                .
              </p>
            </section>
          </div>

          <div className="checkout-right-column">
            <section className="experience-wrap">
              <h2>Choose your experience</h2>
              <div className="experience-options">
                <label className="experience-option">
                  <input
                    type="radio"
                    name="experience"
                    value="Shoppable Ads"
                    checked={formData.experience === 'Shoppable Ads'}
                    onChange={handleChange}
                  />
                  <span>Shoppable Ads</span>
                </label>
                <label className="experience-option">
                  <input
                    type="radio"
                    name="experience"
                    value="Rokt Thanks"
                    checked={formData.experience === 'Rokt Thanks'}
                    onChange={handleChange}
                  />
                  <span>Rokt Thanks</span>
                </label>
              </div>
            </section>

            <section className="order-summary">
              <h1>Order Summary</h1>
              <div className="summary-list">
                {cart.map((item) => (
                  <article key={item.id} className="summary-item">
                    <div className="summary-item-main">
                      <img className="summary-thumb" src={item.image} alt={item.name} />
                      <div>
                        <h3>{item.name}</h3>
                        <p>{item.quantity} x {currency.format(item.price)}</p>
                      </div>
                    </div>
                    <p>{currency.format(item.price * item.quantity)}</p>
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
              <Link to="/bag" className="btn btn-secondary full-width">
                Back to Order Summary
              </Link>
            </section>
          </div>
        </div>
      </form>
    </main>
  );
}

export default DeliveryDetailsPage;
