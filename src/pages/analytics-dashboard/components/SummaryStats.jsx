import React from 'react';
import Icon from '../../../components/AppIcon';

const SummaryStats = ({ stats, loading }) => {
  const statItems = [
    {
      label: 'Total Employees',
      value: stats?.totalEmployees,
      icon: 'Users',
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      label: 'Total Departments',
      value: stats?.totalDepartments,
      icon: 'Building2',
      color: 'text-accent',
      bgColor: 'bg-accent/10'
    },
    {
      label: 'Total Payroll',
      value: `$${stats?.totalPayroll?.toLocaleString('en-US', { minimumFractionDigits: 2 }) || '0.00'}`,
      icon: 'DollarSign',
      color: 'text-success',
      bgColor: 'bg-success/10'
    },
    {
      label: 'Average Salary',
      value: `$${stats?.overallAverageSalary?.toLocaleString('en-US', { minimumFractionDigits: 2 }) || '0.00'}`,
      icon: 'TrendingUp',
      color: 'text-warning',
      bgColor: 'bg-warning/10'
    }
  ];

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statItems?.map((_, index) => (
          <div key={index} className="bg-card border border-border rounded-lg p-6 animate-pulse">
            <div className="flex items-center justify-between mb-4">
              <div className="h-4 bg-muted rounded w-20"></div>
              <div className="h-10 w-10 bg-muted rounded-full"></div>
            </div>
            <div className="h-8 bg-muted rounded w-16"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {statItems?.map((item, index) => (
        <div key={index} className="bg-card border border-border rounded-lg p-6 hover:shadow-md transition-shadow duration-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-muted-foreground">{item?.label}</h3>
            <div className={`flex items-center justify-center w-10 h-10 ${item?.bgColor} rounded-full`}>
              <Icon name={item?.icon} size={20} className={item?.color} />
            </div>
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl font-bold text-foreground">{item?.value}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SummaryStats;