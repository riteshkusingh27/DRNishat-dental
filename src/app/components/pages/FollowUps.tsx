import { Bell, CheckCircle } from 'lucide-react';
import { followUps } from '../../data/mockData';
import { StatusBadge } from '../shared/StatusBadge';
import { toast } from 'sonner';

interface FollowUpsProps {
  onNavigate: (page: string, data?: any) => void;
}

export function FollowUps({ onNavigate }: FollowUpsProps) {
  const handleSendReminder = (id: string, patientName: string) => {
    toast.success(`Reminder sent to ${patientName}`, {
      description: 'SMS/WhatsApp reminder has been sent',
    });
  };

  const handleMarkDone = (id: string) => {
    toast.success('Follow-up marked as completed');
  };

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900 mb-1">Follow-Ups</h1>
        <p className="text-sm text-gray-500">{followUps.length} upcoming follow-ups</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Next Visit Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reason</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reminder Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Notes</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {followUps.map((followUp) => (
              <tr key={followUp.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => onNavigate('patient-profile', { patientId: followUp.patientId })}
                    className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                  >
                    {followUp.patientName}
                  </button>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {new Date(followUp.nextVisitDate).toLocaleDateString('en-IN', { 
                    day: 'numeric', 
                    month: 'short', 
                    year: 'numeric' 
                  })}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {followUp.reason}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <StatusBadge status={followUp.reminderStatus} />
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {followUp.notes || '—'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    {followUp.reminderStatus === 'Pending' && (
                      <button
                        onClick={() => handleSendReminder(followUp.id, followUp.patientName)}
                        className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
                      >
                        <Bell className="w-3 h-3" />
                        Send Reminder
                      </button>
                    )}
                    <button
                      onClick={() => handleMarkDone(followUp.id)}
                      className="text-sm text-green-600 hover:text-green-700 font-medium flex items-center gap-1"
                    >
                      <CheckCircle className="w-3 h-3" />
                      Mark Done
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
