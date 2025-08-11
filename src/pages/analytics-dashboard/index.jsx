import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import SummaryStats from './components/SummaryStats';
import HighestPaidCard from './components/HighestPaidCard';
import AverageSalaryTable from './components/AverageSalaryTable';
import SalaryChart from './components/SalaryChart';
import DepartmentFilter from './components/DepartmentFilter';
import Icon from '../../components/AppIcon';

const AnalyticsDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [analyticsData, setAnalyticsData] = useState({
    employees: [],
    departments: [],
    summaryStats: {},
    highestPaidByDepartment: [],
    departmentAverages: []
  });

  // Mock data for analytics
  const mockEmployees = [
    { id: 1, name: "Sarah Johnson", salary: 95000, department: "Engineering" },
    { id: 2, name: "Michael Chen", salary: 87000, department: "Engineering" },
    { id: 3, name: "Emily Rodriguez", salary: 78000, department: "Marketing" },
    { id: 4, name: "David Thompson", salary: 82000, department: "Marketing" },
    { id: 5, name: "Lisa Wang", salary: 92000, department: "Sales" },
    { id: 6, name: "James Wilson", salary: 75000, department: "Sales" },
    { id: 7, name: "Anna Martinez", salary: 88000, department: "HR" },
    { id: 8, name: "Robert Brown", salary: 79000, department: "HR" },
    { id: 9, name: "Jennifer Davis", salary: 91000, department: "Finance" },
    { id: 10, name: "Kevin Lee", salary: 85000, department: "Finance" },
    { id: 11, name: "Maria Garcia", salary: 89000, department: "Engineering" },
    { id: 12, name: "Thomas Anderson", salary: 76000, department: "Marketing" }
  ];

  const mockDepartments = ["Engineering", "Marketing", "Sales", "HR", "Finance"];

  const calculateAnalytics = (employees, departments) => {
    // Calculate highest paid employee by department
    const highestPaidByDepartment = departments?.map(dept => {
      const deptEmployees = employees?.filter(emp => emp?.department === dept);
      const highestPaid = deptEmployees?.reduce((max, emp) => 
        emp?.salary > (max?.salary || 0) ? emp : max, null
      );
      return { department: dept, employee: highestPaid };
    });

    // Calculate department averages
    const departmentAverages = departments?.map(dept => {
      const deptEmployees = employees?.filter(emp => emp?.department === dept);
      const totalSalary = deptEmployees?.reduce((sum, emp) => sum + emp?.salary, 0);
      const averageSalary = deptEmployees?.length > 0 ? totalSalary / deptEmployees?.length : 0;
      
      return {
        department: dept,
        employeeCount: deptEmployees?.length,
        averageSalary: averageSalary,
        totalPayroll: totalSalary
      };
    });

    // Calculate summary stats
    const totalEmployees = employees?.length;
    const totalDepartments = departments?.length;
    const totalPayroll = employees?.reduce((sum, emp) => sum + emp?.salary, 0);
    const overallAverageSalary = totalEmployees > 0 ? totalPayroll / totalEmployees : 0;

    return {
      employees,
      departments,
      summaryStats: {
        totalEmployees,
        totalDepartments,
        totalPayroll,
        overallAverageSalary
      },
      highestPaidByDepartment,
      departmentAverages
    };
  };

  const loadAnalyticsData = async () => {
    setLoading(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const analytics = calculateAnalytics(mockEmployees, mockDepartments);
      setAnalyticsData(analytics);
    } catch (error) {
      console.error('Error loading analytics data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAnalyticsData();
  }, []);

  const handleDepartmentChange = (department) => {
    setSelectedDepartment(department);
  };

  const handleRefresh = () => {
    loadAnalyticsData();
  };

  const getFilteredData = () => {
    if (selectedDepartment === 'all') {
      return analyticsData;
    }

    const filteredHighestPaid = analyticsData?.highestPaidByDepartment?.filter(
      item => item?.department === selectedDepartment
    );
    
    const filteredAverages = analyticsData?.departmentAverages?.filter(
      item => item?.department === selectedDepartment
    );

    return {
      ...analyticsData,
      highestPaidByDepartment: filteredHighestPaid,
      departmentAverages: filteredAverages
    };
  };

  const filteredData = getFilteredData();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <Breadcrumb />
          
          {/* Page Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Analytics Dashboard</h1>
              <p className="text-muted-foreground mt-2">
                Comprehensive salary insights and workforce analytics for data-driven decisions
              </p>
            </div>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Icon name="Calendar" size={16} />
              <span>Last updated: {new Date()?.toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}</span>
            </div>
          </div>

          {/* Department Filter */}
          <DepartmentFilter
            departments={analyticsData?.departments}
            selectedDepartment={selectedDepartment}
            onDepartmentChange={handleDepartmentChange}
            onRefresh={handleRefresh}
            loading={loading}
          />

          {/* Summary Statistics */}
          <SummaryStats 
            stats={analyticsData?.summaryStats} 
            loading={loading} 
          />

          {/* Main Analytics Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-8">
            {/* Highest Paid Employees Cards */}
            <div className="xl:col-span-2">
              <div className="flex items-center space-x-2 mb-6">
                <Icon name="Crown" size={20} className="text-primary" />
                <h2 className="text-xl font-semibold text-foreground">
                  Highest Paid Employees by Department
                </h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredData?.highestPaidByDepartment?.map((item) => (
                  <HighestPaidCard
                    key={item?.department}
                    employee={item?.employee}
                    department={item?.department}
                    loading={loading}
                  />
                ))}
              </div>
            </div>

            {/* Salary Chart */}
            <div className="xl:col-span-1">
              <SalaryChart 
                data={filteredData?.departmentAverages} 
                loading={loading} 
              />
            </div>
          </div>

          {/* Average Salary Table */}
          <AverageSalaryTable 
            departmentAverages={filteredData?.departmentAverages} 
            loading={loading} 
          />

          {/* Loading Overlay */}
          {loading && (
            <LoadingSpinner 
              variant="overlay" 
              text="Loading analytics data..." 
              size={32} 
            />
          )}
        </div>
      </main>
    </div>
  );
};

export default AnalyticsDashboard;