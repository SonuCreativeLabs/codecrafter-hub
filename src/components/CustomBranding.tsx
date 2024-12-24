import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ColorPicker } from "@/components/ui/color-picker";
import { useToast } from "@/hooks/use-toast";
import { Upload, Palette, Mail, MessageSquare } from "lucide-react";

interface BrandingConfig {
  logo: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  emailTemplate: string;
  smsTemplate: string;
  whatsappTemplate: string;
}

export function CustomBranding() {
  const [config, setConfig] = useState<BrandingConfig>({
    logo: "",
    primaryColor: "#0066cc",
    secondaryColor: "#4d4d4d",
    accentColor: "#ff9900",
    emailTemplate: "Dear {agent_name},\n\nThank you for being part of our team...",
    smsTemplate: "Hi {agent_name}, your promo code {code} is ready to use!",
    whatsappTemplate: "Hello {agent_name}! 👋\nYour new promo code: {code}"
  });
  const { toast } = useToast();

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setConfig(prev => ({ ...prev, logo: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleColorChange = (color: string, type: 'primary' | 'secondary' | 'accent') => {
    setConfig(prev => ({ ...prev, [`${type}Color`]: color }));
  };

  const handleTemplateChange = (value: string, type: 'email' | 'sms' | 'whatsapp') => {
    setConfig(prev => ({ ...prev, [`${type}Template`]: value }));
  };

  const saveChanges = () => {
    // Here you would typically save to your backend
    localStorage.setItem('brandingConfig', JSON.stringify(config));
    toast({
      title: "Changes saved",
      description: "Your branding settings have been updated successfully."
    });
  };

  const previewTemplate = (template: string) => {
    return template.replace(/{agent_name}/g, 'John Doe')
                  .replace(/{code}/g, 'PROMO123');
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-6">Custom Branding</h2>
        
        <Tabs defaultValue="visual" className="space-y-6">
          <TabsList>
            <TabsTrigger value="visual">Visual Branding</TabsTrigger>
            <TabsTrigger value="templates">Message Templates</TabsTrigger>
          </TabsList>

          <TabsContent value="visual" className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label>Company Logo</Label>
                <div className="flex items-center gap-4 mt-2">
                  {config.logo && (
                    <img 
                      src={config.logo} 
                      alt="Company logo" 
                      className="h-16 w-16 object-contain"
                    />
                  )}
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleLogoUpload}
                    className="max-w-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <Label>Primary Color</Label>
                  <ColorPicker
                    color={config.primaryColor}
                    onChange={(color) => handleColorChange(color, 'primary')}
                  />
                </div>
                <div>
                  <Label>Secondary Color</Label>
                  <ColorPicker
                    color={config.secondaryColor}
                    onChange={(color) => handleColorChange(color, 'secondary')}
                  />
                </div>
                <div>
                  <Label>Accent Color</Label>
                  <ColorPicker
                    color={config.accentColor}
                    onChange={(color) => handleColorChange(color, 'accent')}
                  />
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="templates" className="space-y-6">
            <div className="space-y-6">
              <div>
                <Label className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Email Template
                </Label>
                <Textarea
                  value={config.emailTemplate}
                  onChange={(e) => handleTemplateChange(e.target.value, 'email')}
                  className="h-32 mt-2"
                  placeholder="Enter email template..."
                />
                <div className="mt-2 text-sm text-muted-foreground">
                  Preview: {previewTemplate(config.emailTemplate)}
                </div>
              </div>

              <div>
                <Label className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4" />
                  SMS Template
                </Label>
                <Textarea
                  value={config.smsTemplate}
                  onChange={(e) => handleTemplateChange(e.target.value, 'sms')}
                  className="h-24 mt-2"
                  placeholder="Enter SMS template..."
                />
                <div className="mt-2 text-sm text-muted-foreground">
                  Preview: {previewTemplate(config.smsTemplate)}
                </div>
              </div>

              <div>
                <Label className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4" />
                  WhatsApp Template
                </Label>
                <Textarea
                  value={config.whatsappTemplate}
                  onChange={(e) => handleTemplateChange(e.target.value, 'whatsapp')}
                  className="h-24 mt-2"
                  placeholder="Enter WhatsApp template..."
                />
                <div className="mt-2 text-sm text-muted-foreground">
                  Preview: {previewTemplate(config.whatsappTemplate)}
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-6 flex justify-end">
          <Button onClick={saveChanges} className="flex items-center gap-2">
            <Palette className="h-4 w-4" />
            Save Branding Settings
          </Button>
        </div>
      </Card>
    </div>
  );
}
