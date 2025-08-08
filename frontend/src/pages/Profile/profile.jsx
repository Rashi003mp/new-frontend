import React from 'react';
import {
  User, Mail, Calendar, Crown, Shield,
  ShoppingBag, Heart
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

function Profile() {
  const { user,cart } = useAuth();
  console.log(user);

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-100 via-white to-gray-100 flex items-center justify-center">
        <div className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl p-8 shadow-2xl">
          <div className="animate-pulse text-gray-800">Loading your profile...</div>
        </div>
      </div>
    );
  }

  const formatDate = (dateString) => {
    if (!dateString) return 'Unknown';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric', month: 'long', day: 'numeric'
    });
  };

  const getInitials = (name) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const getRoleDisplay = (role) => {
    const roles = {
      user: 'Valued Member',
      premium: 'Premium Member',
      vip: 'VIP Member',
      admin: 'Administrator'
    };
    return roles[role] || 'Member';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br mt-10 from-gray-100 via-white to-gray-100 p-4">
      <div className="max-w-4xl mx-auto pt-8 pb-4 text-center">
        <div className="inline-flex items-center space-x-2 text-gray-800 mb-2">
          <Crown className="w-6 h-6 text-gray-600" />
          <span className="text-sm font-medium tracking-wider uppercase">Profile</span>
        </div>
        <div className="w-24 h-px bg-gradient-to-r from-transparent via-gray-400 to-transparent mx-auto"></div>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="bg-white/70 backdrop-blur-lg border border-gray-200/50 rounded-3xl shadow-2xl overflow-hidden">
          <div className="relative bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 p-8 text-white">
            <div className="relative flex items-center space-x-6">
              <div className="relative">
                <div className="w-24 h-24 bg-white/20 rounded-full border-2 border-white/30 flex items-center justify-center text-2xl font-bold text-white shadow-xl">
                  {getInitials(user.name)}
                </div>
                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gray-500 rounded-full border-2 border-white flex items-center justify-center shadow-lg">
                  <Shield className="w-4 h-4 text-white" />
                </div>
              </div>

              <div className="flex-1">
                <h1 className="text-3xl font-light tracking-wide mb-2">{user.name || 'Distinguished Guest'}</h1>
                <div className="flex items-center space-x-3 text-gray-100">
                  <span className="text-sm font-medium bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm">
                    {getRoleDisplay(user.role)}
                  </span>
                  {!user?.isBlock && (
                    <span className="text-xs bg-green-500/20 text-green-100 px-2 py-1 rounded-full border border-green-400/30">
                      Active
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="p-8 space-y-8">
            <div className="bg-gradient-to-r from-white/50 to-gray-50/50 rounded-2xl p-6 border border-gray-200/30">
              <h2 className="text-xl font-light text-gray-900 mb-6 flex items-center">
                <User className="w-5 h-5 mr-3 text-gray-600" />
                Personal Information
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <div className="flex items-center space-x-3 text-gray-900">
                      <Mail className="w-4 h-4 text-gray-600" />
                      <span className="font-light">{user.email || 'Not provided'}</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Member Since</label>
                    <div className="flex items-center space-x-3 text-gray-900">
                      <Calendar className="w-4 h-4 text-gray-600" />
                      <span className="font-light">{formatDate(user.created_at)}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                    <div className={`inline-flex items-center space-x-2 px-3 py-2 rounded-lg text-sm ${
                      user?.isBlock
                        ? 'bg-red-50 text-red-700 border border-red-200'
                        : 'bg-green-50 text-green-700 border border-green-200'
                    }`}>
                      <div className={`w-2 h-2 rounded-full ${user?.isBlock ? 'bg-red-400' : 'bg-green-400'}`}></div>
                      <span>{user?.isBlock ? 'Restricted' : 'Active'}</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Account ID</label>
                    <div className="font-mono text-xs text-gray-600 bg-gray-50 px-3 py-2 rounded-lg border border-gray-200">
                      #{user.id}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Stat Cards */}
            <div className="grid md:grid-cols-3 gap-6">
              {/* <StatCard
                icon={<ShoppingBag className="w-5 h-5 text-white" />}
                label="Shopping Cart"
                count={Array.isArray(user.cart) ? user.cart.length : 0}
                subtitle="Current items"
                color="gray"
                percentage={Math.min((Array.isArray(user.cart) ? user.cart.length * 20 : 0), 100)}
              /> */}
              <StatCard
                icon={<Shield className="w-5 h-5 text-white" />}
                label="Orders"
                count={Array.isArray(user.orders) ? user.orders.length : 0}
                subtitle="Total completed"
                color="gray"
                percentage={Math.min((Array.isArray(user.orders) ? user.orders.length * 10 : 0), 100)}
              />
              <StatCard
                icon={<Heart className="w-5 h-5 text-white" />}
                label="Wishlist"
                count={Array.isArray(user.wishlist) ? user.wishlist.length : 0}
                subtitle="Saved items"
                color="gray"
                percentage={Math.min((Array.isArray(user.wishlist) ? user.wishlist.length * 15 : 0), 100)}
              />
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap gap-4 justify-center pt-4">
              <button className="bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white px-8 py-3 rounded-full font-medium transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                Edit Profile
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

// StatCard component
function StatCard({ icon, label, subtitle, count, percentage, color = 'gray' }) {
  const colorMap = {
    gray: {
      bg: 'bg-gray-100',
      bar: 'from-gray-400 to-gray-600',
      text: 'text-gray-900',
      subtitle: 'text-gray-600',
      border: 'border-gray-200/50'
    }
  };

  const theme = colorMap[color];

  return (
    <div className={`bg-white/80 backdrop-blur-sm rounded-2xl p-6 ${theme.border} shadow-lg hover:shadow-xl transition-all duration-300`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`w-10 h-10 bg-gradient-to-br ${theme.bar} rounded-xl flex items-center justify-center`}>
            {icon}
          </div>
          <div>
            <h3 className={`font-medium ${theme.text}`}>{label}</h3>
            <p className={`text-xs ${theme.subtitle}`}>{subtitle}</p>
          </div>
        </div>
        <div className={`text-2xl font-light ${theme.text}`}>{count}</div>
      </div>
      <div className={`${theme.bg} rounded-full h-2`}>
        <div
          className={`bg-gradient-to-r ${theme.bar} h-2 rounded-full transition-all duration-500`}
          style={{ width: `${Math.min(percentage, 100)}%` }}
        ></div>
      </div>
    </div>
  );
}

export default Profile;
