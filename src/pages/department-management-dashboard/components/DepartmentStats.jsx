import React from 'react';
import Icon from '../../../components/AppIcon';

const DepartmentStats = ({ departments, employees }) => {
  const calculateStats = () => {
    const totalDepartments = departments?.length;
    const totalEmployees = employees?.length;
    
    // Calculate highest average salary department
    let highestAvgSalaryDept = null;
    let highestAvgSalary = 0;
    
    departments?.forEach(dept => {
      const deptEmployees = employees?.filter(emp => emp?.departmentId === dept?.id);
      if (deptEmployees?.length > 0) {
        const avgSalary = deptEmployees?.reduce((sum, emp) => sum + emp?.salary, 0) / deptEmployees?.length;
        if (avgSalary > highestAvgSalary) {
          highestAvgSalary = avgSalary;
          highestAvgSalaryDept = dept?.name;
        }
      }
    });
    
    return {
      totalDepartments,
      totalEmployees,
      highestAvgSalaryDept,
      highestAvgSalary
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
      title: 'Total Departments',
      value: stats?.totalDepartments,
      icon: 'Building2',
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      title: 'Total Employees',
      value: stats?.totalEmployees,
      icon: 'Users',
      color: 'text-accent',
      bgColor: 'bg-accent/10'
    },
    {
      title: 'Highest Avg. Salary',
      value: stats?.highestAvgSalaryDept ? `${stats?.highestAvgSalaryDept}` : 'N/A',
      subtitle: stats?.highestAvgSalary > 0 ? formatCurrency(stats?.highestAvgSalary) : '',
      icon: 'TrendingUp',
      color: 'text-warning',
      bgColor: 'bg-warning/10'
    }
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
        Quick Statistics
      </h3>
      {statCards?.map((card, index) => (
        <div
          key={index}
          className="bg-card rounded-lg border border-border p-4 hover:shadow-sm transition-shadow"
        >
          <div className="flex items-start space-x-3">
            <div className={`p-2 rounded-md ${card?.bgColor}`}>
              <Icon name={card?.icon} size={16} className={card?.color} />
            </div>
            
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                {card?.title}
              </p>
              <p className="text-lg font-semibold text-foreground mt-1 truncate">
                {card?.value}
              </p>
              {card?.subtitle && (
                <p className="text-sm text-muted-foreground mt-1">
                  {card?.subtitle}
                </p>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DepartmentStats;