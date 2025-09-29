import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Eye, EyeOff, Mail, Key, Shield } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface AdminAuthProps {
  onAuthSuccess: () => void;
}

export const AdminAuth: React.FC<AdminAuthProps> = ({ onAuthSuccess }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showAdminKey, setShowAdminKey] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    adminKey: '',
    otpCode: ''
  });
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate admin login
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Admin Access Granted 🔐",
        description: "Welcome to the Sanavi admin dashboard.",
      });
      
      // Trigger successful authentication after a brief delay for the toast
      setTimeout(() => {
        onAuthSuccess();
      }, 1000);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <Alert className="border-alert/30 bg-alert/10">
        <Shield className="h-4 w-4 text-alert" />
        <AlertDescription className="text-alert-foreground">
          <strong>Admin Access Required:</strong> This area is restricted to authorized personnel only.
        </AlertDescription>
      </Alert>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="admin-email" className="text-sm font-medium">
            Admin Email
          </Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              id="admin-email"
              type="email"
              placeholder="admin@sanavi.com"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              className="pl-10 glass-card border-0 focus-ring"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="admin-password" className="text-sm font-medium">
            Password
          </Label>
          <div className="relative">
            <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              id="admin-password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter admin password"
              value={formData.password}
              onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
              className="pl-10 pr-10 glass-card border-0 focus-ring"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors focus-ring rounded"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="admin-key" className="text-sm font-medium">
            Admin Key / PIN
          </Label>
          <div className="relative">
            <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              id="admin-key"
              type={showAdminKey ? "text" : "password"}
              placeholder="Enter admin key"
              value={formData.adminKey}
              onChange={(e) => setFormData(prev => ({ ...prev, adminKey: e.target.value }))}
              className="pl-10 pr-10 glass-card border-0 focus-ring"
              required
            />
            <button
              type="button"
              onClick={() => setShowAdminKey(!showAdminKey)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors focus-ring rounded"
              aria-label={showAdminKey ? "Hide admin key" : "Show admin key"}
            >
              {showAdminKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="otp-code" className="text-sm font-medium">
            2FA Code (Optional)
          </Label>
          <Input
            id="otp-code"
            type="text"
            placeholder="000000"
            maxLength={6}
            value={formData.otpCode}
            onChange={(e) => setFormData(prev => ({ ...prev, otpCode: e.target.value.replace(/\D/g, '') }))}
            className="glass-card border-0 focus-ring text-center tracking-widest"
          />
        </div>

        <Button
          type="submit"
          className="w-full"
          variant="alert"
          disabled={isLoading}
        >
          {isLoading ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
            />
          ) : (
            <>
              <Shield className="w-4 h-4 mr-2" />
              Admin Sign In
            </>
          )}
        </Button>
      </form>

      <div className="text-center">
        <button className="text-sm text-alert hover:underline focus-ring rounded">
          Request admin access?
        </button>
      </div>
    </div>
  );
};