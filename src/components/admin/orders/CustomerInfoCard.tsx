
import { User, Phone, MapPin } from 'lucide-react';

interface CustomerInfoCardProps {
  customerName: string;
  customerPhone: string;
  customerAddress: string;
}

const CustomerInfoCard = ({ customerName, customerPhone, customerAddress }: CustomerInfoCardProps) => {
  return (
    <div className="bg-white border rounded-lg p-6">
      <h2 className="text-lg font-medium mb-4">Customer Information</h2>
      <div className="space-y-4">
        <div className="flex items-start">
          <User className="h-5 w-5 text-gray-500 mt-0.5 mr-3" />
          <div>
            <h3 className="font-medium">{customerName}</h3>
          </div>
        </div>
        <div className="flex items-start">
          <Phone className="h-5 w-5 text-gray-500 mt-0.5 mr-3" />
          <div>
            <h3 className="font-medium">Phone Number</h3>
            <p className="text-gray-600">{customerPhone}</p>
          </div>
        </div>
        <div className="flex items-start">
          <MapPin className="h-5 w-5 text-gray-500 mt-0.5 mr-3" />
          <div>
            <h3 className="font-medium">Shipping Address</h3>
            <p className="text-gray-600">{customerAddress}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerInfoCard;
