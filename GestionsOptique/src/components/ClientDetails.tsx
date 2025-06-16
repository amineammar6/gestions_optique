
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Eye, Edit, Save, X } from "lucide-react";

interface Client {
  id: number;
  name: string;
  email: string;
  phone: string;
  lastVisit: string;
  prescription: string;
  status: string;
}

interface ClientDetailsProps {
  client: Client;
  onUpdate?: (client: Client) => void;
}

export const ClientDetails = ({ client, onUpdate }: ClientDetailsProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedClient, setEditedClient] = useState(client);

  const handleSave = () => {
    onUpdate?.(editedClient);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedClient(client);
    setIsEditing(false);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Eye className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Détails du Client</span>
            <div className="flex gap-2">
              {!isEditing ? (
                <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                  <Edit className="h-4 w-4" />
                </Button>
              ) : (
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={handleSave}>
                    <Save className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleCancel}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="name">Nom</Label>
            {isEditing ? (
              <Input
                id="name"
                value={editedClient.name}
                onChange={(e) => setEditedClient({...editedClient, name: e.target.value})}
              />
            ) : (
              <p className="text-sm text-gray-600">{client.name}</p>
            )}
          </div>

          <div>
            <Label htmlFor="email">Email</Label>
            {isEditing ? (
              <Input
                id="email"
                type="email"
                value={editedClient.email}
                onChange={(e) => setEditedClient({...editedClient, email: e.target.value})}
              />
            ) : (
              <p className="text-sm text-gray-600">{client.email}</p>
            )}
          </div>

          <div>
            <Label htmlFor="phone">Téléphone</Label>
            {isEditing ? (
              <Input
                id="phone"
                value={editedClient.phone}
                onChange={(e) => setEditedClient({...editedClient, phone: e.target.value})}
              />
            ) : (
              <p className="text-sm text-gray-600">{client.phone}</p>
            )}
          </div>

          <div>
            <Label htmlFor="prescription">Prescription</Label>
            {isEditing ? (
              <Input
                id="prescription"
                value={editedClient.prescription}
                onChange={(e) => setEditedClient({...editedClient, prescription: e.target.value})}
              />
            ) : (
              <p className="text-sm text-gray-600">{client.prescription}</p>
            )}
          </div>

          <div>
            <Label>Statut</Label>
            <div className="mt-1">
              <Badge variant={client.status === "Actif" ? "default" : "secondary"}>
                {client.status}
              </Badge>
            </div>
          </div>

          <div>
            <Label>Dernière visite</Label>
            <p className="text-sm text-gray-600">
              {new Date(client.lastVisit).toLocaleDateString('fr-FR')}
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
