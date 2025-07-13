"use client";

import * as React from "react";
import { Check, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import Input from "@/components/custom-ui/input";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Label } from "@/components/ui/label";
import { useFormContext } from "react-hook-form";

export interface AutocompleteOption {
  label: string;
  value: string;
}

export interface AutocompleteProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  options: AutocompleteOption[];
  name?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  emptyText?: string;
  empty?: React.ReactNode;
  label?: string;
  error?: string;
  required?: boolean;
  className?: string;
  containerClassName?: string;
  disabled?: boolean;
}

const Autocomplete = React.forwardRef<HTMLInputElement, AutocompleteProps>(
  (
    {
      options,
      name,
      value: controlledValue,
      onValueChange,
      placeholder = "ค้นหา...",
      emptyText = "ไม่พบข้อมูล",
      empty,
      label,
      error,
      required,
      className,
      containerClassName,
      disabled,
      onChange,
      ...props
    },
    ref
  ) => {
    const [open, setOpen] = React.useState(false);
    const [searchQuery, setSearchQuery] = React.useState("");
    const inputRef = React.useRef<HTMLDivElement>(null);
    const formContext = useFormContext();

    // Handle form context value
    const value =
      formContext && name ? formContext.watch(name) : controlledValue;
    const fieldError =
      formContext && name
        ? (formContext.formState.errors[name]?.message as string)
        : error;

    // Update searchQuery when value changes
    React.useEffect(() => {
      if (value) {
        const selectedOption = options.find((opt) => opt.value === value);
        if (selectedOption) {
          setSearchQuery(selectedOption.label);
        }
      }
    }, [value, options]);

    // Handle click outside to close dropdown
    React.useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          inputRef.current &&
          !inputRef.current.contains(event.target as Node)
        ) {
          setOpen(false);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, []);

    const filteredOptions = React.useMemo(() => {
      if (!searchQuery) return options;
      return options.filter((option) =>
        option.label.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }, [options, searchQuery]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setSearchQuery(newValue);
      setOpen(true);

      // Handle form context
      if (formContext && name) {
        formContext.setValue(name, "");
      }

      // Handle controlled component
      if (onChange) {
        onChange(e);
      }
      if (onValueChange) {
        onValueChange("");
      }
    };

    const handleSelect = (selectedValue: string) => {
      const selectedOption = options.find((opt) => opt.value === selectedValue);
      if (selectedOption) {
        setSearchQuery(selectedOption.label);

        // Handle form context
        if (formContext && name) {
          formContext.setValue(name, selectedOption.value, {
            shouldValidate: true,
          });
        }

        // Handle controlled component
        if (onValueChange) {
          onValueChange(selectedOption.value);
        }
      }
      setOpen(false);
    };

    return (
      <div className={cn("w-full flex flex-col gap-2", containerClassName)}>
        <div className="relative" ref={inputRef}>
          <Input
            ref={ref}
            label={label}
            type="text"
            role="combobox"
            aria-expanded={open}
            aria-autocomplete="list"
            value={searchQuery}
            onChange={handleInputChange}
            onFocus={() => setOpen(true)}
            placeholder={placeholder}
            disabled={disabled}
            startIcon={<Search className="text-gray-500" />}
            {...props}
          />

          {open && (
            <div className="absolute z-50 w-full mt-1">
              <Command
                shouldFilter={false}
                className="rounded-lg border shadow-md bg-white"
              >
                <CommandList>
                  <CommandEmpty>{empty}</CommandEmpty>
                  <CommandGroup className="max-h-[200px] overflow-auto">
                    {filteredOptions.map((option, index) => (
                      <CommandItem
                        key={`${option.value}-${index}`}
                        value={option.value}
                        onSelect={handleSelect}
                        className="cursor-pointer hover:bg-gray-100"
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            value === option.value ? "opacity-100" : "opacity-0"
                          )}
                        />
                        {option.label}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </div>
          )}
        </div>

        {fieldError && (
          <p className="mt-2 text-sm text-red-500">{fieldError}</p>
        )}
      </div>
    );
  }
);

Autocomplete.displayName = "Autocomplete";

export default Autocomplete;
