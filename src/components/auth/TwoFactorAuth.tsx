import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { QrCode, Copy, Key } from "lucide-react";

export function TwoFactorAuth() {
  const [isEnabled, setIsEnabled] = useState(false);
  const [qrCode, setQrCode] = useState("");
  const [backupCodes, setBackupCodes] = useState<string[]>([]);
  const [verificationCode, setVerificationCode] = useState("");
  const { toast } = useToast();

  const enableTwoFactor = async () => {
    // Here you would:
    // 1. Call your backend to generate a secret
    // 2. Generate QR code
    // 3. Generate backup codes
    setQrCode("data:image/png;base64,YOUR_QR_CODE_HERE");
    setBackupCodes([
      "ABCD-EFGH-IJKL",
      "MNOP-QRST-UVWX",
      "1234-5678-9012",
      "3456-7890-1234",
      "5678-9012-3456"
    ]);
  };

  const verifyAndEnable = async () => {
    // Here you would verify the code with your backend
    if (verificationCode.length === 6) {
      setIsEnabled(true);
      toast({
        title: "2FA Enabled",
        description: "Two-factor authentication has been enabled for your account."
      });
    }
  };

  const copyBackupCodes = () => {
    navigator.clipboard.writeText(backupCodes.join("\n"));
    toast({
      title: "Copied",
      description: "Backup codes have been copied to clipboard."
    });
  };

  return (
    <Card className="p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-6">Two-Factor Authentication</h2>

      {!isEnabled ? (
        <div className="space-y-6">
          <p className="text-muted-foreground">
            Add an extra layer of security to your account by enabling two-factor
            authentication.
          </p>

          {!qrCode ? (
            <Button
              onClick={enableTwoFactor}
              className="w-full flex items-center gap-2"
            >
              <Key className="h-4 w-4" />
              Enable 2FA
            </Button>
          ) : (
            <div className="space-y-6">
              <div className="space-y-2">
                <Label>1. Scan QR Code</Label>
                <div className="flex justify-center p-4 bg-white rounded-lg">
                  <img src={qrCode} alt="QR Code" className="w-48 h-48" />
                </div>
              </div>

              <div className="space-y-2">
                <Label>2. Enter Verification Code</Label>
                <div className="flex gap-2">
                  <Input
                    type="text"
                    maxLength={6}
                    placeholder="Enter 6-digit code"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                  />
                  <Button onClick={verifyAndEnable}>Verify</Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <QrCode className="h-4 w-4" />
                  Backup Codes
                </Label>
                <Card className="p-4 bg-muted">
                  <div className="space-y-2 font-mono text-sm">
                    {backupCodes.map((code) => (
                      <div key={code}>{code}</div>
                    ))}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={copyBackupCodes}
                    className="mt-4 w-full flex items-center gap-2"
                  >
                    <Copy className="h-4 w-4" />
                    Copy Codes
                  </Button>
                </Card>
                <p className="text-sm text-muted-foreground">
                  Save these backup codes in a secure place. They can be used to
                  access your account if you lose your 2FA device.
                </p>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-green-500">
            <Key className="h-4 w-4" />
            <span>Two-factor authentication is enabled</span>
          </div>
          <Button
            variant="outline"
            onClick={() => setIsEnabled(false)}
            className="w-full"
          >
            Disable 2FA
          </Button>
        </div>
      )}
    </Card>
  );
}
