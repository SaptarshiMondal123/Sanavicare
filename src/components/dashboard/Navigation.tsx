import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { DashboardView } from './DashboardLayout';
import { 
  Home, 
  Brain, 
  Activity, 
  Heart, 
  Apple, 
  MessageCircle, 
  History,
  LogOut
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface NavigationProps {
  currentView: DashboardView;
  onNavigate: (view: DashboardView) => void;
  onLogout?: () => void;
}

const navigationItems = [
  { id: 'home' as DashboardView, label: 'Dashboard', icon: Home, description: 'Overview' },
  { id: 'prediction' as DashboardView, label: 'Health Analysis', icon: Brain, description: 'Disease prediction' },
  { id: 'fitness' as DashboardView, label: 'Fitness', icon: Activity, description: 'Track activity' },
  { id: 'mental' as DashboardView, label: 'Mental Health', icon: Heart, description: 'Mood tracking' },
  { id: 'nutrition' as DashboardView, label: 'Nutrition', icon: Apple, description: 'Diet guidance' },
  { id: 'chatbot' as DashboardView, label: 'AI Assistant', icon: MessageCircle, description: 'Health chat' },
  { id: 'history' as DashboardView, label: 'History', icon: History, description: 'Past data' },
];

export const Navigation: React.FC<NavigationProps> = ({ currentView, onNavigate, onLogout }) => {
  const { toast } = useToast();

  const handleLogout = () => {
    toast({
      title: "Goodbye! 👋",
      description: "You've been signed out. Stay healthy!",
    });
    
    // Call the logout function passed from parent
    if (onLogout) {
      setTimeout(() => {
        onLogout();
      }, 1000);
    }
  };

  return (
    <aside className="w-64 glass-card m-4 rounded-2xl p-4 h-[calc(100vh-2rem)]">
      {/* Logo */}
      <div className="flex items-center gap-3 mb-8 p-2">
        <div className="w-10 h-10 bg-primary-gradient rounded-full flex items-center justify-center text-xl">
          🐧
        </div>
        <div>
          <h2 className="font-bold text-lg">Sanavi</h2>
          <p className="text-xs text-muted-foreground">Health & Wellness</p>
        </div>
      </div>

      {/* Navigation Items */}
      <nav className="space-y-2 flex-1">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          
          return (
            <motion.div key={item.id} whileHover={{ x: 4 }} whileTap={{ scale: 0.98 }}>
              <Button
                variant={isActive ? "default" : "ghost"}
                className={`w-full justify-start h-12 ${
                  isActive 
                    ? 'bg-primary-gradient text-white shadow-lg' 
                    : 'hover:bg-muted/50'
                }`}
                onClick={() => onNavigate(item.id)}
              >
                <Icon className="w-5 h-5 mr-3" />
                <div className="text-left">
                  <div className="text-sm font-medium">{item.label}</div>
                  <div className="text-xs opacity-70">{item.description}</div>
                </div>
              </Button>
            </motion.div>
          );
        })}
      </nav>

      {/* User Profile & Logout */}
      <div className="mt-auto pt-4 border-t border-border">
        <motion.div whileHover={{ x: 4 }} whileTap={{ scale: 0.98 }}>
          <Button
            variant="ghost"
            className="w-full justify-start h-auto p-2 mb-3"
            onClick={() => onNavigate('profile')}
          >
            <div className="flex items-center gap-3 w-full">
              <div className="w-8 h-8 bg-accent-gradient rounded-full flex items-center justify-center text-sm">
                👤
              </div>
              <div className="flex-1 text-left">
                <p className="text-sm font-medium">John Doe</p>
                <p className="text-xs text-muted-foreground">Premium User</p>
              </div>
            </div>
          </Button>
        </motion.div>
        
        <Button
          variant="ghost"
          className="w-full justify-start text-alert hover:bg-alert/10"
          onClick={handleLogout}
        >
          <LogOut className="w-4 h-4 mr-3" />
          Sign Out
        </Button>
      </div>
    </aside>
  );
};