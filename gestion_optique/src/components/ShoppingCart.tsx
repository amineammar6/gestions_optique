
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart as CartIcon, Plus, Minus, X } from "lucide-react";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface ShoppingCartProps {
  items: CartItem[];
  onRemoveItem: (id: number) => void;
  onUpdateQuantity: (id: number, quantity: number) => void;
  totalPrice: number;
}

export const ShoppingCart = ({ items, onRemoveItem, onUpdateQuantity, totalPrice }: ShoppingCartProps) => {
  return (
    <div className="w-80 bg-white border-l border-gray-200 p-6">
      {/* Cart Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <CartIcon className="h-5 w-5 text-teal-600" />
          <span className="font-medium text-gray-900">
            {items.length} items
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Ajouter viste</span>
          <Button size="sm" variant="outline">
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Cart Items */}
      <div className="space-y-4 mb-6">
        {items.map((item) => (
          <Card key={item.id} className="relative">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-medium text-gray-900">{item.name}</h4>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => onRemoveItem(item.id)}
                      className="h-6 w-6 p-0 text-gray-400 hover:text-red-500"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-sm font-semibold text-gray-900">
                    {item.price.toFixed(2)} DH
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                      className="h-6 w-6 p-0"
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="text-sm font-medium w-8 text-center">
                      {item.quantity}
                    </span>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                      className="h-6 w-6 p-0"
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Cart Summary */}
      <div className="border-t pt-4">
        <div className="flex items-center justify-between mb-4">
          <span className="text-lg font-semibold text-gray-900">Total</span>
          <span className="text-xl font-bold text-teal-600">
            {totalPrice.toFixed(2)} DH
          </span>
        </div>
        
        <Button className="w-full bg-teal-600 hover:bg-teal-700 text-white">
          Commande
        </Button>
      </div>
    </div>
  );
};
