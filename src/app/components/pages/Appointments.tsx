import { FormEvent, useMemo, useState } from 'react';
import { Plus, Filter } from 'lucide-react';
import { appointments as initialAppointments, doctors, patients } from '../../data/mockData';
import { StatusBadge } from '../shared/StatusBadge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

interface AppointmentsProps {
  onNavigate: (page: string, data?: any) => void;
}

export function Appointments({ onNavigate }: AppointmentsProps) {
  const [view, setView] = useState<'list' | 'calendar'>('list');
  const [selectedDoctor, setSelectedDoctor] = useState('all');
  const [appointments, setAppointments] = useState(initialAppointments);
  const [openBooking, setOpenBooking] = useState(false);

  const defaultPatientId = useMemo(() => patients[0]?.id ?? '', []);
  const defaultDoctorId = useMemo(() => doctors[0]?.id ?? '', []);
  const [form, setForm] = useState({
    patientId: defaultPatientId,
    doctorId: defaultDoctorId,
    date: '2026-02-14',
    time: '09:00',
    visitType: 'Consultation',
  });

  const filteredAppointments = selectedDoctor === 'all'
    ? appointments
    : appointments.filter(a => a.doctorId === selectedDoctor);

  const timeSlots = Array.from({ length: 10 }, (_, i) => {
    const hour = i + 9;
    return `${hour.toString().padStart(2, '0')}:00`;
  });

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 mb-1">Appointments</h1>
          <p className="text-sm text-gray-500">{filteredAppointments.length} appointments today</p>
        </div>
        <div className="flex items-center gap-3">
          {/* View Toggle */}
          <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-lg">
            <button
              onClick={() => setView('list')}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                view === 'list' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'
              }`}
            >
              List
            </button>
            <button
              onClick={() => setView('calendar')}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                view === 'calendar' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'
              }`}
            >
              Calendar
            </button>
          </div>

          <Dialog open={openBooking} onOpenChange={(isOpen) => setOpenBooking(isOpen)}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2" onClick={() => setForm((prev) => ({
                patientId: defaultPatientId,
                doctorId: defaultDoctorId,
                date: prev.date,
                time: '09:00',
                visitType: 'Consultation',
              }))}>
                <Plus className="w-5 h-5" />
                Book Appointment
              </Button>
            </DialogTrigger>

            <DialogContent>
              <DialogHeader>
                <DialogTitle>Book appointment</DialogTitle>
                <DialogDescription>Capture the patient, doctor, date, and time to add to today&apos;s list.</DialogDescription>
              </DialogHeader>

              <form
                className="space-y-4"
                onSubmit={(event: FormEvent<HTMLFormElement>) => {
                  event.preventDefault();

                  const patient = patients.find((p) => p.id === form.patientId);
                  const doctor = doctors.find((d) => d.id === form.doctorId);
                  const newAppointment = {
                    id: `A${(appointments.length + 1).toString().padStart(3, '0')}`,
                    patientId: form.patientId,
                    patientName: patient?.name ?? 'New Patient',
                    doctorId: form.doctorId,
                    doctorName: doctor?.name ?? 'Assigned Doctor',
                    date: form.date,
                    time: form.time,
                    visitType: form.visitType,
                    status: 'Scheduled' as const,
                  };

                  setAppointments((prev) =>
                    [...prev, newAppointment].sort((a, b) => a.time.localeCompare(b.time)),
                  );
                  setOpenBooking(false);
                }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="patient">Patient</Label>
                    <Select
                      value={form.patientId}
                      onValueChange={(value) => setForm((prev) => ({ ...prev, patientId: value }))}
                    >
                      <SelectTrigger id="patient">
                        <SelectValue placeholder="Select patient" />
                      </SelectTrigger>
                      <SelectContent>
                        {patients.map((patient) => (
                          <SelectItem key={patient.id} value={patient.id}>
                            {patient.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="doctor">Doctor</Label>
                    <Select
                      value={form.doctorId}
                      onValueChange={(value) => setForm((prev) => ({ ...prev, doctorId: value }))}
                    >
                      <SelectTrigger id="doctor">
                        <SelectValue placeholder="Select doctor" />
                      </SelectTrigger>
                      <SelectContent>
                        {doctors.map((doctor) => (
                          <SelectItem key={doctor.id} value={doctor.id}>
                            {doctor.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="date">Date</Label>
                    <Input
                      id="date"
                      type="date"
                      value={form.date}
                      onChange={(event) => setForm((prev) => ({ ...prev, date: event.target.value }))}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="time">Time</Label>
                    <Input
                      id="time"
                      type="time"
                      value={form.time}
                      onChange={(event) => setForm((prev) => ({ ...prev, time: event.target.value }))}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="visitType">Visit type</Label>
                  <Input
                    id="visitType"
                    value={form.visitType}
                    onChange={(event) => setForm((prev) => ({ ...prev, visitType: event.target.value }))}
                    placeholder="e.g., Consultation, Follow-up"
                  />
                </div>

                <DialogFooter>
                  <Button variant="outline" type="button" onClick={() => setOpenBooking(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">Save booking</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6">
        <div className="flex items-center gap-4">
          <div>
            <label className="text-sm text-gray-600 mr-2">Doctor:</label>
            <select
              value={selectedDoctor}
              onChange={(e) => setSelectedDoctor(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Doctors</option>
              {doctors.map(doc => (
                <option key={doc.id} value={doc.id}>{doc.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-sm text-gray-600 mr-2">Date:</label>
            <input
              type="date"
              defaultValue="2026-02-14"
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">
            <Filter className="w-4 h-4" />
            More Filters
          </button>
        </div>
      </div>

      {/* List View */}
      {view === 'list' && (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Doctor</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Visit Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredAppointments.map((apt) => (
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
                    <div className="flex items-center gap-2">
                      {apt.status === 'Scheduled' && (
                        <>
                          <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                            Check-In
                          </button>
                          <span className="text-gray-300">|</span>
                          <button className="text-sm text-gray-600 hover:text-gray-700">
                            Reschedule
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Calendar View */}
      {view === 'calendar' && (
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="grid grid-cols-[120px_1fr_1fr] gap-4">
            {/* Time Column */}
            <div className="space-y-[52px] pt-12">
              {timeSlots.map(time => (
                <div key={time} className="text-sm text-gray-500 text-right pr-4">
                  {time}
                </div>
              ))}
            </div>

            {/* Dr. Nishat Column */}
            <div>
              <div className="h-12 border-b border-gray-200 flex items-center justify-center">
                <h3 className="font-semibold text-gray-900">Dr. Nishat Ahmed</h3>
              </div>
              <div className="relative">
                {filteredAppointments
                  .filter(a => a.doctorId === 'D001')
                  .map((apt) => {
                    const hour = parseInt(apt.time.split(':')[0]);
                    const topPosition = (hour - 9) * 60;
                    return (
                      <div
                        key={apt.id}
                        className="absolute left-0 right-2 bg-blue-50 border border-blue-200 rounded-lg p-2 cursor-pointer hover:shadow-md"
                        style={{ top: `${topPosition}px`, height: '48px' }}
                      >
                        <div className="text-xs font-medium text-blue-900">{apt.time}</div>
                        <div className="text-xs text-blue-700 truncate">{apt.patientName}</div>
                      </div>
                    );
                  })}
              </div>
            </div>

            {/* Dr. Mehta Column */}
            <div>
              <div className="h-12 border-b border-gray-200 flex items-center justify-center">
                <h3 className="font-semibold text-gray-900">Dr. Rohan Mehta</h3>
              </div>
              <div className="relative">
                {filteredAppointments
                  .filter(a => a.doctorId === 'D002')
                  .map((apt) => {
                    const hour = parseInt(apt.time.split(':')[0]);
                    const topPosition = (hour - 9) * 60;
                    return (
                      <div
                        key={apt.id}
                        className="absolute left-0 right-2 bg-teal-50 border border-teal-200 rounded-lg p-2 cursor-pointer hover:shadow-md"
                        style={{ top: `${topPosition}px`, height: '48px' }}
                      >
                        <div className="text-xs font-medium text-teal-900">{apt.time}</div>
                        <div className="text-xs text-teal-700 truncate">{apt.patientName}</div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
