import React, { useState, useEffect } from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const EmployeeRegistrationForm = ({ onEmployeeAdded }) => {
  const [formData, setFormData] = useState({
    name: '',
    salary: '',
    departmentId: ''
  });
  const [departments, setDepartments] = useState([]);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isDepartmentsLoading, setIsDepartmentsLoading] = useState(true);
  const [showSuccess, setShowSuccess] = useState(false);

  // Mock departments data
  const mockDepartments = [
    { id: 1, name: "Engineering", description: "Software development and technical operations" },
    { id: 2, name: "Human Resources", description: "Employee management and organizational development" },
    { id: 3, name: "Marketing", description: "Brand promotion and customer engagement" },
    { id: 4, name: "Finance", description: "Financial planning and accounting operations" },
    { id: 5, name: "Sales", description: "Revenue generation and client relationships" },
    { id: 6, name: "Operations", description: "Business operations and process management" }
  ];

  useEffect(() => {
    // Simulate API call to fetch departments
    const fetchDepartments = async () => {
      setIsDepartmentsLoading(true);
      try {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        setDepartments(mockDepartments);
      } catch (error) {
        console.error('Failed to fetch departments:', error);
      } finally {
        setIsDepartmentsLoading(false);
      }
    };

    fetchDepartments();
  }, []);

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.name?.trim()) {
      newErrors.name = 'Employee name is required';
    } else if (formData?.name?.trim()?.length < 2) {
      newErrors.name = 'Name must be at least 2 characters long';
    }

    if (!formData?.salary) {
      newErrors.salary = 'Salary is required';
    } else {
      const salaryNum = parseFloat(formData?.salary);
      if (isNaN(salaryNum) || salaryNum <= 0) {
        newErrors.salary = 'Please enter a valid salary amount';
      } else if (salaryNum < 1000) {
        newErrors.salary = 'Salary must be at least $1,000';
      } else if (salaryNum > 1000000) {
        newErrors.salary = 'Salary cannot exceed $1,000,000';
      }
    }

    if (!formData?.departmentId) {
      newErrors.departmentId = 'Please select a department';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Clear error for this field when user starts typing
    if (errors?.[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const formatSalaryInput = (value) => {
    // Remove non-numeric characters except decimal point
    const numericValue = value?.replace(/[^0-9.]/g, '');
    
    // Ensure only one decimal point
    const parts = numericValue?.split('.');
    if (parts?.length > 2) {
      return parts?.[0] + '.' + parts?.slice(1)?.join('');
    }
    
    return numericValue;
  };

  const handleSalaryChange = (e) => {
    const formattedValue = formatSalaryInput(e?.target?.value);
    handleInputChange('salary', formattedValue);
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const selectedDepartment = departments?.find(dept => dept?.id === parseInt(formData?.departmentId));
      
      const newEmployee = {
        id: Date.now(),
        name: formData?.name?.trim(),
        salary: parseFloat(formData?.salary),
        departmentId: parseInt(formData?.departmentId),
        departmentName: selectedDepartment?.name || '',
        registrationDate: new Date()?.toISOString(),
        createdAt: new Date()
      };

      // Call parent callback
      if (onEmployeeAdded) {
        onEmployeeAdded(newEmployee);
      }

      // Reset form
      setFormData({
        name: '',
        salary: '',
        departmentId: ''
      });

      // Show success message
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);

    } catch (error) {
      console.error('Failed to register employee:', error);
      setErrors({ submit: 'Failed to register employee. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const departmentOptions = departments?.map(dept => ({
    value: dept?.id?.toString(),
    label: dept?.name,
    description: dept?.description
  }));

  return (
    <div className="bg-card rounded-lg border border-border p-6 elevation-1">
      <div className="flex items-center space-x-3 mb-6">
        <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg">
          <Icon name="UserPlus" size={20} className="text-primary" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-foreground">Register New Employee</h2>
          <p className="text-sm text-muted-foreground">Add a new team member to the system</p>
        </div>
      </div>
      {showSuccess && (
        <div className="mb-6 p-4 bg-success/10 border border-success/20 rounded-lg flex items-center space-x-3">
          <Icon name="CheckCircle" size={20} className="text-success" />
          <div>
            <p className="text-sm font-medium text-success">Employee registered successfully!</p>
            <p className="text-xs text-success/80">The new employee has been added to the system.</p>
          </div>
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <Input
              label="Employee Name"
              type="text"
              placeholder="Enter full name"
              value={formData?.name}
              onChange={(e) => handleInputChange('name', e?.target?.value)}
              error={errors?.name}
              required
              disabled={isLoading}
              description="Enter the employee's full legal name"
            />
          </div>

          <div>
            <Input
              label="Annual Salary"
              type="text"
              placeholder="50000"
              value={formData?.salary}
              onChange={handleSalaryChange}
              error={errors?.salary}
              required
              disabled={isLoading}
              description="Enter annual salary in USD (numbers only)"
            />
            {formData?.salary && !errors?.salary && (
              <p className="mt-1 text-xs text-muted-foreground">
                Formatted: ${parseFloat(formData?.salary || 0)?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
            )}
          </div>

          <div>
            <Select
              label="Department"
              placeholder={isDepartmentsLoading ? "Loading departments..." : "Select department"}
              options={departmentOptions}
              value={formData?.departmentId}
              onChange={(value) => handleInputChange('departmentId', value)}
              error={errors?.departmentId}
              required
              disabled={isLoading || isDepartmentsLoading}
              loading={isDepartmentsLoading}
              searchable
              description="Choose the employee's assigned department"
            />
          </div>
        </div>

        {errors?.submit && (
          <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg flex items-center space-x-3">
            <Icon name="AlertCircle" size={20} className="text-destructive" />
            <p className="text-sm text-destructive">{errors?.submit}</p>
          </div>
        )}

        <div className="flex items-center justify-end space-x-4 pt-4 border-t border-border">
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              setFormData({ name: '', salary: '', departmentId: '' });
              setErrors({});
            }}
            disabled={isLoading}
          >
            Clear Form
          </Button>
          <Button
            type="submit"
            loading={isLoading}
            iconName="UserPlus"
            iconPosition="left"
            disabled={isDepartmentsLoading}
          >
            {isLoading ? 'Registering...' : 'Register Employee'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EmployeeRegistrationForm;