import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Activity, 
  Heart, 
  Footprints, 
  Flame, 
  MapPin, 
  RefreshCw,
  Download,
  Link,
  Unlink,
  Calendar
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface FitnessTrackingProps {
  onMascotStateChange: (state: 'idle' | 'wave' | 'blink' | 'concerned' | 'dance') => void;
  onMascotMessage: (message: string) => void;
}

interface FitnessData {
  steps: { current: number; goal: number; };
  calories: { current: number; goal: number; };
  distance: { current: number; goal: number; };
  heartRate: { current: number; zone: string; };
  activeMinutes: { current: number; goal: number; };
  weeklyTrend: Array<{ day: string; steps: number; }>;
}

export const FitnessTracking: React.FC<FitnessTrackingProps> = ({
  onMascotStateChange,
  onMascotMessage
}) => {
  const [isConnected, setIsConnected] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const { toast } = useToast();

  const mockFitnessData: FitnessData = {
    steps: { current: 8432, goal: 10000 },
    calories: { current: 2145, goal: 2500 },
    distance: { current: 6.2, goal: 8.0 },
    heartRate: { current: 72, zone: 'Resting' },
    activeMinutes: { current: 45, goal: 60 },
    weeklyTrend: [
      { day: 'Mon', steps: 9234 },
      { day: 'Tue', steps: 8765 },
      { day: 'Wed', steps: 10123 },
      { day: 'Thu', steps: 7456 },
      { day: 'Fri', steps: 8432 },
      { day: 'Sat', steps: 6789 },
      { day: 'Sun', steps: 9876 },
    ]
  };

  const handleGoogleFitConnect = () => {
    setIsSyncing(true);
    onMascotStateChange('blink');
    onMascotMessage("Let's connect your Google Fit — I'll only read fitness data you allow. 📱");
    
    setTimeout(() => {
      setIsSyncing(false);
      setIsConnected(true);
      onMascotStateChange('dance');
      onMascotMessage("Great! Your Google Fit is connected. I can see your activity data now! 🎉");
      toast({
        title: "Google Fit Connected! 🎉",
        description: "Your fitness data is now syncing automatically.",
      });
    }, 2000);
  };

  const handleSync = () => {
    setIsSyncing(true);
    onMascotStateChange('blink');
    onMascotMessage("Syncing your latest activity data... 📊");
    
    setTimeout(() => {
      setIsSyncing(false);
      onMascotStateChange('wave');
      onMascotMessage("All caught up! Your fitness data is fresh and ready. 💪");
      toast({
        title: "Sync Complete",
        description: "Your fitness data has been updated.",
      });
    }, 1500);
  };

  const handleDisconnect = () => {
    setIsConnected(false);
    onMascotStateChange('concerned');
    onMascotMessage("Google Fit disconnected. You can reconnect anytime to track your progress! 📱");
    toast({
      title: "Google Fit Disconnected",
      description: "Your fitness tracking has been paused.",
    });
  };

  if (!isConnected) {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-2 flex items-center justify-center gap-3">
            <Activity className="w-8 h-8 text-primary" />
            Fitness Tracking
          </h1>
          <p className="text-muted-foreground">
            Connect Google Fit to track your daily activity and health metrics
          </p>
        </div>

        <Card className="glass-card border-0 shadow-lg max-w-2xl mx-auto">
          <CardHeader className="text-center">
            <div className="w-20 h-20 bg-secondary-gradient rounded-full flex items-center justify-center mx-auto mb-4">
              <Activity className="w-10 h-10 text-white" />
            </div>
            <CardTitle className="text-2xl">Connect Google Fit</CardTitle>
            <CardDescription className="text-base">
              Sync your activity data to track steps, calories, heart rate, and more
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-muted/30 rounded-lg p-4">
              <h3 className="font-semibold mb-3">What we'll track:</h3>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="flex items-center gap-2">
                  <Footprints className="w-4 h-4 text-primary" />
                  <span>Daily steps</span>
                </div>
                <div className="flex items-center gap-2">
                  <Flame className="w-4 h-4 text-primary" />
                  <span>Calories burned</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span>Distance traveled</span>
                </div>
                <div className="flex items-center gap-2">
                  <Heart className="w-4 h-4 text-primary" />
                  <span>Heart rate</span>
                </div>
              </div>
            </div>

            <Button
              onClick={handleGoogleFitConnect}
              className="w-full"
              size="lg"
              disabled={isSyncing}
            >
              {isSyncing ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full mr-2"
                  />
                  Connecting...
                </>
              ) : (
                <>
                  <Link className="w-5 h-5 mr-2" />
                  Connect Google Fit
                </>
              )}
            </Button>

            <p className="text-xs text-muted-foreground text-center">
              We only access the fitness data you explicitly allow. 
              Your privacy is our priority.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
            <Activity className="w-8 h-8 text-primary" />
            Fitness Dashboard
          </h1>
          <p className="text-muted-foreground">
            Track your daily activity and reach your fitness goals
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <Badge className="bg-success text-success-foreground">
            <Link className="w-3 h-3 mr-1" />
            Connected
          </Badge>
          <Button
            variant="outline"
            size="sm"
            onClick={handleSync}
            disabled={isSyncing}
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${isSyncing ? 'animate-spin' : ''}`} />
            Sync Now
          </Button>
        </div>
      </div>

      {/* Today's Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {[
          {
            label: 'Steps',
            current: mockFitnessData.steps.current,
            goal: mockFitnessData.steps.goal,
            icon: Footprints,
            color: 'primary',
            unit: 'steps'
          },
          {
            label: 'Calories',
            current: mockFitnessData.calories.current,
            goal: mockFitnessData.calories.goal,
            icon: Flame,
            color: 'secondary',
            unit: 'cal'
          },
          {
            label: 'Distance',
            current: mockFitnessData.distance.current,
            goal: mockFitnessData.distance.goal,
            icon: MapPin,
            color: 'accent',
            unit: 'km'
          },
          {
            label: 'Heart Rate',
            current: mockFitnessData.heartRate.current,
            goal: null,
            icon: Heart,
            color: 'alert',
            unit: 'bpm',
            subtitle: mockFitnessData.heartRate.zone
          },
          {
            label: 'Active Minutes',
            current: mockFitnessData.activeMinutes.current,
            goal: mockFitnessData.activeMinutes.goal,
            icon: Activity,
            color: 'success',
            unit: 'min'
          },
        ].map((metric, index) => {
          const Icon = metric.icon;
          const progress = metric.goal ? (metric.current / metric.goal) * 100 : null;
          
          return (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
            >
              <Card className="glass-card border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className={`w-10 h-10 rounded-lg bg-${metric.color}-gradient flex items-center justify-center`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    {progress && (
                      <Badge variant="outline" className="text-xs">
                        {Math.round(progress)}%
                      </Badge>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">{metric.label}</p>
                    <div>
                      <p className="text-2xl font-bold">
                        {typeof metric.current === 'number' && metric.current % 1 === 0 
                          ? metric.current.toLocaleString()
                          : metric.current
                        }
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {metric.subtitle || (metric.goal ? `of ${metric.goal.toLocaleString()} ${metric.unit}` : metric.unit)}
                      </p>
                    </div>
                    
                    {progress && (
                      <Progress value={progress} className="h-1.5" />
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Weekly Trend */}
      <Card className="glass-card border-0 shadow-lg">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Weekly Activity</CardTitle>
              <CardDescription>Your step count over the past 7 days</CardDescription>
            </div>
            <Calendar className="w-5 h-5 text-muted-foreground" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-2 h-32">
            {mockFitnessData.weeklyTrend.map((day, index) => {
              const height = (day.steps / 12000) * 100;
              return (
                <div key={day.day} className="flex flex-col items-center">
                  <div className="flex-1 flex items-end w-full">
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: `${height}%` }}
                      transition={{ delay: 0.1 * index, duration: 0.5 }}
                      className="w-full bg-primary-gradient rounded-t min-h-[4px]"
                    />
                  </div>
                  <p className="text-xs font-medium mt-2">{day.day}</p>
                  <p className="text-xs text-muted-foreground">{(day.steps / 1000).toFixed(1)}k</p>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-wrap justify-center gap-4">
        <Button variant="secondary">
          <Download className="w-4 h-4 mr-2" />
          Export CSV
        </Button>
        <Button variant="outline" onClick={handleDisconnect}>
          <Unlink className="w-4 h-4 mr-2" />
          Disconnect Google Fit
        </Button>
      </div>
    </div>
  );
};