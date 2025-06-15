
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, User, Calendar, CreditCard, Package } from "lucide-react";

interface Sale {
  id: string;
  client: string;
  date: string;
  products: string[];
  total: number;
  status: string;
  paymentMethod: string;
}

interface SaleDetailsProps {
  sale: Sale;
}

export const SaleDetails = ({ sale }: SaleDetailsProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Payée": return "bg-green-100 text-green-800";
      case "En attente": return "bg-yellow-100 text-yellow-800";
      case "Annulée": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Eye className="h-4 w-4 mr-1" />
          Détails
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Détails de la Vente</span>
            <Badge className={getStatusColor(sale.status)}>
              {sale.status}
            </Badge>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-lg text-center">{sale.id}</h3>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <User className="h-4 w-4 text-gray-500" />
              <div>
                <p className="text-sm font-medium">Client</p>
                <p className="text-sm text-gray-600">{sale.client}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Calendar className="h-4 w-4 text-gray-500" />
              <div>
                <p className="text-sm font-medium">Date de vente</p>
                <p className="text-sm text-gray-600">
                  {new Date(sale.date).toLocaleDateString('fr-FR')}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <CreditCard className="h-4 w-4 text-gray-500" />
              <div>
                <p className="text-sm font-medium">Mode de paiement</p>
                <p className="text-sm text-gray-600">{sale.paymentMethod}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Package className="h-4 w-4 text-gray-500 mt-1" />
              <div className="flex-1">
                <p className="text-sm font-medium">Produits vendus</p>
                <ul className="text-sm text-gray-600 mt-1">
                  {sale.products.map((product, index) => (
                    <li key={index} className="flex items-center">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                      {product}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="border-t pt-4">
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold">Total</span>
              <span className="text-2xl font-bold text-green-600">{sale.total}€</span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
