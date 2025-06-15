
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, Phone, Mail, Calendar } from "lucide-react";
import { ClientDetails } from "./ClientDetails";
import { NewClientDialog } from "./NewClientDialog";

export const ClientsManager = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [clients, setClients] = useState([
    {
      id: 1,
      name: "Marie Dubois",
      email: "marie.dubois@email.com",
      phone: "06 12 34 56 78",
      address: "123 rue de la Paix, 75001 Paris",
      lastVisit: "2024-06-10",
      prescription: "Myopie -2.5",
      notes: "Client fidèle depuis 3 ans",
      status: "Actif"
    },
    {
      id: 2,
      name: "Jean Martin",
      email: "jean.martin@email.com",
      phone: "06 98 76 54 32",
      address: "456 avenue des Champs, 75008 Paris",
      lastVisit: "2024-06-08",
      prescription: "Presbytie +1.75",
      notes: "Préfère les montures en titane",
      status: "Actif"
    },
    {
      id: 3,
      name: "Sophie Laurent",
      email: "sophie.laurent@email.com",
      phone: "06 45 67 89 12",
      address: "789 boulevard Saint-Germain, 75007 Paris",
      lastVisit: "2024-05-28",
      prescription: "Astigmatisme",
      notes: "Sensible aux allergies - éviter nickel",
      status: "En attente"
    }
  ]);

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleClientUpdate = (updatedClient: any) => {
    setClients(clients.map(client => 
      client.id === updatedClient.id ? updatedClient : client
    ));
  };

  const handleNewClient = (newClient: any) => {
    const clientWithId = {
      ...newClient,
      id: clients.length + 1,
      lastVisit: new Date().toISOString().split('T')[0],
      status: "Actif"
    };
    setClients([...clients, clientWithId]);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Gestion des Clients</h1>
        <NewClientDialog onClientAdded={handleNewClient} />
      </div>

      {/* Barre de recherche */}
      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Rechercher un client..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Liste des clients */}
      <div className="grid gap-4">
        {filteredClients.map((client) => (
          <Card key={client.id} className="hover:shadow-lg transition-shadow duration-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 font-semibold text-lg">
                        {client.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900">{client.name}</h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                        <div className="flex items-center">
                          <Mail className="h-4 w-4 mr-1" />
                          {client.email}
                        </div>
                        <div className="flex items-center">
                          <Phone className="h-4 w-4 mr-1" />
                          {client.phone}
                        </div>
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          Dernière visite: {new Date(client.lastVisit).toLocaleDateString('fr-FR')}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">Prescription</p>
                    <p className="text-sm text-gray-600">{client.prescription}</p>
                  </div>
                  <Badge variant={client.status === "Actif" ? "default" : "secondary"}>
                    {client.status}
                  </Badge>
                  <ClientDetails client={client} onUpdate={handleClientUpdate} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
