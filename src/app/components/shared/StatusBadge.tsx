import { cn } from '../ui/utils';

interface StatusBadgeProps {
  status: string;
  variant?: 'default' | 'dot';
}

const statusColors: Record<string, string> = {
  'Scheduled': 'bg-blue-50 text-blue-700 border-blue-200',
  'Checked-In': 'bg-teal-50 text-teal-700 border-teal-200',
  'Completed': 'bg-green-50 text-green-700 border-green-200',
  'Cancelled': 'bg-red-50 text-red-700 border-red-200',
  'No-Show': 'bg-gray-50 text-gray-700 border-gray-200',
  'Paid': 'bg-green-50 text-green-700 border-green-200',
  'Pending': 'bg-orange-50 text-orange-700 border-orange-200',
  'Partially Paid': 'bg-yellow-50 text-yellow-700 border-yellow-200',
  'Waiting': 'bg-blue-50 text-blue-700 border-blue-200',
  'With Doctor': 'bg-purple-50 text-purple-700 border-purple-200',
  'In Progress': 'bg-blue-50 text-blue-700 border-blue-200',
  'Planned': 'bg-gray-50 text-gray-700 border-gray-200',
  'Available': 'bg-green-50 text-green-700 border-green-200',
  'On Leave': 'bg-red-50 text-red-700 border-red-200',
  'Busy': 'bg-orange-50 text-orange-700 border-orange-200',
  'Sent': 'bg-blue-50 text-blue-700 border-blue-200',
  'Confirmed': 'bg-green-50 text-green-700 border-green-200',
};

const dotColors: Record<string, string> = {
  'Scheduled': 'bg-blue-500',
  'Checked-In': 'bg-teal-500',
  'Completed': 'bg-green-500',
  'Cancelled': 'bg-red-500',
  'No-Show': 'bg-gray-500',
  'Paid': 'bg-green-500',
  'Pending': 'bg-orange-500',
  'Partially Paid': 'bg-yellow-500',
  'Waiting': 'bg-blue-500',
  'With Doctor': 'bg-purple-500',
  'In Progress': 'bg-blue-500',
  'Planned': 'bg-gray-500',
  'Available': 'bg-green-500',
  'On Leave': 'bg-red-500',
  'Busy': 'bg-orange-500',
  'Sent': 'bg-blue-500',
  'Confirmed': 'bg-green-500',
};

export function StatusBadge({ status, variant = 'default' }: StatusBadgeProps) {
  const colorClass = statusColors[status] || 'bg-gray-50 text-gray-700 border-gray-200';
  const dotColor = dotColors[status] || 'bg-gray-500';

  if (variant === 'dot') {
    return (
      <div className="flex items-center gap-2">
        <div className={cn('w-2 h-2 rounded-full', dotColor)}></div>
        <span className="text-sm text-gray-700">{status}</span>
      </div>
    );
  }

  return (
    <span className={cn(
      'inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium border',
      colorClass
    )}>
      {status}
    </span>
  );
}
