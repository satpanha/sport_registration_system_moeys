//registerFormSections.tsx
import React from 'react';
// import {
//   FormControlLabel,
//   Checkbox,
// } from '@mui/material';
import {
  Box,
  Typography,
  Button,
  Alert,
  Paper,
} from './section/section';
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
          gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' },
        }}
      >
        <FormField
          select
          label={t('location.province.label', 'Province')}
          name="province"
          value={data.province}
          onChange={(e) => onChange('province', e.target.value)}
          error={errors.province}
          options={provinceOptions}
          required
        />
        <FormField
          select
          label={t('location.department.label', 'Department')}
          name="department"
          value={data.department}
          onChange={(e) => onChange('department', e.target.value)}
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

export function SportCategory({
  data,
  onChange,
  errors,
}: {
  data: FormData;
  onChange: OnFieldChange;
  errors: FormErrors;
}) {
  const { t, optLabel } = useI18n();

  const handleCategoryChange = (category: string) => {
    onChange('typeOfSport', category);
    onChange('selectedSport', null);
  };

  const sportOptions = (data.typeOfSport ? sportsByCategory[data.typeOfSport] ?? [] : []).map(
    (sport) => ({ value: sport, label: optLabel('sports', sport) })
  );

  return (
    <Box>
      <Typography variant="h6" fontWeight={700} mb={1}>
        {t('sport.selector.title', 'Sport Category')}
      </Typography>
      <Typography variant="body1" color="text.secondary" mb={2}>
        {t('sport.selector.subtitle', 'Choose a category, then pick a specific sport')}
      </Typography>

      <Box
        display="grid"
        gap={2}
        sx={{ gridTemplateColumns: { xs: '1fr', sm: 'repeat(5, 1fr)' } }}
      >
        {sportCategories.map((cat) => (
          <Paper
            key={cat}
            onClick={() => handleCategoryChange(cat)}
            sx={{
              p: 2,
              textAlign: 'center',
              border: `1px solid ${data.typeOfSport === cat ? '#4A7C59' : '#DDDDDD'}`,
              borderRadius: 2,
              cursor: 'pointer',
              transition: 'all 0.2s ease-in-out',
              '&:hover': {
                transform: 'scale(1.05)',
                boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
              },
            }}
          >
            <Typography variant="body2" fontWeight={600}>
              {optLabel('sportCategories', cat)}
            </Typography>
          </Paper>
        ))}
      </Box>
      {errors.typeOfSport && (
        <Typography mt={1} color="error">
          {errors.typeOfSport}
        </Typography>
      )}

      <Box mt={3}>
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
          disabled={!data.typeOfSport}
        />
      </Box>
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
    <Box>
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
          gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' },
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

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] || null;
    onFileChange(f);
  };

  return (
    <Box>
      <Typography variant="h6" fontWeight={700} mb={1}>
        {t('upload.title', 'Upload Photo')}
      </Typography>
      <Box
        sx={{
          border: '2px dashed #DDDDDD',
          borderRadius: 2,
          p: 4,
          textAlign: 'center',
          cursor: 'pointer',
          '&:hover': {
            borderColor: '#4A7C59',
          },
        }}
        component="label"
      >
        <input type="file" hidden accept="image/*" onChange={handleFile} />
        <Box sx={{ mb: 1 }}>
          <svg
            width="48"
            height="48"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M37 22.5V37C37 38.1046 36.1046 39 35 39H13C11.8954 39 11 38.1046 11 37V11C11 9.89543 11.8954 9 13 9H22.5"
              stroke="#4A7C59"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M30 9L39 18M30 18L39 9"
              stroke="#4A7C59"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M24 22.5V31.5M19.5 27H28.5"
              stroke="#4A7C59"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Box>
        <Typography variant="body1" color="text.secondary">
          {t('upload.dragAndDrop', 'Click to upload or drag and drop')}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {t('upload.fileSizeLimit', 'PNG, JPG up to 2MB')}
        </Typography>
        {file && (
          <Typography variant="body2" color="text.primary" mt={1}>
            {file.name}
          </Typography>
        )}
      </Box>
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
    <Box display="flex" gap={2} mt={4}>
      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        size="large"
        disabled={!!submitting}
      >
        {submitting ? t('buttons.submitting', 'Submitting…') : t('buttons.submit', 'Register Now')}
      </Button>
      <Button
        type="button"
        variant="outlined"
        fullWidth
        size="large"
        onClick={onReset}
      >
        {t('buttons.reset', 'Reset')}
      </Button>
    </Box>
  );
}
