import React, { useState, useRef, useEffect } from 'react';
import Icon from '../AppIcon';

const Select = ({
  options = [],
  value,
  onChange,
  placeholder = "Select an option",
  label,
  description,
  error,
  required = false,
  disabled = false,
  loading = false,
  multiple = false,
  searchable = false,
  clearable = false,
  id,
  name,
  className = ""
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const selectRef = useRef(null);
  const searchInputRef = useRef(null);

  const filteredOptions = searchable && searchTerm
    ? options?.filter(option =>
        option?.label?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
        (option?.description && option?.description?.toLowerCase()?.includes(searchTerm?.toLowerCase()))
      )
    : options;

  const selectedOptions = multiple
    ? options?.filter(option => Array.isArray(value) && value?.includes(option?.value))
    : options?.find(option => option?.value === value);

  const displayValue = multiple
    ? (Array.isArray(value) && value?.length > 0
        ? `${value?.length} selected`
        : placeholder)
    : (selectedOptions?.label || placeholder);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef?.current && !selectRef?.current?.contains(event?.target)) {
        setIsOpen(false);
        setSearchTerm('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (isOpen && searchable && searchInputRef?.current) {
      searchInputRef?.current?.focus();
    }
  }, [isOpen, searchable]);

  const handleToggle = () => {
    if (!disabled && !loading) {
      setIsOpen(!isOpen);
      setSearchTerm('');
    }
  };

  const handleOptionClick = (optionValue) => {
    if (multiple) {
      const currentValues = Array.isArray(value) ? value : [];
      const newValues = currentValues?.includes(optionValue)
        ? currentValues?.filter(v => v !== optionValue)
        : [...currentValues, optionValue];
      onChange(newValues);
    } else {
      onChange(optionValue);
      setIsOpen(false);
    }
    setSearchTerm('');
  };

  const handleClear = (e) => {
    e?.stopPropagation();
    onChange(multiple ? [] : '');
  };

  const hasValue = multiple ? (Array.isArray(value) && value?.length > 0) : value;

  return (
    <div className={`relative ${className}`}>
      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-medium text-foreground mb-2"
        >
          {label}
          {required && <span className="text-destructive ml-1">*</span>}
        </label>
      )}
      <div ref={selectRef} className="relative">
        <button
          type="button"
          id={id}
          name={name}
          onClick={handleToggle}
          disabled={disabled || loading}
          className={`
            relative w-full bg-input border rounded-md px-3 py-2 text-left
            focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2
            transition-all duration-200
            ${disabled || loading
              ? 'cursor-not-allowed opacity-50 bg-muted' :'cursor-pointer hover:border-ring/50'
            }
            ${error
              ? 'border-destructive focus:ring-destructive/20' :'border-border'
            }
            ${isOpen ? 'ring-2 ring-ring/20' : ''}
          `}
        >
          <span className={`block truncate ${!hasValue ? 'text-muted-foreground' : 'text-foreground'}`}>
            {displayValue}
          </span>
          
          <span className="absolute inset-y-0 right-0 flex items-center pr-2 space-x-1">
            {loading && (
              <Icon name="Loader2" size={16} className="animate-spin text-muted-foreground" />
            )}
            {clearable && hasValue && !loading && !disabled && (
              <button
                type="button"
                onClick={handleClear}
                className="p-1 hover:bg-muted rounded transition-colors"
              >
                <Icon name="X" size={14} className="text-muted-foreground hover:text-foreground" />
              </button>
            )}
            <Icon
              name={isOpen ? "ChevronUp" : "ChevronDown"}
              size={16}
              className={`text-muted-foreground transition-transform duration-200 ${
                isOpen ? 'transform rotate-180' : ''
              }`}
            />
          </span>
        </button>

        {isOpen && (
          <div className="absolute z-50 w-full mt-1 bg-popover border border-border rounded-md shadow-lg max-h-60 overflow-hidden">
            {searchable && (
              <div className="p-2 border-b border-border">
                <div className="relative">
                  <Icon name="Search" size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                  <input
                    ref={searchInputRef}
                    type="text"
                    placeholder="Search options..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e?.target?.value)}
                    className="w-full pl-9 pr-3 py-2 text-sm bg-input border border-border rounded focus:outline-none focus:ring-2 focus:ring-ring/20"
                  />
                </div>
              </div>
            )}

            <div className="max-h-48 overflow-y-auto">
              {filteredOptions?.length === 0 ? (
                <div className="px-3 py-2 text-sm text-muted-foreground text-center">
                  {searchTerm ? 'No options found' : 'No options available'}
                </div>
              ) : (
                filteredOptions?.map((option) => {
                  const isSelected = multiple
                    ? Array.isArray(value) && value?.includes(option?.value)
                    : value === option?.value;

                  return (
                    <button
                      key={option?.value}
                      type="button"
                      onClick={() => handleOptionClick(option?.value)}
                      disabled={option?.disabled}
                      className={`
                        w-full text-left px-3 py-2 text-sm transition-colors
                        ${option?.disabled
                          ? 'cursor-not-allowed opacity-50' :'cursor-pointer hover:bg-muted'
                        }
                        ${isSelected
                          ? 'bg-primary/10 text-primary font-medium' :'text-foreground'
                        }
                      `}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="font-medium">{option?.label}</div>
                          {option?.description && (
                            <div className="text-xs text-muted-foreground mt-1">
                              {option?.description}
                            </div>
                          )}
                        </div>
                        {multiple && isSelected && (
                          <Icon name="Check" size={16} className="text-primary ml-2" />
                        )}
                      </div>
                    </button>
                  );
                })
              )}
            </div>
          </div>
        )}
      </div>
      {description && !error && (
        <p className="mt-1 text-xs text-muted-foreground">{description}</p>
      )}
      {error && (
        <p className="mt-1 text-xs text-destructive flex items-center">
          <Icon name="AlertCircle" size={12} className="mr-1" />
          {error}
        </p>
      )}
    </div>
  );
};

export default Select;