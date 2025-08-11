import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import DepartmentForm from './components/DepartmentForm';
import DepartmentTable from './components/DepartmentTable';
import DepartmentStats from './components/DepartmentStats';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import Icon from '../../components/AppIcon';

const DepartmentManagementDashboard = () => {
  const [departments, setDepartments] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [notification, setNotification] = useState(null);

  // Mock data for departments and employees
  const mockDepartments = [
    {
      id: 1,
      name: "Engineering",
      createdAt: "2024-01-15T10:30:00Z"
    },
    {
      id: 2,
      name: "Human Resources",
      createdAt: "2024-01-20T14:15:00Z"
    },
    {
      id: 3,
      name: "Marketing",
      createdAt: "2024-02-01T09:45:00Z"
    },
    {
      id: 4,
      name: "Sales",
      createdAt: "2024-02-10T11:20:00Z"
    },
    {
      id: 5,
      name: "Finance",
      createdAt: "2024-02-15T16:30:00Z"
    }
  ];

  const mockEmployees = [
    { id: 1, name: "John Smith", salary: 95000, departmentId: 1 },
    { id: 2, name: "Sarah Johnson", salary: 87000, departmentId: 1 },
    { id: 3, name: "Michael Brown", salary: 102000, departmentId: 1 },
    { id: 4, name: "Emily Davis", salary: 78000, departmentId: 2 },
    { id: 5, name: "David Wilson", salary: 82000, departmentId: 2 },
    { id: 6, name: "Lisa Anderson", salary: 75000, departmentId: 3 },
    { id: 7, name: "Robert Taylor", salary: 89000, departmentId: 3 },
    { id: 8, name: "Jennifer Martinez", salary: 91000, departmentId: 3 },
    { id: 9, name: "Christopher Lee", salary: 85000, departmentId: 4 },
    { id: 10, name: "Amanda White", salary: 88000, departmentId: 4 },
    { id: 11, name: "Daniel Harris", salary: 93000, departmentId: 4 },
    { id: 12, name: "Michelle Clark", salary: 97000, departmentId: 5 },
    { id: 13, name: "Kevin Lewis", salary: 105000, departmentId: 5 }
  ];

  // Simulate API loading
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setDepartments(mockDepartments);
      setEmployees(mockEmployees);
      setIsLoading(false);
    };

    loadData();
  }, []);

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 4000);
  };

  const handleAddDepartment = async (newDepartment) => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const department = {
      ...newDepartment,
      id: Math.max(...departments?.map(d => d?.id), 0) + 1
    };
    
    setDepartments(prev => [...prev, department]);
    showNotification(`Department "${department?.name}" created successfully!`);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <LoadingSpinner variant="overlay" text="Loading department data..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <Breadcrumb />
          
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-2">
              <Icon name="Building2" size={24} className="text-primary" />
              <h1 className="text-2xl font-bold text-foreground">Department Management</h1>
            </div>
            <p className="text-muted-foreground">
              Create and manage organizational departments with real-time analytics
            </p>
          </div>

          {/* Notification */}
          {notification && (
            <div className={`mb-6 p-4 rounded-lg border flex items-center space-x-3 ${
              notification?.type === 'success' ?'bg-success/10 border-success/20 text-success-foreground' :'bg-destructive/10 border-destructive/20 text-destructive-foreground'
            }`}>
              <Icon 
                name={notification?.type === 'success' ? 'CheckCircle' : 'AlertCircle'} 
                size={16} 
                className={notification?.type === 'success' ? 'text-success' : 'text-destructive'} 
              />
              <span className="text-sm font-medium">{notification?.message}</span>
            </div>
          )}

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Section - Department Table */}
            <div className="lg:col-span-7">
              <DepartmentTable 
                departments={departments}
                employees={employees}
                isLoading={false}
              />
            </div>

            {/* Right Section - Form and Stats */}
            <div className="lg:col-span-5 space-y-6">
              <DepartmentForm
                onAddDepartment={handleAddDepartment}
                existingDepartments={departments}
                isLoading={false}
              />
              
              <DepartmentStats
                departments={departments}
                employees={employees}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DepartmentManagementDashboard;