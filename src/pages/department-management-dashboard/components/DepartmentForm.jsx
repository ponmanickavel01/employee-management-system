import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const DepartmentForm = ({ onAddDepartment, existingDepartments, isLoading }) => {
  const [departmentName, setDepartmentName] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateDepartmentName = (name) => {
    if (!name?.trim()) {
      return 'Department name is required';
    }
    
    if (name?.trim()?.length < 2) {
      return 'Department name must be at least 2 characters';
    }
    
    if (name?.trim()?.length > 50) {
      return 'Department name must be less than 50 characters';
    }
    
    const isDuplicate = existingDepartments?.some(
      dept => dept?.name?.toLowerCase() === name?.trim()?.toLowerCase()
    );
    
    if (isDuplicate) {
      return 'Department name already exists';
    }
    
    return '';
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    const validationError = validateDepartmentName(departmentName);
    if (validationError) {
      setError(validationError);
      return;
    }
    
    setIsSubmitting(true);
    setError('');
    
    try {
      await onAddDepartment({
        name: departmentName?.trim(),
        createdAt: new Date()?.toISOString()
      });
      
      setDepartmentName('');
      setError('');
    } catch (err) {
      setError('Failed to create department. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNameChange = (e) => {
    const value = e?.target?.value;
    setDepartmentName(value);
    
    if (error) {
      const validationError = validateDepartmentName(value);
      setError(validationError);
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Icon name="Plus" size={20} className="text-primary" />
        <h2 className="text-lg font-semibold text-foreground">Add Department</h2>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Department Name"
          type="text"
          placeholder="Enter department name"
          value={departmentName}
          onChange={handleNameChange}
          error={error}
          required
          disabled={isSubmitting || isLoading}
          description="Enter a unique name for the new department"
        />
        
        <Button
          type="submit"
          variant="default"
          loading={isSubmitting}
          disabled={!departmentName?.trim() || !!error || isLoading}
          fullWidth
          iconName="Plus"
          iconPosition="left"
        >
          {isSubmitting ? 'Creating Department...' : 'Create Department'}
        </Button>
      </form>
    </div>
  );
};

export default DepartmentForm;