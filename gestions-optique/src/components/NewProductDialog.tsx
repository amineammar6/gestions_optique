
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Package } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface NewProductDialogProps {
  onProductAdded?: (product: any) => void;
}

export const NewProductDialog = ({ onProductAdded }: NewProductDialogProps) => {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    brand: "",
    reference: "",
    category: "",
    price: 0,
    stock: 0,
    minStock: 5
  });

  const categories = ["Montures", "Verres", "Lentilles", "Accessoires"];

  const handleSubmit = () => {
    if (!newProduct.name || !newProduct.brand || !newProduct.reference || !newProduct.category) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires",
        variant: "destructive"
      });
      return;
    }

    // Add product to the list
    onProductAdded?.(newProduct);

    toast({
      title: "Produit ajouté",
      description: `${newProduct.name} a été ajouté au catalogue`,
    });

    // Reset form
    setNewProduct({
      name: "",
      brand: "",
      reference: "",
      category: "",
      price: 0,
      stock: 0,
      minStock: 5
    });
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          Nouveau Produit
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Package className="h-5 w-5 mr-2" />
            Nouveau Produit
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="name">Nom du produit *</Label>
            <Input
              id="name"
              value={newProduct.name}
              onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
              placeholder="Ex: Ray-Ban Aviator Classic"
            />
          </div>

          <div>
            <Label htmlFor="brand">Marque *</Label>
            <Input
              id="brand"
              value={newProduct.brand}
              onChange={(e) => setNewProduct({...newProduct, brand: e.target.value})}
              placeholder="Ex: Ray-Ban"
            />
          </div>

          <div>
            <Label htmlFor="reference">Référence *</Label>
            <Input
              id="reference"
              value={newProduct.reference}
              onChange={(e) => setNewProduct({...newProduct, reference: e.target.value})}
              placeholder="Ex: RB3025"
            />
          </div>

          <div>
            <Label htmlFor="category">Catégorie *</Label>
            <Select value={newProduct.category} onValueChange={(value) => setNewProduct({...newProduct, category: value})}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner une catégorie" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="price">Prix (€)</Label>
              <Input
                id="price"
                type="number"
                value={newProduct.price}
                onChange={(e) => setNewProduct({...newProduct, price: parseFloat(e.target.value) || 0})}
                placeholder="0.00"
              />
            </div>
            <div>
              <Label htmlFor="stock">Stock initial</Label>
              <Input
                id="stock"
                type="number"
                min="0"
                value={newProduct.stock}
                onChange={(e) => setNewProduct({...newProduct, stock: parseInt(e.target.value) || 0})}
                placeholder="0"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="minStock">Stock minimum</Label>
            <Input
              id="minStock"
              type="number"
              min="0"
              value={newProduct.minStock}
              onChange={(e) => setNewProduct({...newProduct, minStock: parseInt(e.target.value) || 0})}
            />
          </div>

          <div className="flex gap-2 pt-4">
            <Button onClick={handleSubmit} className="flex-1">
              Ajouter le produit
            </Button>
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Annuler
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
