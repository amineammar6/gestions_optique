
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Package, AlertTriangle, CheckCircle, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface InventoryItem {
  id: number;
  name: string;
  reference: string;
  countedStock: number;
  systemStock: number;
  category: string;
  location: string;
}

export const InventoryDialog = () => {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [inventoryItems, setInventoryItems] = useState<InventoryItem[]>([
    { 
      id: 1, 
      name: "Ray-Ban Aviator Classic", 
      reference: "RB3025", 
      countedStock: 0, 
      systemStock: 25,
      category: "Montures",
      location: "A1-B2"
    },
    { 
      id: 2, 
      name: "Verres progressifs Varilux", 
      reference: "VAR-PROG", 
      countedStock: 0, 
      systemStock: 3,
      category: "Verres",
      location: "B2-C1"
    },
    { 
      id: 3, 
      name: "Lentilles journalières Acuvue", 
      reference: "ACU-DAILY", 
      countedStock: 0, 
      systemStock: 12,
      category: "Lentilles",
      location: "C1-D2"
    },
    {
      id: 4,
      name: "Étui à lunettes cuir",
      reference: "ETUI-001",
      countedStock: 0,
      systemStock: 0,
      category: "Accessoires",
      location: "D1-A1"
    }
  ]);

  const handleCountChange = (id: number, count: number) => {
    setInventoryItems(items =>
      items.map(item => item.id === id ? { ...item, countedStock: count } : item)
    );
  };

  const handleValidateInventory = () => {
    const differences = inventoryItems.filter(item => item.countedStock !== item.systemStock);
    const totalItems = inventoryItems.length;
    const completedItems = inventoryItems.filter(item => item.countedStock > 0 || item.systemStock === 0).length;
    
    if (completedItems < totalItems) {
      toast({
        title: "Inventaire incomplet",
        description: `Veuillez compter tous les articles (${completedItems}/${totalItems} complétés)`,
        variant: "destructive"
      });
      return;
    }
    
    if (differences.length === 0) {
      toast({
        title: "Inventaire validé",
        description: "Aucun écart détecté dans l'inventaire",
      });
    } else {
      toast({
        title: "Inventaire complété",
        description: `${differences.length} écart(s) détecté(s) et ajusté(s)`,
      });
    }
    
    setIsOpen(false);
    
    // Reset inventory for next time
    setInventoryItems(items => 
      items.map(item => ({ ...item, countedStock: 0 }))
    );
  };

  const getVarianceStatus = (counted: number, system: number) => {
    const variance = counted - system;
    if (variance === 0) return { color: "text-green-600", icon: CheckCircle, text: "Conforme" };
    if (variance > 0) return { color: "text-blue-600", icon: AlertTriangle, text: `+${variance}` };
    return { color: "text-red-600", icon: AlertTriangle, text: `${variance}` };
  };

  const getTotalVariance = () => {
    return inventoryItems.reduce((total, item) => total + (item.countedStock - item.systemStock), 0);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Package className="h-4 w-4 mr-2" />
          Inventaire
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <div className="flex items-center">
              <Package className="h-5 w-5 mr-2" />
              Inventaire Physique
            </div>
            <div className="flex items-center space-x-4 text-sm">
              <span className="text-gray-600">
                Écart total: <span className={getTotalVariance() >= 0 ? "text-blue-600" : "text-red-600"}>
                  {getTotalVariance() > 0 ? '+' : ''}{getTotalVariance()}
                </span>
              </span>
            </div>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex items-center space-x-2">
              <FileText className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm text-blue-800 font-medium">Instructions d'inventaire</p>
                <p className="text-sm text-blue-700">
                  Comptez physiquement chaque article et saisissez les quantités trouvées. 
                  Les écarts seront automatiquement calculés et ajustés dans le système.
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-4">
            {inventoryItems.map((item) => {
              const status = getVarianceStatus(item.countedStock, item.systemStock);
              const StatusIcon = status.icon;
              
              return (
                <div key={item.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="grid grid-cols-1 lg:grid-cols-6 gap-4 items-center">
                    <div className="lg:col-span-2">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <Package className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">{item.name}</h4>
                          <p className="text-sm text-gray-500">{item.reference}</p>
                          <div className="flex items-center space-x-2 mt-1">
                            <Badge variant="secondary" className="text-xs">{item.category}</Badge>
                            <span className="text-xs text-gray-400">📍 {item.location}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-center">
                      <Label className="text-sm font-medium text-gray-700">Stock système</Label>
                      <p className="text-lg font-bold text-blue-600">{item.systemStock}</p>
                    </div>
                    
                    <div>
                      <Label htmlFor={`count-${item.id}`} className="text-sm font-medium text-gray-700">
                        Quantité comptée
                      </Label>
                      <Input
                        id={`count-${item.id}`}
                        type="number"
                        min="0"
                        value={item.countedStock}
                        onChange={(e) => handleCountChange(item.id, parseInt(e.target.value) || 0)}
                        className="mt-1 text-center"
                        placeholder="0"
                      />
                    </div>
                    
                    <div className="text-center">
                      <Label className="text-sm font-medium text-gray-700">Écart</Label>
                      <div className="flex items-center justify-center space-x-1">
                        <StatusIcon className={`h-4 w-4 ${status.color}`} />
                        <p className={`font-bold ${status.color}`}>
                          {item.countedStock - item.systemStock > 0 ? '+' : ''}
                          {item.countedStock - item.systemStock}
                        </p>
                      </div>
                    </div>

                    <div className="text-center">
                      <Label className="text-sm font-medium text-gray-700">Statut</Label>
                      <p className={`text-sm font-medium ${status.color}`}>
                        {status.text}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex gap-3 pt-4 border-t">
            <Button onClick={handleValidateInventory} className="flex-1 bg-green-600 hover:bg-green-700">
              <CheckCircle className="h-4 w-4 mr-2" />
              Valider l'inventaire
            </Button>
            <Button variant="outline" onClick={() => setIsOpen(false)} className="px-8">
              Annuler
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
