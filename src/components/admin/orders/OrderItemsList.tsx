
import { OrderItem } from '@/types';

interface OrderItemsListProps {
  items: OrderItem[];
  formatter: Intl.NumberFormat;
}

const OrderItemsList = ({ items, formatter }: OrderItemsListProps) => {
  return (
    <div className="divide-y">
      {items.map((item, index) => (
        <div key={index} className="p-4 flex items-center">
          <div className="flex-1">
            <h3 className="font-medium">{item.productName}</h3>
            <div className="text-sm text-gray-500">
              {item.color} {item.size && `/ Size: ${item.size}`}
            </div>
            <div className="text-sm">
              {formatter.format(item.price)} × {item.quantity}
            </div>
          </div>
          <div className="font-medium">
            {formatter.format(item.price * item.quantity)}
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderItemsList;
