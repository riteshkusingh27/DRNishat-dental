import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  Receipt, 
  Bell, 
  FileText, 
  Stethoscope, 
  Heart, 
  Settings 
} from 'lucide-react';
import { cn } from '../ui/utils';

interface SidebarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'patients', label: 'Patients', icon: Users },
  { id: 'appointments', label: 'Appointments', icon: Calendar },
  { id: 'billing', label: 'Billing', icon: Receipt },
  { id: 'followups', label: 'Follow-Ups', icon: Bell },
  { id: 'reports', label: 'Reports', icon: FileText },
  { id: 'doctors', label: 'Doctors', icon: Stethoscope },
  { id: 'treatments', label: 'Treatments & Pricing', icon: Heart },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export function Sidebar({ currentPage, onNavigate }: SidebarProps) {
  return (
    <div className="w-64 h-screen bg-white border-r border-gray-200 fixed left-0 top-0 flex flex-col">
      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-4 pt-24">
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            
            return (
              <li key={item.id}>
                <button
                  onClick={() => onNavigate(item.id)}
                  className={cn(
                    'w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all',
                    isActive
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-700 hover:bg-gray-50'
                  )}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200">
        <div className="text-xs text-gray-500 text-center">
          Version 1.0.0
        </div>
      </div>
    </div>
  );
}
