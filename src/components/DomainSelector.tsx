import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  GraduationCap, 
  Building2, 
  ShoppingCart, 
  Heart,
  Sparkles,
  Users,
  TrendingUp,
  Shield
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface Domain {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  features: string[];
  color: string;
  gradient: string;
}

const domains: Domain[] = [
  {
    id: 'education',
    name: 'Education',
    description: 'Explain lessons, summarize content, answer student questions in real-time',
    icon: <GraduationCap className="w-6 h-6" />,
    features: ['Lesson Explanations', 'Content Summarization', 'Real-time Q&A', 'Study Assistance'],
    color: 'text-domain-education',
    gradient: 'from-domain-education to-domain-education/60'
  },
  {
    id: 'administration',
    name: 'Administration',
    description: 'Auto-respond to emails, analyze data, handle complaints efficiently',
    icon: <Building2 className="w-6 h-6" />,
    features: ['Email Automation', 'Data Analysis', 'Complaint Handling', 'Document Processing'],
    color: 'text-domain-admin',
    gradient: 'from-domain-admin to-domain-admin/60'
  },
  {
    id: 'ecommerce',
    name: 'E-Commerce',
    description: 'Recommend products, assist with purchases, analyze customer reviews',
    icon: <ShoppingCart className="w-6 h-6" />,
    features: ['Product Recommendations', 'Purchase Assistance', 'Review Analysis', 'Customer Support'],
    color: 'text-domain-ecommerce',
    gradient: 'from-domain-ecommerce to-domain-ecommerce/60'
  },
  {
    id: 'healthcare',
    name: 'Healthcare',
    description: 'Answer patient inquiries, book appointments, offer primary guidance',
    icon: <Heart className="w-6 h-6" />,
    features: ['Patient Inquiries', 'Appointment Booking', 'Health Guidance', 'Medical Information'],
    color: 'text-domain-healthcare',
    gradient: 'from-domain-healthcare to-domain-healthcare/60'
  }
];

interface DomainSelectorProps {
  selectedDomain: string;
  onDomainSelect: (domain: string) => void;
}

export const DomainSelector: React.FC<DomainSelectorProps> = ({ 
  selectedDomain, 
  onDomainSelect 
}) => {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="w-12 h-12 rounded-full bg-gradient-neural flex items-center justify-center shadow-neural animate-pulse-glow">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
        </div>
        <h2 className="text-2xl font-bold bg-gradient-neural bg-clip-text text-transparent">
          Smart AI Assistant
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Choose your domain to get started with intelligent, context-aware assistance 
          powered by advanced language models.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {domains.map((domain) => (
          <Card
            key={domain.id}
            className={cn(
              "relative overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-neural border-2 group",
              selectedDomain === domain.name 
                ? "border-primary shadow-glow" 
                : "border-border hover:border-primary/50"
            )}
            onClick={() => onDomainSelect(domain.name)}
          >
            <div className="p-6 space-y-4">
              {/* Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "w-12 h-12 rounded-lg flex items-center justify-center",
                    selectedDomain === domain.name
                      ? `bg-gradient-to-br ${domain.gradient} text-white shadow-lg`
                      : "bg-muted text-muted-foreground group-hover:bg-gradient-to-br group-hover:from-primary group-hover:to-primary/60 group-hover:text-white"
                  )}>
                    {domain.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{domain.name}</h3>
                    {selectedDomain === domain.name && (
                      <Badge variant="outline" className="text-xs">
                        <Sparkles className="w-3 h-3 mr-1" />
                        Active
                      </Badge>
                    )}
                  </div>
                </div>
                {selectedDomain === domain.name && (
                  <div className="w-3 h-3 rounded-full bg-accent animate-pulse" />
                )}
              </div>

              {/* Description */}
              <p className="text-sm text-muted-foreground leading-relaxed">
                {domain.description}
              </p>

              {/* Features */}
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-foreground">Key Features:</h4>
                <div className="grid grid-cols-2 gap-1">
                  {domain.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2 text-xs text-muted-foreground">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary/60" />
                      {feature}
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <Button
                variant={selectedDomain === domain.name ? "neural" : "domain"}
                className="w-full mt-4"
                onClick={(e) => {
                  e.stopPropagation();
                  onDomainSelect(domain.name);
                }}
              >
                {selectedDomain === domain.name ? (
                  <>
                    <Sparkles className="w-4 h-4 mr-2" />
                    Selected
                  </>
                ) : (
                  <>
                    Select {domain.name}
                  </>
                )}
              </Button>
            </div>

            {/* Gradient Overlay */}
            {selectedDomain === domain.name && (
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent pointer-events-none" />
            )}
          </Card>
        ))}
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto mt-8">
        <div className="text-center p-4 bg-card rounded-lg border border-border">
          <div className="flex items-center justify-center mb-2">
            <Users className="w-5 h-5 text-accent" />
          </div>
          <div className="text-lg font-semibold">Multi-Domain</div>
          <div className="text-sm text-muted-foreground">Support</div>
        </div>
        <div className="text-center p-4 bg-card rounded-lg border border-border">
          <div className="flex items-center justify-center mb-2">
            <TrendingUp className="w-5 h-5 text-accent" />
          </div>
          <div className="text-lg font-semibold">AI-Powered</div>
          <div className="text-sm text-muted-foreground">Intelligence</div>
        </div>
        <div className="text-center p-4 bg-card rounded-lg border border-border">
          <div className="flex items-center justify-center mb-2">
            <Shield className="w-5 h-5 text-accent" />
          </div>
          <div className="text-lg font-semibold">Secure</div>
          <div className="text-sm text-muted-foreground">& Private</div>
        </div>
      </div>
    </div>
  );
};