import React from 'react';
import { useI18n } from './useI18n';
import type { FormData, FormErrors } from '../types/FormData';
import { validateForm } from '../utils/validation';

interface UseFormProps {
  initialFormData: FormData;
  registrationType: 'leader' | 'player';
}

export const useForm = ({ initialFormData, registrationType }: UseFormProps) => {
  const { t } = useI18n();
  const [formData, setFormData] = React.useState<FormData>(initialFormData);
  const [errors, setErrors] = React.useState<FormErrors>({});
  const [submitting, setSubmitting] = React.useState(false);

  const onFieldChange = <K extends keyof FormData>(
    field: K,
    value: FormData[K]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev: FormErrors) => ({ ...prev, [field]: undefined }));
    console.log(`Field changed: ${field}, New value:`, value);
  };

  const onReset = () => {
    setFormData(initialFormData);
    setErrors({});
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const nextErrors = validateForm(formData, t, registrationType);
    console.log('Validation errors:', nextErrors);
    setErrors(nextErrors);

    const hasErrors = Object.values(nextErrors).some(Boolean);
    if (hasErrors) {
      const firstErrorKey = Object.keys(nextErrors).find((k) => nextErrors[k as keyof FormErrors]);
      if (firstErrorKey) {
        const el = document.querySelector(`[name="${firstErrorKey}"]`) as HTMLElement | null;
        if (el && typeof el.focus === 'function') el.focus();
      }
      return;
    }

    setSubmitting(true);
    setTimeout(() => {
      console.log('Submitted form data:', formData);
      setSubmitting(false);
      alert(t('alerts.submitSuccess'));
      onReset();
    }, 800);
  };

  return {
    formData,
    errors,
    submitting,
    onFieldChange,
    onReset,
    handleSubmit,
  };
};
