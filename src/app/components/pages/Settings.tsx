import { Save } from 'lucide-react';
import { toast } from 'sonner';

export function Settings() {
  const handleSave = () => {
    toast.success('Settings saved successfully!');
  };

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900 mb-1">Settings</h1>
        <p className="text-sm text-gray-500">Manage clinic configuration</p>
      </div>

      <div className="max-w-3xl space-y-6">
        {/* Clinic Profile */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Clinic Profile</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Clinic Name</label>
              <input
                type="text"
                defaultValue="Dr. Nishat Dental Clinic"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Address</label>
              <textarea
                defaultValue="MG Road, Bengaluru, Karnataka - 560001"
                rows={2}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone</label>
                <input
                  type="text"
                  defaultValue="+91 98765 43210"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
                <input
                  type="email"
                  defaultValue="contact@drnishat.com"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Working Hours */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Working Hours</h3>
          <div className="space-y-3">
            {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map(day => (
              <div key={day} className="flex items-center gap-4">
                <div className="w-32">
                  <span className="text-sm text-gray-700">{day}</span>
                </div>
                <input
                  type="time"
                  defaultValue="09:00"
                  className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm"
                />
                <span className="text-sm text-gray-500">to</span>
                <input
                  type="time"
                  defaultValue="18:00"
                  className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Appointment Settings */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Appointment Settings</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Default Appointment Duration (minutes)
              </label>
              <input
                type="number"
                defaultValue="30"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="sms-reminder" defaultChecked className="rounded" />
              <label htmlFor="sms-reminder" className="text-sm text-gray-700">
                Send SMS reminders to patients
              </label>
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="email-reminder" defaultChecked className="rounded" />
              <label htmlFor="email-reminder" className="text-sm text-gray-700">
                Send email reminders to patients
              </label>
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Payment Methods</h3>
          <div className="space-y-2">
            {['Cash', 'Card', 'UPI', 'Net Banking', 'Cheque'].map(method => (
              <div key={method} className="flex items-center gap-2">
                <input type="checkbox" id={method} defaultChecked className="rounded" />
                <label htmlFor={method} className="text-sm text-gray-700">{method}</label>
              </div>
            ))}
          </div>
        </div>

        {/* Receipt Footer */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Receipt Footer Text</h3>
          <textarea
            defaultValue="Thank you for choosing Dr. Nishat Dental Clinic. We look forward to serving you again."
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          />
        </div>

        {/* Save Button */}
        <div className="flex items-center justify-end">
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            <Save className="w-4 h-4" />
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
}
