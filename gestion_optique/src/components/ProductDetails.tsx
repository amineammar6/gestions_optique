
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Eye, Edit, Save, X } from "lucide-react";

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  reference: string;
  brand: string;
  status: string;
}

interface ProductDetailsProps {
  product: Product;
  onUpdate?: (product: Product) => void;
  trigger?: React.ReactNode;
}

export const ProductDetails = ({ product, onUpdate, trigger }: ProductDetailsProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedProduct, setEditedProduct] = useState(product);

  const handleSave = () => {
    onUpdate?.(editedProduct);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedProduct(product);
    setIsEditing(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "En stock": return "bg-green-100 text-green-800";
      case "Stock faible": return "bg-yellow-100 text-yellow-800";
      case "Rupture": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const defaultTrigger = (
    <Button variant="outline" size="sm" className="flex-1">
      <Eye className="h-4 w-4 mr-1" />
      Voir
    </Button>
  );

  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger || defaultTrigger}
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Détails du Produit</span>
            <div className="flex gap-2">
              {!isEditing ? (
                <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                  <Edit className="h-4 w-4" />
                </Button>
              ) : (
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={handleSave}>
                    <Save className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleCancel}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="name">Nom du produit</Label>
            {isEditing ? (
              <Input
                id="name"
                value={editedProduct.name}
                onChange={(e) => setEditedProduct({...editedProduct, name: e.target.value})}
              />
            ) : (
              <p className="text-sm text-gray-600">{product.name}</p>
            )}
          </div>

          <div>
            <Label htmlFor="brand">Marque</Label>
            {isEditing ? (
              <Input
                id="brand"
                value={editedProduct.brand}
                onChange={(e) => setEditedProduct({...editedProduct, brand: e.target.value})}
              />
            ) : (
              <p className="text-sm text-gray-600">{product.brand}</p>
            )}
          </div>

          <div>
            <Label htmlFor="reference">Référence</Label>
            {isEditing ? (
              <Input
                id="reference"
                value={editedProduct.reference}
                onChange={(e) => setEditedProduct({...editedProduct, reference: e.target.value})}
              />
            ) : (
              <p className="text-sm text-gray-600 font-mono">{product.reference}</p>
            )}
          </div>

          <div>
            <Label htmlFor="price">Prix (€)</Label>
            {isEditing ? (
              <Input
                id="price"
                type="number"
                value={editedProduct.price}
                onChange={(e) => setEditedProduct({...editedProduct, price: parseFloat(e.target.value) || 0})}
              />
            ) : (
              <p className="text-sm text-gray-600 font-bold">{product.price}€</p>
            )}
          </div>

          <div>
            <Label htmlFor="stock">Stock</Label>
            {isEditing ? (
              <Input
                id="stock"
                type="number"
                value={editedProduct.stock}
                onChange={(e) => setEditedProduct({...editedProduct, stock: parseInt(e.target.value) || 0})}
              />
            ) : (
              <p className="text-sm text-gray-600">{product.stock} unité(s)</p>
            )}
          </div>

          <div>
            <Label>Catégorie</Label>
            <Badge variant="secondary">{product.category}</Badge>
          </div>

          <div>
            <Label>Statut</Label>
            <div className="mt-1">
              <Badge className={getStatusColor(product.status)}>
                {product.status}
              </Badge>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
