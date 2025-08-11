import React from 'react';
import Icon from '../../../components/AppIcon';

const EmployeeStats = ({ employees, isLoading }) => {
  const calculateStats = () => {
    if (!employees || employees?.length === 0) {
      return {
        totalEmployees: 0,
        averageSalary: 0,
        totalDepartments: 0,
        highestSalary: 0
      };
    }

    const totalEmployees = employees?.length;
    const totalSalary = employees?.reduce((sum, emp) => sum + emp?.salary, 0);
    const averageSalary = totalSalary / totalEmployees;
    const uniqueDepartments = new Set(employees.map(emp => emp.departmentName));
    const totalDepartments = uniqueDepartments?.size;
    const highestSalary = Math.max(...employees?.map(emp => emp?.salary));

    return {
      totalEmployees,
      averageSalary,
      totalDepartments,
      highestSalary
    };
  };

  const stats = calculateStats();

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })?.format(amount);
  };

  const statCards = [
    {
      title: 'Total Employees',
      value: stats?.totalEmployees?.toLocaleString(),
      icon: 'Users',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      description: 'Active workforce'
    },
    {
      title: 'Average Salary',
      value: formatCurrency(stats?.averageSalary),
      icon: 'DollarSign',
      color: 'text-accent',
      bgColor: 'bg-accent/10',
      description: 'Company average'
    },
    {
      title: 'Departments',
      value: stats?.totalDepartments?.toString(),
      icon: 'Building2',
      color: 'text-secondary',
      bgColor: 'bg-secondary/10',
      description: 'Active departments'
    },
    {
      title: 'Highest Salary',
      value: formatCurrency(stats?.highestSalary),
      icon: 'TrendingUp',
      color: 'text-warning',
      bgColor: 'bg-warning/10',
      description: 'Top earner'
    }
  ];

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[1, 2, 3, 4]?.map((index) => (
          <div key={index} className="bg-card rounded-lg border border-border p-6 elevation-1">
            <div className="animate-pulse">
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 bg-muted rounded-lg"></div>
                <div className="w-6 h-6 bg-muted rounded"></div>
              </div>
              <div className="space-y-2">
                <div className="h-4 bg-muted rounded w-3/4"></div>
                <div className="h-6 bg-muted rounded w-1/2"></div>
                <div className="h-3 bg-muted rounded w-2/3"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {statCards?.map((stat, index) => (
        <div key={index} className="bg-card rounded-lg border border-border p-6 elevation-1 hover-elevate">
          <div className="flex items-center justify-between mb-4">
            <div className={`flex items-center justify-center w-12 h-12 ${stat?.bgColor} rounded-lg`}>
              <Icon name={stat?.icon} size={24} className={stat?.color} />
            </div>
            <Icon name="TrendingUp" size={16} className="text-muted-foreground/50" />
          </div>
          
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">{stat?.title}</p>
            <p className="text-2xl font-bold text-foreground">{stat?.value}</p>
            <p className="text-xs text-muted-foreground">{stat?.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EmployeeStats;