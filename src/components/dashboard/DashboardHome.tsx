import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { DashboardView } from './DashboardLayout';
import { 
  Activity, 
  Brain, 
  Heart, 
  Apple, 
  TrendingUp, 
  Calendar,
  Target,
  Sparkles
} from 'lucide-react';

interface DashboardHomeProps {
  onNavigate: (view: DashboardView) => void;
  onMascotStateChange: (state: 'idle' | 'wave' | 'blink' | 'concerned' | 'dance') => void;
  onMascotMessage: (message: string) => void;
}

export const DashboardHome: React.FC<DashboardHomeProps> = ({ 
  onNavigate, 
  onMascotStateChange, 
  onMascotMessage 
}) => {
  useEffect(() => {
    // Welcome message and mascot wave
    setTimeout(() => {
      onMascotStateChange('wave');
      onMascotMessage("Welcome back! 🎉 Your health dashboard is ready. Let's check your progress together!");
    }, 1000);
  }, [onMascotStateChange, onMascotMessage]);

  const quickStats = [
    { 
      label: 'Steps Today', 
      value: '8,432', 
      target: '10,000', 
      progress: 84, 
      icon: Activity,
      color: 'primary' 
    },
    { 
      label: 'Health Score', 
      value: '92', 
      target: '100', 
      progress: 92, 
      icon: Heart,
      color: 'success' 
    },
    { 
      label: 'Wellness Streak', 
      value: '7', 
      target: '30', 
      progress: 23, 
      icon: Target,
      color: 'accent' 
    },
  ];

  const quickActions = [
    {
      title: 'Health Analysis',
      description: 'Upload reports for AI-powered health insights',
      icon: Brain,
      action: () => onNavigate('prediction'),
      color: 'bg-primary-gradient',
      badge: 'AI Powered'
    },
    {
      title: 'Fitness Tracking',
      description: 'Connect Google Fit and track your activity',
      icon: Activity,
      action: () => onNavigate('fitness'),
      color: 'bg-secondary-gradient',
      badge: 'Connect Now'
    },
    {
      title: 'Mood Check-in',
      description: 'Quick 5-question wellness quiz',
      icon: Heart,
      action: () => onNavigate('mental'),
      color: 'bg-accent-gradient',
      badge: 'Daily'
    },
    {
      title: 'Nutrition Guide',
      description: 'Personalized meal recommendations',
      icon: Apple,
      action: () => onNavigate('nutrition'),
      color: 'bg-success-gradient',
      badge: 'New'
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-4xl font-bold mb-2">Good Morning, John! ☀️</h1>
        <p className="text-lg text-muted-foreground">
          Ready to continue your wellness journey?
        </p>
      </motion.div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {quickStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
            >
              <Card className="glass-card border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className={`w-12 h-12 rounded-xl bg-${stat.color}-gradient flex items-center justify-center`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {stat.progress}%
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <p className="text-2xl font-bold">{stat.value}</p>
                      <p className="text-sm text-muted-foreground">of {stat.target} {stat.label.toLowerCase()}</p>
                    </div>
                    <Progress value={stat.progress} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-bold">Quick Actions</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <motion.div
                key={action.title}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 + 0.1 * index }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Card 
                  className="glass-card border-0 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group"
                  onClick={action.action}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className={`w-14 h-14 rounded-xl ${action.color} flex items-center justify-center shadow-lg`}>
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                      <Badge className="bg-muted text-muted-foreground">
                        {action.badge}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardTitle className="text-lg mb-2 group-hover:text-primary transition-colors">
                      {action.title}
                    </CardTitle>
                    <CardDescription className="text-sm leading-relaxed">
                      {action.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Recent Activity */}
      <Card className="glass-card border-0 shadow-lg">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" />
              <CardTitle>Recent Activity</CardTitle>
            </div>
            <Button variant="ghost" size="sm" onClick={() => onNavigate('history')}>
              View All
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { action: 'Completed mood check-in', time: '2 hours ago', icon: '💚' },
              { action: 'Uploaded blood test results', time: 'Yesterday', icon: '📋' },
              { action: 'Achieved step goal (10,000 steps)', time: 'Yesterday', icon: '🎯' },
              { action: 'Connected Google Fit', time: '3 days ago', icon: '🔗' },
            ].map((activity, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + 0.1 * index }}
                className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/30 transition-colors"
              >
                <span className="text-2xl">{activity.icon}</span>
                <div className="flex-1">
                  <p className="font-medium">{activity.action}</p>
                  <p className="text-sm text-muted-foreground">{activity.time}</p>
                </div>
                <TrendingUp className="w-4 h-4 text-success" />
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};