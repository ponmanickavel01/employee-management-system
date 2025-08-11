import React from 'react';
import Icon from '../../../components/AppIcon';

const AverageSalaryTable = ({ departmentAverages, loading }) => {
  if (loading) {
    return (
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-border">
          <div className="h-6 bg-muted rounded w-48 animate-pulse"></div>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {[1, 2, 3, 4]?.map((item) => (
              <div key={item} className="flex justify-between items-center animate-pulse">
                <div className="h-4 bg-muted rounded w-32"></div>
                <div className="h-4 bg-muted rounded w-24"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <div className="px-6 py-4 border-b border-border">
        <div className="flex items-center space-x-2">
          <Icon name="BarChart3" size={20} className="text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Average Salary by Department</h3>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Department
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Employees
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Average Salary
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Total Payroll
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {departmentAverages?.map((dept, index) => (
              <tr key={dept?.department} className="hover:bg-muted/30 transition-colors duration-150">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center justify-center w-8 h-8 bg-primary/10 rounded-full">
                      <Icon name="Building2" size={14} className="text-primary" />
                    </div>
                    <span className="text-sm font-medium text-foreground">{dept?.department}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-2">
                    <Icon name="Users" size={14} className="text-muted-foreground" />
                    <span className="text-sm text-foreground">{dept?.employeeCount}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-2">
                    <Icon name="DollarSign" size={14} className="text-success" />
                    <span className="text-sm font-semibold text-success">
                      ${dept?.averageSalary?.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-foreground">
                    ${dept?.totalPayroll?.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {departmentAverages?.length === 0 && (
        <div className="text-center py-8">
          <Icon name="Database" size={32} className="text-muted-foreground mx-auto mb-2" />
          <p className="text-sm text-muted-foreground">No department data available</p>
        </div>
      )}
    </div>
  );
};

export default AverageSalaryTable;