import { useState } from 'react';
import { Sidebar } from '../sidebar';
import { Button } from '../ui-elements/button';
import { Input } from '../ui-elements/input';
import { Label } from '../ui-elements/label';
import { Card, CardContent, CardHeader, CardTitle } from '../ui-elements/card';
import { Switch } from '../ui-elements/switch';
import { Avatar, AvatarFallback } from '../ui-elements/avatar';
import { User, Mail, Shield, Trash2, AlertTriangle } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui-elements/alert-dialog";
import { useAppSelector } from '../../store/hooks';

interface ProfilePageProps {
  onSignOut: () => void;
}

export function ProfilePage({ onSignOut }: ProfilePageProps) {
  const user = useAppSelector((state) => state.user);
  const [name, setName] = useState(user.username);
  const [email, setEmail] = useState(user.email);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Profile updated successfully!');
  };

  const handleDeleteAccount = () => {
    alert('Account deletion requested');
    onSignOut();
  };

  const handleClearData = () => {
    alert('Local data cleared successfully!');
  };

  return (
    <div className="flex-1 overflow-auto">
      <div className="p-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl text-gray-900 mb-2">Profile & Settings</h1>
          <p className="text-gray-600">Manage your account and privacy preferences</p>
        </div>

        {/* Profile Section */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSaveProfile} className="space-y-6">
              <div className="flex items-center gap-6 mb-6">
                <Avatar className="w-20 h-20">
                  <AvatarFallback className="bg-gradient-to-br from-blue-500 to-green-500 text-white text-2xl">
                    {name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <Button variant="outline" size="sm">Change Avatar</Button>
                  <p className="text-sm text-gray-500 mt-1">JPG, PNG or GIF (max 2MB)</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <div className="relative mt-2">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                      id="name"
                      type="text"
                      placeholder="John Doe"
                      className="pl-10"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="email">Email</Label>
                  <div className="relative mt-2">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      className="pl-10"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                Save Changes
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Privacy Settings */}
        {/* <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-blue-600" />
              <CardTitle>Privacy & Data Settings</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-start justify-between gap-4 pb-6 border-b">
              <div className="flex-1">
                <h4 className="text-gray-900 mb-1">Enable Federated Learning</h4>
                <p className="text-sm text-gray-600">
                  Allow your device to contribute to AI model improvements while keeping your data private.
                  All training happens locally on your device.
                </p>
              </div>
              <Switch
                checked={federatedLearning}
                onCheckedChange={setFederatedLearning}
              />
            </div>

            <div className="flex items-start justify-between gap-4 pb-6 border-b">
              <div className="flex-1">
                <h4 className="text-gray-900 mb-1">Allow Local Data Storage for History</h4>
                <p className="text-sm text-gray-600">
                  Store your scan history locally on your device for tracking and comparison.
                  Data is encrypted and never uploaded to servers.
                </p>
              </div>
              <Switch
                checked={localStorage}
                onCheckedChange={setLocalStorage}
              />
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex gap-3">
                <Shield className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-gray-900 mb-1">Your Privacy is Protected</h4>
                  <p className="text-sm text-gray-700">
                    All image processing happens on your device. We never upload or store your skin images on our servers.
                    Only anonymized model updates are shared when federated learning is enabled.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card> */}

        {/* Data Management */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Data Management</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h4 className="text-gray-900 mb-1">Clear Data</h4>
                <p className="text-sm text-gray-600">Remove all scan history and cached data from your device</p>
              </div>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="outline">
                    <Trash2 className="w-4 h-4 mr-2" />
                    Clear Data
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Clear all local data?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This will permanently delete all your scan history and cached data from this device. This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleClearData} className="bg-red-600 hover:bg-red-700">
                      Clear Data
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h4 className="text-gray-900 mb-1">Export Your Data</h4>
                <p className="text-sm text-gray-600">Download a copy of your scan history and data</p>
              </div>
              <Button variant="outline">Export Data</Button>
            </div>
          </CardContent>
        </Card>

        {/* Danger Zone */}
        <Card className="border-red-200">
          <CardHeader>
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-red-600" />
              <CardTitle className="text-red-600">Danger Zone</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg">
              <div>
                <h4 className="text-gray-900 mb-1">Delete Account</h4>
                <p className="text-sm text-gray-600">Permanently delete your account and all associated data</p>
              </div>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive">
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete Account
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete your account and remove all your data from our servers.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDeleteAccount} className="bg-red-600 hover:bg-red-700">
                      Yes, Delete My Account
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
