
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, ShoppingCart, DollarSign, Calendar, User } from "lucide-react";
import { NewSaleDialog } from "./NewSaleDialog";
import { SaleDetails } from "./SaleDetails";

export const SalesManager = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sales, setSales] = useState([
    {
      id: "VTE-2024-001",
      client: "Marie Dubois",
      date: "2024-06-13",
      products: ["Ray-Ban Aviator", "Verres anti-reflets"],
      total: 299,
      status: "Payée",
      paymentMethod: "Carte bancaire"
    },
    {
      id: "VTE-2024-002",
      client: "Jean Martin",
      date: "2024-06-12",
      products: ["Verres progressifs", "Monture titanium"],
      total: 650,
      status: "En attente",
      paymentMethod: "Mutuelle"
    },
    {
      id: "VTE-2024-003",
      client: "Sophie Laurent",
      date: "2024-06-11",
      products: ["Lentilles mensuelles"],
      total: 45,
      status: "Payée",
      paymentMethod: "Espèces"
    }
  ]);

  const filteredSales = sales.filter(sale =>
    sale.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sale.client.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleNewSale = (newSale: any) => {
    const saleWithId = {
      ...newSale,
      id: `VTE-2024-${String(sales.length + 1).padStart(3, '0')}`,
      date: new Date().toISOString().split('T')[0],
      status: "En attente"
    };
    setSales([...sales, saleWithId]);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Payée": return "bg-green-100 text-green-800";
      case "En attente": return "bg-yellow-100 text-yellow-800";
      case "Annulée": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const totalSales = sales.reduce((sum, sale) => sum + sale.total, 0);
  const paidSales = sales.filter(sale => sale.status === "Payée").length;

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Gestion des Ventes</h1>
        <NewSaleDialog onSaleAdded={handleNewSale} />
      </div>

      {/* Statistiques de vente */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total des Ventes</CardTitle>
            <DollarSign className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{totalSales}€</div>
            <p className="text-xs text-gray-600">Ce mois-ci</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ventes Réalisées</CardTitle>
            <ShoppingCart className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{paidSales}</div>
            <p className="text-xs text-gray-600">Ventes confirmées</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ticket Moyen</CardTitle>
            <Calendar className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">
              {Math.round(totalSales / sales.length)}€
            </div>
            <p className="text-xs text-gray-600">Par transaction</p>
          </CardContent>
        </Card>
      </div>

      {/* Recherche */}
      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Rechercher une vente..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Liste des ventes */}
      <div className="space-y-4">
        {filteredSales.map((sale) => (
          <Card key={sale.id} className="hover:shadow-lg transition-shadow duration-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <ShoppingCart className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{sale.id}</h3>
                        <Badge className={getStatusColor(sale.status)}>
                          {sale.status}
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-6 text-sm text-gray-600">
                        <div className="flex items-center">
                          <User className="h-4 w-4 mr-1" />
                          {sale.client}
                        </div>
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {new Date(sale.date).toLocaleDateString('fr-FR')}
                        </div>
                        <div>
                          Paiement: {sale.paymentMethod}
                        </div>
                      </div>
                      <div className="mt-2">
                        <p className="text-sm text-gray-600">
                          Produits: {sale.products.join(", ")}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="text-2xl font-bold text-green-600">{sale.total}€</p>
                  </div>
                  <SaleDetails sale={sale} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
