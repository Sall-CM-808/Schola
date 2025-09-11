import { useState } from "react";
import { usersData } from "@/examples/permissionsData";
import { User, ChevronDown } from "lucide-react";

interface UserSwitcherProps {
  currentUserId: string;
  onUserChange: (userId: string) => void;
}

/**
 * Composant pour changer d'utilisateur simulé (pour les tests uniquement)
 */
export function UserSwitcher({ currentUserId, onUserChange }: UserSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);
  
  const currentUser = usersData.find(u => u.id === currentUserId);
  
  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
      >
        <User size={16} className="text-gray-500" />
        <span className="text-sm font-medium text-gray-700">
          {currentUser?.name || "Utilisateur inconnu"}
        </span>
        <ChevronDown size={14} className="text-gray-400" />
      </button>
      
      {isOpen && (
        <div className="absolute top-full left-0 mt-1 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
          <div className="p-2 border-b border-gray-100">
            <p className="text-xs text-gray-500 font-medium">UTILISATEURS DE TEST</p>
          </div>
          <div className="max-h-64 overflow-y-auto">
            {usersData.map((user) => (
              <button
                key={user.id}
                onClick={() => {
                  onUserChange(user.id);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-3 py-2 hover:bg-gray-50 transition-colors ${
                  user.id === currentUserId ? "bg-blue-50 text-blue-700" : "text-gray-700"
                }`}
              >
                <div className="font-medium text-sm">{user.name}</div>
                <div className="text-xs text-gray-500">{user.email}</div>
              </button>
            ))}
          </div>
        </div>
      )}
      
      {/* Overlay pour fermer le dropdown */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}
