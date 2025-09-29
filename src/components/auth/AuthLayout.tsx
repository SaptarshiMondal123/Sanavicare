import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { UserAuth } from './UserAuth';
import { AdminAuth } from './AdminAuth';

interface AuthLayoutProps {
  onAuthSuccess: () => void;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ onAuthSuccess }) => {
  const [activeTab, setActiveTab] = useState('user');

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 300 }}
            className="w-20 h-20 bg-primary-gradient rounded-full flex items-center justify-center text-4xl mx-auto mb-4 shadow-xl"
          >
            🐧
          </motion.div>
          <h1 className="text-4xl font-bold mb-2">Sanavi</h1>
          <p className="text-lg text-muted-foreground">Your Health & Wellness Companion</p>
        </div>

        <Card className="glass-card border-0 shadow-2xl">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-2xl">Welcome Back!</CardTitle>
            <CardDescription className="text-base">
              Choose your access level to continue
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 glass-card">
                <TabsTrigger 
                  value="user" 
                  className="data-[state=active]:bg-primary-gradient data-[state=active]:text-white"
                >
                  👤 User
                </TabsTrigger>
                <TabsTrigger 
                  value="admin"
                  className="data-[state=active]:bg-alert-gradient data-[state=active]:text-white"
                >
                  🔐 Admin
                </TabsTrigger>
              </TabsList>
              
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-6"
              >
                <TabsContent value="user" className="mt-0">
                  <UserAuth onAuthSuccess={onAuthSuccess} />
                </TabsContent>
                <TabsContent value="admin" className="mt-0">
                  <AdminAuth onAuthSuccess={onAuthSuccess} />
                </TabsContent>
              </motion.div>
            </Tabs>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};