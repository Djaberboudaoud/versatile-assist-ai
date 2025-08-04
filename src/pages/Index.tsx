import React, { useState } from 'react';
import { ChatInterface } from '@/components/ChatInterface';
import { DomainSelector } from '@/components/DomainSelector';
import { LanguageSelector } from '@/components/LanguageSelector';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft, 
  Settings, 
  Sparkles, 
  Globe, 
  Brain,
  Zap,
  Shield,
  Mic
} from 'lucide-react';

type Step = 'language' | 'domain' | 'chat';

const Index = () => {
  const [currentStep, setCurrentStep] = useState<Step>('language');
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [selectedDomain, setSelectedDomain] = useState('');

  const handleLanguageSelect = (language: string) => {
    setSelectedLanguage(language);
    setCurrentStep('domain');
  };

  const handleDomainSelect = (domain: string) => {
    setSelectedDomain(domain);
    setCurrentStep('chat');
  };

  const handleBack = () => {
    if (currentStep === 'chat') {
      setCurrentStep('domain');
    } else if (currentStep === 'domain') {
      setCurrentStep('language');
    }
  };

  const renderContent = () => {
    switch (currentStep) {
      case 'language':
        return (
          <LanguageSelector
            selectedLanguage={selectedLanguage}
            onLanguageSelect={handleLanguageSelect}
          />
        );
      case 'domain':
        return (
          <DomainSelector
            selectedDomain={selectedDomain}
            onDomainSelect={handleDomainSelect}
          />
        );
      case 'chat':
        return (
          <ChatInterface
            selectedDomain={selectedDomain}
            language={selectedLanguage}
          />
        );
      default:
        return null;
    }
  };

  if (currentStep === 'chat') {
    return (
      <div className="h-screen flex flex-col bg-background">
        {/* Top Navigation */}
        <div className="flex items-center justify-between p-4 border-b border-border bg-card/80 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon-sm" onClick={handleBack}>
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-neural flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="font-semibold">Smart AI Assistant</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline">
              <Globe className="w-3 h-3 mr-1" />
              {selectedLanguage === 'ar' ? 'العربية' : 'English'}
            </Badge>
            <Badge variant="outline">{selectedDomain}</Badge>
          </div>
        </div>
        
        {/* Chat Interface */}
        <div className="flex-1 overflow-hidden">
          <ChatInterface selectedDomain={selectedDomain} language={selectedLanguage} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Background Effects */}
      <div className="fixed inset-0 bg-gradient-to-br from-background via-background to-primary/5 -z-10" />
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,rgba(120,119,198,0.1),transparent_50%)] -z-10" />
      
      {/* Header */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            {currentStep !== 'language' && (
              <Button variant="ghost" size="icon-sm" onClick={handleBack}>
                <ArrowLeft className="w-4 h-4" />
              </Button>
            )}
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-gradient-neural flex items-center justify-center shadow-neural animate-pulse-glow">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold">Smart AI Assistant</h1>
                <p className="text-sm text-muted-foreground">Setup Wizard</p>
              </div>
            </div>
          </div>
          
          {/* Progress Indicator */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <div className={
                currentStep === 'language' ? 'w-2 h-2 rounded-full transition-colors bg-accent' : 'w-2 h-2 rounded-full transition-colors bg-muted'
              } />
              <div className={
                currentStep === 'domain' ? 'w-2 h-2 rounded-full transition-colors bg-accent' : 'w-2 h-2 rounded-full transition-colors bg-muted'
              } />
              <div className="w-2 h-2 rounded-full transition-colors bg-muted" />
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto">
          {renderContent()}
        </div>

        {/* Footer Features */}
        <div className="mt-16 pt-8 border-t border-border">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="text-center space-y-2">
              <div className="w-10 h-10 rounded-full bg-gradient-primary mx-auto flex items-center justify-center">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <h3 className="font-medium">Advanced NLP</h3>
              <p className="text-sm text-muted-foreground">
                Understanding context and nuance
              </p>
            </div>
            <div className="text-center space-y-2">
              <div className="w-10 h-10 rounded-full bg-gradient-accent mx-auto flex items-center justify-center">
                <Mic className="w-5 h-5 text-white" />
              </div>
              <h3 className="font-medium">Voice Interaction</h3>
              <p className="text-sm text-muted-foreground">
                Speech-to-text and text-to-speech
              </p>
            </div>
            <div className="text-center space-y-2">
              <div className="w-10 h-10 rounded-full bg-gradient-primary mx-auto flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <h3 className="font-medium">Real-time AI</h3>
              <p className="text-sm text-muted-foreground">
                Instant responses and analysis
              </p>
            </div>
            <div className="text-center space-y-2">
              <div className="w-10 h-10 rounded-full bg-gradient-accent mx-auto flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <h3 className="font-medium">Secure & Private</h3>
              <p className="text-sm text-muted-foreground">
                Your data stays protected
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
