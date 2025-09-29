import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Heart, 
  Calendar, 
  TrendingUp, 
  CheckCircle,
  BarChart3,
  Clock
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface MentalHealthProps {
  onMascotStateChange: (state: 'idle' | 'wave' | 'blink' | 'concerned' | 'dance') => void;
  onMascotMessage: (message: string) => void;
}

interface MoodQuestion {
  id: number;
  question: string;
  emoji: string;
  options: Array<{ emoji: string; label: string; value: number; }>;
}

const moodQuestions: MoodQuestion[] = [
  {
    id: 1,
    question: "How are you feeling today?",
    emoji: "😊",
    options: [
      { emoji: "😢", label: "Sad", value: 1 },
      { emoji: "😐", label: "Okay", value: 2 },
      { emoji: "🙂", label: "Good", value: 3 },
      { emoji: "😊", label: "Happy", value: 4 },
      { emoji: "😍", label: "Amazing", value: 5 },
    ]
  },
  {
    id: 2,
    question: "How stressed do you feel?",
    emoji: "😌",
    options: [
      { emoji: "😰", label: "Very Stressed", value: 1 },
      { emoji: "😟", label: "Stressed", value: 2 },
      { emoji: "😐", label: "Neutral", value: 3 },
      { emoji: "😌", label: "Calm", value: 4 },
      { emoji: "🧘", label: "Very Calm", value: 5 },
    ]
  },
  {
    id: 3,
    question: "How energetic are you feeling?",
    emoji: "⚡",
    options: [
      { emoji: "😴", label: "Exhausted", value: 1 },
      { emoji: "😑", label: "Tired", value: 2 },
      { emoji: "😐", label: "Okay", value: 3 },
      { emoji: "😊", label: "Energetic", value: 4 },
      { emoji: "⚡", label: "Supercharged", value: 5 },
    ]
  },
  {
    id: 4,
    question: "How satisfied are you with today?",
    emoji: "✨",
    options: [
      { emoji: "😞", label: "Disappointed", value: 1 },
      { emoji: "😕", label: "Unsatisfied", value: 2 },
      { emoji: "😐", label: "Neutral", value: 3 },
      { emoji: "😊", label: "Satisfied", value: 4 },
      { emoji: "✨", label: "Thrilled", value: 5 },
    ]
  },
  {
    id: 5,
    question: "How optimistic do you feel about tomorrow?",
    emoji: "🌟",
    options: [
      { emoji: "😰", label: "Worried", value: 1 },
      { emoji: "😟", label: "Uncertain", value: 2 },
      { emoji: "😐", label: "Neutral", value: 3 },
      { emoji: "🙂", label: "Hopeful", value: 4 },
      { emoji: "🌟", label: "Excited", value: 5 },
    ]
  },
];

const mockMoodHistory = [
  { date: '2024-01-01', mood: 4.2 },
  { date: '2024-01-02', mood: 3.8 },
  { date: '2024-01-03', mood: 4.5 },
  { date: '2024-01-04', mood: 3.2 },
  { date: '2024-01-05', mood: 4.0 },
  { date: '2024-01-06', mood: 4.7 },
  { date: '2024-01-07', mood: 4.1 },
];

export const MentalHealth: React.FC<MentalHealthProps> = ({
  onMascotStateChange,
  onMascotMessage
}) => {
  const [isQuizActive, setIsQuizActive] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [todayMood, setTodayMood] = useState<number | null>(null);
  const { toast } = useToast();

  const startQuiz = () => {
    setIsQuizActive(true);
    setCurrentQuestion(0);
    setAnswers([]);
    setQuizCompleted(false);
    onMascotStateChange('wave');
    onMascotMessage("Let's check in with your mood today! Take your time with each question. 💚");
  };

  const handleAnswer = (value: number) => {
    const newAnswers = [...answers, value];
    setAnswers(newAnswers);

    if (currentQuestion < moodQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Quiz completed
      const averageMood = newAnswers.reduce((sum, score) => sum + score, 0) / newAnswers.length;
      setTodayMood(averageMood);
      setQuizCompleted(true);
      setIsQuizActive(false);
      
      onMascotStateChange('dance');
      onMascotMessage(`Thanks for checking in! Your mood score today is ${averageMood.toFixed(1)}/5. Keep taking care of yourself! 🌟`);
      
      toast({
        title: "Mood Quiz Complete! 🎉",
        description: `Your wellness score: ${averageMood.toFixed(1)}/5`,
      });
    }
  };

  const getMoodEmoji = (score: number) => {
    if (score >= 4.5) return "🌟";
    if (score >= 3.5) return "😊";
    if (score >= 2.5) return "😐";
    if (score >= 1.5) return "😕";
    return "😞";
  };

  const getMoodLabel = (score: number) => {
    if (score >= 4.5) return "Excellent";
    if (score >= 3.5) return "Good";
    if (score >= 2.5) return "Okay";
    if (score >= 1.5) return "Low";
    return "Very Low";
  };

  const averageWeeklyMood = mockMoodHistory.reduce((sum, day) => sum + day.mood, 0) / mockMoodHistory.length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2 flex items-center justify-center gap-3">
          <Heart className="w-8 h-8 text-accent" />
          Mental Wellness
        </h1>
        <p className="text-muted-foreground">
          Track your mood and emotional well-being with daily check-ins
        </p>
      </div>

      {/* Today's Mood Check-in */}
      <Card className="glass-card border-0 shadow-lg">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl">Today's Mood Check-in</CardTitle>
              <CardDescription>Quick 5-question wellness quiz</CardDescription>
            </div>
            <Badge className="bg-accent text-accent-foreground">
              <Clock className="w-3 h-3 mr-1" />
              2 min
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          {!isQuizActive && !quizCompleted && !todayMood && (
            <div className="text-center space-y-4">
              <div className="w-20 h-20 bg-accent-gradient rounded-full flex items-center justify-center mx-auto">
                <Heart className="w-10 h-10 text-white" />
              </div>
              <p className="text-lg">Ready to check in with your feelings?</p>
              <Button onClick={startQuiz} size="lg">
                Start Mood Quiz
              </Button>
            </div>
          )}

          {isQuizActive && (
            <AnimatePresence mode="wait">
              <motion.div
                key={currentQuestion}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <span className="text-4xl">{moodQuestions[currentQuestion].emoji}</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">
                    {moodQuestions[currentQuestion].question}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Question {currentQuestion + 1} of {moodQuestions.length}
                  </p>
                  <Progress value={((currentQuestion + 1) / moodQuestions.length) * 100} className="mt-3 max-w-md mx-auto" />
                </div>

                <div className="grid grid-cols-5 gap-3">
                  {moodQuestions[currentQuestion].options.map((option, index) => (
                    <motion.button
                      key={index}
                      onClick={() => handleAnswer(option.value)}
                      className="flex flex-col items-center p-4 rounded-xl glass-card hover:bg-muted/50 transition-all duration-200 focus-ring"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span className="text-3xl mb-2">{option.emoji}</span>
                      <span className="text-sm font-medium text-center">{option.label}</span>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          )}

          {(quizCompleted || todayMood) && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center space-y-4"
            >
              <div className="w-20 h-20 bg-success-gradient rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-10 h-10 text-white" />
              </div>
              <div>
                <p className="text-lg font-semibold mb-2">Today's Mood Score</p>
                <div className="flex items-center justify-center gap-3">
                  <span className="text-4xl">{getMoodEmoji(todayMood || 0)}</span>
                  <div>
                    <p className="text-3xl font-bold">{(todayMood || 0).toFixed(1)}</p>
                    <p className="text-sm text-muted-foreground">{getMoodLabel(todayMood || 0)}</p>
                  </div>
                </div>
              </div>
              <Button variant="outline" onClick={startQuiz}>
                Retake Quiz
              </Button>
            </motion.div>
          )}
        </CardContent>
      </Card>

      {/* Weekly Mood Trend */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="glass-card border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-primary" />
              Weekly Trend
            </CardTitle>
            <CardDescription>Your mood over the past 7 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-7 gap-2 h-24">
                {mockMoodHistory.map((day, index) => {
                  const height = (day.mood / 5) * 100;
                  const date = new Date(day.date).toLocaleDateString('en', { weekday: 'short' });
                  
                  return (
                    <div key={day.date} className="flex flex-col items-center">
                      <div className="flex-1 flex items-end w-full">
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: `${height}%` }}
                          transition={{ delay: 0.1 * index, duration: 0.5 }}
                          className="w-full bg-accent-gradient rounded-t min-h-[8px]"
                        />
                      </div>
                      <p className="text-xs font-medium mt-2">{date}</p>
                      <span className="text-xs">{getMoodEmoji(day.mood)}</span>
                    </div>
                  );
                })}
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Average this week:</span>
                <div className="flex items-center gap-2">
                  <span className="font-bold">{averageWeeklyMood.toFixed(1)}</span>
                  <span>{getMoodEmoji(averageWeeklyMood)}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-success" />
              Insights
            </CardTitle>
            <CardDescription>Your mental wellness patterns</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-success/10 rounded-lg">
                <span className="text-2xl">📈</span>
                <div>
                  <p className="font-medium text-success">Improving Trend</p>
                  <p className="text-sm text-muted-foreground">Your mood has improved 12% this week</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-3 bg-primary/10 rounded-lg">
                <span className="text-2xl">🎯</span>
                <div>
                  <p className="font-medium text-primary">Consistency Goal</p>
                  <p className="text-sm text-muted-foreground">5 day check-in streak!</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-3 bg-accent/10 rounded-lg">
                <span className="text-2xl">💡</span>
                <div>
                  <p className="font-medium text-accent">Tip of the Day</p>
                  <p className="text-sm text-muted-foreground">Try 5 minutes of deep breathing</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};