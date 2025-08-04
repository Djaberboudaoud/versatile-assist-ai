import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Send, 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  Bot, 
  User, 
  Languages,
  Settings,
  Sparkles
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  domain?: string;
}

interface ChatInterfaceProps {
  selectedDomain: string;
  language: string;
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({ selectedDomain, language }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: `Hello! I'm your Smart AI Assistant. I'm ready to help you with ${selectedDomain.toLowerCase()} related questions. How can I assist you today?`,
      sender: 'ai',
      timestamp: new Date(),
      domain: selectedDomain
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speechEnabled, setSpeechEnabled] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    // Simulate AI response (replace with actual AI integration)
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: generateAIResponse(inputMessage, selectedDomain),
        sender: 'ai',
        timestamp: new Date(),
        domain: selectedDomain
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);

      // Text-to-speech for AI response
      if (speechEnabled) {
        speakText(aiResponse.content);
      }
    }, 1500);
  };

  const generateAIResponse = (input: string, domain: string): string => {
    const responses = {
      Education: [
        "I can help explain complex concepts, provide study materials, and answer your academic questions.",
        "Let me break that down for you in a simple, easy-to-understand way.",
        "That's a great question! Here's what you need to know..."
      ],
      Administration: [
        "I can assist with document processing, data analysis, and administrative workflows.",
        "Let me help you streamline that administrative task.",
        "I'll analyze this information and provide you with a comprehensive summary."
      ],
      'E-Commerce': [
        "I can help you find the perfect products, compare prices, and make informed purchase decisions.",
        "Based on your preferences, here are some personalized recommendations.",
        "Let me analyze customer reviews and product features for you."
      ],
      Healthcare: [
        "I can provide general health information and help schedule appointments. For medical emergencies, please contact healthcare professionals.",
        "Here's some general guidance on your health-related question.",
        "I recommend consulting with a healthcare professional for personalized medical advice."
      ]
    };

    const domainResponses = responses[domain as keyof typeof responses] || responses.Education;
    return domainResponses[Math.floor(Math.random() * domainResponses.length)];
  };

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      setIsSpeaking(true);
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = language === 'ar' ? 'ar-SA' : 'en-US';
      utterance.onend = () => setIsSpeaking(false);
      speechSynthesis.speak(utterance);
    }
  };

  const startListening = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.lang = language === 'ar' ? 'ar-SA' : 'en-US';
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onstart = () => setIsListening(true);
      recognition.onend = () => setIsListening(false);
      
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputMessage(transcript);
      };

      recognition.start();
    }
  };

  const getDomainColor = (domain: string) => {
    const colors = {
      Education: 'text-domain-education',
      Administration: 'text-domain-admin',
      'E-Commerce': 'text-domain-ecommerce',
      Healthcare: 'text-domain-healthcare'
    };
    return colors[domain as keyof typeof colors] || 'text-primary';
  };

  const getDomainBadge = (domain: string) => {
    const variants = {
      Education: 'bg-domain-education/10 text-domain-education border-domain-education/20',
      Administration: 'bg-domain-admin/10 text-domain-admin border-domain-admin/20',
      'E-Commerce': 'bg-domain-ecommerce/10 text-domain-ecommerce border-domain-ecommerce/20',
      Healthcare: 'bg-domain-healthcare/10 text-domain-healthcare border-domain-healthcare/20'
    };
    return variants[domain as keyof typeof variants] || 'bg-primary/10 text-primary border-primary/20';
  };

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Chat Header */}
      <div className="flex items-center justify-between p-4 border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center shadow-glow">
            <Bot className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h2 className="text-lg font-semibold">Smart AI Assistant</h2>
            <div className="flex items-center gap-2">
              <Badge className={cn("border", getDomainBadge(selectedDomain))}>
                {selectedDomain}
              </Badge>
              <Badge variant="outline" className="text-xs">
                <Languages className="w-3 h-3 mr-1" />
                {language === 'ar' ? 'العربية' : 'English'}
              </Badge>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => setSpeechEnabled(!speechEnabled)}
            className={cn(speechEnabled ? 'text-accent' : 'text-muted-foreground')}
          >
            {speechEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </Button>
          <Button variant="ghost" size="icon-sm">
            <Settings className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={cn(
              "flex items-start gap-3 animate-in slide-in-from-bottom-2 duration-300",
              message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
            )}
          >
            <div className={cn(
              "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0",
              message.sender === 'user' 
                ? 'bg-chat-user text-primary-foreground' 
                : 'bg-gradient-primary text-primary-foreground shadow-glow'
            )}>
              {message.sender === 'user' ? 
                <User className="w-4 h-4" /> : 
                <Sparkles className="w-4 h-4" />
              }
            </div>
            <Card className={cn(
              "max-w-[80%] p-4 shadow-sm",
              message.sender === 'user' 
                ? 'bg-chat-user text-primary-foreground' 
                : 'bg-card'
            )}>
              <p className="text-sm leading-relaxed">{message.content}</p>
              <div className="flex items-center justify-between mt-2 pt-2 border-t border-border/20">
                <span className="text-xs text-muted-foreground">
                  {message.timestamp.toLocaleTimeString()}
                </span>
                {message.domain && (
                  <Badge variant="outline" className="text-xs">
                    {message.domain}
                  </Badge>
                )}
              </div>
            </Card>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center shadow-glow">
              <Sparkles className="w-4 h-4 text-primary-foreground animate-pulse" />
            </div>
            <Card className="bg-card p-4 shadow-sm">
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                </div>
                <span className="text-sm text-muted-foreground">AI is thinking...</span>
              </div>
            </Card>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-border bg-card/50 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <div className="flex-1 relative">
            <Input
              ref={inputRef}
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder={language === 'ar' ? 'اكتب رسالتك هنا...' : 'Type your message here...'}
              className="pr-12 bg-chat-input border-border"
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              disabled={isLoading}
            />
            <Button
              variant="voice"
              size="icon-sm"
              className="absolute right-2 top-1/2 transform -translate-y-1/2"
              onClick={startListening}
              disabled={isLoading || isListening}
            >
              {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            </Button>
          </div>
          <Button
            variant="neural"
            size="icon"
            onClick={handleSendMessage}
            disabled={!inputMessage.trim() || isLoading}
            className="shadow-neural"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
        {isSpeaking && (
          <div className="flex items-center gap-2 mt-2 text-accent text-sm">
            <Volume2 className="w-4 h-4 animate-pulse" />
            <span>AI is speaking...</span>
          </div>
        )}
      </div>
    </div>
  );
};