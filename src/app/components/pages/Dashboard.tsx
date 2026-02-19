import { Calendar, Users, IndianRupee, UserPlus, Bell, Plus, UserCheck, FileText } from 'lucide-react';
import { StatCard } from '../shared/StatCard';
import { StatusBadge } from '../shared/StatusBadge';
import { appointments, followUps, patients } from '../../data/mockData';

interface DashboardProps {
  onNavigate: (page: string, data?: any) => void;
}

export function Dashboard({ onNavigate }: DashboardProps) {
  // Calculate stats
  const todayAppointments = appointments.length;
  const checkedInCount = appointments.filter(a => a.status === 'Checked-In' || a.status === 'Completed').length;
  const pendingPayments = 42750; // Sum from invoices
  const newPatientsThisMonth = 67;
  const followUpsToday = followUps.filter(f => f.nextVisitDate === '2026-02-14').length + 9;

  const handleCheckIn = (appointmentId: string) => {
    alert(`Patient checked in! Token generated.`);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900 mb-1">Dashboard</h1>
        <p className="text-sm text-gray-500">Welcome back, Anjali! Here's what's happening today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 lg:gap-6">
        <StatCard
          title="Today's Appointments"
          value={todayAppointments}
          icon={Calendar}
          color="blue"
          trend={{ value: '+12% from yesterday', isPositive: true }}
        />
        <StatCard
          title="Patients Checked-in"
          value={checkedInCount}
          icon={UserCheck}
          color="teal"
        />
        <StatCard
          title="Pending Payments"
          value={`₹${pendingPayments.toLocaleString('en-IN')}`}
          icon={IndianRupee}
          color="orange"
        />
        <StatCard
          title="New Patients (Month)"
          value={newPatientsThisMonth}
          icon={UserPlus}
          color="green"
          trend={{ value: '+23% from last month', isPositive: true }}
        />
        <StatCard
          title="Follow-Ups Today"
          value={followUpsToday}
          icon={Bell}
          color="purple"
        />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Today's Appointments Table */}
        <div className="xl:col-span-2">
          <div className="bg-white rounded-xl border border-gray-200">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <div>
                <h2 className="font-semibold text-gray-900">Today's Appointments</h2>
                <p className="text-sm text-gray-500 mt-0.5">{todayAppointments} appointments scheduled</p>
              </div>
              <button
                onClick={() => onNavigate('appointments')}
                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                View All
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Doctor</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Visit Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {appointments.slice(0, 12).map((apt) => (
                    <tr key={apt.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {apt.time}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() => onNavigate('patient-profile', { patientId: apt.patientId })}
                          className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                        >
                          {apt.patientName}
                        </button>
                        {apt.isWalkIn && (
                          <span className="ml-2 text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded">
                            Walk-in
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {apt.doctorName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {apt.visitType}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <StatusBadge status={apt.status} />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {apt.status === 'Scheduled' && (
                          <button
                            onClick={() => handleCheckIn(apt.id)}
                            className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                          >
                            Check-In
                          </button>
                        )}
                        {apt.status === 'Completed' && (
                          <span className="text-sm text-gray-400">—</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="space-y-2">
            <button
              onClick={() => onNavigate('patients', { action: 'add' })}
              className="w-full flex items-center gap-3 px-4 py-3 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors"
            >
              <UserPlus className="w-5 h-5" />
              <span className="font-medium">New Patient</span>
            </button>
            <button
              onClick={() => onNavigate('appointments', { action: 'book' })}
              className="w-full flex items-center gap-3 px-4 py-3 bg-teal-50 text-teal-700 rounded-lg hover:bg-teal-100 transition-colors"
            >
              <Calendar className="w-5 h-5" />
              <span className="font-medium">Book Appointment</span>
            </button>
            <button
              onClick={() => onNavigate('billing', { action: 'create' })}
              className="w-full flex items-center gap-3 px-4 py-3 bg-orange-50 text-orange-700 rounded-lg hover:bg-orange-100 transition-colors"
            >
              <FileText className="w-5 h-5" />
              <span className="font-medium">Create Invoice</span>
            </button>
          </div>
        </div>

        {/* Recent Follow-Ups */}
        <div className="bg-white rounded-xl border border-gray-200">
          <div className="p-6 border-b border-gray-200 flex items-center justify-between">
            <div>
              <h2 className="font-semibold text-gray-900">Upcoming Follow-Ups</h2>
              <p className="text-sm text-gray-500 mt-0.5">{followUps.length} pending follow-ups</p>
            </div>
            <button
              onClick={() => onNavigate('followups')}
              className="text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              View All
            </button>
          </div>
          <div className="p-6 space-y-3">
            {followUps.slice(0, 6).map((item) => (
              <div key={item.id} className="flex items-start justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{item.patientName}</p>
                  <p className="text-xs text-gray-600 mt-0.5">{item.reason}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(item.nextVisitDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                  </p>
                </div>
                <StatusBadge status={item.reminderStatus} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
