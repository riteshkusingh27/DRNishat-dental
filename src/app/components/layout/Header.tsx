import { Search, User } from 'lucide-react';
import { useState } from 'react';
import { patients } from '../../data/mockData';
import logo from '../../../assets/lg.png';

interface HeaderProps {
  onPatientSelect?: (patientId: string) => void;
}

export function Header({ onPatientSelect }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showResults, setShowResults] = useState(false);

  // Get current date and time
  const now = new Date();
  const dateStr = now.toLocaleDateString('en-IN', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
  const timeStr = now.toLocaleTimeString('en-IN', { 
    hour: '2-digit', 
    minute: '2-digit' 
  });

  // Filter patients based on search
  const filteredPatients = searchQuery.trim()
    ? patients.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.phone.includes(searchQuery) ||
        p.id.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5)
    : [];

  const handlePatientClick = (patientId: string) => {
    setSearchQuery('');
    setShowResults(false);
    if (onPatientSelect) {
      onPatientSelect(patientId);
    }
  };

  return (
    <>
      {/* Main Header */}
      <div className="h-20 bg-white border-b border-gray-200 fixed top-0 left-64 right-0 z-40">
        <div className="h-full px-6 flex items-center justify-between">
          {/* Left - Date & Time */}
          <div>
            <p className="text-sm text-gray-600">{dateStr}</p>
            <p className="text-xs text-gray-500">{timeStr}</p>
          </div>

          {/* Center - Clinic Logo */}
          <div className="flex items-center gap-3">
            <img
              src={logo}
              alt="Clinic logo"
              className="h-12 w-auto rounded-md shadow-sm"
            />
          </div>

          {/* Right - User Profile */}
          <div className="flex items-center gap-3">
            <div className="text-right">
              <div className="text-sm font-medium text-gray-900">Anjali</div>
              <div className="text-xs text-gray-500">Receptionist</div>
            </div>
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
              <User className="w-5 h-5 text-blue-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Search Bar Below Header */}
      <div className="fixed top-20 left-64 right-0 bg-white border-b border-gray-200 z-30 px-6 py-4">
        <div className="max-w-2xl mx-auto relative">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search patient by name, phone, or ID..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowResults(true);
              }}
              onFocus={() => setShowResults(true)}
              onBlur={() => setTimeout(() => setShowResults(false), 200)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Search Results Dropdown */}
          {showResults && filteredPatients.length > 0 && (
            <div className="absolute top-full mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-96 overflow-y-auto">
              {filteredPatients.map((patient) => (
                <button
                  key={patient.id}
                  onClick={() => handlePatientClick(patient.id)}
                  className="w-full px-4 py-3 hover:bg-gray-50 text-left border-b border-gray-100 last:border-b-0"
                >
                  <div className="font-medium text-sm text-gray-900">{patient.name}</div>
                  <div className="text-xs text-gray-500 mt-0.5">
                    {patient.id} • {patient.phone}
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
