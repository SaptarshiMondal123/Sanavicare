import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Navigation } from './Navigation';
import { DashboardHome } from './DashboardHome';
import { DiseasePrediction } from './DiseasePrediction';
import { FitnessTracking } from './FitnessTracking';
import { MentalHealth } from './MentalHealth';
import { NutritionGuidance } from './NutritionGuidance';
import { HealthChatbot } from './HealthChatbot';
import { HistoryExports } from './HistoryExports';
import { ProfilePage } from './ProfilePage';
import { Mascot } from '@/components/ui/mascot';
import { useToast } from '@/hooks/use-toast';

export type DashboardView = 
  | 'home' 
  | 'prediction' 
  | 'fitness' 
  | 'mental' 
  | 'nutrition' 
  | 'chatbot' 
  | 'history'
  | 'profile';

interface DashboardLayoutProps {
  onLogout?: () => void;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ onLogout }) => {
  const [currentView, setCurrentView] = useState<DashboardView>('home');
  const [mascotState, setMascotState] = useState<'idle' | 'wave' | 'blink' | 'concerned' | 'dance'>('wave');
  const [mascotMessage, setMascotMessage] = useState<string>("");
  const { toast } = useToast();

  const handleMascotMessage = (message: string) => {
    setMascotMessage(`You asked: "${message}". I'm here to help with that! 🐧`);
    setMascotState('wave');
    
    toast({
      title: "Sanavi Assistant",
      description: "I received your message and I'm ready to help!",
    });
  };

  const renderCurrentView = () => {
    const viewProps = {
      onMascotStateChange: setMascotState,
      onMascotMessage: setMascotMessage
    };

    switch (currentView) {
      case 'home':
        return <DashboardHome onNavigate={setCurrentView} {...viewProps} />;
      case 'prediction':
        return <DiseasePrediction {...viewProps} />;
      case 'fitness':
        return <FitnessTracking {...viewProps} />;
      case 'mental':
        return <MentalHealth {...viewProps} />;
      case 'nutrition':
        return <NutritionGuidance {...viewProps} />;
      case 'chatbot':
        return <HealthChatbot {...viewProps} />;
      case 'history':
        return <HistoryExports {...viewProps} />;
      case 'profile':
        return <ProfilePage {...viewProps} />;
      default:
        return <DashboardHome onNavigate={setCurrentView} {...viewProps} />;
    }
  };

  return (
    <div className="min-h-screen">
      <div className="flex">
        {/* Navigation Sidebar */}
        <Navigation currentView={currentView} onNavigate={setCurrentView} onLogout={onLogout} />
        
        {/* Main Content */}
        <main className="flex-1 p-4 md:p-6 lg:p-8">
          <motion.div
            key={currentView}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="max-w-7xl mx-auto"
          >
            {renderCurrentView()}
          </motion.div>
        </main>
      </div>

      {/* Floating Mascot */}
      <Mascot
        state={mascotState}
        message={mascotMessage}
        onMessage={handleMascotMessage}
      />
    </div>
  );
};