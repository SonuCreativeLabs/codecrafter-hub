import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera, Pencil, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AgentProfileProps {
  agentId: string;
}

interface AgentData {
  name: string;
  email: string;
  phone: string;
  address: string;
  profilePic: string;
  joinDate: string;
}

export function AgentProfile({ agentId }: AgentProfileProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState<AgentData>({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+91 98765 43210",
    address: "123 Main St, Mumbai, India",
    profilePic: "",
    joinDate: "2023-12-01"
  });
  const { toast } = useToast();

  const handleSave = () => {
    // Here you would typically save to your backend
    setIsEditing(false);
    toast({
      description: "Profile updated successfully!",
      className: "bg-green-50 border-green-200"
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileData(prev => ({
          ...prev,
          profilePic: reader.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Agent Profile</span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => isEditing ? handleSave() : setIsEditing(true)}
          >
            {isEditing ? (
              <>
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </>
            ) : (
              <>
                <Pencil className="h-4 w-4 mr-2" />
                Edit Profile
              </>
            )}
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Profile Picture */}
          <div className="flex flex-col items-center space-y-4">
            <div className="relative">
              <Avatar className="h-24 w-24">
                <AvatarImage src={profileData.profilePic} />
                <AvatarFallback>{profileData.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              {isEditing && (
                <label 
                  htmlFor="profile-pic"
                  className="absolute bottom-0 right-0 p-1 bg-primary text-white rounded-full cursor-pointer hover:bg-primary/90"
                >
                  <Camera className="h-4 w-4" />
                  <input 
                    type="file"
                    id="profile-pic"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                </label>
              )}
            </div>
            <div className="text-center">
              <h3 className="text-lg font-semibold">{profileData.name}</h3>
              <p className="text-sm text-muted-foreground">Agent ID: #{agentId}</p>
              <p className="text-xs text-muted-foreground">Joined: {new Date(profileData.joinDate).toLocaleDateString()}</p>
            </div>
          </div>

          {/* Profile Details */}
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={profileData.name}
                onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
                disabled={!isEditing}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={profileData.email}
                onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                disabled={!isEditing}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                value={profileData.phone}
                onChange={(e) => setProfileData(prev => ({ ...prev, phone: e.target.value }))}
                disabled={!isEditing}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                value={profileData.address}
                onChange={(e) => setProfileData(prev => ({ ...prev, address: e.target.value }))}
                disabled={!isEditing}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
