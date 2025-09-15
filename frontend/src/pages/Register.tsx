import React from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  Divider,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';

import {
  validateForm,
  sportCategories,
  sportsByCategory,
  ErrorSummary,
  LocationFields,
  SportTypeSelector,
  SportSelect,
  PersonalInfoFields,
  PhotoUpload,
  SubmitActions,
} from '../components/RegisterFormSections';

import type { FormData, FormErrors } from '../components/RegisterFormSections';
import { useI18n } from '../i18n';

const Register: React.FC = () => {
  const { t, lang, setLang } = useI18n();

  const initialCategory = sportCategories[0];
  const initialSport = sportsByCategory[initialCategory][0];

  const [formData, setFormData] = React.useState<FormData>({
    province: '',
    department: '',
    eventType: '',
    position: '',
    firstName: '',
    lastName: '',
    nationalID: '',
    phone: '',
    dob: '',
    photoUpload: null,
    typeOfSport: initialCategory,
    selectedSport: initialSport,
  });

  const [errors, setErrors] = React.useState<FormErrors>({});
  const [submitting, setSubmitting] = React.useState(false);

  const onFieldChange = (field: keyof FormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error as user edits
    setErrors((prev: FormErrors) => ({ ...prev, [field]: undefined }));
  };

  const onReset = () => {
    setFormData({
      province: '',
      department: '',
      eventType: '',
      position: '',
      firstName: '',
      lastName: '',
      nationalID: '',
      phone: '',
      dob: '',
      photoUpload: null,
      typeOfSport: initialCategory,
      selectedSport: initialSport,
    });
    setErrors({});
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const nextErrors = validateForm(formData, t);
    setErrors(nextErrors);

    const hasErrors = Object.values(nextErrors).some(Boolean);
    if (hasErrors) {
      // Focus the first error field by id if any
      const firstErrorKey = Object.keys(nextErrors).find((k) => nextErrors[k as keyof FormErrors]);
      if (firstErrorKey) {
        const el = document.querySelector(`[name="${firstErrorKey}"]`) as HTMLElement | null;
        if (el && typeof el.focus === 'function') el.focus();
      }
      return;
    }

    // Simulate submission
    setSubmitting(true);
    setTimeout(() => {
      console.log('Submitted form data:', formData);
      setSubmitting(false);
      alert(t('alerts.submitSuccess', 'Registration submitted successfully!'));
      onReset();
    }, 800);
  };

  return (
    <Container maxWidth="md">
      <Paper
        elevation={6}
        sx={{
          p: { xs: 3, sm: 5 },
          borderRadius: 3,
          mt: { xs: 3, sm: 6 },
          background: 'linear-gradient(145deg, #fafafa, #ffffff)',
        }}
      >
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            textAlign="center"
            fontWeight={800}
            sx={{ mb: 0, letterSpacing: 0.3 }}
          >
            {t('registration.title', 'Registration Form')}
          </Typography>

          <ToggleButtonGroup
            size="small"
            exclusive
            value={lang}
            onChange={(_e, v) => v && setLang(v)}
            aria-label="language"
          >
            <ToggleButton value="en" aria-label="English">EN</ToggleButton>
            <ToggleButton value="km" aria-label="Khmer">KH</ToggleButton>
          </ToggleButtonGroup>
        </Box>

        <Typography
          variant="body1"
          textAlign="center"
          color="text.secondary"
          sx={{ mb: 3, fontSize: '1.1rem' }}
        >
          {t('registration.subtitle', 'Please fill in the details below. Fields marked as required must be completed.')}
        </Typography>

        <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit}>
          <ErrorSummary errors={errors} />

          <LocationFields data={formData} onChange={onFieldChange} errors={errors} />

          <Divider sx={{ my: 3 }} />

          <SportTypeSelector data={formData} onChange={onFieldChange} errors={errors} />
          <SportSelect data={formData} onChange={onFieldChange} errors={errors} />

          <Divider sx={{ my: 3 }} />

          <PersonalInfoFields data={formData} onChange={onFieldChange} errors={errors} />

          <PhotoUpload
            file={formData.photoUpload}
            onFileChange={(file) => onFieldChange('photoUpload', file)}
            error={errors.photoUpload}
          />

          <SubmitActions submitting={submitting} onReset={onReset} />
        </Box>
      </Paper>
    </Container>
  );
};

export default Register;
