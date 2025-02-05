"use client";
import {Input, InputProps} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Textarea} from "@/components/ui/textarea";
import {cn} from "@/lib/utils";
import React, {useState, ChangeEvent} from "react";

type FormFieldProps<T> = {
  id: string;
  label?: string;
  children?: React.ReactNode;
  placeholder?: string;
  maxLength?: number;
  formElement?: typeof Input | typeof Textarea;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
} & T;
export function FormContainer({children, className}: {children?: React.ReactNode; className?: string}) {
  return <div className={cn("col-span-2 flex flex-col rounded-lg border bg-white p-4", className)}>{children}</div>;
}
export function FormInputFieldWithCounter<T = InputProps>({
  id,
  label,
  children,
  placeholder,
  maxLength,
  value = "",
  formElement: FormElement = Input,
  ...props
}: FormFieldProps<T>) {
  const [textLength, setTextLength] = useState(value.length);
  const {onChange, ...rest} = props;
  return (
    <FormField htmlFor={id} label={label}>
      <FormElement
        maxLength={maxLength}
        id={id}
        placeholder={placeholder}
        defaultValue={value}
        onChange={(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
          setTextLength(e.target.value.length);
          if (onChange) onChange(e);
        }}
        {...rest}
      />
      {children}
      {maxLength && (
        <p className="text-muted-foreground text-right text-sm">
          {textLength}/{maxLength}
        </p>
      )}
    </FormField>
  );
}

export function FormField({children, label, htmlFor}: {children: React.ReactNode; label?: string; htmlFor: string}) {
  return (
    <div className="flex flex-col gap-2">
      {label && <Label htmlFor={htmlFor}>{label}</Label>}
      {children}
    </div>
  );
}
