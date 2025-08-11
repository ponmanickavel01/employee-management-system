import React from 'react';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';

const DepartmentFilter = ({ 
  departments, 
  selectedDepartment, 
  onDepartmentChange, 
  onRefresh, 
  loading 
}) => {
  const departmentOptions = [
    { value: 'all', label: 'All Departments' },
    ...departments?.map(dept => ({
      value: dept,
      label: dept
    }))
  ];

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
      <div className="flex-1 max-w-xs">
        <Select
          id="department-filter"
          name="departmentFilter"
          label="Filter by Department"
          description="Select a department to filter the data"
          options={departmentOptions}
          value={selectedDepartment}
          onChange={onDepartmentChange}
          placeholder="Select department..."
          error=""
        />
      </div>
      
      <div className="flex items-center space-x-3">
        <Button
          variant="outline"
          onClick={onRefresh}
          loading={loading}
          iconName="RefreshCw"
          iconPosition="left"
        >
          Refresh Data
        </Button>
        
        <Button
          variant="secondary"
          iconName="Download"
          iconPosition="left"
        >
          Export Report
        </Button>
      </div>
    </div>
  );
};

export default DepartmentFilter;