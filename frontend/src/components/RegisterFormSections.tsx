import React from 'react';
import {
  Box,
  Typography,
  TextField,
  MenuItem,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  Alert,
} from '@mui/material';
import { useI18n } from '../i18n';

// Types
export interface FormData {
  province: string;
  department: string;
  eventType: string;
  typeOfSport: string;
  selectedSport: string;
  position: string;
  firstName: string;
  lastName: string;
  nationalID: string;
  phone: string;
  dob: string;
  photoUpload: File | null;
}

export type FormErrors = Partial<Record<keyof FormData, string>> & {
  photoUpload?: string;
};

export type OnFieldChange = (field: keyof FormData, value: any) => void;

// Options/Constants
export const provinces = [
  'Phnom Penh', 'Banteay Meanchey', 'Battambang', 'Kampong Cham', 'Kampong Chhnang',
  'Kampong Speu', 'Kampong Thom', 'Kampot', 'Kandal', 'Kep', 'Koh Kong', 'Kratie',
  'Mondulkiri', 'Oddar Meanchey', 'Pailin', 'Preah Vihear', 'Prey Veng', 'Pursat',
  'Ratanakiri', 'Siem Reap', 'Preah Sihanouk', 'Stung Treng', 'Svay Rieng', 'Takeo',
  'Tbong Khmum'
];

export const departments = ['Department 1', 'Department 2', 'Department 3'];
export const eventTypes = ['Event Type 1', 'Event Type 2', 'Event Type 3'];

export const sportCategories = [
  'Traditional Cambodian Sports & Games',
  'Ball Games',
  'Martial Arts & Combat Sports',
  'Athletics & Outdoor Sports',
  'Indoor & Recreational Sports',
] as const;

export const sportsByCategory: Record<string, string[]> = {
  'Traditional Cambodian Sports & Games': ['Bokator', 'Pradal Serey', 'Chol Chhoung', 'Teanh Prot'],
  'Ball Games': ['Football', 'Volleyball', 'Basketball', 'Sepak Takraw'],
  'Martial Arts & Combat Sports': ['Karate', 'Taekwondo', 'Boxing', 'Judo'],
  'Athletics & Outdoor Sports': ['Running', 'Cycling', 'Swimming', 'Archery'],
  'Indoor & Recreational Sports': ['Table Tennis', 'Badminton', 'Chess', 'E-sports'],
};

// Validation helpers Regex patterns
const phoneRegex = /^\+?[0-9\s\-()]{7,15}$/;
const numericRegex = /^[0-9]+$/;

export function validateForm(
  data: FormData,
  t: (key: string, fallback?: string) => string,
): FormErrors {
  const errors: FormErrors = {};

  // Required text fields
  if (!data.province) errors.province = t('errors.province.required', 'Please select your province.');
  if (!data.department) errors.department = t('errors.department.required', 'Please select your department.');
  if (!data.eventType) errors.eventType = t('errors.eventType.required', 'Please select the event type.');
  if (!data.firstName.trim()) errors.firstName = t('errors.firstName.required', 'First name is required.');
  if (!data.lastName.trim()) errors.lastName = t('errors.lastName.required', 'Last name is required.');
  if (!data.position) errors.position = t('errors.position.required', 'Please choose your position level.');

  // National ID: numeric, reasonable length
  if (!data.nationalID.trim()) {
    errors.nationalID = t('errors.nationalID.required', 'National ID is required.');
  } else if (!numericRegex.test(data.nationalID)) {
    errors.nationalID = t('errors.nationalID.digits', 'National ID should contain digits only.');
  } else if (data.nationalID.length < 6 || data.nationalID.length > 20) {
    errors.nationalID = t('errors.nationalID.length', 'National ID must be between 6 and 20 digits.');
  }

  // Phone
  if (!data.phone.trim()) {
    errors.phone = t('errors.phone.required', 'Phone number is required.');
  } else if (!phoneRegex.test(data.phone)) {
    errors.phone = t('errors.phone.invalid', 'Enter a valid phone number (7–15 digits).');
  }

  // DOB not empty and not in the future
  if (!data.dob) {
    errors.dob = t('errors.dob.required', 'Date of birth is required.');
  } else {
    const today = new Date();
    const dobDate = new Date(data.dob);
    if (isNaN(dobDate.getTime())) {
      errors.dob = t('errors.dob.invalid', 'Enter a valid date.');
    } else if (dobDate > today) {
      errors.dob = t('errors.dob.future', 'Date of birth cannot be in the future.');
    }
  }

  // Sports selection
  if (!data.typeOfSport) errors.typeOfSport = t('errors.typeOfSport.required', 'Please select a sport category.');
  if (!data.selectedSport) {
    errors.selectedSport = t('errors.selectedSport.required', 'Please select a sport.');
  } else if (
    data.typeOfSport &&
    !sportsByCategory[data.typeOfSport]?.includes(data.selectedSport)
  ) {
    errors.selectedSport = t('errors.selectedSport.mismatch', 'Selected sport does not match the chosen category.');
  }

  // Photo upload: optional, but if present must be an image and <= 2MB
  if (data.photoUpload) {
    const file = data.photoUpload;
    const isImage = file.type.startsWith('image/');
    const maxSize = 2 * 1024 * 1024; // 2MB
    if (!isImage) {
      errors.photoUpload = t('upload.errors.type', 'Only image files are allowed (JPG, PNG, etc.).');
    } else if (file.size > maxSize) {
      errors.photoUpload = t('upload.errors.size', 'Image must be 2MB or smaller.');
    }
  }

  return errors;
}

// Shared styles tuned for readability and accessibility
const fieldSx = {
  '& .MuiInputBase-root': {
    fontSize: '1.1rem',
    minHeight: 56,
  },
  '& .MuiInputLabel-root': {
    fontSize: '1.05rem',
  },
};

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
  errors: FormErrors;x
}) {
  const { t, optLabel } = useI18n();
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
        <Box>
          <TextField
            select
            label={t('location.province.label', 'Province')}
            name="province"
            value={data.province}
            onChange={(e) => onChange('province', e.target.value)}
            fullWidth
            required
            error={!!errors.province}
            helperText={errors.province}
            sx={fieldSx}
          >
            {provinces.map((prov) => (
              <MenuItem key={prov} value={prov}>
                {optLabel('provinces', prov)}
              </MenuItem>
            ))}
          </TextField>
        </Box>
        <Box>
          <TextField
            select
            label={t('location.department.label', 'Department')}
            name="department"
            value={data.department}
            onChange={(e) => onChange('department', e.target.value)}
            fullWidth
            required
            error={!!errors.department}
            helperText={errors.department}
            sx={fieldSx}
          >
            {departments.map((dept) => (
              <MenuItem key={dept} value={dept}>
                {optLabel('departments', dept)}
              </MenuItem>
            ))}
          </TextField>
        </Box>
        <Box>
          <TextField
            select
            label={t('location.eventType.label', 'Type of Event')}
            name="eventType"
            value={data.eventType}
            onChange={(e) => onChange('eventType', e.target.value)}
            fullWidth
            required
            error={!!errors.eventType}
            helperText={errors.eventType}
            sx={fieldSx}
          >
            {eventTypes.map((evt) => (
              <MenuItem key={evt} value={evt}>
                {optLabel('eventTypes', evt)}
              </MenuItem>
            ))}
          </TextField>
        </Box>
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
  const handleCategoryChange = (value: string) => {
    const firstSport = sportsByCategory[value]?.[0] || '';
    onChange('typeOfSport', value);
    onChange('selectedSport', firstSport);
  };

  return (
    <Box mt={3}>
      <Typography variant="h6" fontWeight={700} mb={1}>
        {t('sport.selector.title', 'Sport Category')}
      </Typography>
      <Typography variant="body1" color="text.secondary" mb={2}>
        {t('sport.selector.subtitle', 'Choose a category, then pick a specific sport.')}
      </Typography>
      <FormControl component="fieldset">
        <FormLabel component="legend" sx={{ mb: 1 }}>
          {t('sport.selector.legend', 'Type of Sport')}
        </FormLabel>
        <RadioGroup
          name="typeOfSport"
          value={data.typeOfSport}
          onChange={(e) => handleCategoryChange(e.target.value)}
        >
          {sportCategories.map((sport) => (
            <FormControlLabel
              key={sport}
              value={sport}
              control={<Radio />}
              label={<Typography sx={{ fontSize: '1.05rem' }}>{optLabel('sportCategories', sport)}</Typography>}
            />)
          )}
        </RadioGroup>
        {errors.typeOfSport && (
          <Typography mt={0.5} color="error">{errors.typeOfSport}</Typography>
        )}
      </FormControl>
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
  const options = sportsByCategory[data.typeOfSport] || [];
  return (
    <Box mt={2}>
      <TextField
        select
        label={t('sport.select.label', 'Select Sport')}
        name="selectedSport"
        value={data.selectedSport || ''}
        onChange={(e) => onChange('selectedSport', e.target.value)}
        fullWidth
        required
        error={!!errors.selectedSport}
        helperText={errors.selectedSport}
        sx={fieldSx}
      >
        {options.map((sport) => (
          <MenuItem key={sport} value={sport}>
            {optLabel('sports', sport)}
          </MenuItem>
        ))}
      </TextField>
    </Box>
  );
}

export function PersonalInfoFields({
  data,
  onChange,
  errors,
}: {
  data: FormData;
  onChange: OnFieldChange;
  errors: FormErrors;
}) {
  const { t } = useI18n();
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
        <Box>
          <TextField
            label={t('fields.firstName', 'First Name')}
            name="firstName"
            value={data.firstName}
            onChange={(e) => onChange('firstName', e.target.value)}
            fullWidth
            required
            error={!!errors.firstName}
            helperText={errors.firstName}
            sx={fieldSx}
          />
        </Box>
        <Box>
          <TextField
            label={t('fields.lastName', 'Last Name')}
            name="lastName"
            value={data.lastName}
            onChange={(e) => onChange('lastName', e.target.value)}
            fullWidth
            required
            error={!!errors.lastName}
            helperText={errors.lastName}
            sx={fieldSx}
          />
        </Box>
        <Box>
          <TextField
            select
            label={t('fields.position', 'Position')}
            name="position"
            value={data.position}
            onChange={(e) => onChange('position', e.target.value)}
            fullWidth
            required
            error={!!errors.position}
            helperText={errors.position}
            sx={fieldSx}
          >
            <MenuItem value="beginner">{t('positions.beginner', 'Beginner')}</MenuItem>
            <MenuItem value="intermediate">{t('positions.intermediate', 'Intermediate')}</MenuItem>
            <MenuItem value="advanced">{t('positions.advanced', 'Advanced')}</MenuItem>
            <MenuItem value="expert">{t('positions.expert', 'Expert')}</MenuItem>
          </TextField>
        </Box>
        <Box>
          <TextField
            label={t('fields.nationalID', 'National ID')}
            name="nationalID"
            value={data.nationalID}
            onChange={(e) => onChange('nationalID', e.target.value)}
            fullWidth
            required
            error={!!errors.nationalID}
            helperText={errors.nationalID}
            sx={fieldSx}
          />
        </Box>
        <Box>
          <TextField
            label={t('fields.dob', 'Date of Birth')}
            type="date"
            name="dob"
            value={data.dob}
            onChange={(e) => onChange('dob', e.target.value)}
            fullWidth
            required
            error={!!errors.dob}
            helperText={errors.dob}
            InputLabelProps={{ shrink: true }}
            sx={fieldSx}
          />
        </Box>
        <Box>
          <TextField
            label={t('fields.phone', 'Phone Number')}
            name="phone"
            value={data.phone}
            onChange={(e) => onChange('phone', e.target.value)}
            fullWidth
            required
            error={!!errors.phone}
            helperText={errors.phone}
            sx={fieldSx}
          />
        </Box>
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
