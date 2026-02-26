import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Phone, MapPin, Edit2, Save } from 'lucide-react';
import Button from '../components/Button';
import Input from '../components/Input';
import { useToast } from '../context/ToastContext';

const Profile = () => {
  const { addToast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'Guest User',
    email: 'guest@luxestore.com',
    phone: '',
    address: '',
    bio: '',
  });

  const [editedProfile, setEditedProfile] = useState(profile);

  const handleSave = () => {
    setProfile(editedProfile);
    setIsEditing(false);
    addToast('Profile updated successfully!', 'success');
  };

  const handleCancel = () => {
    setEditedProfile(profile);
    setIsEditing(false);
  };

  const stats = [
    { label: 'Orders', value: '12' },
    { label: 'Wishlist', value: '8' },
    { label: 'Reviews', value: '24' },
    { label: 'Points', value: '1,250' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-bg py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            My Profile
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your account information
          </p>
        </motion.div>

        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-dark-card rounded-2xl shadow-lg overflow-hidden mb-8"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-primary to-secondary p-8 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <User size={48} />
                </div>
                <div>
                  <h2 className="text-3xl font-bold mb-1">{profile.name}</h2>
                  <p className="text-white/80">{profile.email}</p>
                </div>
              </div>
              {!isEditing && (
                <Button
                  variant="outline"
                  onClick={() => setIsEditing(true)}
                  className="bg-white/10 backdrop-blur-sm border-white text-white hover:bg-white hover:text-primary"
                >
                  <Edit2 size={18} className="mr-2" />
                  Edit Profile
                </Button>
              )}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-4 gap-4 p-6 border-b border-gray-200 dark:border-gray-700">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Profile Details */}
          <div className="p-8 space-y-6">
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                <User size={18} />
                Full Name
              </label>
              {isEditing ? (
                <Input
                  value={editedProfile.name}
                  onChange={(e) =>
                    setEditedProfile({ ...editedProfile, name: e.target.value })
                  }
                  placeholder="Enter your name"
                />
              ) : (
                <p className="text-gray-900 dark:text-white text-lg">
                  {profile.name}
                </p>
              )}
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                <Mail size={18} />
                Email Address
              </label>
              {isEditing ? (
                <Input
                  type="email"
                  value={editedProfile.email}
                  onChange={(e) =>
                    setEditedProfile({ ...editedProfile, email: e.target.value })
                  }
                  placeholder="Enter your email"
                />
              ) : (
                <p className="text-gray-900 dark:text-white text-lg">
                  {profile.email}
                </p>
              )}
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                <Phone size={18} />
                Phone Number
              </label>
              {isEditing ? (
                <Input
                  type="tel"
                  value={editedProfile.phone}
                  onChange={(e) =>
                    setEditedProfile({ ...editedProfile, phone: e.target.value })
                  }
                  placeholder="Enter your phone"
                />
              ) : (
                <p className="text-gray-900 dark:text-white text-lg">
                  {profile.phone}
                </p>
              )}
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                <MapPin size={18} />
                Address
              </label>
              {isEditing ? (
                <Input
                  value={editedProfile.address}
                  onChange={(e) =>
                    setEditedProfile({ ...editedProfile, address: e.target.value })
                  }
                  placeholder="Enter your address"
                />
              ) : (
                <p className="text-gray-900 dark:text-white text-lg">
                  {profile.address}
                </p>
              )}
            </div>

            <div>
              <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 block">
                Bio
              </label>
              {isEditing ? (
                <textarea
                  value={editedProfile.bio}
                  onChange={(e) =>
                    setEditedProfile({ ...editedProfile, bio: e.target.value })
                  }
                  placeholder="Tell us about yourself"
                  rows={4}
                  className="w-full px-4 py-3 bg-white dark:bg-dark-hover border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-gray-900 dark:text-white placeholder-gray-400 resize-none"
                />
              ) : (
                <p className="text-gray-900 dark:text-white text-lg leading-relaxed">
                  {profile.bio}
                </p>
              )}
            </div>

            {isEditing && (
              <div className="flex gap-4 pt-4">
                <Button onClick={handleSave} className="flex-1">
                  <Save size={18} className="mr-2" />
                  Save Changes
                </Button>
                <Button variant="outline" onClick={handleCancel} className="flex-1">
                  Cancel
                </Button>
              </div>
            )}
          </div>
        </motion.div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-6 border border-primary/20"
        >
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            🎉 Member Benefits
          </h3>
          <ul className="space-y-2 text-gray-700 dark:text-gray-300">
            <li>✓ Free shipping on all orders</li>
            <li>✓ Early access to sales and new products</li>
            <li>✓ Exclusive member-only discounts</li>
            <li>✓ Priority customer support</li>
          </ul>
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;
