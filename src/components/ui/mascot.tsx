import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MessageCircle } from 'lucide-react';
import { Button } from './button';

interface MascotProps {
  onMessage?: (message: string) => void;
  state?: 'idle' | 'wave' | 'blink' | 'concerned' | 'dance';
  message?: string;
}

export const Mascot: React.FC<MascotProps> = ({ 
  onMessage, 
  state = 'idle',
  message 
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const mascotVariants = {
    idle: { 
      scale: 1,
      rotate: 0,
      y: 0,
    },
    wave: { 
      scale: 1.1,
      rotate: [0, -10, 10, -10, 0],
      transition: { 
        rotate: { 
          repeat: 2, 
          duration: 0.5 
        } 
      }
    },
    blink: { 
      scaleY: [1, 0.1, 1],
      transition: { 
        duration: 0.3 
      }
    },
    concerned: { 
      rotate: -15,
      scale: 0.95,
    },
    dance: { 
      scale: [1, 1.2, 1, 1.2, 1],
      rotate: [0, 10, -10, 10, 0],
      y: [0, -10, 0, -10, 0],
      transition: { 
        duration: 1.5, 
        repeat: 2 
      }
    }
  };

  return (
    <>
      {/* Floating Mascot */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 300 }}
      >
        <motion.button
          className="w-16 h-16 md:w-20 md:h-20 bg-primary-gradient rounded-full shadow-lg focus-ring mascot-float flex items-center justify-center text-2xl md:text-3xl relative overflow-hidden"
          variants={mascotVariants}
          animate={state}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(true)}
          aria-label="Open Sanavi assistant"
          role="button"
        >
          {/* Penguin emoji */}
          <span className="text-white">🐧</span>
          
          {/* Notification dot for new messages */}
          {message && !isOpen && (
            <motion.div
              className="absolute -top-1 -right-1 w-4 h-4 bg-alert rounded-full"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring" }}
            />
          )}
        </motion.button>
      </motion.div>

      {/* Chat Bubble Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-end justify-end p-4 md:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/20 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />
            
            {/* Chat Bubble */}
            <motion.div
              className="relative glass-card rounded-2xl w-full max-w-sm p-6 focus-within:ring-2 focus-within:ring-primary"
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              transition={{ type: "spring", stiffness: 300 }}
              role="dialog"
              aria-modal="true"
              aria-labelledby="mascot-title"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary-gradient rounded-full flex items-center justify-center text-xl">
                    🐧
                  </div>
                  <div>
                    <h3 id="mascot-title" className="font-bold text-lg">Sanavi</h3>
                    <p className="text-sm text-muted-foreground">Your Health Assistant</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="focus-ring"
                  aria-label="Close chat"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>

              {/* Message Content */}
              <div className="space-y-4">
                {message ? (
                  <div className="bg-muted rounded-lg p-3">
                    <p className="text-sm leading-relaxed">{message}</p>
                  </div>
                ) : (
                  <div className="bg-muted rounded-lg p-3">
                    <p className="text-sm leading-relaxed">
                      Hi there! 👋 I'm Sanavi, your friendly health companion. I'm here to help you track your wellness journey and provide guidance. What would you like to know?
                    </p>
                  </div>
                )}

                {/* Quick Actions */}
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-xs focus-ring"
                    onClick={() => onMessage?.("Show my fitness data")}
                  >
                    📊 My Stats
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-xs focus-ring"
                    onClick={() => onMessage?.("How am I doing today?")}
                  >
                    💚 Health Check
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-xs focus-ring"
                    onClick={() => onMessage?.("Give me wellness tips")}
                  >
                    💡 Tips
                  </Button>
                </div>
              </div>

              {/* Tail pointer */}
              <div className="absolute bottom-0 right-8 w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-t-[12px] border-t-white/12 translate-y-full" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};