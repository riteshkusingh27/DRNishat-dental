import { Stethoscope, Calendar, Clock } from 'lucide-react';
import { doctors } from '../../data/mockData';
import { StatusBadge } from '../shared/StatusBadge';

export function Doctors() {
  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900 mb-1">Doctors</h1>
        <p className="text-sm text-gray-500">{doctors.length} doctors in the clinic</p>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {doctors.map((doctor) => (
          <div key={doctor.id} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-teal-500 rounded-full flex items-center justify-center text-white text-2xl font-semibold">
                {doctor.name.split(' ')[1].charAt(0)}
              </div>
              <StatusBadge status={doctor.status} />
            </div>

            <h3 className="text-lg font-semibold text-gray-900 mb-1">{doctor.name}</h3>
            <p className="text-sm text-gray-600 mb-4">{doctor.specialty}</p>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Calendar className="w-4 h-4" />
                <span>{doctor.availability.join(', ')}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Clock className="w-4 h-4" />
                <span>9:00 AM - 6:00 PM</span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200">
              <button className="w-full px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium">
                View Schedule
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
