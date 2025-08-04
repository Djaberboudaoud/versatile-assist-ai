import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Languages, Globe, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Language {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
  description: string;
}

const languages: Language[] = [
  {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    flag: '🇺🇸',
    description: 'Full feature support with advanced AI capabilities'
  },
  {
    code: 'ar',
    name: 'Arabic',
    nativeName: 'العربية',
    flag: '🇸🇦',
    description: 'Complete Arabic language support with cultural context'
  }
];

interface LanguageSelectorProps {
  selectedLanguage: string;
  onLanguageSelect: (language: string) => void;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({ 
  selectedLanguage, 
  onLanguageSelect 
}) => {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="w-12 h-12 rounded-full bg-gradient-accent flex items-center justify-center shadow-lg">
            <Languages className="w-6 h-6 text-white" />
          </div>
        </div>
        <h2 className="text-2xl font-bold">Choose Your Language</h2>
        <p className="text-muted-foreground max-w-md mx-auto">
          Select your preferred language for the most natural and effective AI interaction.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
        {languages.map((language) => (
          <Card
            key={language.code}
            className={cn(
              "relative overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-lg border-2 group",
              selectedLanguage === language.code 
                ? "border-accent shadow-glow" 
                : "border-border hover:border-accent/50"
            )}
            onClick={() => onLanguageSelect(language.code)}
          >
            <div className="p-6 space-y-4">
              {/* Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="text-3xl">{language.flag}</div>
                  <div>
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      {language.name}
                      {selectedLanguage === language.code && (
                        <Check className="w-4 h-4 text-accent" />
                      )}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {language.nativeName}
                    </p>
                  </div>
                </div>
                {selectedLanguage === language.code && (
                  <Badge variant="outline" className="text-accent border-accent">
                    Selected
                  </Badge>
                )}
              </div>

              {/* Description */}
              <p className="text-sm text-muted-foreground leading-relaxed">
                {language.description}
              </p>

              {/* Features for each language */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Globe className="w-3 h-3" />
                  <span>Natural Language Processing</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Languages className="w-3 h-3" />
                  <span>Voice Recognition & Synthesis</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Check className="w-3 h-3" />
                  <span>Cultural Context Awareness</span>
                </div>
              </div>

              {/* Action Button */}
              <Button
                variant={selectedLanguage === language.code ? "neural" : "outline"}
                className="w-full"
                onClick={(e) => {
                  e.stopPropagation();
                  onLanguageSelect(language.code);
                }}
              >
                {selectedLanguage === language.code ? (
                  <>
                    <Check className="w-4 h-4 mr-2" />
                    Selected
                  </>
                ) : (
                  <>
                    Select {language.name}
                  </>
                )}
              </Button>
            </div>

            {/* Gradient Overlay */}
            {selectedLanguage === language.code && (
              <div className="absolute inset-0 bg-gradient-to-r from-accent/5 to-transparent pointer-events-none" />
            )}
          </Card>
        ))}
      </div>

      {/* Additional Info */}
      <div className="text-center max-w-2xl mx-auto">
        <Card className="p-4 bg-muted/50">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Globe className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium">Multi-Language AI</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Our AI assistant is trained on diverse datasets and can understand cultural nuances, 
            providing more accurate and contextually appropriate responses in your chosen language.
          </p>
        </Card>
      </div>
    </div>
  );
};