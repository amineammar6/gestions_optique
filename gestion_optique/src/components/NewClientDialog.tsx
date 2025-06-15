
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface NewClientDialogProps {
  onClientAdded?: (client: any) => void;
}

export const NewClientDialog = ({ onClientAdded }: NewClientDialogProps) => {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [newClient, setNewClient] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    prescription: "",
    notes: ""
  });

  const handleSubmit = () => {
    if (!newClient.name || !newClient.email || !newClient.phone) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir les champs obligatoires (nom, email, téléphone)",
        variant: "destructive"
      });
      return;
    }

    // Add client to the list
    onClientAdded?.(newClient);

    toast({
      title: "Client ajouté",
      description: `${newClient.name} a été ajouté à votre liste de clients`,
    });

    // Reset form
    setNewClient({
      name: "",
      email: "",
      phone: "",
      address: "",
      prescription: "",
      notes: ""
    });
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          Nouveau Client
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <User className="h-5 w-5 mr-2" />
            Nouveau Client
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="name">Nom complet *</Label>
            <Input
              id="name"
              value={newClient.name}
              onChange={(e) => setNewClient({...newClient, name: e.target.value})}
              placeholder="Ex: Marie Dubois"
            />
          </div>

          <div>
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              value={newClient.email}
              onChange={(e) => setNewClient({...newClient, email: e.target.value})}
              placeholder="marie.dubois@example.com"
            />
          </div>

          <div>
            <Label htmlFor="phone">Téléphone *</Label>
            <Input
              id="phone"
              value={newClient.phone}
              onChange={(e) => setNewClient({...newClient, phone: e.target.value})}
              placeholder="06 12 34 56 78"
            />
          </div>

          <div>
            <Label htmlFor="address">Adresse</Label>
            <Input
              id="address"
              value={newClient.address}
              onChange={(e) => setNewClient({...newClient, address: e.target.value})}
              placeholder="123 rue de la Paix, 75001 Paris"
            />
          </div>

          <div>
            <Label htmlFor="prescription">Prescription</Label>
            <Input
              id="prescription"
              value={newClient.prescription}
              onChange={(e) => setNewClient({...newClient, prescription: e.target.value})}
              placeholder="Ex: OD: -2.00, OG: -1.75"
            />
          </div>

          <div>
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              value={newClient.notes}
              onChange={(e) => setNewClient({...newClient, notes: e.target.value})}
              placeholder="Notes particulières..."
              rows={3}
            />
          </div>

          <div className="flex gap-2 pt-4">
            <Button onClick={handleSubmit} className="flex-1">
              Ajouter le client
            </Button>
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Annuler
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
