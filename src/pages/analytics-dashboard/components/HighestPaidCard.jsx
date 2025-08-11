import React from 'react';
import Icon from '../../../components/AppIcon';

const HighestPaidCard = ({ employee, department, loading }) => {
  if (loading) {
    return (
      <div className="bg-card border border-border rounded-lg p-6 animate-pulse">
        <div className="flex items-center justify-between mb-4">
          <div className="h-4 bg-muted rounded w-24"></div>
          <div className="h-8 w-8 bg-muted rounded-full"></div>
        </div>
        <div className="space-y-3">
          <div className="h-6 bg-muted rounded w-32"></div>
          <div className="h-4 bg-muted rounded w-20"></div>
          <div className="h-4 bg-muted rounded w-28"></div>
        </div>
      </div>
    );
  }

  if (!employee) {
    return (
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium text-muted-foreground">{department}</h3>
          <Icon name="Users" size={20} className="text-muted-foreground" />
        </div>
        <div className="text-center py-4">
          <Icon name="UserX" size={32} className="text-muted-foreground mx-auto mb-2" />
          <p className="text-sm text-muted-foreground">No employees found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-muted-foreground">{department}</h3>
        <div className="flex items-center justify-center w-8 h-8 bg-primary/10 rounded-full">
          <Icon name="Crown" size={16} className="text-primary" />
        </div>
      </div>
      <div className="space-y-3">
        <div>
          <h4 className="text-lg font-semibold text-foreground">{employee?.name}</h4>
          <p className="text-sm text-muted-foreground">Highest Paid Employee</p>
        </div>
        
        <div className="flex items-center space-x-2">
          <Icon name="DollarSign" size={16} className="text-success" />
          <span className="text-xl font-bold text-success">
            ${employee?.salary?.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </span>
        </div>
        
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Icon name="Building2" size={14} />
          <span>{department} Department</span>
        </div>
      </div>
    </div>
  );
};

export default HighestPaidCard;