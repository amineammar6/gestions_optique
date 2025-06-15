
import {
  BarChart3,
  ShoppingCart,
  Package2,
  ClipboardList,
  Users,
  Package,
  Warehouse,
  ShoppingBag,
  Calculator,
  FileText,
  Building2,
  Settings,
  Tag,
  LogOut
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const menuItems = [
  { id: "dashboard", label: "Tableau de bord", icon: BarChart3, path: "/" },
  { id: "vente", label: "Vente", icon: ShoppingCart, path: "/sales-point" },
  { id: "achat", label: "Achat", icon: Package2, path: "/purchase" },
  { id: "facture", label: "Facture", icon: FileText, path: "/invoice" },
  { id: "fournisseur", label: "Fournisseur", icon: Building2, path: "/supplier" },
  { id: "produit", label: "Produit", icon: Package, path: "/product" },
  { id: "commandes", label: "Commandes", icon: ClipboardList, path: "/orders" },
  { id: "clientele", label: "Clientèle", icon: Users, path: "/clients" },
  { id: "caisse", label: "Caisse", icon: Calculator, path: "/cash" },
  { id: "stock", label: "Stock", icon: Warehouse, path: "/stock" },
  { id: "marque", label: "Marque", icon: Tag, path: "/brand" },
  { id: "parametre", label: "Paramètre", icon: Settings, path: "/settings" },
  { id: "societe", label: "Société", icon: Building2, path: "/company" }
];

export function AppSidebar() {
  const navigate = useNavigate();

  const handleMenuClick = (path: string) => {
    navigate(path);
  };

  return (
    <Sidebar className="border-r">
      <SidebarHeader className="p-6 border-b">
        <h2 className="text-xl font-bold text-gray-800">OptiqueManager</h2>
        <p className="text-sm text-gray-600 mt-1">Connecté: admin</p>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {menuItems.map((item) => {
                const IconComponent = item.icon;
                const isActive = window.location.pathname === item.path;
                
                return (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton
                      onClick={() => handleMenuClick(item.path)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                        isActive
                          ? "bg-blue-50 text-blue-600 border-r-2 border-blue-600"
                          : "text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      <IconComponent className="h-5 w-5" />
                      <span className="font-medium">{item.label}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={() => navigate("/")}
              className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
            >
              <LogOut className="h-5 w-5" />
              <span className="font-medium">Déconnexion</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
