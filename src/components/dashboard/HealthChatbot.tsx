import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { 
  MessageCircle, 
  Send, 
  Bot, 
  User, 
  Sparkles,
  Heart,
  Activity,
  Brain,
  ToggleLeft,
  ToggleRight,
  Download
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface HealthChatbotProps {
  onMascotStateChange: (state: 'idle' | 'wave' | 'blink' | 'concerned' | 'dance') => void;
  onMascotMessage: (message: string) => void;
}

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
  isDetailed?: boolean;
}

export const HealthChatbot: React.FC<HealthChatbotProps> = ({
  onMascotStateChange,
  onMascotMessage
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: "Hi! I'm your AI health assistant 🤖 I can help you with wellness advice, explain health concepts, and answer your questions. What would you like to know?",
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isDetailed, setIsDetailed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const quickActions = [
    { label: '💊 Medication Questions', message: 'I have questions about my medications' },
    { label: '🏃 Exercise Tips', message: 'Give me some exercise recommendations' },
    { label: '🥗 Nutrition Advice', message: 'I need nutrition guidance' },
    { label: '😴 Sleep Help', message: 'How can I improve my sleep?' },
    { label: '🧠 Mental Health', message: 'I want to discuss mental wellness' },
    { label: '📊 Lab Results', message: 'Help me understand my lab results' },
  ];

  const mockResponses = {
    short: {
      'medication': "Always take medications as prescribed. Store them properly and never share. Check with your doctor about interactions. Set reminders to stay consistent.",
      'exercise': "Start with 30 minutes of moderate activity daily. Include cardio, strength training, and flexibility. Listen to your body and progress gradually.",
      'nutrition': "Focus on whole foods, fruits, vegetables, lean proteins, and whole grains. Stay hydrated and limit processed foods. Practice portion control.",
      'sleep': "Maintain a consistent sleep schedule. Create a relaxing bedtime routine. Keep your bedroom cool and dark. Limit screens before bed.",
      'mental': "Practice stress management techniques like meditation or deep breathing. Stay connected with loved ones. Consider professional help if needed.",
      'labs': "Lab results should be reviewed with your healthcare provider. They can explain what the numbers mean for your specific health situation.",
      'default': "I'm here to help with your health questions! Could you be more specific about what you'd like to know?"
    },
    detailed: {
      'medication': "Medication management is crucial for your health. Here's what you need to know:\n\n• **Timing**: Take medications at the same time each day to maintain consistent levels\n• **Storage**: Keep medications in a cool, dry place away from direct sunlight\n• **Interactions**: Always inform all healthcare providers about all medications you're taking\n• **Side Effects**: Monitor for any unusual symptoms and report them to your doctor\n• **Adherence**: Use pill organizers or phone reminders to stay consistent\n\nNever stop medications suddenly without consulting your healthcare provider.",
      'exercise': "Exercise is one of the best investments in your health. Here's a comprehensive approach:\n\n**Cardiovascular Health:**\n• 150 minutes of moderate cardio per week\n• Activities like brisk walking, swimming, cycling\n\n**Strength Training:**\n• 2-3 sessions per week targeting all major muscle groups\n• Use bodyweight, resistance bands, or weights\n\n**Flexibility & Mobility:**\n• Daily stretching or yoga\n• Focus on areas that feel tight\n\n**Getting Started:**\n• Start slowly and gradually increase intensity\n• Listen to your body and rest when needed\n• Consider working with a fitness professional initially",
      'nutrition': "Nutrition is the foundation of good health. Here's a comprehensive guide:\n\n**Macronutrients:**\n• **Proteins**: 20-30% of calories from lean sources\n• **Carbohydrates**: 45-55% from whole grains, fruits, vegetables\n• **Fats**: 25-35% from healthy sources like nuts, olive oil, avocados\n\n**Micronutrients:**\n• Aim for colorful variety in fruits and vegetables\n• Consider a multivitamin if diet is limited\n\n**Hydration:**\n• 8-10 glasses of water daily\n• More if you're active or in hot climates\n\n**Meal Timing:**\n• Regular meal schedule helps metabolism\n• Don't skip breakfast\n• Light dinner 2-3 hours before bed",
      'sleep': "Quality sleep is essential for physical and mental health:\n\n**Sleep Hygiene:**\n• Consistent bedtime and wake time, even on weekends\n• Create a relaxing pre-sleep routine (reading, gentle stretches)\n• Keep bedroom temperature around 65-68°F (18-20°C)\n\n**Environment:**\n• Dark, quiet room (consider blackout curtains, white noise)\n• Comfortable mattress and pillows\n• Remove electronic devices or use blue light filters\n\n**Lifestyle Factors:**\n• Limit caffeine after 2 PM\n• Avoid large meals close to bedtime\n• Regular exercise, but not close to bedtime\n• Manage stress through relaxation techniques\n\n**When to Seek Help:**\n• Persistent insomnia or sleep disturbances\n• Loud snoring or breathing interruptions\n• Excessive daytime sleepiness",
      'mental': "Mental health is just as important as physical health:\n\n**Stress Management:**\n• Practice mindfulness meditation (start with 5-10 minutes daily)\n• Deep breathing exercises during stressful moments\n• Regular physical activity to reduce stress hormones\n\n**Social Connection:**\n• Maintain relationships with family and friends\n• Join clubs or groups with shared interests\n• Consider volunteer work for sense of purpose\n\n**Professional Support:**\n• Therapy can be helpful for everyone, not just during crises\n• Don't hesitate to reach out if you're struggling\n• Many resources are available: counselors, support groups, hotlines\n\n**Daily Practices:**\n• Gratitude journaling\n• Adequate sleep and nutrition\n• Limit negative media consumption\n• Engage in activities you enjoy",
      'labs': "Understanding lab results is important for managing your health:\n\n**Common Tests:**\n• **CBC (Complete Blood Count)**: Checks for anemia, infections, blood disorders\n• **CMP (Comprehensive Metabolic Panel)**: Kidney function, liver function, blood sugar\n• **Lipid Panel**: Cholesterol levels and heart disease risk\n• **A1C**: Average blood sugar over 2-3 months\n\n**Important Notes:**\n• Reference ranges can vary between labs\n• Results should always be interpreted by your healthcare provider\n• Trends over time are often more important than single values\n• Discuss any concerning results and next steps with your doctor\n\n**Preparation:**\n• Follow fasting instructions if required\n• Inform your provider about medications and supplements\n• Ask questions about what tests are being done and why",
      'default': "I'm your comprehensive health assistant, ready to help with any wellness questions you have. I can provide information about:\n\n• **Medical Conditions**: Symptoms, causes, treatments\n• **Medications**: Usage, side effects, interactions\n• **Lifestyle**: Diet, exercise, sleep, stress management\n• **Preventive Care**: Screenings, vaccinations, health maintenance\n• **Mental Health**: Stress management, emotional wellness\n\nWhat specific area would you like to explore? I can provide both quick answers and detailed explanations based on your preference."
    }
  };

  const generateResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    const responseType = isDetailed ? 'detailed' : 'short';
    
    if (message.includes('medication') || message.includes('pill') || message.includes('drug')) {
      return mockResponses[responseType].medication;
    } else if (message.includes('exercise') || message.includes('workout') || message.includes('fitness')) {
      return mockResponses[responseType].exercise;
    } else if (message.includes('nutrition') || message.includes('diet') || message.includes('food')) {
      return mockResponses[responseType].nutrition;
    } else if (message.includes('sleep') || message.includes('insomnia') || message.includes('tired')) {
      return mockResponses[responseType].sleep;
    } else if (message.includes('mental') || message.includes('stress') || message.includes('anxiety') || message.includes('depression')) {
      return mockResponses[responseType].mental;
    } else if (message.includes('lab') || message.includes('test') || message.includes('result')) {
      return mockResponses[responseType].labs;
    } else {
      return mockResponses[responseType].default;
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    onMascotStateChange('blink');
    onMascotMessage("Let me think about that... 🤔 I'll give you a helpful answer!");

    // Simulate AI response delay
    setTimeout(() => {
      const response = generateResponse(inputMessage);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: response,
        timestamp: new Date(),
        isDetailed
      };

      setMessages(prev => [...prev, botMessage]);
      setIsLoading(false);
      onMascotStateChange('wave');
      onMascotMessage("There you go! I hope that helps. Feel free to ask follow-up questions! 💚");
    }, 1500);
  };

  const handleQuickAction = (message: string) => {
    setInputMessage(message);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const saveConversation = () => {
    const conversationData = {
      messages,
      timestamp: new Date().toISOString(),
      messageCount: messages.length
    };
    
    onMascotStateChange('wave');
    onMascotMessage("Your conversation has been saved! You can reference it anytime. 📝");
    
    toast({
      title: "Conversation Saved",
      description: "Your chat history has been stored securely.",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2 flex items-center justify-center gap-3">
          <MessageCircle className="w-8 h-8 text-primary" />
          AI Health Assistant
        </h1>
        <p className="text-muted-foreground">
          Get personalized health advice and answers to your wellness questions
        </p>
      </div>

      {/* Response Mode Toggle */}
      <Card className="glass-card border-0 shadow-lg">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg">Response Mode</CardTitle>
              <CardDescription>Choose how detailed you want the responses to be</CardDescription>
            </div>
            <Button
              variant="outline"
              onClick={() => setIsDetailed(!isDetailed)}
              className="flex items-center gap-2"
            >
              {isDetailed ? <ToggleRight className="w-5 h-5 text-primary" /> : <ToggleLeft className="w-5 h-5" />}
              {isDetailed ? 'Detailed' : 'Quick'}
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* Chat Interface */}
      <Card className="glass-card border-0 shadow-lg">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Bot className="w-5 h-5 text-primary" />
              Health Chat
            </CardTitle>
            <div className="flex items-center gap-2">
              <Badge variant="outline">
                {messages.length} messages
              </Badge>
              <Button variant="outline" size="sm" onClick={saveConversation}>
                <Download className="w-4 h-4 mr-2" />
                Save
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Messages */}
          <div className="space-y-4 h-96 overflow-y-auto mb-4 p-4 rounded-lg bg-muted/20">
            <AnimatePresence>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-3 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {message.type === 'bot' && (
                    <div className="w-8 h-8 bg-primary-gradient rounded-full flex items-center justify-center flex-shrink-0">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                  )}
                  
                  <div className={`max-w-[70%] p-3 rounded-xl ${
                    message.type === 'user' 
                      ? 'bg-primary-gradient text-white' 
                      : 'glass-card'
                  }`}>
                    <p className="text-sm leading-relaxed whitespace-pre-line">
                      {message.content}
                    </p>
                    <p className={`text-xs mt-2 ${
                      message.type === 'user' ? 'text-white/70' : 'text-muted-foreground'
                    }`}>
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>

                  {message.type === 'user' && (
                    <div className="w-8 h-8 bg-accent-gradient rounded-full flex items-center justify-center flex-shrink-0">
                      <User className="w-4 h-4 text-white" />
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
            
            {isLoading && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex gap-3 justify-start"
              >
                <div className="w-8 h-8 bg-primary-gradient rounded-full flex items-center justify-center">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div className="glass-card p-3 rounded-xl">
                  <div className="flex items-center gap-2">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-4 h-4 border-2 border-primary/30 border-t-primary rounded-full"
                    />
                    <p className="text-sm text-muted-foreground">Thinking...</p>
                  </div>
                </div>
              </motion.div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Actions */}
          <div className="mb-4">
            <p className="text-sm font-medium mb-2">Quick Actions:</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {quickActions.map((action, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  className="text-xs h-auto py-2 px-3 justify-start"
                  onClick={() => handleQuickAction(action.message)}
                >
                  {action.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Input */}
          <div className="flex gap-2">
            <Textarea
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me anything about your health..."
              className="glass-card border-0 resize-none min-h-[44px] focus-ring"
              rows={1}
            />
            <Button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isLoading}
              className="h-11 px-4"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};