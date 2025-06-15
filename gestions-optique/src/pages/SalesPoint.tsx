
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Glasses, Sparkles, Contact, Watch, MoreHorizontal, ShoppingCart, Plus } from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import { ShoppingCart as Cart } from "@/components/ShoppingCart";
import { AppSidebar } from "@/components/AppSidebar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";

export const SalesPoint = () => {
  const [selectedCategory, setSelectedCategory] = useState("Monture");
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "kids lux",
      price: 150.00,
      quantity: 1,
      image: "/lovable-uploads/90b76f65-ca4d-40d7-8cc3-daca5189eb97.png"
    }
  ]);

  const categories = [
    { id: "Monture", name: "Monture", icon: Glasses, color: "text-blue-600" },
    { id: "Verre", name: "Verre", icon: Sparkles, color: "text-blue-600" },
    { id: "Lentille", name: "Lentille", icon: Contact, color: "text-blue-600" },
    { id: "Accessory", name: "Accessory", icon: Watch, color: "text-blue-600" },
    { id: "Autre", name: "Autre", icon: MoreHorizontal, color: "text-blue-600" }
  ];

  const removeFromCart = (productId: number) => {
    setCartItems(cartItems.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      setCartItems(cartItems.map(item => 
        item.id === productId 
          ? { ...item, quantity }
          : item
      ));
    }
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <AppSidebar />
        <SidebarInset className="flex-1">
          <div className="flex">
            {/* Main Content */}
            <div className="flex-1 p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Choise Category</h1>
                <div className="flex items-center gap-4">
                  <span className="text-gray-600">18153</span>
                </div>
              </div>

              {/* Categories */}
              <div className="grid grid-cols-5 gap-4 mb-8">
                {categories.map((category) => {
                  const IconComponent = category.icon;
                  return (
                    <Card 
                      key={category.id}
                      className={`cursor-pointer transition-all hover:shadow-md ${
                        selectedCategory === category.id ? 'ring-2 ring-blue-500 bg-blue-50' : ''
                      }`}
                      onClick={() => setSelectedCategory(category.id)}
                    >
                      <CardContent className="p-6 text-center">
                        <IconComponent className={`h-8 w-8 mx-auto mb-2 ${category.color}`} />
                        <h3 className="font-medium text-gray-900">{category.name}</h3>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>

            {/* Shopping Cart Sidebar */}
            <div className="w-80 bg-white border-l border-gray-200 p-6">
              {/* Cart Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <ShoppingCart className="h-5 w-5 text-blue-600" />
                  <span className="font-medium text-gray-900">
                    {cartItems.length} items
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">Ajouter viste</span>
                  <Button size="sm" variant="outline">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Cart Items */}
              <div className="space-y-4 mb-6">
                {cartItems.map((item) => (
                  <Card key={item.id} className="relative">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                          <img 
                            src={item.image} 
                            alt={item.name}
                            className="w-full h-full object-cover rounded-lg"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="font-medium text-gray-900">{item.name}</h4>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => removeFromCart(item.id)}
                              className="h-6 w-6 p-0 text-gray-400 hover:text-red-500"
                            >
                              ×
                            </Button>
                          </div>
                          <p className="text-sm font-semibold text-gray-900">
                            {item.price.toFixed(2)} DH
                          </p>
                          <div className="flex items-center gap-2 mt-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="h-6 w-6 p-0"
                            >
                              -
                            </Button>
                            <span className="text-sm font-medium w-8 text-center">
                              {item.quantity}
                            </span>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="h-6 w-6 p-0"
                            >
                              +
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Cart Summary */}
              <div className="border-t pt-4">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-lg font-semibold text-gray-900">Total</span>
                  <span className="text-xl font-bold text-blue-600">
                    {getTotalPrice().toFixed(2)} DH
                  </span>
                </div>
                
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                  Commande
                </Button>
              </div>
            </div>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default SalesPoint;
