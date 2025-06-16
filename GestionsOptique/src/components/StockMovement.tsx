
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Minus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface StockMovementProps {
  type: "entry" | "exit";
  productName: string;
  currentStock: number;
  onUpdate?: (newStock: number) => void;
}

export const StockMovement = ({ type, productName, currentStock, onUpdate }: StockMovementProps) => {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [reason, setReason] = useState("");

  const isEntry = type === "entry";
  const Icon = isEntry ? Plus : Minus;
  const title = isEntry ? "Entrée de Stock" : "Sortie de Stock";
  const buttonText = isEntry ? "Entrée" : "Sortie";
  const buttonColor = isEntry ? "text-green-600 hover:text-green-700" : "text-red-600 hover:text-red-700";

  const handleSubmit = () => {
    if (quantity <= 0) {
      toast({
        title: "Erreur",
        description: "La quantité doit être supérieure à 0",
        variant: "destructive"
      });
      return;
    }

    if (!isEntry && quantity > currentStock) {
      toast({
        title: "Erreur",
        description: "Stock insuffisant",
        variant: "destructive"
      });
      return;
    }

    const newStock = isEntry ? currentStock + quantity : currentStock - quantity;
    onUpdate?.(newStock);

    toast({
      title: `${title} enregistrée`,
      description: `${quantity} unité(s) ${isEntry ? 'ajoutée(s)' : 'retirée(s)'} du stock`,
    });

    // Reset form
    setQuantity(1);
    setReason("");
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className={buttonColor}>
          <Icon className="h-4 w-4 mr-1" />
          {buttonText}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Icon className={`h-5 w-5 mr-2 ${isEntry ? 'text-green-600' : 'text-red-600'}`} />
            {title}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <Label>Produit</Label>
            <p className="text-sm text-gray-600 font-medium">{productName}</p>
          </div>

          <div>
            <Label>Stock actuel</Label>
            <p className="text-sm text-gray-600">{currentStock} unité(s)</p>
          </div>

          <div>
            <Label htmlFor="quantity">Quantité *</Label>
            <Input
              id="quantity"
              type="number"
              min="1"
              max={!isEntry ? currentStock : undefined}
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
            />
          </div>

          <div>
            <Label htmlFor="reason">Motif</Label>
            <Textarea
              id="reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder={isEntry ? "Ex: Réception commande fournisseur" : "Ex: Vente client, produit défectueux"}
              rows={3}
            />
          </div>

          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="text-sm font-medium">
              Nouveau stock: {isEntry ? currentStock + quantity : currentStock - quantity} unité(s)
            </p>
          </div>

          <div className="flex gap-2 pt-4">
            <Button onClick={handleSubmit} className="flex-1">
              Confirmer {buttonText.toLowerCase()}
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
