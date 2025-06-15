
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface Product {
  id: number;
  name: string;
  code: string;
  price: number;
  category: string;
  image: string;
}

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="p-4">
        <div className="aspect-square bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
        
        <div className="space-y-2">
          <h3 className="font-medium text-gray-900">{product.name}</h3>
          <p className="text-sm text-gray-600">{product.code}</p>
          <p className="text-lg font-semibold text-gray-900">{product.price.toFixed(2)} DH</p>
        </div>

        <Button 
          onClick={() => onAddToCart(product)}
          className="w-full mt-4 bg-teal-600 hover:bg-teal-700"
        >
          Ajouter au Panier
        </Button>
      </CardContent>
    </Card>
  );
};
