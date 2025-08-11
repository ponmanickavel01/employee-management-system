import React, { useState, useMemo } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const EmployeeTable = ({ employees, isLoading }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({
    key: 'registrationDate',
    direction: 'desc'
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredAndSortedEmployees = useMemo(() => {
    let filtered = employees?.filter(employee =>
      employee?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
      employee?.departmentName?.toLowerCase()?.includes(searchTerm?.toLowerCase())
    );

    if (sortConfig?.key) {
      filtered?.sort((a, b) => {
        let aValue = a?.[sortConfig?.key];
        let bValue = b?.[sortConfig?.key];

        if (sortConfig?.key === 'salary') {
          aValue = parseFloat(aValue);
          bValue = parseFloat(bValue);
        } else if (sortConfig?.key === 'registrationDate') {
          aValue = new Date(aValue);
          bValue = new Date(bValue);
        } else {
          aValue = aValue?.toString()?.toLowerCase() || '';
          bValue = bValue?.toString()?.toLowerCase() || '';
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
  }, [employees, searchTerm, sortConfig]);

  const paginatedEmployees = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredAndSortedEmployees?.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredAndSortedEmployees, currentPage]);

  const totalPages = Math.ceil(filteredAndSortedEmployees?.length / itemsPerPage);

  const handleSort = (key) => {
    setSortConfig(prevConfig => ({
      key,
      direction: prevConfig?.key === key && prevConfig?.direction === 'asc' ? 'desc' : 'asc'
    }));
    setCurrentPage(1);
  };

  const getSortIcon = (columnKey) => {
    if (sortConfig?.key !== columnKey) {
      return <Icon name="ArrowUpDown" size={14} className="text-muted-foreground/50" />;
    }
    return sortConfig?.direction === 'asc' 
      ? <Icon name="ArrowUp" size={14} className="text-primary" />
      : <Icon name="ArrowDown" size={14} className="text-primary" />;
  };

  const formatSalary = (salary) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })?.format(salary);
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (isLoading) {
    return (
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center justify-center h-64">
          <div className="flex flex-col items-center space-y-3">
            <Icon name="Loader2" size={32} className="animate-spin text-primary" />
            <p className="text-sm text-muted-foreground">Loading employees...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-lg border border-border elevation-1">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-secondary/10 rounded-lg">
              <Icon name="Users" size={20} className="text-secondary" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-foreground">Employee Directory</h2>
              <p className="text-sm text-muted-foreground">
                {filteredAndSortedEmployees?.length} employee{filteredAndSortedEmployees?.length !== 1 ? 's' : ''} found
              </p>
            </div>
          </div>
          
          <div className="w-full sm:w-80">
            <Input
              type="search"
              placeholder="Search employees or departments..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e?.target?.value);
                setCurrentPage(1);
              }}
              className="w-full"
            />
          </div>
        </div>
      </div>
      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/30">
            <tr>
              <th className="text-left p-4 font-medium text-foreground">
                <button
                  onClick={() => handleSort('name')}
                  className="flex items-center space-x-2 hover:text-primary transition-colors"
                >
                  <span>Employee Name</span>
                  {getSortIcon('name')}
                </button>
              </th>
              <th className="text-left p-4 font-medium text-foreground">
                <button
                  onClick={() => handleSort('salary')}
                  className="flex items-center space-x-2 hover:text-primary transition-colors"
                >
                  <span>Annual Salary</span>
                  {getSortIcon('salary')}
                </button>
              </th>
              <th className="text-left p-4 font-medium text-foreground">
                <button
                  onClick={() => handleSort('departmentName')}
                  className="flex items-center space-x-2 hover:text-primary transition-colors"
                >
                  <span>Department</span>
                  {getSortIcon('departmentName')}
                </button>
              </th>
              <th className="text-left p-4 font-medium text-foreground">
                <button
                  onClick={() => handleSort('registrationDate')}
                  className="flex items-center space-x-2 hover:text-primary transition-colors"
                >
                  <span>Registration Date</span>
                  {getSortIcon('registrationDate')}
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedEmployees?.length === 0 ? (
              <tr>
                <td colSpan="4" className="p-8 text-center">
                  <div className="flex flex-col items-center space-y-3">
                    <Icon name="Users" size={48} className="text-muted-foreground/50" />
                    <div>
                      <p className="text-foreground font-medium">No employees found</p>
                      <p className="text-sm text-muted-foreground">
                        {searchTerm ? 'Try adjusting your search criteria' : 'Register your first employee to get started'}
                      </p>
                    </div>
                  </div>
                </td>
              </tr>
            ) : (
              paginatedEmployees?.map((employee, index) => (
                <tr key={employee?.id} className={`border-b border-border hover:bg-muted/20 transition-colors ${index % 2 === 0 ? 'bg-background' : 'bg-muted/10'}`}>
                  <td className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center justify-center w-8 h-8 bg-primary/10 rounded-full">
                        <Icon name="User" size={16} className="text-primary" />
                      </div>
                      <span className="font-medium text-foreground">{employee?.name}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="font-semibold text-foreground">{formatSalary(employee?.salary)}</span>
                  </td>
                  <td className="p-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary/10 text-secondary">
                      {employee?.departmentName}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className="text-muted-foreground">{formatDate(employee?.registrationDate)}</span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {/* Mobile Cards */}
      <div className="md:hidden">
        {paginatedEmployees?.length === 0 ? (
          <div className="p-8 text-center">
            <div className="flex flex-col items-center space-y-3">
              <Icon name="Users" size={48} className="text-muted-foreground/50" />
              <div>
                <p className="text-foreground font-medium">No employees found</p>
                <p className="text-sm text-muted-foreground">
                  {searchTerm ? 'Try adjusting your search criteria' : 'Register your first employee to get started'}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-4 space-y-4">
            {paginatedEmployees?.map((employee) => (
              <div key={employee?.id} className="bg-background border border-border rounded-lg p-4 space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-full">
                    <Icon name="User" size={18} className="text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-foreground">{employee?.name}</h3>
                    <p className="text-sm text-muted-foreground">{formatDate(employee?.registrationDate)}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 pt-2 border-t border-border">
                  <div>
                    <p className="text-xs text-muted-foreground">Salary</p>
                    <p className="font-semibold text-foreground">{formatSalary(employee?.salary)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Department</p>
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-secondary/10 text-secondary">
                      {employee?.departmentName}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="p-4 border-t border-border">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredAndSortedEmployees?.length)} of {filteredAndSortedEmployees?.length} employees
            </p>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                iconName="ChevronLeft"
                iconPosition="left"
              >
                Previous
              </Button>
              <span className="text-sm text-muted-foreground">
                Page {currentPage} of {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                iconName="ChevronRight"
                iconPosition="right"
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeTable;