
interface OrderSummaryProps {
  total: number;
  formatter: Intl.NumberFormat;
}

const OrderSummary = ({ total, formatter }: OrderSummaryProps) => {
  return (
    <div className="bg-gray-50 p-6">
      <div className="flex justify-between mb-2">
        <span className="text-gray-600">Subtotal</span>
        <span>{formatter.format(total)}</span>
      </div>
      <div className="flex justify-between mb-4">
        <span className="text-gray-600">Shipping</span>
        <span>Free</span>
      </div>
      <div className="flex justify-between text-lg font-medium">
        <span>Total</span>
        <span>{formatter.format(total)}</span>
      </div>
    </div>
  );
};

export default OrderSummary;
