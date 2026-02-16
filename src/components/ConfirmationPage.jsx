import { Link } from 'react-router-dom';

const currency = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD'
});

function ConfirmationPage({ order }) {
  if (!order) {
    return (
      <main className="container page-space empty-state">
        <h1>No recent order found</h1>
        <p>Place an order first to see confirmation details.</p>
        <Link to="/menu" className="btn btn-primary">
          Start New Order
        </Link>
      </main>
    );
  }

  return (
    <main className="container page-space">
      <section className="confirmation-card">
        <p className="eyebrow">Order Confirmed</p>
        <h1>Thanks, {order.customer.firstName || 'Customer'}!</h1>
        <p>
          Your order <strong>{order.orderId}</strong> was placed successfully and should arrive
          around <strong>{order.etaMinutes}</strong>.
        </p>
        <div className="confirmation-details">
          <p>
            <span>First Name</span>
            <span>{order.customer.firstName}</span>
          </p>
          <p>
            <span>Last Name</span>
            <span>{order.customer.lastName}</span>
          </p>
          <p>
            <span>Email</span>
            <span>{order.customer.email}</span>
          </p>
          <p>
            <span>Experience</span>
            <span>{order.customer.experience}</span>
          </p>
          <p className="total-row">
            <span>Total Charged</span>
            <span>{currency.format(order.total)}</span>
          </p>
        </div>
        <Link to="/menu" className="btn btn-secondary">
          Create Another Order
        </Link>
      </section>
    </main>
  );
}

export default ConfirmationPage;
