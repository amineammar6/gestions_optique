import { BarChart3, Users, Package, ShoppingCart, Warehouse, LogOut, ShoppingBag } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface SidebarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  user: string | null;
  onLogout: () => void;
}

export const Sidebar = ({ activeSection, setActiveSection, user, onLogout }: SidebarProps) => {
  const navigate = useNavigate();

  const menuItems = [
    { id: "dashboard", label: "Tableau de Bord", icon: BarChart3 },
    { id: "clients", label: "Clients", icon: Users },
    { id: "products", label: "Produits", icon: Package },
    { id: "sales", label: "Ventes", icon: ShoppingCart },
    { id: "stock", label: "Stock", icon: Warehouse },
    { id: "product-selection", label: "Sélection Produits", icon: ShoppingBag },
  ];

  const handleMenuClick = (itemId: string) => {
    if (itemId === "product-selection") {
      navigate("/product-selection");
    } else {
      setActiveSection(itemId);
    }
  };

  return (
    <div className="w-64 bg-white shadow-lg flex flex-col">
      <div className="p-6 border-b">
        <h2 className="text-xl font-bold text-gray-800">OptiqueManager</h2>
        {user && (
          <p className="text-sm text-gray-600 mt-1">Connecté: {user}</p>
        )}
      </div>
      
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const IconComponent = item.icon;
          const isActive = activeSection === item.id || (item.id === "product-selection" && window.location.pathname === "/product-selection");
          
          return (
            <button
              key={item.id}
              onClick={() => handleMenuClick(item.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? "bg-blue-50 text-blue-600 border-r-2 border-blue-600"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <IconComponent className="h-5 w-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t">
        <button
          onClick={onLogout}
          className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
        >
          <LogOut className="h-5 w-5" />
          <span className="font-medium">Déconnexion</span>
        </button>
      </div>
    </div>
  );
};
