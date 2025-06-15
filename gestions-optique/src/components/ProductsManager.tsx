
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Package, Edit } from "lucide-react";
import { ProductDetails } from "./ProductDetails";
import { NewProductDialog } from "./NewProductDialog";

export const ProductsManager = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Tous");
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Ray-Ban Aviator Classic",
      category: "Montures",
      price: 189,
      stock: 25,
      reference: "RB3025",
      brand: "Ray-Ban",
      status: "En stock"
    },
    {
      id: 2,
      name: "Verres progressifs Varilux",
      category: "Verres",
      price: 450,
      stock: 8,
      reference: "VAR-PROG",
      brand: "Essilor",
      status: "Stock faible"
    },
    {
      id: 3,
      name: "Lentilles journalières Acuvue",
      category: "Lentilles",
      price: 45,
      stock: 150,
      reference: "ACU-DAILY",
      brand: "Johnson & Johnson",
      status: "En stock"
    },
    {
      id: 4,
      name: "Étui à lunettes cuir",
      category: "Accessoires",
      price: 25,
      stock: 0,
      reference: "ETUI-001",
      brand: "ADevOptique",
      status: "Rupture"
    }
  ]);

  const categories = ["Tous", "Montures", "Verres", "Lentilles", "Accessoires"];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.reference.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "Tous" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleProductUpdate = (updatedProduct: any) => {
    setProducts(products.map(product => 
      product.id === updatedProduct.id ? updatedProduct : product
    ));
  };

  const handleNewProduct = (newProduct: any) => {
    const productWithId = {
      ...newProduct,
      id: products.length + 1,
      status: newProduct.stock > 0 ? "En stock" : "Rupture"
    };
    setProducts([...products, productWithId]);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "En stock": return "bg-green-100 text-green-800";
      case "Stock faible": return "bg-yellow-100 text-yellow-800";
      case "Rupture": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Catalogue Produits</h1>
        <NewProductDialog onProductAdded={handleNewProduct} />
      </div>

      {/* Filtres et recherche */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Rechercher un produit..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category)}
                  className="whitespace-nowrap"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Grille des produits */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <Card key={product.id} className="hover:shadow-lg transition-shadow duration-200">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <Package className="h-6 w-6 text-blue-600" />
                <Badge className={getStatusColor(product.status)}>
                  {product.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900 text-lg">{product.name}</h3>
                <p className="text-sm text-gray-600">{product.brand}</p>
                <p className="text-xs text-gray-500 font-mono">{product.reference}</p>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-blue-600">{product.price}€</p>
                  <p className="text-sm text-gray-600">Stock: {product.stock}</p>
                </div>
                <Badge variant="secondary">{product.category}</Badge>
              </div>

              <div className="flex gap-2 pt-2">
                <ProductDetails product={product} onUpdate={handleProductUpdate} />
                <ProductDetails product={product} onUpdate={handleProductUpdate} trigger={
                  <Button variant="outline" size="sm" className="flex-1">
                    <Edit className="h-4 w-4 mr-1" />
                    Modifier
                  </Button>
                } />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
