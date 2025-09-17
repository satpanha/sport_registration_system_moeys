//registerFormSections.tsx
import React from 'react';
import {
  Box,
  Typography,
  FormControlLabel,
  Checkbox,
  Button,
  Alert,
} from '@mui/material';
import { useI18n } from '../hooks/useI18n';
import { provinces, departments, eventTypes, sportCategories, sportsByCategory} from '../constants/formData';
import FormField from './FormField';
import type { FormData, FormErrors, OnFieldChange } from '../types/FormData';

// Components
export function ErrorSummary({ errors }: { errors: FormErrors }) {
  const { t } = useI18n();
  const errorMessages = Object.values(errors).filter(Boolean) as string[];
  if (!errorMessages.length) return null;
  return (
    <Box mb={2}>
      <Alert severity="error" sx={{ fontSize: '1rem' }}>
        {t('errorSummary.prefix', 'Please review the following:')} {errorMessages.join(' ')}
      </Alert>
    </Box>
  );
}

export function LocationFields({
  data,
  onChange,
  errors,
}: {
  data: FormData;
  onChange: OnFieldChange;
  errors: FormErrors;
}) {
  const { t, optLabel } = useI18n();

  const provinceOptions = [
    { value: '', label: t('location.province.none', 'None') },
    ...provinces.map((prov) => ({ value: prov, label: optLabel('provinces', prov) })),
  ];

  const departmentOptions = [
    { value: '', label: t('location.department.none', 'None') },
    ...departments.map((dept) => ({ value: dept, label: optLabel('departments', dept) })),
  ];

  const eventTypeOptions = eventTypes.map((evt) => ({
    value: evt,
    label: optLabel('eventTypes', evt),
  }));

  return (
    <Box>
      <Typography variant="h6" fontWeight={700} mb={1}>
        {t('location.title', 'Location & Event')}
      </Typography>
      <Typography variant="body1" color="text.secondary" mb={2}>
        {t('location.subtitle', 'Select your location and the event you are registering for.')}
      </Typography>

      <Box
        display="grid"
        gap={2}
        sx={{
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(3, 1fr)',
          },
        }}
      >
        <FormField
          select
          label={t('location.province.label', 'Province')}
          name="province"
          value={data.province}
          disabled={!!data.department}
          onChange={(e) => {
            onChange('province', e.target.value);
            if (e.target.value) onChange('department', null);
          }}
          error={errors.province}
          options={provinceOptions}
          required
        />
        <FormField
          select
          label={t('location.department.label', 'Department')}
          name="department"
          value={data.department}
          disabled={!!data.province}
          onChange={(e) => {
            onChange('department', e.target.value);
            if (e.target.value) onChange('province', null);
          }}
          error={errors.department}
          options={departmentOptions}
          required
        />
        <FormField
          select
          label={t('location.eventType.label', 'Type of Event')}
          name="eventType"
          value={data.eventType}
          onChange={(e) => onChange('eventType', e.target.value)}
          error={errors.eventType}
          options={eventTypeOptions}
          required
        />
      </Box>
    </Box>
  );
}

export function SportTypeSelector({
  data,
  onChange,
  errors,
}: {
  data: FormData;
  onChange: OnFieldChange;
  errors: FormErrors;
}) {
  const { t, optLabel } = useI18n();

  // handle selecting a category
  const handleCategoryChange = (category: string | null) => {
    onChange('typeOfSport', category);
    const firstSport = category && sportsByCategory[category] && sportsByCategory[category].length > 0
      ? sportsByCategory[category][0]
      : null;
    onChange('selectedSport', firstSport);
    if (firstSport === null ) {
      onChange('selectedSport', null);
    }
  };

  return (
    <Box mt={3}>
      <Typography variant="h6" fontWeight={700} mb={1}>
        {t('sport.selector.title', 'Sport Category')}
      </Typography>

      {/* Category Selection */}
      <Typography variant="body1" color="text.secondary" mb={1}>
        {t('sport.selector.subtitle', 'Select a sport category')}
      </Typography>
      <Box
        display="grid"
        gap={2}
        sx={{ gridTemplateColumns: { xs: '1fr', sm: 'repeat(5, 1fr)' }}} // 5 columns
      >
        {sportCategories.map((cat) => (
          <FormControlLabel
            key={cat}
            control={
              <Checkbox
                checked={data.typeOfSport === cat}
                onChange={() =>
                  handleCategoryChange(data.typeOfSport === cat ? null : cat)
                }
              />
            }
            label={optLabel('sportCategories', cat)}
          />
        ))}
      </Box>
      {errors.typeOfSport && (
        <Typography mt={0.5} color="error">
          {errors.typeOfSport}
        </Typography>
      )}
    </Box>
  );
}

export function SportSelect({
  data,
  onChange,
  errors,
}: {
  data: FormData;
  onChange: OnFieldChange;
  errors: FormErrors;
}) {
  const { t, optLabel } = useI18n();
  const sportOptions = (data.typeOfSport ? sportsByCategory[data.typeOfSport] ?? [] : []).map(
    (sport) => ({ value: sport, label: optLabel('sports', sport) })
  );

  return (
    <Box mt={2}>
      <FormField
        select
        label={t('sport.select.label', 'Select Sport')}
        name="selectedSport"
        value={data.selectedSport ?? ''}
        onChange={(e) => onChange('selectedSport', e.target.value)}
        error={errors.selectedSport}
        options={[
          { value: '', label: t('sport.select.placeholder', 'Select a sport') },
          ...sportOptions,
        ]}
        required
      />
    </Box>
  );
}

export function PersonalInfoFields({
  data,
  onChange,
  errors,
  registrationType,
}: {
  data: FormData;
  onChange: OnFieldChange;
  errors: FormErrors;
  registrationType?: 'leader' | 'player';
}) {
  const { t } = useI18n();
  
  const isPlayerRegistration = registrationType === 'player';
  
  const positionOptions = isPlayerRegistration
    ? [{ value: 'player', label: t('positions.player', 'Player') }]
    : [
        { value: 'beginner', label: t('positions.beginner', 'Beginner') },
        { value: 'intermediate', label: t('positions.intermediate', 'Intermediate') },
        { value: 'advanced', label: t('positions.advanced', 'Advanced') },
        { value: 'expert', label: t('positions.expert', 'Expert') },
        { value: 'coach', label: t('positions.coach', 'Coach') },
        { value: 'leader', label: t('positions.leader', 'Leader') },
      ];

  return (
    <Box mt={3}>
      <Typography variant="h6" fontWeight={700} mb={1}>
        {t('personal.title', 'Personal Information')}
      </Typography>
      <Typography variant="body1" color="text.secondary" mb={2}>
        {t('personal.subtitle', 'Please enter your details. All fields are required.')}
      </Typography>

      <Box
        display="grid"
        gap={2}
        sx={{
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(3, 1fr)',
          },
        }}
      >
        <FormField
          name="firstName"
          label={t('fields.firstName', 'First Name')}
          value={data.firstName}
          onChange={(e) => onChange('firstName', e.target.value)}
          error={errors.firstName}
          required
        />
        <FormField
          name="lastName"
          label={t('fields.lastName', 'Last Name')}
          value={data.lastName}
          onChange={(e) => onChange('lastName', e.target.value)}
          error={errors.lastName}
          required
        />
        <FormField
          name="position"
          label={t('fields.position', 'Position')}
          value={data.position}
          onChange={(e) => onChange('position', e.target.value)}
          error={errors.position}
          helperText={
            isPlayerRegistration
              ? t('positions.playerFixed', 'Fixed as Player')
              : errors.position
          }
          select
          options={positionOptions}
          disabled={isPlayerRegistration}
          required
        />
        <FormField
          name="nationalID"
          label={t('fields.nationalID', 'National ID')}
          value={data.nationalID}
          onChange={(e) => onChange('nationalID', e.target.value)}
          error={errors.nationalID}
          required
        />
        <FormField
          name="dob"
          label={t('fields.dob', 'Date of Birth')}
          value={data.dob}
          onChange={(e) => onChange('dob', e.target.value)} 
          error={errors.dob}
          type="date"
          required
        />
        <FormField
          name="phone"
          label={t('fields.phone', 'Phone Number')}
          value={data.phone}
          onChange={(e) => onChange('phone', e.target.value)}
          error={errors.phone}
          required
        />
      </Box>
    </Box>
  );
}

export function PhotoUpload({
  file,
  onFileChange,
  error,
}: {
  file: File | null;
  onFileChange: (file: File | null) => void;
  error?: string;
}) {
  const { t } = useI18n();
  const [fileName, setFileName] = React.useState<string>('');

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] || null;
    setFileName(f ? f.name : '');
    onFileChange(f);
  };

  return (
    <Box mt={3}>
      <Typography variant="h6" fontWeight={700} mb={1}>
        {t('upload.title', 'Upload Photo (optional)')}
      </Typography>
      <Typography variant="body1" color="text.secondary" mb={2}>
        {t('upload.subtitle', 'Please upload a clear image. Maximum size: 2MB.')}
      </Typography>
      <Button
        variant="outlined"
        component="label"
        fullWidth
        sx={{ p: 2, justifyContent: 'flex-start' }}
      >
        {file ? file.name : fileName || t('upload.choose', 'Choose file...')}
        <input type="file" hidden accept="image/*" onChange={handleFile} />
      </Button>
      {error && (
        <Typography mt={1} color="error">
          {error}
        </Typography>
      )}
    </Box>
  );
}

export function SubmitActions({
  submitting,
  onReset,
}: {
  submitting?: boolean;
  onReset: () => void;
}) {
  const { t } = useI18n();
  return (
    <Box display="flex" gap={2} mt={3}>
      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        size="large"
        sx={{ py: 1.5, fontSize: '1.1rem', fontWeight: 700 }}
        disabled={!!submitting}
      >
        {submitting ? t('buttons.submitting', 'Submitting…') : t('buttons.submit', 'Register Now')}
      </Button>
      <Button
        type="button"
        variant="outlined"
        color="inherit"
        fullWidth
        size="large"
        sx={{ py: 1.5, fontSize: '1.1rem', fontWeight: 700 }}
        onClick={onReset}
      >
        {t('buttons.reset', 'Reset')}
      </Button>
    </Box>
  );
}
