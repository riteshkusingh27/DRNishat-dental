import { useState } from 'react';
import { ArrowLeft, Calendar, FileText, Upload, Phone, MapPin, Droplet, AlertCircle, Download, Eye, Printer } from 'lucide-react';
import { patients, treatments, invoices, documents, followUps, appointments } from '../../data/mockData';
import { StatusBadge } from '../shared/StatusBadge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';

interface PatientProfileProps {
  patientId: string;
  onBack: () => void;
  onNavigate: (page: string, data?: any) => void;
}

export function PatientProfile({ patientId, onBack, onNavigate }: PatientProfileProps) {
  const patient = patients.find(p => p.id === patientId);

  if (!patient) {
    return (
      <div className="p-8">
        <p>Patient not found</p>
      </div>
    );
  }

  // Get patient data
  const patientTreatments = treatments.filter(t => t.patientId === patientId);
  const patientInvoices = invoices.filter(i => i.patientId === patientId);
  const patientDocuments = documents.filter(d => d.patientId === patientId);
  const patientFollowUps = followUps.filter(f => f.patientId === patientId);
  const patientVisits = appointments.filter(a => a.patientId === patientId);

  return (
    <div className="p-8">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Patients
      </button>

      {/* Patient Summary Card */}
      <div className="bg-gradient-to-br from-blue-500 to-teal-500 rounded-xl p-6 mb-6 text-white">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-16 h-16 rounded-full bg-white bg-opacity-20 flex items-center justify-center text-2xl font-semibold">
                {patient.name.charAt(0)}
              </div>
              <div>
                <h1 className="text-2xl font-semibold mb-1">{patient.name}</h1>
                <div className="flex items-center gap-4 text-sm text-blue-50">
                  <span>{patient.id}</span>
                  <span>•</span>
                  <span>{patient.age} Years</span>
                  <span>•</span>
                  <span>{patient.gender}</span>
                  {patient.bloodGroup && (
                    <>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Droplet className="w-3 h-3" />
                        {patient.bloodGroup}
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-6">
              <div>
                <p className="text-xs text-blue-100 mb-1">Phone</p>
                <p className="font-medium">{patient.phone}</p>
              </div>
              <div>
                <p className="text-xs text-blue-100 mb-1">Total Visits</p>
                <p className="font-medium">{patient.totalVisits} visits</p>
              </div>
              <div>
                <p className="text-xs text-blue-100 mb-1">Registered</p>
                <p className="font-medium">
                  {new Date(patient.registeredDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                </p>
              </div>
              <div>
                <p className="text-xs text-blue-100 mb-1">Outstanding Balance</p>
                <p className="text-lg font-semibold">
                  {patient.outstandingDue > 0 ? `₹${patient.outstandingDue.toLocaleString('en-IN')}` : '₹0'}
                </p>
              </div>
            </div>

            {patient.medicalAlerts && patient.medicalAlerts.length > 0 && (
              <div className="mt-4 flex items-start gap-2 bg-white bg-opacity-20 rounded-lg p-3">
                <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs font-medium mb-0.5">Medical Alerts</p>
                  <p className="text-sm">{patient.medicalAlerts.join(', ')}</p>
                </div>
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div className="flex flex-col gap-2">
            <button
              onClick={() => onNavigate('appointments', { patientId })}
              className="px-4 py-2 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors text-sm font-medium"
            >
              Book Appointment
            </button>
            <button
              onClick={() => onNavigate('billing', { patientId })}
              className="px-4 py-2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg transition-colors text-sm font-medium"
            >
              Create Invoice
            </button>
            <button className="px-4 py-2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg transition-colors text-sm font-medium">
              Add Treatment
            </button>
            <button className="px-4 py-2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg transition-colors text-sm font-medium">
              Upload Document
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="visits">Visit History ({patientVisits.length})</TabsTrigger>
          <TabsTrigger value="treatments">Treatments ({patientTreatments.length})</TabsTrigger>
          <TabsTrigger value="billing">Billing ({patientInvoices.length})</TabsTrigger>
          <TabsTrigger value="documents">Documents ({patientDocuments.length})</TabsTrigger>
          <TabsTrigger value="followups">Follow-Ups ({patientFollowUps.length})</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview">
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Patient Information</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-gray-400 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-xs text-gray-500">Phone</p>
                    <p className="text-sm text-gray-900">{patient.phone}</p>
                    {patient.alternatePhone && (
                      <p className="text-sm text-gray-600 mt-0.5">{patient.alternatePhone}</p>
                    )}
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-xs text-gray-500">Address</p>
                    <p className="text-sm text-gray-900">{patient.address}</p>
                  </div>
                </div>
                {patient.referredBy && (
                  <div>
                    <p className="text-xs text-gray-500">Referred By</p>
                    <p className="text-sm text-gray-900">{patient.referredBy}</p>
                  </div>
                )}
                {patient.notes && (
                  <div>
                    <p className="text-xs text-gray-500">Notes</p>
                    <p className="text-sm text-gray-900">{patient.notes}</p>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Recent Activity</h3>
              <div className="space-y-3">
                {patientVisits.slice(0, 5).map((visit) => (
                  <div key={visit.id} className="flex items-start gap-3 pb-3 border-b border-gray-100 last:border-b-0">
                    <div className="w-2 h-2 rounded-full bg-blue-500 mt-2"></div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-900">{visit.visitType}</p>
                      <p className="text-xs text-gray-500 mt-0.5">
                        {new Date(visit.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })} • {visit.doctorName}
                      </p>
                    </div>
                    <StatusBadge status={visit.status} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Visit History Tab */}
        <TabsContent value="visits">
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Doctor</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Visit Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {patientVisits.map((visit) => (
                  <tr key={visit.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(visit.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {visit.doctorName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {visit.visitType}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <StatusBadge status={visit.status} />
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {visit.notes || '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TabsContent>

        {/* Treatments Tab */}
        <TabsContent value="treatments">
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Treatment</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tooth</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Doctor</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cost</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Warranty</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {patientTreatments.map((treatment) => (
                  <tr key={treatment.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {treatment.treatmentName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {treatment.tooth || '—'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {treatment.doctorName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ₹{treatment.cost.toLocaleString('en-IN')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <StatusBadge status={treatment.status} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {treatment.warranty || '—'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {new Date(treatment.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TabsContent>

        {/* Billing Tab */}
        <TabsContent value="billing">
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Invoice #</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Items</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Paid</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {patientInvoices.map((invoice) => (
                  <tr key={invoice.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {invoice.invoiceNumber}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {new Date(invoice.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {invoice.items.map(item => item.treatmentName).join(', ')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      ₹{invoice.total.toLocaleString('en-IN')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      ₹{invoice.amountPaid.toLocaleString('en-IN')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <StatusBadge status={invoice.status} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <button className="p-1 hover:bg-gray-100 rounded" title="View">
                          <Eye className="w-4 h-4 text-gray-600" />
                        </button>
                        <button className="p-1 hover:bg-gray-100 rounded" title="Download">
                          <Download className="w-4 h-4 text-gray-600" />
                        </button>
                        <button className="p-1 hover:bg-gray-100 rounded" title="Print">
                          <Printer className="w-4 h-4 text-gray-600" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TabsContent>

        {/* Documents Tab */}
        <TabsContent value="documents">
          <div className="bg-white rounded-xl border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                <Upload className="w-4 h-4" />
                Upload Document
              </button>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-3 gap-4">
                {patientDocuments.map((doc) => (
                  <div key={doc.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-3">
                      <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                        <FileText className="w-5 h-5 text-blue-600" />
                      </div>
                      <span className="text-xs text-gray-500">{doc.size}</span>
                    </div>
                    <h4 className="font-medium text-sm text-gray-900 mb-1">{doc.name}</h4>
                    <p className="text-xs text-gray-500 mb-3">
                      {new Date(doc.uploadDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </p>
                    <div className="flex items-center gap-2">
                      <button className="flex-1 text-xs text-blue-600 hover:text-blue-700 font-medium">
                        View
                      </button>
                      <button className="flex-1 text-xs text-gray-600 hover:text-gray-700 font-medium">
                        Download
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Follow-Ups Tab */}
        <TabsContent value="followups">
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Next Visit Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reason</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reminder Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Notes</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {patientFollowUps.map((followUp) => (
                  <tr key={followUp.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {new Date(followUp.nextVisitDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
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
                      <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                        Mark Done
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
