/* eslint-disable @typescript-eslint/no-explicit-any */
// // import React from 'react';
// import {
//   Container,
//   Paper,
//   Typography,
//   Box,
//   Divider,
//   Stepper,
//   Step,
//   StepLabel,
// } from '../components/section/section';

// import { ErrorSummary, LocationFields, PersonalInfoFields, PhotoUpload, SportCategory } from '../components/RegisterFormSections';

// // ... (imports)

// // ... (component definition)

//         <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit}>
//           <ErrorSummary errors={Error} />

//           <LocationFields data={FormData} onChange={onFieldChange} errors={Error} />

//           <Divider sx={{ my: 4 }} />

//           <SportCategory data={FormData} onChange={onFieldChange} errors={Error} />

//           <Divider sx={{ my: 4 }} />

//           <PersonalInfoFields
//             data={FormData}
//             onChange={onFieldChange}
//             errors={Error}
//             registrationType={type}
//           />

//           <Divider sx={{ my: 4 }} />

//           <PhotoUpload
//             file={formData.photoUpload}
//             onFileChange={(file) => onFieldChange('photoUpload', file)}
//             error={errors.photoUpload}
//           />

//           <SubmitActions submitting={submitting} onReset={onReset} />
//         </Box>

// // ... (rest of the component)      </Paper>
//     // </Container>
//   );
// };

// export default Register;
// function handleSubmit(event: FormEvent<HTMLDivElement>): void {
//   throw new Error('Function not implemented.');
// }

// function onFieldChange<K extends keyof FormData>(field: K, value: FormData[K]): void {
//   throw new Error('Function not implemented.');
// }

import React from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  Divider,
} from '../components/section/section';

import { 
  ErrorSummary, 
  LocationFields, 
  PersonalInfoFields, 
  PhotoUpload, 
  SportCategory,
  SubmitActions 
} from '../components/RegisterFormSections';

import { useForm } from '../hooks/useForm';
import { useI18n } from '../hooks/useI18n';
import type { FormData } from '../types/FormData';

interface RegisterFormProps {
  type: 'leader' | 'player';
}

const initialFormData: FormData = {
  province: null,
  department: null,
  eventType: null,
  typeOfSport: null,
  selectedSport: null,
  position: 'player', // Default for player registration
  firstName: '',
  lastName: '',
  nationalID: '',
  phone: '',
  dob: '',
  photoUpload: null,
  category: null,
};

const RegisterForm: React.FC<RegisterFormProps> = ({ type }) => {
  const { t } = useI18n();
  
  const {
    formData,
    errors,
    submitting,
    onFieldChange,
    onReset,
    handleSubmit,
  } = useForm({
    initialFormData,
    registrationType: type,
  });

  return (
    <Container maxWidth="lg" sx={{ mt: 10, mb: 4 }}>
      <Paper sx={{ p: { xs: 2, sm: 3, md: 4 } }}>
        <Typography variant="h4" component="h1" mb={3}>
          {t(type === 'player' ? 'registration.title.player' : 'registration.title.coachLeader')}
        </Typography>
        
        <Typography variant="body1" color="text.secondary" mb={4}>
          {t('registration.subtitle')}
        </Typography>

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        <Box component="form" {...({ noValidate: true } as any)} autoComplete="off" onSubmit={handleSubmit}>
          <ErrorSummary errors={errors} />

          <LocationFields 
            data={formData} 
            onChange={onFieldChange} 
            errors={errors} 
          />

          <Divider sx={{ my: 4 }} />

          <SportCategory 
            data={formData} 
            onChange={onFieldChange} 
            errors={errors} 
          />

          <Divider sx={{ my: 4 }} />

          <PersonalInfoFields
            data={formData}
            onChange={onFieldChange}
            errors={errors}
            registrationType={type}
          />

          <Divider sx={{ my: 4 }} />

          <PhotoUpload
            file={formData.photoUpload}
            onFileChange={(file) => onFieldChange('photoUpload', file)}
            error={errors.photoUpload}
          />

          <SubmitActions 
            submitting={submitting} 
            onReset={onReset} 
          />
        </Box>
      </Paper>
    </Container>
  );
};

export default RegisterForm;