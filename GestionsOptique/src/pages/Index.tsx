
import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Dashboard } from "@/components/Dashboard";
import { ClientsManager } from "@/components/ClientsManager";
import { ProductsManager } from "@/components/ProductsManager";
import { SalesManager } from "@/components/SalesManager";
import { StockManager } from "@/components/StockManager";
import Login from "./Login";

const Index = () => {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<string | null>(null);

  const handleLogin = (username: string) => {
    setUser(username);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setUser(null);
    setIsLoggedIn(false);
    setActiveSection("dashboard");
  };

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return <Dashboard />;
      case "clients":
        return <ClientsManager />;
      case "products":
        return <ProductsManager />;
      case "sales":
        return <SalesManager />;
      case "stock":
        return <StockManager />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar 
        activeSection={activeSection} 
        setActiveSection={setActiveSection}
        user={user}
        onLogout={handleLogout}
      />
      <main className="flex-1 overflow-auto">
        {renderContent()}
      </main>
    </div>
  );
};

export default Index;
