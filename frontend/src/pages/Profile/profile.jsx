import React from 'react';
import {
  User, Mail, Calendar, Crown, Shield,
  ShoppingBag, Heart, Edit, Lock, CreditCard
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

function Profile() {
  const { user, cart } = useAuth();

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 flex items-center justify-center">
        <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
          <div className="text-gray-800 tracking-wider uppercase text-sm">Loading your profile...</div>
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
      user: 'Valued Client',
      premium: 'Premium Client',
      vip: 'VIP Client',
      admin: 'Administrator'
    };
    return roles[role] || 'Client';
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-12 px-4">
      <div className="max-w-5xl mx-auto mb-12 text-center">
        <h1 className="text-3xl font-light tracking-wider text-gray-900 uppercase mb-2">My Account</h1>
        <div className="w-16 h-px bg-gray-300 mx-auto"></div>
      </div>

      <div className="max-w-5xl mx-auto">
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm mb-8 overflow-hidden">
          <div className="bg-black p-8 text-white">
            <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8">
              <div className="relative">
                <div className="w-24 h-24 bg-gray-800 rounded-full border-2 border-gray-600 flex items-center justify-center text-3xl font-light text-white">
                  {getInitials(user.name)}
                </div>
                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gray-700 rounded-full border-2 border-white flex items-center justify-center">
                  <Shield className="w-3 h-3 text-white" />
                </div>
              </div>

              <div className="flex-1 text-center md:text-left">
                <h2 className="text-2xl font-light tracking-wider mb-2">{user.name || 'Valued Client'}</h2>
                <div className="flex flex-wrap justify-center md:justify-start gap-2">
                  <span className="text-xs tracking-widest uppercase bg-gray-700 text-gray-200 px-3 py-1 rounded-full">
                    {getRoleDisplay(user.role)}
                  </span>
                  {!user?.isBlock && (
                    <span className="text-xs tracking-widest uppercase bg-green-600/20 text-green-200 px-3 py-1 rounded-full">
                      Active
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-gray-200">
            <StatCard
              icon={<ShoppingBag className="w-4 h-4 text-gray-600" />}
              label="Orders"
              value={Array.isArray(user.orders) ? user.orders.length : 0}
              description="Total purchases"
            />
            <StatCard
              icon={<Heart className="w-4 h-4 text-gray-600" />}
              label="Wishlist"
              value={Array.isArray(user.wishlist) ? user.wishlist.length : 0}
              description="Saved items"
            />
            <StatCard
              icon={<Calendar className="w-4 h-4 text-gray-600" />}
              label="Member Since"
              value={formatDate(user.created_at).split(',')[0]}
              description={formatDate(user.created_at).split(',')[1]}
            />
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">

          <div className="space-y-2">
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h3 className="text-sm font-medium tracking-wider text-gray-500 uppercase mb-4">Account</h3>
              <nav className="space-y-1">
                <a href="#" className="flex items-center space-x-3 px-3 py-2 bg-gray-100 rounded-lg text-gray-900">
                  <User className="w-4 h-4" />
                  <span className="text-sm">Profile Information</span>
                </a>
                <a href="#" className="flex items-center space-x-3 px-3 py-2 hover:bg-gray-50 rounded-lg text-gray-600">
                  <Lock className="w-4 h-4" />
                  <span className="text-sm">Security</span>
                </a>
                <a href="#" className="flex items-center space-x-3 px-3 py-2 hover:bg-gray-50 rounded-lg text-gray-600">
                  <CreditCard className="w-4 h-4" />
                  <span className="text-sm">Payment Methods</span>
                </a>
              </nav>
            </div>
          </div>

          <div className="md:col-span-2">
            <div className="bg-white border border-gray-200 rounded-xl p-8">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-light tracking-wider text-gray-900">Personal Information</h2>
                <button className="flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-900">
                  <Edit className="w-4 h-4" />
                  <span>Edit</span>
                </button>
              </div>

              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <InfoField label="Full Name" value={user.name} icon={<User className="w-4 h-4 text-gray-400" />} />
                  <InfoField label="Email" value={user.email} icon={<Mail className="w-4 h-4 text-gray-400" />} />
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <InfoField label="Account Status" 
                    value={user?.isBlock ? "Restricted" : "Active"} 
                    status={user?.isBlock ? "error" : "success"} 
                  />
                  <InfoField label="Account ID" value={`#${user.id}`} isCode />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, description }) {
  return (
    <div className="p-6 text-center">
      <div className="flex justify-center items-center w-10 h-10 mx-auto bg-gray-100 rounded-lg mb-3">
        {icon}
      </div>
      <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-1">{label}</h3>
      <p className="text-2xl font-light text-gray-900 mb-1">{value}</p>
      <p className="text-xs text-gray-500">{description}</p>
    </div>
  );
}

function InfoField({ label, value, icon, status, isCode }) {
  const statusClasses = {
    success: 'bg-green-100 text-green-800',
    error: 'bg-red-100 text-red-800',
    default: 'bg-gray-100 text-gray-800'
  };

  return (
    <div>
      <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">{label}</label>
      {status ? (
        <span className={`text-xs px-3 py-1 rounded-full ${statusClasses[status] || statusClasses.default}`}>
          {value}
        </span>
      ) : isCode ? (
        <div className="font-mono text-sm bg-gray-50 px-4 py-2 rounded-lg border border-gray-200">
          {value}
        </div>
      ) : (
        <div className="flex items-center space-x-3">
          {icon && <span>{icon}</span>}
          <span className="text-gray-900">{value || 'Not provided'}</span>
        </div>
      )}
    </div>
  );
}

export default Profile;