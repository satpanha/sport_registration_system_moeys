//register.tsx
import React from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  Divider,
} from '@mui/material';

import {
  ErrorSummary,
  LocationFields,
  SportTypeSelector,
  SportSelect,
  PersonalInfoFields,
  PhotoUpload,
  SubmitActions,
} from '../components/sections/RegisterFormSections';

import type { FormData } from '../types/FormData';
import { useI18n } from '../hooks/useI18n';
import { useForm } from '../hooks/useForm';

interface RegisterProps {
  type: 'leader' | 'player';
}

const Register: React.FC<RegisterProps> = ({ type }) => {
  const { t } = useI18n();
  const initialPosition = type === 'player' ? 'player' : '';

  const initialFormData: FormData = {
    province: null,
    department: null,
    eventType: null,
    position: initialPosition,
    firstName: '',
    lastName: '',
    nationalID: '',
    phone: '',
    dob: '',
    photoUpload: null,
    typeOfSport: null,
    selectedSport: null,
    category: null, // reserved for future use
  };

  const {
    formData,
    errors,
    submitting,
    onFieldChange,
    onReset,
    handleSubmit,
  } = useForm({ initialFormData, registrationType: type });

  const getTitle = () => {
    if (type === 'player') {
      return t('registration.title.player');
    }
    return t('registration.title.coachLeader');
  };

  return (
    <Container maxWidth="md">
      <Paper
        elevation={6}
        sx={{
          p: { xs: 3, sm: 5 },
          borderRadius: 3,
          mt: { xs: 3, sm: 6 },
          background: 'linear-gradient(145deg, #fafafa, #ffffffff)',
        }}
      >
        <Box display="flex" justifyContent="center" alignItems="center" mb={2}>
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            textAlign="center"
            fontWeight={800}
            sx={{ mb: 0, letterSpacing: 0.3 }}
          >
            {getTitle()}
          </Typography>
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

          <PersonalInfoFields
            data={formData}
            onChange={onFieldChange}
            errors={errors}
            registrationType={type}
          />

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
