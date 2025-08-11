import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import EmployeeRegistrationForm from './components/EmployeeRegistrationForm';
import EmployeeTable from './components/EmployeeTable';
import EmployeeStats from './components/EmployeeStats';

const EmployeeRegistrationManagement = () => {
  const [employees, setEmployees] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Mock employees data
  const mockEmployees = [
    {
      id: 1,
      name: "Sarah Johnson",
      salary: 85000,
      departmentId: 1,
      departmentName: "Engineering",
      registrationDate: "2024-01-15T10:30:00Z",
      createdAt: new Date("2024-01-15")
    },
    {
      id: 2,
      name: "Michael Chen",
      salary: 72000,
      departmentId: 2,
      departmentName: "Human Resources",
      registrationDate: "2024-02-03T14:20:00Z",
      createdAt: new Date("2024-02-03")
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      salary: 68000,
      departmentId: 3,
      departmentName: "Marketing",
      registrationDate: "2024-02-18T09:15:00Z",
      createdAt: new Date("2024-02-18")
    },
    {
      id: 4,
      name: "David Thompson",
      salary: 95000,
      departmentId: 1,
      departmentName: "Engineering",
      registrationDate: "2024-03-05T11:45:00Z",
      createdAt: new Date("2024-03-05")
    },
    {
      id: 5,
      name: "Lisa Wang",
      salary: 78000,
      departmentId: 4,
      departmentName: "Finance",
      registrationDate: "2024-03-12T16:30:00Z",
      createdAt: new Date("2024-03-12")
    },
    {
      id: 6,
      name: "James Wilson",
      salary: 82000,
      departmentId: 5,
      departmentName: "Sales",
      registrationDate: "2024-03-20T13:10:00Z",
      createdAt: new Date("2024-03-20")
    },
    {
      id: 7,
      name: "Maria Garcia",
      salary: 71000,
      departmentId: 6,
      departmentName: "Operations",
      registrationDate: "2024-04-02T08:25:00Z",
      createdAt: new Date("2024-04-02")
    },
    {
      id: 8,
      name: "Robert Kim",
      salary: 89000,
      departmentId: 1,
      departmentName: "Engineering",
      registrationDate: "2024-04-15T12:00:00Z",
      createdAt: new Date("2024-04-15")
    },
    {
      id: 9,
      name: "Jennifer Brown",
      salary: 65000,
      departmentId: 3,
      departmentName: "Marketing",
      registrationDate: "2024-05-01T10:45:00Z",
      createdAt: new Date("2024-05-01")
    },
    {
      id: 10,
      name: "Thomas Anderson",
      salary: 92000,
      departmentId: 4,
      departmentName: "Finance",
      registrationDate: "2024-05-18T15:20:00Z",
      createdAt: new Date("2024-05-18")
    },
    {
      id: 11,
      name: "Amanda Davis",
      salary: 76000,
      departmentId: 5,
      departmentName: "Sales",
      registrationDate: "2024-06-03T09:30:00Z",
      createdAt: new Date("2024-06-03")
    },
    {
      id: 12,
      name: "Christopher Lee",
      salary: 73000,
      departmentId: 6,
      departmentName: "Operations",
      registrationDate: "2024-06-20T14:15:00Z",
      createdAt: new Date("2024-06-20")
    },
    {
      id: 13,
      name: "Jessica Taylor",
      salary: 87000,
      departmentId: 2,
      departmentName: "Human Resources",
      registrationDate: "2024-07-08T11:00:00Z",
      createdAt: new Date("2024-07-08")
    },
    {
      id: 14,
      name: "Daniel Martinez",
      salary: 94000,
      departmentId: 1,
      departmentName: "Engineering",
      registrationDate: "2024-07-25T16:45:00Z",
      createdAt: new Date("2024-07-25")
    },
    {
      id: 15,
      name: "Rachel White",
      salary: 69000,
      departmentId: 3,
      departmentName: "Marketing",
      registrationDate: "2024-08-10T13:30:00Z",
      createdAt: new Date("2024-08-10")
    }
  ];

  useEffect(() => {
    // Simulate API call to fetch employees
    const fetchEmployees = async () => {
      setIsLoading(true);
      try {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1200));
        setEmployees(mockEmployees);
      } catch (error) {
        console.error('Failed to fetch employees:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  const handleEmployeeAdded = (newEmployee) => {
    setEmployees(prevEmployees => [newEmployee, ...prevEmployees]);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <Breadcrumb />
          
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Employee Registration &amp; Management
            </h1>
            <p className="text-muted-foreground">
              Register new employees and manage your workforce data efficiently
            </p>
          </div>

          {/* Statistics Overview */}
          <EmployeeStats employees={employees} isLoading={isLoading} />

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            {/* Registration Form */}
            <div className="xl:col-span-1">
              <EmployeeRegistrationForm onEmployeeAdded={handleEmployeeAdded} />
            </div>

            {/* Employee Table */}
            <div className="xl:col-span-2">
              <EmployeeTable employees={employees} isLoading={isLoading} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EmployeeRegistrationManagement;