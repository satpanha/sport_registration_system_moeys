import type { FormData, FormErrors } from '../types/FormData';
import { sportsByCategory } from '../constants/formData';

const phoneRegex = /^\+?[0-9\s\-()]{7,15}$/;
const numericRegex = /^[0-9]+$/;

export function validateForm(
  data: FormData,
  t: (key: string, fallback?: string) => string,
  registrationType?: 'leader' | 'player'
): FormErrors {
  const errors: FormErrors = {};

  // Required text fields
  if (!data.eventType) errors.eventType = t('errors.eventType.required', 'Please select the event type.');
  if (!data.firstName.trim()) errors.firstName = t('errors.firstName.required', 'First name is required.');
  if (!data.lastName.trim()) errors.lastName = t('errors.lastName.required', 'Last name is required.');

  // Position validation based on registration type
  if (registrationType === 'player') {
    // For players, position should be fixed as 'player' and is required
    if (data.position !== 'player') {
      errors.position = t('errors.position.playerFixed', 'Position must be set to Player.');
    }
  } else {
    // For coach/leader, position is required and can be any valid option except 'player'
    if (!data.position) {
      errors.position = t('errors.position.required', 'Please choose your position level.');
    } else if (data.position === 'player') {
      errors.position = t('errors.position.coachLeaderInvalid', 'Coaches and leaders cannot select Player as position.');
    }
  }

  // Province & Department validation: only one allowed, at least one required
  if (!data.province && !data.department) {
    errors.province = t('errors.location.required', 'Please select a province or department.');
    errors.department = t('errors.location.required', 'Please select a province or department.');
  } else if (data.province && data.department) {
    errors.province = t('errors.location.exclusive', 'You can only choose one.');
    errors.department = t('errors.location.exclusive', 'You can only choose one.');
  }

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
  if (!data.typeOfSport) {
    errors.typeOfSport = t('errors.typeOfSport.required', 'Please select a sport category.');
  }
  if (data.typeOfSport && (!data.selectedSport || data.selectedSport.trim() === '')) {
    errors.selectedSport = t('errors.selectedSport.required', 'Please select a sport.');
  }
  if (
      data.typeOfSport && 
      data.selectedSport && 
      data.selectedSport.trim() !== '' &&
      !sportsByCategory[data.typeOfSport as string].includes(data.selectedSport as string)) {
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