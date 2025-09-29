import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Apple, 
  Sun, 
  Sunset, 
  Moon, 
  Target, 
  CheckCircle,
  Download,
  Save,
  Sparkles,
  Utensils
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface NutritionGuidanceProps {
  onMascotStateChange: (state: 'idle' | 'wave' | 'blink' | 'concerned' | 'dance') => void;
  onMascotMessage: (message: string) => void;
}

interface NutritionPeriod {
  time: 'morning' | 'afternoon' | 'evening';
  icon: React.ComponentType<any>;
  title: string;
  advice: string;
  tips: string[];
}

interface Quest {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  points: number;
  emoji: string;
}

export const NutritionGuidance: React.FC<NutritionGuidanceProps> = ({
  onMascotStateChange,
  onMascotMessage
}) => {
  const [completedQuests, setCompletedQuests] = useState<string[]>(['hydration', 'breakfast']);
  const { toast } = useToast();

  const nutritionPeriods: NutritionPeriod[] = [
    {
      time: 'morning',
      icon: Sun,
      title: 'Morning Nutrition',
      advice: 'Start your day with protein and complex carbs to fuel your body and stabilize blood sugar.',
      tips: [
        'Include 20-30g of protein in breakfast',
        'Add fiber-rich foods like oats or berries',
        'Stay hydrated with 16-20oz of water',
        'Consider a multivitamin with breakfast'
      ]
    },
    {
      time: 'afternoon',
      icon: Sunset,
      title: 'Afternoon Balance',
      advice: 'Maintain energy with balanced meals and smart snacking to avoid afternoon crashes.',
      tips: [
        'Include lean protein in your lunch',
        'Add colorful vegetables for nutrients',
        'Choose nuts or fruits for healthy snacks',
        'Limit caffeine after 2 PM for better sleep'
      ]
    },
    {
      time: 'evening',
      icon: Moon,
      title: 'Evening Wind-down',
      advice: 'Focus on lighter, nutrient-dense foods that support recovery and quality sleep.',
      tips: [
        'Eat dinner 2-3 hours before bedtime',
        'Include magnesium-rich foods like spinach',
        'Consider herbal tea for relaxation',
        'Avoid heavy or spicy foods late at night'
      ]
    }
  ];

  const quests: Quest[] = [
    {
      id: 'hydration',
      title: 'Hydration Hero',
      description: 'Drink 8 glasses of water today',
      completed: completedQuests.includes('hydration'),
      points: 10,
      emoji: '💧'
    },
    {
      id: 'breakfast',
      title: 'Morning Champion',
      description: 'Eat a protein-rich breakfast',
      completed: completedQuests.includes('breakfast'),
      points: 15,
      emoji: '🥗'
    },
    {
      id: 'vegetables',
      title: 'Veggie Victory',
      description: 'Include vegetables in 3 meals',
      completed: completedQuests.includes('vegetables'),
      points: 20,
      emoji: '🥬'
    },
    {
      id: 'mindful',
      title: 'Mindful Eating',
      description: 'Eat one meal without distractions',
      completed: completedQuests.includes('mindful'),
      points: 15,
      emoji: '🧘'
    },
    {
      id: 'fruits',
      title: 'Fruit Focus',
      description: 'Eat 2 servings of fresh fruit',
      completed: completedQuests.includes('fruits'),
      points: 10,
      emoji: '🍎'
    },
    {
      id: 'planning',
      title: 'Meal Planner',
      description: 'Plan tomorrow\'s meals',
      completed: completedQuests.includes('planning'),
      points: 25,
      emoji: '📋'
    }
  ];

  const totalPoints = quests.reduce((sum, quest) => sum + (quest.completed ? quest.points : 0), 0);
  const maxPoints = quests.reduce((sum, quest) => sum + quest.points, 0);
  const progressPercentage = (totalPoints / maxPoints) * 100;

  const handleQuestToggle = (questId: string, checked: boolean) => {
    if (checked && !completedQuests.includes(questId)) {
      setCompletedQuests(prev => [...prev, questId]);
      const quest = quests.find(q => q.id === questId);
      onMascotStateChange('dance');
      onMascotMessage(`Awesome! ${quest?.emoji} You completed "${quest?.title}" and earned ${quest?.points} points! Keep going! 🌟`);
      toast({
        title: "Quest Complete! 🎉",
        description: `You earned ${quest?.points} points for "${quest?.title}"`,
      });
    } else if (!checked && completedQuests.includes(questId)) {
      setCompletedQuests(prev => prev.filter(id => id !== questId));
    }
  };

  const handleSaveProgress = () => {
    onMascotStateChange('wave');
    onMascotMessage("Great job tracking your nutrition! Your progress has been saved. Keep up the healthy habits! 💚");
    toast({
      title: "Progress Saved",
      description: "Your nutrition data has been updated.",
    });
  };

  const handleExport = (format: 'json' | 'csv' | 'pdf') => {
    onMascotStateChange('blink');
    onMascotMessage(`Exporting your nutrition data as ${format.toUpperCase()}... This will help you track your progress over time! 📊`);
    toast({
      title: `Export Started`,
      description: `Your nutrition data is being prepared as ${format.toUpperCase()}.`,
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2 flex items-center justify-center gap-3">
          <Apple className="w-8 h-8 text-success" />
          Nutrition Guidance
        </h1>
        <p className="text-muted-foreground">
          Personalized nutrition advice and daily wellness quests
        </p>
      </div>

      {/* Daily Progress */}
      <Card className="glass-card border-0 shadow-lg">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5 text-primary" />
                Today's Progress
              </CardTitle>
              <CardDescription>Complete quests to earn wellness points</CardDescription>
            </div>
            <Badge className="bg-primary text-primary-foreground text-lg px-4 py-2">
              {totalPoints} / {maxPoints} pts
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Daily Goal Progress</span>
                <span className="text-sm text-muted-foreground">{Math.round(progressPercentage)}%</span>
              </div>
              <Progress value={progressPercentage} className="h-3" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {quests.map((quest) => (
                <motion.div
                  key={quest.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                    quest.completed 
                      ? 'bg-success/10 border-success/30' 
                      : 'glass-card border-muted'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <Checkbox
                      checked={quest.completed}
                      onCheckedChange={(checked) => handleQuestToggle(quest.id, checked as boolean)}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-lg">{quest.emoji}</span>
                        <h4 className={`font-medium ${quest.completed ? 'line-through text-muted-foreground' : ''}`}>
                          {quest.title}
                        </h4>
                        <Badge variant="outline" className="text-xs">
                          +{quest.points}
                        </Badge>
                      </div>
                      <p className={`text-sm ${quest.completed ? 'text-muted-foreground' : 'text-foreground'}`}>
                        {quest.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Daily Guidance */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-success" />
          <h2 className="text-2xl font-bold">Daily Guidance</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {nutritionPeriods.map((period, index) => {
            const Icon = period.icon;
            return (
              <motion.div
                key={period.time}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <Card className="glass-card border-0 shadow-lg h-full">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-success-gradient rounded-xl flex items-center justify-center">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{period.title}</CardTitle>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {period.advice}
                      </p>
                      
                      <div className="space-y-2">
                        {period.tips.map((tip, tipIndex) => (
                          <div key={tipIndex} className="flex items-start gap-2">
                            <CheckCircle className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                            <span className="text-sm">{tip}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap justify-center gap-4">
        <Button onClick={handleSaveProgress}>
          <Save className="w-4 h-4 mr-2" />
          Save Progress
        </Button>
        <Button variant="secondary" onClick={() => handleExport('json')}>
          <Download className="w-4 h-4 mr-2" />
          Export JSON
        </Button>
        <Button variant="outline" onClick={() => handleExport('csv')}>
          <Download className="w-4 h-4 mr-2" />
          Export CSV
        </Button>
        <Button variant="outline" onClick={() => handleExport('pdf')}>
          <Download className="w-4 h-4 mr-2" />
          Export PDF
        </Button>
      </div>
    </div>
  );
};