
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, ShoppingCart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface NewSaleDialogProps {
  onSaleAdded?: (sale: any) => void;
}

export const NewSaleDialog = ({ onSaleAdded }: NewSaleDialogProps) => {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [newSale, setNewSale] = useState({
    client: "",
    products: [""],
    paymentMethod: "",
    total: 0
  });

  const clients = ["Marie Dubois", "Jean Martin", "Sophie Laurent"];
  const products = ["Ray-Ban Aviator", "Verres anti-reflets", "Verres progressifs", "Monture titanium", "Lentilles mensuelles"];
  const paymentMethods = ["Carte bancaire", "Espèces", "Mutuelle", "Chèque"];

  const handleAddProduct = () => {
    setNewSale({
      ...newSale,
      products: [...newSale.products, ""]
    });
  };

  const handleRemoveProduct = (index: number) => {
    const updatedProducts = newSale.products.filter((_, i) => i !== index);
    setNewSale({
      ...newSale,
      products: updatedProducts
    });
  };

  const handleProductChange = (index: number, value: string) => {
    const updatedProducts = [...newSale.products];
    updatedProducts[index] = value;
    setNewSale({
      ...newSale,
      products: updatedProducts
    });
  };

  const handleSubmit = () => {
    if (!newSale.client || !newSale.paymentMethod || newSale.total <= 0) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires",
        variant: "destructive"
      });
      return;
    }

    // Filter out empty products
    const validProducts = newSale.products.filter(product => product.trim() !== "");
    if (validProducts.length === 0) {
      toast({
        title: "Erreur",
        description: "Veuillez sélectionner au moins un produit",
        variant: "destructive"
      });
      return;
    }

    // Add sale to the list
    onSaleAdded?.({
      ...newSale,
      products: validProducts
    });

    toast({
      title: "Vente ajoutée",
      description: "La nouvelle vente a été enregistrée avec succès",
    });

    // Reset form
    setNewSale({
      client: "",
      products: [""],
      paymentMethod: "",
      total: 0
    });
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          Nouvelle Vente
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <ShoppingCart className="h-5 w-5 mr-2" />
            Nouvelle Vente
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="client">Client *</Label>
            <Select value={newSale.client} onValueChange={(value) => setNewSale({...newSale, client: value})}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner un client" />
              </SelectTrigger>
              <SelectContent>
                {clients.map((client) => (
                  <SelectItem key={client} value={client}>{client}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Produits *</Label>
            {newSale.products.map((product, index) => (
              <div key={index} className="flex gap-2 mt-2">
                <Select value={product} onValueChange={(value) => handleProductChange(index, value)}>
                  <SelectTrigger className="flex-1">
                    <SelectValue placeholder="Sélectionner un produit" />
                  </SelectTrigger>
                  <SelectContent>
                    {products.map((prod) => (
                      <SelectItem key={prod} value={prod}>{prod}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {newSale.products.length > 1 && (
                  <Button variant="outline" size="sm" onClick={() => handleRemoveProduct(index)}>
                    -
                  </Button>
                )}
              </div>
            ))}
            <Button variant="outline" size="sm" onClick={handleAddProduct} className="mt-2">
              <Plus className="h-4 w-4 mr-1" />
              Ajouter un produit
            </Button>
          </div>

          <div>
            <Label htmlFor="total">Montant total (€) *</Label>
            <Input
              id="total"
              type="number"
              value={newSale.total}
              onChange={(e) => setNewSale({...newSale, total: parseFloat(e.target.value) || 0})}
              placeholder="0.00"
            />
          </div>

          <div>
            <Label htmlFor="payment">Mode de paiement *</Label>
            <Select value={newSale.paymentMethod} onValueChange={(value) => setNewSale({...newSale, paymentMethod: value})}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner un mode de paiement" />
              </SelectTrigger>
              <SelectContent>
                {paymentMethods.map((method) => (
                  <SelectItem key={method} value={method}>{method}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-2 pt-4">
            <Button onClick={handleSubmit} className="flex-1">
              Enregistrer la vente
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
