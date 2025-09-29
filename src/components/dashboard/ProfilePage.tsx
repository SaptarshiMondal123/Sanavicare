import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Shield, 
  Bell, 
  Heart, 
  Activity,
  Star,
  Crown,
  Edit3,
  Save,
  Camera,
  Settings,
  Lock,
  Download
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ProfilePageProps {
  onMascotStateChange: (state: 'idle' | 'wave' | 'blink' | 'concerned' | 'dance') => void;
  onMascotMessage: (message: string) => void;
}

interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  address: string;
  bio: string;
  emergencyContact: string;
  bloodType: string;
  allergies: string;
  medications: string;
}

interface NotificationSettings {
  healthReminders: boolean;
  moodCheckIns: boolean;
  fitnessGoals: boolean;
  weeklyReports: boolean;
  marketingEmails: boolean;
}

interface PrivacySettings {
  profileVisibility: 'public' | 'private' | 'friends';
  dataSharing: boolean;
  analyticsTracking: boolean;
  thirdPartyIntegrations: boolean;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({
  onMascotStateChange,
  onMascotMessage
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState<UserProfile>({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@email.com',
    phone: '+1 (555) 123-4567',
    dateOfBirth: '1990-05-15',
    address: 'San Francisco, CA',
    bio: 'Health enthusiast passionate about wellness and fitness. Love tracking my progress with Sanavi!',
    emergencyContact: 'Jane Doe - +1 (555) 987-6543',
    bloodType: 'O+',
    allergies: 'None',
    medications: 'Daily multivitamin'
  });

  const [notifications, setNotifications] = useState<NotificationSettings>({
    healthReminders: true,
    moodCheckIns: true,
    fitnessGoals: true,
    weeklyReports: true,
    marketingEmails: false
  });

  const [privacy, setPrivacy] = useState<PrivacySettings>({
    profileVisibility: 'private',
    dataSharing: false,
    analyticsTracking: true,
    thirdPartyIntegrations: true
  });

  const { toast } = useToast();

  const handleSaveProfile = () => {
    setIsEditing(false);
    onMascotStateChange('dance');
    onMascotMessage("Your profile looks amazing! All changes have been saved securely. 🎉");
    
    toast({
      title: "Profile Updated! ✨",
      description: "Your information has been saved successfully.",
    });
  };

  const handleNotificationChange = (key: keyof NotificationSettings) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
    
    toast({
      title: "Notification Settings Updated",
      description: "Your preferences have been saved.",
    });
  };

  const handlePrivacyChange = (key: keyof PrivacySettings) => {
    setPrivacy(prev => ({ ...prev, [key]: !prev[key] }));
    
    toast({
      title: "Privacy Settings Updated",
      description: "Your privacy preferences have been saved.",
    });
  };

  const userStats = [
    { label: 'Days Active', value: '47', icon: Calendar, color: 'primary' },
    { label: 'Health Score', value: '92', icon: Heart, color: 'success' },
    { label: 'Streak', value: '12', icon: Star, color: 'accent' },
    { label: 'Badges', value: '8', icon: Crown, color: 'secondary' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2 flex items-center justify-center gap-3">
          <User className="w-8 h-8 text-primary" />
          My Profile
        </h1>
        <p className="text-muted-foreground">
          Manage your account, health information, and preferences
        </p>
      </div>

      {/* Profile Overview */}
      <Card className="glass-card border-0 shadow-lg">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-20 h-20 bg-primary-gradient rounded-full flex items-center justify-center text-3xl">
                  👤
                </div>
                <Button
                  size="sm"
                  className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full p-0"
                  onClick={() => {
                    onMascotStateChange('wave');
                    onMascotMessage("Photo upload feature coming soon! For now, enjoy your colorful avatar! 📸");
                  }}
                >
                  <Camera className="w-4 h-4" />
                </Button>
              </div>
              <div>
                <h2 className="text-2xl font-bold">{profileData.firstName} {profileData.lastName}</h2>
                <p className="text-muted-foreground mb-2">{profileData.email}</p>
                <div className="flex items-center gap-2">
                  <Badge className="bg-success text-success-foreground">
                    <Crown className="w-3 h-3 mr-1" />
                    Premium User
                  </Badge>
                  <Badge variant="outline">
                    Member since 2024
                  </Badge>
                </div>
              </div>
            </div>
            <Button
              onClick={() => setIsEditing(!isEditing)}
              variant={isEditing ? "success" : "outline"}
            >
              {isEditing ? (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </>
              ) : (
                <>
                  <Edit3 className="w-4 h-4 mr-2" />
                  Edit Profile
                </>
              )}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {userStats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="text-center p-4 glass-card rounded-lg"
                >
                  <div className={`w-12 h-12 rounded-lg bg-${stat.color}-gradient flex items-center justify-center mx-auto mb-2`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </motion.div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Personal Information */}
        <Card className="glass-card border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5 text-primary" />
              Personal Information
            </CardTitle>
            <CardDescription>
              Your basic profile and contact details
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  value={profileData.firstName}
                  onChange={(e) => setProfileData(prev => ({ ...prev, firstName: e.target.value }))}
                  disabled={!isEditing}
                  className="glass-card border-0"
                />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  value={profileData.lastName}
                  onChange={(e) => setProfileData(prev => ({ ...prev, lastName: e.target.value }))}
                  disabled={!isEditing}
                  className="glass-card border-0"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="email">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  id="email"
                  type="email"
                  value={profileData.email}
                  onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                  disabled={!isEditing}
                  className="pl-10 glass-card border-0"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  id="phone"
                  value={profileData.phone}
                  onChange={(e) => setProfileData(prev => ({ ...prev, phone: e.target.value }))}
                  disabled={!isEditing}
                  className="pl-10 glass-card border-0"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="dateOfBirth">Date of Birth</Label>
              <Input
                id="dateOfBirth"
                type="date"
                value={profileData.dateOfBirth}
                onChange={(e) => setProfileData(prev => ({ ...prev, dateOfBirth: e.target.value }))}
                disabled={!isEditing}
                className="glass-card border-0"
              />
            </div>

            <div>
              <Label htmlFor="address">Location</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  id="address"
                  value={profileData.address}
                  onChange={(e) => setProfileData(prev => ({ ...prev, address: e.target.value }))}
                  disabled={!isEditing}
                  className="pl-10 glass-card border-0"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                value={profileData.bio}
                onChange={(e) => setProfileData(prev => ({ ...prev, bio: e.target.value }))}
                disabled={!isEditing}
                className="glass-card border-0 resize-none"
                rows={3}
                placeholder="Tell us about yourself..."
              />
            </div>
          </CardContent>
        </Card>

        {/* Health Information */}
        <Card className="glass-card border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-accent" />
              Health Information
            </CardTitle>
            <CardDescription>
              Important medical details for better health tracking
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="emergencyContact">Emergency Contact</Label>
              <Input
                id="emergencyContact"
                value={profileData.emergencyContact}
                onChange={(e) => setProfileData(prev => ({ ...prev, emergencyContact: e.target.value }))}
                disabled={!isEditing}
                className="glass-card border-0"
                placeholder="Name - Phone Number"
              />
            </div>

            <div>
              <Label htmlFor="bloodType">Blood Type</Label>
              <Input
                id="bloodType"
                value={profileData.bloodType}
                onChange={(e) => setProfileData(prev => ({ ...prev, bloodType: e.target.value }))}
                disabled={!isEditing}
                className="glass-card border-0"
                placeholder="e.g., O+, A-, B+"
              />
            </div>

            <div>
              <Label htmlFor="allergies">Allergies</Label>
              <Textarea
                id="allergies"
                value={profileData.allergies}
                onChange={(e) => setProfileData(prev => ({ ...prev, allergies: e.target.value }))}
                disabled={!isEditing}
                className="glass-card border-0 resize-none"
                rows={2}
                placeholder="List any known allergies..."
              />
            </div>

            <div>
              <Label htmlFor="medications">Current Medications</Label>
              <Textarea
                id="medications"
                value={profileData.medications}
                onChange={(e) => setProfileData(prev => ({ ...prev, medications: e.target.value }))}
                disabled={!isEditing}
                className="glass-card border-0 resize-none"
                rows={3}
                placeholder="List current medications and supplements..."
              />
            </div>

            {isEditing && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-muted/20 rounded-lg"
              >
                <div className="flex items-start gap-2">
                  <Shield className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <h4 className="font-medium text-sm">Health Information Privacy</h4>
                    <p className="text-xs text-muted-foreground mt-1">
                      Your health data is encrypted and never shared without your explicit consent.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Notification Preferences */}
      <Card className="glass-card border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-secondary" />
            Notification Preferences
          </CardTitle>
          <CardDescription>
            Choose what updates and reminders you'd like to receive
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(notifications).map(([key, value]) => {
              const labels = {
                healthReminders: { title: 'Health Reminders', desc: 'Medication, appointment, and wellness reminders' },
                moodCheckIns: { title: 'Mood Check-ins', desc: 'Daily mental health and wellness prompts' },
                fitnessGoals: { title: 'Fitness Goals', desc: 'Activity targets and achievement notifications' },
                weeklyReports: { title: 'Weekly Reports', desc: 'Summary of your health progress and insights' },
                marketingEmails: { title: 'Marketing Emails', desc: 'Updates about new features and health tips' }
              };

              return (
                <div key={key} className="flex items-center justify-between p-4 glass-card rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium">{labels[key as keyof typeof labels].title}</h4>
                    <p className="text-sm text-muted-foreground">
                      {labels[key as keyof typeof labels].desc}
                    </p>
                  </div>
                  <Switch
                    checked={value}
                    onCheckedChange={() => handleNotificationChange(key as keyof NotificationSettings)}
                  />
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Privacy & Security */}
      <Card className="glass-card border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lock className="w-5 h-5 text-alert" />
            Privacy & Security
          </CardTitle>
          <CardDescription>
            Control your data privacy and account security settings
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.entries(privacy).map(([key, value]) => {
                const labels = {
                  profileVisibility: { title: 'Profile Visibility', desc: 'Control who can see your profile information' },
                  dataSharing: { title: 'Data Sharing', desc: 'Allow anonymized data for health research' },
                  analyticsTracking: { title: 'Analytics Tracking', desc: 'Help improve app performance and features' },
                  thirdPartyIntegrations: { title: 'Third-party Integrations', desc: 'Connect with Google Fit, Apple Health, etc.' }
                };

                return (
                  <div key={key} className="flex items-center justify-between p-4 glass-card rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-medium">{labels[key as keyof typeof labels].title}</h4>
                      <p className="text-sm text-muted-foreground">
                        {labels[key as keyof typeof labels].desc}
                      </p>
                    </div>
                    <Switch
                      checked={value}
                      onCheckedChange={() => handlePrivacyChange(key as keyof PrivacySettings)}
                    />
                  </div>
                );
              })}
            </div>

            <Separator />

            <div className="space-y-4">
              <h4 className="font-medium">Account Actions</h4>
              <div className="flex flex-wrap gap-4">
                <Button variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Export My Data
                </Button>
                <Button variant="outline">
                  <Lock className="w-4 h-4 mr-2" />
                  Change Password
                </Button>
                <Button variant="alert">
                  <Settings className="w-4 h-4 mr-2" />
                  Delete Account
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Save Button (when editing) */}
      {isEditing && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <Button onClick={handleSaveProfile} size="lg" className="min-w-48">
            <Save className="w-5 h-5 mr-2" />
            Save All Changes
          </Button>
        </motion.div>
      )}
    </div>
  );
};