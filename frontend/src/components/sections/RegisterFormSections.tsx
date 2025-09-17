// registerFormSections.tsx
import { Box } from '@mui/material';
import { useI18n } from '../../hooks/useI18n';
import { provinces, departments, eventTypes, sportCategories, sportsByCategory } from '../../constants/formData';
import FormField from '../FormField';
import type { FormData, FormErrors, OnFieldChange } from '../../types/FormData';
import {
  BoxLayout,
  SectionTitle,
  SectionSubtitle,
  FormSectionBox,
  ErrorAlert,
  LabeledCheckbox,
  AppButton,
  ErrorText,
  FileUploadButton,
} from './sections';

/**
 * Displays all form errors in a red alert box.
 * @param {FormErrors} errors - Object containing error messages keyed by field name.
 * @returns Error alert JSX or null if no errors.
 */
export function ErrorSummary({ errors }: { errors: FormErrors }) {
  const { t } = useI18n();
  const errorMessages = Object.values(errors).filter(Boolean) as string[];
  if (!errorMessages.length) return null;

  return (
    <ErrorAlert>
      {t('errorSummary.prefix', 'Please review the following:')} {errorMessages.join(' ')}
    </ErrorAlert>
  );
}

/**
 * Select location (province & department) and event type.
 * @param {FormData} data - Current form data.
 * @param {OnFieldChange} onChange - Callback to update field values.
 * @param {FormErrors} errors - Validation errors for each field.
 * @returns Location selection JSX.
 */
export function LocationFields({ data, onChange, errors }: { data: FormData; onChange: OnFieldChange; errors: FormErrors }) {
  const { t, optLabel } = useI18n();

  const provinceOptions = [{ value: '', label: t('location.province.none', 'None') }, ...provinces.map(p => ({ value: p, label: optLabel('provinces', p) }))];
  const departmentOptions = [{ value: '', label: t('location.department.none', 'None') }, ...departments.map(d => ({ value: d, label: optLabel('departments', d) }))];
  const eventTypeOptions = eventTypes.map(evt => ({ value: evt, label: optLabel('eventTypes', evt) }));

  return (
    <FormSectionBox>
      <SectionTitle>{t('location.title', 'Location & Event')}</SectionTitle>
      <SectionSubtitle>{t('location.subtitle', 'Select your location and the event you are registering for.')}</SectionSubtitle>
      <BoxLayout>
        <FormField
          select
          label={t('location.province.label', 'Province')}
          name="province"
          value={data.province}
          disabled={!!data.department}
          onChange={e => {
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
          onChange={e => {
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
          onChange={e => onChange('eventType', e.target.value)}
          error={errors.eventType}
          options={eventTypeOptions}
          required
        />
      </BoxLayout>
    </FormSectionBox>
  );
}

/**
 * Allows selecting a sport category.
 * @param {FormData} data - Current form data.
 * @param {OnFieldChange} onChange - Callback to update field values.
 * @param {FormErrors} errors - Validation errors for sport category.
 * @returns Checkbox list of sport categories.
 */
export function SportTypeSelector({ data, onChange, errors }: { data: FormData; onChange: OnFieldChange; errors: FormErrors }) {
  const { t, optLabel } = useI18n();

  const handleCategoryChange = (category: string | null) => {
    onChange('typeOfSport', category);
    const firstSport = category && sportsByCategory[category]?.length > 0 ? sportsByCategory[category][0] : null;
    onChange('selectedSport', firstSport);
  };

  return (
    <FormSectionBox>
      <SectionTitle>{t('sport.selector.title', 'Sport Category')}</SectionTitle>
      <SectionSubtitle>{t('sport.selector.subtitle', 'Select a sport category')}</SectionSubtitle>
      <Box
        display="grid"
        gap={2}
        sx={{
          gridTemplateColumns: { xs: '1fr', sm: 'repeat(5, 1fr)' }
        }}
      >
        {sportCategories.map(cat => (
          <LabeledCheckbox
            key={cat}
            label={optLabel('sportCategories', cat)}
            checked={data.typeOfSport === cat}
            onChange={() => handleCategoryChange(data.typeOfSport === cat ? null : cat)}
          />
        ))}
      </Box>
      <ErrorText text={errors.typeOfSport} />
    </FormSectionBox>
  );
}

/**
 * Select a specific sport after choosing a category.
 * @param {FormData} data - Current form data.
 * @param {OnFieldChange} onChange - Callback to update selected sport.
 * @param {FormErrors} errors - Validation errors for selected sport.
 */
export function SportSelect({ data, onChange, errors }: { data: FormData; onChange: OnFieldChange; errors: FormErrors }) {
  const { t, optLabel } = useI18n();
  const sportOptions = (data.typeOfSport ? sportsByCategory[data.typeOfSport] ?? [] : []).map(s => ({ value: s, label: optLabel('sports', s) }));

  return (
    <FormSectionBox>
      <FormField
        select
        label={t('sport.select.label', 'Select Sport')}
        name="selectedSport"
        value={data.selectedSport ?? ''}
        onChange={e => onChange('selectedSport', e.target.value)}
        error={errors.selectedSport}
        options={[{ value: '', label: t('sport.select.placeholder', 'Select a sport') }, ...sportOptions]}
        required
      />
    </FormSectionBox>
  );
}

/**
 * Capture personal details (name, position, national ID, DOB, phone).
 * @param {FormData} data - Current form data.
 * @param {OnFieldChange} onChange - Callback to update field values.
 * @param {FormErrors} errors - Validation errors for each field.
 * @param {'leader' | 'player'} registrationType - Type of registration affecting available options.
 */
export function PersonalInfoFields({ data, onChange, errors, registrationType }: { data: FormData; onChange: OnFieldChange; errors: FormErrors; registrationType?: 'leader' | 'player' }) {
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
    <FormSectionBox>
      <SectionTitle>{t('personal.title', 'Personal Information')}</SectionTitle>
      <SectionSubtitle>{t('personal.subtitle', 'Please enter your details. All fields are required.')}</SectionSubtitle>
      <BoxLayout>
        <FormField name="firstName" label={t('fields.firstName', 'First Name')} value={data.firstName} onChange={e => onChange('firstName', e.target.value)} error={errors.firstName} required />
        <FormField name="lastName" label={t('fields.lastName', 'Last Name')} value={data.lastName} onChange={e => onChange('lastName', e.target.value)} error={errors.lastName} required />
        <FormField
          name="position"
          label={t('fields.position', 'Position')}
          value={data.position}
          onChange={e => onChange('position', e.target.value)}
          error={errors.position}
          helperText={isPlayerRegistration ? t('positions.playerFixed', 'Fixed as Player') : errors.position}
          select
          options={positionOptions}
          disabled={isPlayerRegistration}
          required
        />
        <FormField name="nationalID" label={t('fields.nationalID', 'National ID')} value={data.nationalID} onChange={e => onChange('nationalID', e.target.value)} error={errors.nationalID} required />
        <FormField name="dob" label={t('fields.dob', 'Date of Birth')} value={data.dob} onChange={e => onChange('dob', e.target.value)} error={errors.dob} type="date" required />
        <FormField name="phone" label={t('fields.phone', 'Phone Number')} value={data.phone} onChange={e => onChange('phone', e.target.value)} error={errors.phone} required />
      </BoxLayout>
    </FormSectionBox>
  );
}

/**
 * Upload a photo file (optional).
 * @param {File | null} file - Current selected file.
 * @param {(file: File | null) => void} onFileChange - Callback when file changes.
 * @param {string} error - Validation error message.
 */
export function PhotoUpload({ file, onFileChange, error }: { file: File | null; onFileChange: (file: File | null) => void; error?: string }) {
  const { t } = useI18n();

  return (
    <FormSectionBox>
      <SectionTitle>{t('upload.title', 'Upload Photo (optional)')}</SectionTitle>
      <SectionSubtitle>{t('upload.subtitle', 'Please upload a clear image. Maximum size: 2MB.')}</SectionSubtitle>
      <FileUploadButton file={file} onFileChange={onFileChange} placeholder={t('upload.choose', 'Choose file...')} />
      <ErrorText text={error} />
    </FormSectionBox>
  );
}

/**
 * Primary submit button and secondary reset button.
 * @param {boolean} submitting - Whether the form is currently submitting.
 * @param {() => void} onReset - Reset callback function.
 */
export function SubmitActions({ submitting, onReset }: { submitting?: boolean; onReset: () => void }) {
  const { t } = useI18n();

  return (
    <Box display="flex" gap={2} mt={3}>
      <AppButton type="submit" variantType="primary" disabled={!!submitting}>
        {submitting ? t('buttons.submitting', 'Submitting…') : t('buttons.submit', 'Register Now')}
      </AppButton>
      <AppButton type="button" variantType="secondary" onClick={onReset}>
        {t('buttons.reset', 'Reset')}
      </AppButton>
    </Box>
  );
}
