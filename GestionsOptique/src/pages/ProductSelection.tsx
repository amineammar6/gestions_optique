import React from "react";

const ProductSelection = () => {
  // Exemple de données / logique
  const handleProductSelect = (productId: string) => {
    console.log("Produit sélectionné :", productId);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Main Content */}
      <div className="flex-1 p-6">
        {/* Header */}
        <h1 className="text-2xl font-bold mb-4">Sélection de produits</h1>

        {/* Exemple de produit */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div
            className="border p-4 rounded-lg shadow hover:bg-gray-100 cursor-pointer"
            onClick={() => handleProductSelect("produit-1")}
          >
            <h2 className="text-lg font-semibold">Produit 1</h2>
            <p className="text-sm text-gray-600">Description du produit 1</p>
          </div>
          <div
            className="border p-4 rounded-lg shadow hover:bg-gray-100 cursor-pointer"
            onClick={() => handleProductSelect("produit-2")}
          >
            <h2 className="text-lg font-semibold">Produit 2</h2>
            <p className="text-sm text-gray-600">Description du produit 2</p>
          </div>
          {/* Ajoutez d'autres produits ici */}
        </div>
      </div>
    </div>
  );
};

export default ProductSelection;
