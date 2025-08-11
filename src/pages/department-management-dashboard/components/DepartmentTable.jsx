import React, { useState, useMemo } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import LoadingSpinner from '../../../components/ui/LoadingSpinner';

const DepartmentTable = ({ departments, isLoading, employees }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({
    key: 'name',
    direction: 'asc'
  });

  const getDepartmentStats = (departmentId) => {
    const deptEmployees = employees?.filter(emp => emp?.departmentId === departmentId);
    const employeeCount = deptEmployees?.length;
    const averageSalary = employeeCount > 0 
      ? deptEmployees?.reduce((sum, emp) => sum + emp?.salary, 0) / employeeCount 
      : 0;
    
    return { employeeCount, averageSalary };
  };

  const enrichedDepartments = useMemo(() => {
    return departments?.map(dept => {
      const stats = getDepartmentStats(dept?.id);
      return {
        ...dept,
        employeeCount: stats?.employeeCount,
        averageSalary: stats?.averageSalary
      };
    });
  }, [departments, employees]);

  const filteredAndSortedDepartments = useMemo(() => {
    let filtered = enrichedDepartments?.filter(dept =>
      dept?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase())
    );

    if (sortConfig?.key) {
      filtered?.sort((a, b) => {
        let aValue = a?.[sortConfig?.key];
        let bValue = b?.[sortConfig?.key];

        if (sortConfig?.key === 'createdAt') {
          aValue = new Date(aValue);
          bValue = new Date(bValue);
        }

        if (aValue < bValue) {
          return sortConfig?.direction === 'asc' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig?.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }

    return filtered;
  }, [enrichedDepartments, searchTerm, sortConfig]);

  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev?.key === key && prev?.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })?.format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getSortIcon = (columnKey) => {
    if (sortConfig?.key !== columnKey) {
      return <Icon name="ArrowUpDown" size={14} className="text-muted-foreground" />;
    }
    return sortConfig?.direction === 'asc' 
      ? <Icon name="ArrowUp" size={14} className="text-primary" />
      : <Icon name="ArrowDown" size={14} className="text-primary" />;
  };

  if (isLoading) {
    return (
      <div className="bg-card rounded-lg border border-border p-6">
        <LoadingSpinner text="Loading departments..." />
      </div>
    );
  }

  return (
    <div className="bg-card rounded-lg border border-border">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-foreground">Departments</h2>
          <div className="text-sm text-muted-foreground">
            {filteredAndSortedDepartments?.length} of {departments?.length} departments
          </div>
        </div>
        
        <Input
          type="search"
          placeholder="Search departments..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e?.target?.value)}
          className="max-w-sm"
        />
      </div>
      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              <th className="text-left p-4 font-medium text-foreground">
                <button
                  onClick={() => handleSort('name')}
                  className="flex items-center space-x-2 hover:text-primary transition-colors"
                >
                  <span>Department Name</span>
                  {getSortIcon('name')}
                </button>
              </th>
              <th className="text-left p-4 font-medium text-foreground">
                <button
                  onClick={() => handleSort('employeeCount')}
                  className="flex items-center space-x-2 hover:text-primary transition-colors"
                >
                  <span>Employees</span>
                  {getSortIcon('employeeCount')}
                </button>
              </th>
              <th className="text-left p-4 font-medium text-foreground">
                <button
                  onClick={() => handleSort('averageSalary')}
                  className="flex items-center space-x-2 hover:text-primary transition-colors"
                >
                  <span>Avg. Salary</span>
                  {getSortIcon('averageSalary')}
                </button>
              </th>
              <th className="text-left p-4 font-medium text-foreground">
                <button
                  onClick={() => handleSort('createdAt')}
                  className="flex items-center space-x-2 hover:text-primary transition-colors"
                >
                  <span>Created</span>
                  {getSortIcon('createdAt')}
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredAndSortedDepartments?.map((department, index) => (
              <tr
                key={department?.id}
                className={`border-b border-border hover:bg-muted/30 transition-colors ${
                  index % 2 === 0 ? 'bg-background' : 'bg-muted/10'
                }`}
              >
                <td className="p-4">
                  <div className="flex items-center space-x-2">
                    <Icon name="Building2" size={16} className="text-primary" />
                    <span className="font-medium text-foreground">{department?.name}</span>
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex items-center space-x-2">
                    <Icon name="Users" size={14} className="text-muted-foreground" />
                    <span className="text-foreground">{department?.employeeCount}</span>
                  </div>
                </td>
                <td className="p-4">
                  <span className="text-foreground font-medium">
                    {department?.averageSalary > 0 ? formatCurrency(department?.averageSalary) : '-'}
                  </span>
                </td>
                <td className="p-4">
                  <span className="text-muted-foreground">
                    {formatDate(department?.createdAt)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Mobile Cards */}
      <div className="md:hidden">
        {filteredAndSortedDepartments?.map((department) => (
          <div key={department?.id} className="p-4 border-b border-border last:border-b-0">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <Icon name="Building2" size={16} className="text-primary" />
                <span className="font-medium text-foreground">{department?.name}</span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Employees:</span>
                <div className="flex items-center space-x-1 mt-1">
                  <Icon name="Users" size={12} className="text-muted-foreground" />
                  <span className="text-foreground">{department?.employeeCount}</span>
                </div>
              </div>
              
              <div>
                <span className="text-muted-foreground">Avg. Salary:</span>
                <div className="font-medium text-foreground mt-1">
                  {department?.averageSalary > 0 ? formatCurrency(department?.averageSalary) : '-'}
                </div>
              </div>
            </div>
            
            <div className="mt-2 text-xs text-muted-foreground">
              Created: {formatDate(department?.createdAt)}
            </div>
          </div>
        ))}
      </div>
      {filteredAndSortedDepartments?.length === 0 && !isLoading && (
        <div className="p-8 text-center">
          <Icon name="Building2" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No departments found</h3>
          <p className="text-muted-foreground">
            {searchTerm ? 'Try adjusting your search terms' : 'Create your first department to get started'}
          </p>
        </div>
      )}
    </div>
  );
};

export default DepartmentTable;