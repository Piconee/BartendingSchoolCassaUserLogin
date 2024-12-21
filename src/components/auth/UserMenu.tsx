import React from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { User } from '@supabase/supabase-js';
import { Settings } from 'lucide-react';

interface UserMenuProps {
  user: User;
}

export default function UserMenu({ user }: UserMenuProps) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  return (
    <div className="absolute right-4 top-1/2 -translate-y-1/2">
      <div className="flex items-center space-x-4">
        <button
          onClick={() => navigate('/dashboard')}
          className="text-sm bg-amber-500 text-white px-3 py-1 rounded hover:bg-amber-600"
        >
          Dashboard
        </button>
        <button
          onClick={() => navigate('/settings')}
          className="text-sm bg-gray-100 text-gray-700 px-3 py-1 rounded hover:bg-gray-200 flex items-center"
        >
          <Settings className="w-4 h-4 mr-1" />
          Impostazioni
        </button>
        <span className="text-sm">{user.email}</span>
        <button
          onClick={handleLogout}
          className="text-sm bg-amber-500 text-white px-3 py-1 rounded hover:bg-amber-600"
        >
          Esci
        </button>
      </div>
    </div>
  );
}