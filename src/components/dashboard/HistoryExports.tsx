import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { 
  History, 
  Download, 
  Calendar, 
  Filter,
  Activity,
  Heart,
  TrendingUp,
  FileText,
  BarChart3
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface HistoryExportsProps {
  onMascotStateChange: (state: 'idle' | 'wave' | 'blink' | 'concerned' | 'dance') => void;
  onMascotMessage: (message: string) => void;
}

const mockFitnessData = [
  { date: '2024-01-07', steps: 8432, heartRate: 72, calories: 2145 },
  { date: '2024-01-06', steps: 9876, heartRate: 75, calories: 2340 },
  { date: '2024-01-05', steps: 6789, heartRate: 68, calories: 1980 },
  { date: '2024-01-04', steps: 10123, heartRate: 78, calories: 2456 },
  { date: '2024-01-03', steps: 7456, heartRate: 70, calories: 2100 },
  { date: '2024-01-02', steps: 8765, heartRate: 73, calories: 2234 },
  { date: '2024-01-01', steps: 9234, heartRate: 71, calories: 2298 },
];

const mockMoodData = [
  { date: '2024-01-07', mood: 4.1, stress: 2.3, energy: 3.8 },
  { date: '2024-01-06', mood: 4.7, stress: 1.8, energy: 4.2 },
  { date: '2024-01-05', mood: 4.0, stress: 2.5, energy: 3.5 },
  { date: '2024-01-04', mood: 3.2, stress: 3.2, energy: 2.8 },
  { date: '2024-01-03', mood: 4.5, stress: 1.9, energy: 4.1 },
  { date: '2024-01-02', mood: 3.8, stress: 2.4, energy: 3.7 },
  { date: '2024-01-01', mood: 4.2, stress: 2.1, energy: 3.9 },
];

export const HistoryExports: React.FC<HistoryExportsProps> = ({
  onMascotStateChange,
  onMascotMessage
}) => {
  const [selectedDateRange, setSelectedDateRange] = useState('7days');
  const [selectedDataTypes, setSelectedDataTypes] = useState(['fitness', 'mood']);
  const { toast } = useToast();

  const dateRanges = [
    { value: '7days', label: 'Last 7 Days', description: 'Recent week' },
    { value: '30days', label: 'Last 30 Days', description: 'Past month' },
    { value: '3months', label: 'Last 3 Months', description: 'Quarterly data' },
    { value: '1year', label: 'Last Year', description: 'Annual history' },
    { value: 'all', label: 'All Time', description: 'Complete history' },
  ];

  const dataTypes = [
    { 
      id: 'fitness', 
      label: 'Fitness Data', 
      description: 'Steps, heart rate, calories',
      icon: Activity,
      color: 'primary',
      count: mockFitnessData.length
    },
    { 
      id: 'mood', 
      label: 'Mental Health', 
      description: 'Mood, stress, energy levels',
      icon: Heart,
      color: 'accent',
      count: mockMoodData.length
    },
    { 
      id: 'nutrition', 
      label: 'Nutrition', 
      description: 'Food logs, quests, points',
      icon: TrendingUp,
      color: 'success',
      count: 45
    },
    { 
      id: 'health', 
      label: 'Health Analysis', 
      description: 'Predictions, reports, insights',
      icon: BarChart3,
      color: 'secondary',
      count: 12
    },
  ];

  const exportFormats = [
    { format: 'csv', label: 'CSV', description: 'Spreadsheet compatible', icon: '📊' },
    { format: 'json', label: 'JSON', description: 'Developer friendly', icon: '💻' },
    { format: 'pdf', label: 'PDF', description: 'Formatted report', icon: '📄' },
  ];

  const handleDataTypeToggle = (dataTypeId: string) => {
    setSelectedDataTypes(prev => 
      prev.includes(dataTypeId) 
        ? prev.filter(id => id !== dataTypeId)
        : [...prev, dataTypeId]
    );
  };

  const handleExport = (format: string) => {
    const selectedTypes = dataTypes.filter(type => selectedDataTypes.includes(type.id));
    const selectedRange = dateRanges.find(range => range.value === selectedDateRange);
    
    onMascotStateChange('blink');
    onMascotMessage(`Preparing your ${format.toUpperCase()} export for ${selectedRange?.label} with ${selectedTypes.length} data types... 📊 This will help you track your progress!`);
    
    setTimeout(() => {
      onMascotStateChange('dance');
      onMascotMessage(`Export complete! 🎉 Your ${format.toUpperCase()} file is ready with all your health data. Great job tracking your wellness journey!`);
      
      toast({
        title: "Export Complete! 🎉",
        description: `Your ${format.toUpperCase()} file has been generated successfully.`,
      });
    }, 2000);
  };

  const generateInsight = () => {
    onMascotStateChange('wave');
    onMascotMessage("Based on your data, I can see some great patterns! Your fitness consistency is improving, and your mood scores show positive trends. Keep up the excellent work! 💪");
    
    toast({
      title: "Insight Generated",
      description: "Your personalized health insight is ready!",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2 flex items-center justify-center gap-3">
          <History className="w-8 h-8 text-primary" />
          History & Exports
        </h1>
        <p className="text-muted-foreground">
          View your wellness journey and export your health data
        </p>
      </div>

      {/* Charts Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Fitness Chart */}
        <Card className="glass-card border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-primary" />
              Fitness Trends
            </CardTitle>
            <CardDescription>Steps and heart rate over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Steps Chart */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Daily Steps</span>
                  <span className="text-sm text-muted-foreground">7 days</span>
                </div>
                <div className="grid grid-cols-7 gap-2 h-20">
                  {mockFitnessData.reverse().map((day, index) => {
                    const height = (day.steps / 12000) * 100;
                    const date = new Date(day.date).toLocaleDateString('en', { weekday: 'short' });
                    
                    return (
                      <div key={day.date} className="flex flex-col items-center">
                        <div className="flex-1 flex items-end w-full">
                          <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: `${height}%` }}
                            transition={{ delay: 0.1 * index, duration: 0.5 }}
                            className="w-full bg-primary-gradient rounded-t min-h-[4px]"
                          />
                        </div>
                        <p className="text-xs font-medium mt-1">{date}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Heart Rate Chart */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Heart Rate</span>
                  <span className="text-sm text-muted-foreground">Avg: 72 bpm</span>
                </div>
                <div className="grid grid-cols-7 gap-2 h-16">
                  {mockFitnessData.map((day, index) => {
                    const height = ((day.heartRate - 60) / 30) * 100;
                    
                    return (
                      <div key={`hr-${day.date}`} className="flex flex-col items-center">
                        <div className="flex-1 flex items-end w-full">
                          <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: `${height}%` }}
                            transition={{ delay: 0.2 + 0.1 * index, duration: 0.5 }}
                            className="w-full bg-accent-gradient rounded-t min-h-[2px]"
                          />
                        </div>
                        <p className="text-xs text-muted-foreground">{day.heartRate}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Mood Chart */}
        <Card className="glass-card border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-accent" />
              Mood Patterns
            </CardTitle>
            <CardDescription>Emotional wellness over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Mood Chart */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Daily Mood</span>
                  <span className="text-sm text-muted-foreground">Scale: 1-5</span>
                </div>
                <div className="grid grid-cols-7 gap-2 h-20">
                  {mockMoodData.reverse().map((day, index) => {
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
                        <p className="text-xs font-medium mt-1">{date}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Stress & Energy */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium mb-1">Avg Stress</p>
                  <p className="text-2xl font-bold text-alert">2.3</p>
                  <p className="text-xs text-muted-foreground">Low level</p>
                </div>
                <div>
                  <p className="text-sm font-medium mb-1">Avg Energy</p>
                  <p className="text-2xl font-bold text-success">3.7</p>
                  <p className="text-xs text-muted-foreground">Good level</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Export Configuration */}
      <Card className="glass-card border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Download className="w-5 h-5 text-primary" />
            Export Your Data
          </CardTitle>
          <CardDescription>
            Customize and download your health data in various formats
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Date Range Selection */}
          <div>
            <Label className="text-base font-medium mb-3 block">Select Date Range</Label>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {dateRanges.map((range) => (
                <motion.button
                  key={range.value}
                  onClick={() => setSelectedDateRange(range.value)}
                  className={`p-3 rounded-lg border-2 transition-all text-left ${
                    selectedDateRange === range.value
                      ? 'border-primary bg-primary/10'
                      : 'border-muted hover:border-primary/50 glass-card'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <p className="font-medium text-sm">{range.label}</p>
                  <p className="text-xs text-muted-foreground">{range.description}</p>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Data Type Selection */}
          <div>
            <Label className="text-base font-medium mb-3 block">Select Data Types</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {dataTypes.map((dataType) => {
                const Icon = dataType.icon;
                const isSelected = selectedDataTypes.includes(dataType.id);
                
                return (
                  <motion.button
                    key={dataType.id}
                    onClick={() => handleDataTypeToggle(dataType.id)}
                    className={`p-4 rounded-lg border-2 transition-all text-left ${
                      isSelected
                        ? 'border-primary bg-primary/10'
                        : 'border-muted hover:border-primary/50 glass-card'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg bg-${dataType.color}-gradient flex items-center justify-center`}>
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <p className="font-medium">{dataType.label}</p>
                          <Badge variant="outline" className="text-xs">
                            {dataType.count} records
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{dataType.description}</p>
                      </div>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Export Buttons */}
          <div>
            <Label className="text-base font-medium mb-3 block">Export Format</Label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {exportFormats.map((format) => (
                <Button
                  key={format.format}
                  onClick={() => handleExport(format.format)}
                  className="h-auto p-4 flex-col gap-2"
                  variant="outline"
                  disabled={selectedDataTypes.length === 0}
                >
                  <span className="text-2xl">{format.icon}</span>
                  <div className="text-center">
                    <p className="font-medium">{format.label}</p>
                    <p className="text-xs text-muted-foreground">{format.description}</p>
                  </div>
                </Button>
              ))}
            </div>
          </div>

          {/* Generate Insight */}
          <div className="text-center pt-4 border-t">
            <Button onClick={generateInsight} variant="secondary" size="lg">
              <TrendingUp className="w-5 h-5 mr-2" />
              Generate Health Insight
            </Button>
            <p className="text-sm text-muted-foreground mt-2">
              Get AI-powered insights about your wellness patterns
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};