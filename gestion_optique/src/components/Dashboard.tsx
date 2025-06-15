
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Package, TrendingUp, Eye, ShoppingCart, DollarSign } from "lucide-react";

export const Dashboard = () => {
  const stats = [
    {
      title: "Clients Actifs",
      value: "1,247",
      change: "+12%",
      icon: Users,
      color: "bg-blue-500"
    },
    {
      title: "Produits en Stock",
      value: "2,856",
      change: "+8%",
      icon: Package,
      color: "bg-green-500"
    },
    {
      title: "Ventes du Mois",
      value: "45,230€",
      change: "+23%",
      icon: DollarSign,
      color: "bg-purple-500"
    },
    {
      title: "Consultations",
      value: "186",
      change: "+5%",
      icon: Eye,
      color: "bg-orange-500"
    }
  ];

  const recentSales = [
    { client: "Marie Dubois", product: "Lunettes Ray-Ban", amount: "189€", date: "Aujourd'hui" },
    { client: "Jean Martin", product: "Verres progressifs", amount: "450€", date: "Aujourd'hui" },
    { client: "Sophie Laurent", product: "Lentilles mensuelles", amount: "45€", date: "Hier" },
    { client: "Pierre Moreau", product: "Lunettes de soleil", amount: "129€", date: "Hier" },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Tableau de Bord</h1>
        <div className="text-sm text-gray-500">
          Dernière mise à jour: {new Date().toLocaleDateString('fr-FR')}
        </div>
      </div>

      {/* Statistiques principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {stat.title}
                </CardTitle>
                <div className={`p-2 rounded-lg ${stat.color}`}>
                  <Icon className="h-4 w-4 text-white" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <p className="text-xs text-green-600 font-medium">
                  {stat.change} par rapport au mois dernier
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Ventes récentes */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <ShoppingCart className="h-5 w-5 mr-2 text-blue-600" />
              Ventes Récentes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentSales.map((sale, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{sale.client}</p>
                    <p className="text-sm text-gray-600">{sale.product}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-green-600">{sale.amount}</p>
                    <p className="text-xs text-gray-500">{sale.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Alertes stock */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="h-5 w-5 mr-2 text-orange-600" />
              Alertes Stock
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-200">
                <div>
                  <p className="font-medium text-red-900">Verres progressifs</p>
                  <p className="text-sm text-red-600">Stock critique</p>
                </div>
                <span className="px-2 py-1 bg-red-200 text-red-800 rounded-full text-xs font-medium">
                  3 restants
                </span>
              </div>
              <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                <div>
                  <p className="font-medium text-yellow-900">Lentilles journalières</p>
                  <p className="text-sm text-yellow-600">Stock faible</p>
                </div>
                <span className="px-2 py-1 bg-yellow-200 text-yellow-800 rounded-full text-xs font-medium">
                  12 restants
                </span>
              </div>
              <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg border border-orange-200">
                <div>
                  <p className="font-medium text-orange-900">Montures enfant</p>
                  <p className="text-sm text-orange-600">Réassort nécessaire</p>
                </div>
                <span className="px-2 py-1 bg-orange-200 text-orange-800 rounded-full text-xs font-medium">
                  8 restants
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
