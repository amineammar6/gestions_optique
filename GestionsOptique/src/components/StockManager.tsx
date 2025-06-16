import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Package, TrendingDown, TrendingUp, AlertTriangle } from "lucide-react";
import { StockMovement } from "./StockMovement";
import { InventoryDialog } from "./InventoryDialog";

export const StockManager = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [stockItems, setStockItems] = useState([
    {
      id: 1,
      name: "Ray-Ban Aviator Classic",
      reference: "RB3025",
      category: "Montures",
      currentStock: 25,
      minStock: 10,
      maxStock: 50,
      lastRestock: "2024-05-15",
      supplier: "Luxottica",
      location: "A1-B2"
    },
    {
      id: 2,
      name: "Verres progressifs Varilux",
      reference: "VAR-PROG",
      category: "Verres",
      currentStock: 3,
      minStock: 5,
      maxStock: 20,
      lastRestock: "2024-04-20",
      supplier: "Essilor",
      location: "B2-C1"
    },
    {
      id: 3,
      name: "Lentilles journalières Acuvue",
      reference: "ACU-DAILY",
      category: "Lentilles",
      currentStock: 12,
      minStock: 15,
      maxStock: 100,
      lastRestock: "2024-06-01",
      supplier: "Johnson & Johnson",
      location: "C1-D2"
    }
  ]);

  const filteredItems = stockItems.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.reference.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleStockUpdate = (itemId: number, newStock: number) => {
    setStockItems(stockItems.map(item =>
      item.id === itemId ? { ...item, currentStock: newStock } : item
    ));
  };

  const getStockStatus = (current: number, min: number) => {
    if (current === 0) return { status: "Rupture", color: "bg-red-100 text-red-800", icon: AlertTriangle };
    if (current <= min) return { status: "Critique", color: "bg-red-100 text-red-800", icon: TrendingDown };
    if (current <= min * 1.5) return { status: "Faible", color: "bg-yellow-100 text-yellow-800", icon: TrendingDown };
    return { status: "Normal", color: "bg-green-100 text-green-800", icon: TrendingUp };
  };

  const criticalItems = stockItems.filter(item => item.currentStock <= item.minStock).length;
  const totalItems = stockItems.length;
  const totalValue = stockItems.reduce((sum, item) => sum + (item.currentStock * 100), 0);

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Gestion du Stock</h1>
        <InventoryDialog />
      </div>

      {/* Statistiques du stock */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Articles Totaux</CardTitle>
            <Package className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{totalItems}</div>
            <p className="text-xs text-gray-600">Références actives</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Alertes Stock</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{criticalItems}</div>
            <p className="text-xs text-gray-600">Nécessitent un réassort</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Valeur Stock</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{totalValue.toLocaleString()}€</div>
            <p className="text-xs text-gray-600">Valeur estimée</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rotation</CardTitle>
            <TrendingUp className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">85%</div>
            <p className="text-xs text-gray-600">Taux de rotation</p>
          </CardContent>
        </Card>
      </div>

      {/* Recherche */}
      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Rechercher un article..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Liste des articles */}
      <div className="space-y-4">
        {filteredItems.map((item) => {
          const stockInfo = getStockStatus(item.currentStock, item.minStock);
          const StatusIcon = stockInfo.icon;
          
          return (
            <Card key={item.id} className="hover:shadow-lg transition-shadow duration-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                        <Package className="h-6 w-6 text-gray-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                          <Badge className={stockInfo.color}>
                            <StatusIcon className="h-3 w-3 mr-1" />
                            {stockInfo.status}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                          <div>
                            <span className="font-medium">Référence:</span> {item.reference}
                          </div>
                          <div>
                            <span className="font-medium">Emplacement:</span> {item.location}
                          </div>
                          <div>
                            <span className="font-medium">Fournisseur:</span> {item.supplier}
                          </div>
                          <div>
                            <span className="font-medium">Dernier réassort:</span> {new Date(item.lastRestock).toLocaleDateString('fr-FR')}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-6">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-gray-900">{item.currentStock}</p>
                      <p className="text-xs text-gray-500">en stock</p>
                      <p className="text-xs text-gray-400">Min: {item.minStock} | Max: {item.maxStock}</p>
                    </div>
                    <div className="flex flex-col space-y-2">
                      <StockMovement 
                        type="entry" 
                        productName={item.name}
                        currentStock={item.currentStock}
                        onUpdate={(newStock) => handleStockUpdate(item.id, newStock)}
                      />
                      <StockMovement 
                        type="exit" 
                        productName={item.name}
                        currentStock={item.currentStock}
                        onUpdate={(newStock) => handleStockUpdate(item.id, newStock)}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
