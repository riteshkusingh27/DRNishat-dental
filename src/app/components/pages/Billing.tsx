import { useState } from 'react';
import { Plus, Trash2, Printer, Download, Search, Eye } from 'lucide-react';
import { invoices as initialInvoices, patients, treatmentMasters } from '../../data/mockData';
import { StatusBadge } from '../shared/StatusBadge';
import { toast } from 'sonner';

interface BillingProps {
  onNavigate: (page: string, data?: any) => void;
  initialPatientId?: string;
}

export function Billing({ onNavigate, initialPatientId }: BillingProps) {
  const [showCreateInvoice, setShowCreateInvoice] = useState(!!initialPatientId);
  const [showReceipt, setShowReceipt] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<any>(null);

  // Invoice creation state
  const [selectedPatient, setSelectedPatient] = useState(initialPatientId || '');
  const [items, setItems] = useState<any[]>([]);
  const [discount, setDiscount] = useState(0);
  const [discountType, setDiscountType] = useState<'percent' | 'amount'>('percent');
  const [gstEnabled, setGstEnabled] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState('Cash');
  const [notes, setNotes] = useState('');

  const patient = patients.find(p => p.id === selectedPatient);

  // Calculate totals
  const subtotal = items.reduce((sum, item) => sum + (item.rate * item.quantity), 0);
  const discountAmount = discountType === 'percent' 
    ? (subtotal * discount) / 100 
    : discount;
  const afterDiscount = subtotal - discountAmount;
  const gstAmount = gstEnabled ? (afterDiscount * 0.18) : 0;
  const total = afterDiscount + gstAmount;

  const addItem = () => {
    setItems([...items, { 
      treatmentId: '', 
      treatmentName: '', 
      quantity: 1, 
      rate: 0 
    }]);
  };

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const updateItem = (index: number, field: string, value: any) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [field]: value };
    
    // Auto-fill rate and name when treatment is selected
    if (field === 'treatmentId') {
      const treatment = treatmentMasters.find(t => t.id === value);
      if (treatment) {
        newItems[index].treatmentName = treatment.name;
        newItems[index].rate = treatment.price;
      }
    }
    
    setItems(newItems);
  };

  const handleCreateInvoice = () => {
    if (!selectedPatient || items.length === 0) {
      toast.error('Please select patient and add items');
      return;
    }

    toast.success('Invoice created successfully!', {
      description: `Invoice for ${patient?.name} has been generated.`,
    });
    
    setShowCreateInvoice(false);
    // Reset form
    setSelectedPatient('');
    setItems([]);
    setDiscount(0);
    setNotes('');
  };

  const viewReceipt = (invoice: any) => {
    setSelectedInvoice(invoice);
    setShowReceipt(true);
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 mb-1">Billing & Invoices</h1>
          <p className="text-sm text-gray-500">Manage invoices and payments</p>
        </div>
        <button
          onClick={() => setShowCreateInvoice(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          <Plus className="w-5 h-5" />
          Create Invoice
        </button>
      </div>

      {/* Invoices List */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Invoice #</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Items</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Paid</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {initialInvoices.map((invoice) => (
                <tr key={invoice.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {invoice.invoiceNumber}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => onNavigate('patient-profile', { patientId: invoice.patientId })}
                      className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                    >
                      {invoice.patientName}
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {new Date(invoice.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate">
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
                      <button 
                        onClick={() => viewReceipt(invoice)}
                        className="p-1 hover:bg-gray-100 rounded" 
                        title="View"
                      >
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
      </div>

      {/* Create Invoice Modal */}
      {showCreateInvoice && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] flex flex-col">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Create Invoice</h2>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Patient Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Select Patient <span className="text-red-500">*</span>
                </label>
                <select
                  value={selectedPatient}
                  onChange={(e) => setSelectedPatient(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select a patient</option>
                  {patients.slice(0, 20).map(p => (
                    <option key={p.id} value={p.id}>
                      {p.name} - {p.phone}
                    </option>
                  ))}
                </select>
                {patient && (
                  <p className="mt-1 text-xs text-gray-500">
                    Outstanding: ₹{patient.outstandingDue.toLocaleString('en-IN')}
                  </p>
                )}
              </div>

              {/* Items */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="block text-sm font-medium text-gray-700">
                    Treatment Items
                  </label>
                  <button
                    onClick={addItem}
                    className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700 font-medium"
                  >
                    <Plus className="w-4 h-4" />
                    Add Item
                  </button>
                </div>

                <div className="space-y-3">
                  {items.map((item, index) => (
                    <div key={index} className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                      <div className="flex-1 grid grid-cols-4 gap-3">
                        <div className="col-span-2">
                          <select
                            value={item.treatmentId}
                            onChange={(e) => updateItem(index, 'treatmentId', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            <option value="">Select treatment</option>
                            {treatmentMasters.filter(t => t.active).map(t => (
                              <option key={t.id} value={t.id}>
                                {t.name} - ₹{t.price}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <input
                            type="number"
                            placeholder="Qty"
                            value={item.quantity}
                            onChange={(e) => updateItem(index, 'quantity', parseInt(e.target.value) || 1)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            min="1"
                          />
                        </div>
                        <div>
                          <div className="px-3 py-2 bg-gray-100 rounded-lg text-sm font-medium text-gray-900">
                            ₹{(item.rate * item.quantity).toLocaleString('en-IN')}
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => removeItem(index)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}

                  {items.length === 0 && (
                    <div className="text-center py-8 text-sm text-gray-500">
                      Click "Add Item" to add treatments
                    </div>
                  )}
                </div>
              </div>

              {/* Calculations */}
              {items.length > 0 && (
                <div className="border-t border-gray-200 pt-6">
                  <div className="max-w-md ml-auto space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Subtotal:</span>
                      <span className="font-medium text-gray-900">₹{subtotal.toLocaleString('en-IN')}</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-sm text-gray-600">Discount:</span>
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          value={discount}
                          onChange={(e) => setDiscount(parseFloat(e.target.value) || 0)}
                          className="w-24 px-3 py-1.5 border border-gray-300 rounded-lg text-sm"
                          min="0"
                        />
                        <select
                          value={discountType}
                          onChange={(e) => setDiscountType(e.target.value as 'percent' | 'amount')}
                          className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm"
                        >
                          <option value="percent">%</option>
                          <option value="amount">₹</option>
                        </select>
                      </div>
                      <span className="text-sm font-medium text-gray-900">
                        -₹{discountAmount.toLocaleString('en-IN')}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <label className="flex items-center gap-2 text-gray-600">
                        <input
                          type="checkbox"
                          checked={gstEnabled}
                          onChange={(e) => setGstEnabled(e.target.checked)}
                          className="rounded"
                        />
                        GST (18%):
                      </label>
                      <span className="font-medium text-gray-900">
                        ₹{gstAmount.toLocaleString('en-IN')}
                      </span>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                      <span className="font-semibold text-gray-900">Grand Total:</span>
                      <span className="text-2xl font-bold text-blue-600">
                        ₹{total.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Payment Method */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Payment Method
                </label>
                <div className="flex items-center gap-4">
                  {['Cash', 'Card', 'UPI', 'Net Banking'].map(method => (
                    <label key={method} className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={method}
                        checked={paymentMethod === method}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="text-blue-600"
                      />
                      <span className="text-sm text-gray-700">{method}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Notes
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={2}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  placeholder="Additional notes..."
                />
              </div>
            </div>

            <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-end gap-3">
              <button
                onClick={() => setShowCreateInvoice(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateInvoice}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
              >
                Create Invoice
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Receipt Preview Modal */}
      {showReceipt && selectedInvoice && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] flex flex-col">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">Invoice Receipt</h2>
              <div className="flex items-center gap-2">
                <button className="p-2 hover:bg-gray-100 rounded-lg">
                  <Printer className="w-5 h-5 text-gray-600" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-lg">
                  <Download className="w-5 h-5 text-gray-600" />
                </button>
                <button 
                  onClick={() => setShowReceipt(false)}
                  className="px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100 rounded-lg"
                >
                  Close
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-8">
              {/* Clinic Header */}
              <div className="text-center mb-8">
                <h1 className="text-2xl font-bold text-gray-900 mb-1">Dr. Nishat Dental Clinic</h1>
                <p className="text-sm text-gray-600">Multi-Specialist Dental Care</p>
                <p className="text-sm text-gray-600">Bengaluru, Karnataka</p>
                <p className="text-sm text-gray-600">Phone: +91 98765 43210</p>
              </div>

              {/* Invoice Details */}
              <div className="grid grid-cols-2 gap-6 mb-8 pb-6 border-b border-gray-200">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Invoice Number</p>
                  <p className="font-semibold text-gray-900">{selectedInvoice.invoiceNumber}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Date</p>
                  <p className="font-semibold text-gray-900">
                    {new Date(selectedInvoice.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Patient Name</p>
                  <p className="font-semibold text-gray-900">{selectedInvoice.patientName}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Payment Method</p>
                  <p className="font-semibold text-gray-900">{selectedInvoice.paymentMethod}</p>
                </div>
              </div>

              {/* Items Table */}
              <table className="w-full mb-6">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Treatment</th>
                    <th className="px-4 py-2 text-right text-xs font-medium text-gray-500">Qty</th>
                    <th className="px-4 py-2 text-right text-xs font-medium text-gray-500">Rate</th>
                    <th className="px-4 py-2 text-right text-xs font-medium text-gray-500">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedInvoice.items.map((item: any, index: number) => (
                    <tr key={index} className="border-b border-gray-100">
                      <td className="px-4 py-3 text-sm text-gray-900">{item.treatmentName}</td>
                      <td className="px-4 py-3 text-sm text-gray-600 text-right">{item.quantity}</td>
                      <td className="px-4 py-3 text-sm text-gray-600 text-right">₹{item.rate.toLocaleString('en-IN')}</td>
                      <td className="px-4 py-3 text-sm text-gray-900 text-right">₹{item.amount.toLocaleString('en-IN')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Totals */}
              <div className="max-w-xs ml-auto space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Subtotal:</span>
                  <span className="text-gray-900">₹{selectedInvoice.subtotal.toLocaleString('en-IN')}</span>
                </div>
                {selectedInvoice.discount > 0 && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Discount:</span>
                    <span className="text-gray-900">-₹{selectedInvoice.discount.toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">GST (18%):</span>
                  <span className="text-gray-900">₹{selectedInvoice.gst.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-gray-200">
                  <span className="font-semibold text-gray-900">Total:</span>
                  <span className="text-lg font-bold text-gray-900">₹{selectedInvoice.total.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Amount Paid:</span>
                  <span className="text-green-600 font-medium">₹{selectedInvoice.amountPaid.toLocaleString('en-IN')}</span>
                </div>
                {selectedInvoice.total > selectedInvoice.amountPaid && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Balance Due:</span>
                    <span className="text-orange-600 font-medium">
                      ₹{(selectedInvoice.total - selectedInvoice.amountPaid).toLocaleString('en-IN')}
                    </span>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="mt-8 pt-6 border-t border-gray-200 text-center">
                <p className="text-xs text-gray-500">Thank you for choosing Dr. Nishat Dental Clinic</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
