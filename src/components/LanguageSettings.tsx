import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import {
  Globe,
  Check,
  X,
  Edit2,
  Download,
  Upload,
  Search,
  Plus,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Language {
  code: string;
  name: string;
  nativeName: string;
  enabled: boolean;
  translationProgress: number;
}

interface TranslationString {
  key: string;
  defaultText: string;
  translations: Record<string, string>;
}

export function LanguageSettings() {
  const [languages, setLanguages] = useState<Language[]>([
    {
      code: "en",
      name: "English",
      nativeName: "English",
      enabled: true,
      translationProgress: 100
    },
    {
      code: "es",
      name: "Spanish",
      nativeName: "Español",
      enabled: true,
      translationProgress: 85
    },
    {
      code: "fr",
      name: "French",
      nativeName: "Français",
      enabled: true,
      translationProgress: 75
    },
    {
      code: "de",
      name: "German",
      nativeName: "Deutsch",
      enabled: false,
      translationProgress: 60
    }
  ]);

  const [strings, setStrings] = useState<TranslationString[]>([
    {
      key: "welcome_message",
      defaultText: "Welcome to our platform",
      translations: {
        es: "Bienvenido a nuestra plataforma",
        fr: "Bienvenue sur notre plateforme",
        de: "Willkommen auf unserer Plattform"
      }
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [editingKey, setEditingKey] = useState<string | null>(null);
  const { toast } = useToast();

  const toggleLanguage = (code: string) => {
    setLanguages(languages.map(lang =>
      lang.code === code ? { ...lang, enabled: !lang.enabled } : lang
    ));
    toast({
      title: "Language Updated",
      description: `Language ${code.toUpperCase()} has been ${languages.find(l => l.code === code)?.enabled ? 'disabled' : 'enabled'}.`
    });
  };

  const saveTranslation = (key: string, langCode: string, value: string) => {
    setStrings(strings.map(str =>
      str.key === key
        ? {
            ...str,
            translations: { ...str.translations, [langCode]: value }
          }
        : str
    ));
    setEditingKey(null);
    toast({
      title: "Translation Saved",
      description: "Your translation has been updated successfully."
    });
  };

  const exportTranslations = () => {
    const data = {
      languages,
      strings
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "translations.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const filteredStrings = strings.filter(str =>
    str.key.toLowerCase().includes(searchTerm.toLowerCase()) ||
    str.defaultText.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Language Settings</h2>
          <div className="flex gap-4">
            <Button
              variant="outline"
              onClick={exportTranslations}
              className="flex items-center gap-2"
            >
              <Download className="h-4 w-4" />
              Export Translations
            </Button>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Language
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {languages.map((lang) => (
            <Card key={lang.code} className="p-4">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-semibold">{lang.name}</h3>
                  <p className="text-sm text-muted-foreground">{lang.nativeName}</p>
                </div>
                <Button
                  variant={lang.enabled ? "default" : "outline"}
                  size="sm"
                  onClick={() => toggleLanguage(lang.code)}
                >
                  {lang.enabled ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <X className="h-4 w-4" />
                  )}
                </Button>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Translation Progress</span>
                  <span>{lang.translationProgress}%</span>
                </div>
                <Progress value={lang.translationProgress} />
              </div>
            </Card>
          ))}
        </div>

        <div className="space-y-4">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search translations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
            <Button variant="outline" className="flex items-center gap-2">
              <Upload className="h-4 w-4" />
              Import
            </Button>
          </div>

          <div className="border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Key</TableHead>
                  <TableHead>English (Default)</TableHead>
                  {languages
                    .filter((lang) => lang.enabled && lang.code !== "en")
                    .map((lang) => (
                      <TableHead key={lang.code}>
                        {lang.name}
                      </TableHead>
                    ))}
                  <TableHead className="w-[100px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStrings.map((str) => (
                  <TableRow key={str.key}>
                    <TableCell className="font-mono text-sm">
                      {str.key}
                    </TableCell>
                    <TableCell>{str.defaultText}</TableCell>
                    {languages
                      .filter((lang) => lang.enabled && lang.code !== "en")
                      .map((lang) => (
                        <TableCell key={lang.code}>
                          {editingKey === `${str.key}-${lang.code}` ? (
                            <div className="flex gap-2">
                              <Input
                                defaultValue={str.translations[lang.code]}
                                onBlur={(e) =>
                                  saveTranslation(str.key, lang.code, e.target.value)
                                }
                              />
                            </div>
                          ) : (
                            <div
                              className="flex justify-between items-center group"
                              onClick={() => setEditingKey(`${str.key}-${lang.code}`)}
                            >
                              <span>{str.translations[lang.code]}</span>
                              <Edit2 className="h-4 w-4 opacity-0 group-hover:opacity-100 cursor-pointer" />
                            </div>
                          )}
                        </TableCell>
                      ))}
                    <TableCell>
                      <Button variant="ghost" size="sm">
                        <Edit2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </Card>
    </div>
  );
}
