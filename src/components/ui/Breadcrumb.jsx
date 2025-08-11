import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const Breadcrumb = () => {
  const location = useLocation();

  const getBreadcrumbItems = () => {
    const path = location?.pathname;
    
    const breadcrumbMap = {
      '/department-management-dashboard': [
        { label: 'Dashboard', path: '/' },
        { label: 'Departments', path: '/department-management-dashboard' }
      ],
      '/employee-registration-management': [
        { label: 'Dashboard', path: '/' },
        { label: 'Employees', path: '/employee-registration-management' },
        { label: 'Manage', path: '/employee-registration-management' }
      ],
      '/analytics-dashboard': [
        { label: 'Dashboard', path: '/' },
        { label: 'Analytics', path: '/analytics-dashboard' }
      ]
    };

    return breadcrumbMap?.[path] || [{ label: 'Dashboard', path: '/' }];
  };

  const breadcrumbItems = getBreadcrumbItems();

  if (breadcrumbItems?.length <= 1) {
    return null;
  }

  return (
    <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-6">
      {breadcrumbItems?.map((item, index) => (
        <React.Fragment key={item?.path}>
          {index > 0 && (
            <Icon name="ChevronRight" size={14} className="text-muted-foreground/60" />
          )}
          {index === breadcrumbItems?.length - 1 ? (
            <span className="text-foreground font-medium">{item?.label}</span>
          ) : (
            <Link
              to={item?.path}
              className="hover:text-foreground transition-colors duration-200"
            >
              {item?.label}
            </Link>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default Breadcrumb;