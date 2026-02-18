import { useState } from 'react';
import { Toaster } from 'sonner';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { Dashboard } from './components/pages/Dashboard';
import { Patients } from './components/pages/Patients';
import { AddPatient } from './components/pages/AddPatient';
import { PatientProfile } from './components/pages/PatientProfile';
import { Appointments } from './components/pages/Appointments';
import { Billing } from './components/pages/Billing';
import { FollowUps } from './components/pages/FollowUps';
import { Reports } from './components/pages/Reports';
import { Doctors } from './components/pages/Doctors';
import { Treatments } from './components/pages/Treatments';
import { Settings } from './components/pages/Settings';

type PageType = 
  | 'dashboard' 
  | 'patients' 
  | 'patient-profile'
  | 'appointments' 
  | 'billing' 
  | 'followups' 
  | 'reports' 
  | 'doctors' 
  | 'treatments' 
  | 'settings';

interface PageState {
  page: PageType;
  data?: any;
}

export default function App() {
  const [currentPageState, setCurrentPageState] = useState<PageState>({ page: 'dashboard' });
  const [showAddPatient, setShowAddPatient] = useState(false);

  const handleNavigate = (page: PageType, data?: any) => {
    setCurrentPageState({ page, data });
    setShowAddPatient(false);
  };

  const handlePatientSelect = (patientId: string) => {
    setCurrentPageState({ page: 'patient-profile', data: { patientId } });
  };

  const handleAddPatient = () => {
    setShowAddPatient(true);
  };

  const handleAddPatientSuccess = () => {
    setShowAddPatient(false);
    setCurrentPageState({ page: 'patients' });
  };

  const renderPage = () => {
    const { page, data } = currentPageState;

    switch (page) {
      case 'dashboard':
        return <Dashboard onNavigate={handleNavigate} />;
      
      case 'patients':
        return (
          <Patients 
            onNavigate={handleNavigate} 
            onAddPatient={handleAddPatient}
          />
        );
      
      case 'patient-profile':
        return (
          <PatientProfile
            patientId={data?.patientId}
            onBack={() => handleNavigate('patients')}
            onNavigate={handleNavigate}
          />
        );
      
      case 'appointments':
        return <Appointments onNavigate={handleNavigate} />;
      
      case 'billing':
        return (
          <Billing 
            onNavigate={handleNavigate}
            initialPatientId={data?.patientId}
          />
        );
      
      case 'followups':
        return <FollowUps onNavigate={handleNavigate} />;
      
      case 'reports':
        return <Reports />;
      
      case 'doctors':
        return <Doctors />;
      
      case 'treatments':
        return <Treatments />;
      
      case 'settings':
        return <Settings />;
      
      default:
        return <Dashboard onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar 
        currentPage={currentPageState.page} 
        onNavigate={(page) => handleNavigate(page as PageType)} 
      />

      {/* Main Content */}
      <div className="ml-64">
        {/* Header */}
        <Header onPatientSelect={handlePatientSelect} />

        {/* Page Content */}
        <div className="pt-36">
          {renderPage()}
        </div>
      </div>

      {/* Add Patient Modal */}
      {showAddPatient && (
        <AddPatient 
          onClose={() => setShowAddPatient(false)}
          onSuccess={handleAddPatientSuccess}
        />
      )}

      {/* Toast Notifications */}
      <Toaster 
        position="top-right"
        richColors
        closeButton
      />
    </div>
  );
}
