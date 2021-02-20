
export const OrderSummary: React.FC = () => {
  return (
    <div className="order-summary">
      <div>
        <h1>Order Summary</h1>
        <div className="order-item">
          <h3>Standard subscription</h3>
        </div>
        <div className="order-item-price">
          <p>$10.00 monthly</p>
        </div>
      </div>
      <hr></hr>
      <h3>Today's charge: $10.00</h3>
    </div>
  );
};
