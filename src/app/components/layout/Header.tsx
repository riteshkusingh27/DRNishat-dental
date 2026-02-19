import { Menu, Search, User, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { patients } from '../../data/mockData';
import logo from '../../../assets/lg.png';

interface HeaderProps {
  onPatientSelect?: (patientId: string) => void;
  onMenuToggle?: () => void;
  isSidebarOpen?: boolean;
}

export function Header({ onPatientSelect, onMenuToggle, isSidebarOpen }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [dateStr, setDateStr] = useState('');
  const [timeStr, setTimeStr] = useState('');

  // Keep the clock in the header live instead of frozen at initial render
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setDateStr(
        now.toLocaleDateString('en-IN', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })
      );
      setTimeStr(
        now.toLocaleTimeString('en-IN', {
          hour: '2-digit',
          minute: '2-digit',
        })
      );
    };

    updateClock();
    const id = setInterval(updateClock, 60_000);
    return () => clearInterval(id);
  }, []);

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
      <div className="h-20 bg-white border-b border-gray-200 fixed top-0 left-0 right-0 lg:left-64 z-40 shadow-sm">
        <div className="h-full px-4 sm:px-6 flex items-center justify-between gap-4">
          {/* Left - menu + Date & Time */}
          <div className="flex items-center gap-3">
            <button
              className="lg:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg border border-gray-200 text-gray-700 shadow-sm"
              onClick={onMenuToggle}
              aria-label="Toggle navigation"
            >
              {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <div>
              <p className="text-sm text-gray-600">{dateStr}</p>
              <p className="text-xs text-gray-500">{timeStr}</p>
            </div>
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
      <div className="fixed top-20 left-0 right-0 lg:left-64 bg-white border-b border-gray-200 z-30 px-4 sm:px-6 py-3 shadow-sm">
        <div className="max-w-3xl mx-auto relative">
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
            <div className="absolute top-full mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-80 overflow-y-auto">
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
