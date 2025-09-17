import React from 'react';
import { Box, Typography, FormControlLabel, Checkbox, Button, Alert } from '@mui/material';

/**
 * Responsive grid layout for form fields.
 * @param {React.ReactNode} children - Form fields or components inside the grid.
 * @returns {JSX.Element} A responsive grid container for form fields.
 */
export const BoxLayout = ({ children }: { children: React.ReactNode }) => (
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
    {children}
  </Box>
);

/**
 * Big bold heading for a form section.
 * @param {React.ReactNode} children - Text or nodes to display as the section title.
 * @returns {JSX.Element} A bold section title.
 */
export const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <Typography variant="h6" fontWeight={700} mb={1}>
    {children}
  </Typography>
);

/**
 * Smaller gray text under a section title.
 * @param {React.ReactNode} children - Text or nodes as subtitle/description.
 * @returns {JSX.Element} A smaller subtitle for a section.
 */
export const SectionSubtitle = ({ children }: { children: React.ReactNode }) => (
  <Typography variant="body1" color="text.secondary" mb={2}>
    {children}
  </Typography>
);

/**
 * Adds vertical spacing before a new form section.
 * @param {React.ReactNode} children - Content of the section.
 * @returns {JSX.Element} Box wrapper with margin top for spacing.
 */
export const FormSectionBox = ({ children }: { children: React.ReactNode }) => (
  <Box mt={3}>{children}</Box>
);

/**
 * Red error alert box.
 * @param {React.ReactNode} children - Error message(s) to display.
 * @returns {JSX.Element} Red alert box showing error messages.
 */
export const ErrorAlert = ({ children }: { children: React.ReactNode }) => (
  <Box mb={2}>
    <Alert severity="error" sx={{ fontSize: '1rem' }}>
      {children}
    </Alert>
  </Box>
);

/**
 * Pre-styled checkbox with label.
 * @param {string} label - Text displayed next to the checkbox.
 * @param {boolean} checked - Whether the checkbox is selected.
 * @param {() => void} onChange - Callback when checkbox is toggled.
 * @returns {JSX.Element} Checkbox with a label.
 */
export const LabeledCheckbox = ({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
}) => (
  <FormControlLabel control={<Checkbox checked={checked} onChange={onChange} />} label={label} />
);

/**
 * Unified Button component for primary and secondary usage.
 * Use 'variantType' prop to switch between primary (filled) or secondary (outlined) styles.
 * @param {React.ReactNode} children - Button text or content.
 * @param {'primary' | 'secondary'} variantType - Style of button.
 * @param {React.ComponentProps<typeof Button>} props - All other standard MUI Button props.
 * @returns {JSX.Element} A styled button.
 */
export const AppButton = ({
  children,
  variantType = 'primary',
  ...props
}: {
  children: React.ReactNode;
  variantType?: 'primary' | 'secondary';
} & React.ComponentProps<typeof Button>) => {
  const styles =
    variantType === 'primary'
      ? { variant: 'contained', color: 'primary', py: 1.5, fontSize: '1.1rem', fontWeight: 700 }
      : { variant: 'outlined', color: 'inherit', py: 1.5, fontSize: '1.1rem', fontWeight: 700 };

  return (
    <Button fullWidth size="large" sx={styles} {...props}>
      {children}
    </Button>
  );
};

/**
 * Error text for inline form validation messages.
 * @param {string | undefined} text - Error message text.
 * @returns {JSX.Element | null} Typography showing error text, or null if no text.
 */
export const ErrorText = ({ text }: { text?: string }) => {
  if (!text) return null;
  return <Typography mt={0.5} color="error">{text}</Typography>;
};

/**
 * File upload button with preview.
 * @param {File | null} file - Current selected file.
 * @param {(file: File | null) => void} onFileChange - Callback when user selects a file.
 * @param {string} placeholder - Placeholder text when no file selected.
 * @returns {JSX.Element} Upload button with file preview.
 */
export const FileUploadButton = ({
  file,
  onFileChange,
  placeholder = 'Choose file...',
}: {
  file: File | null;
  onFileChange: (file: File | null) => void;
  placeholder?: string;
}) => {
  const [fileName, setFileName] = React.useState<string>('');

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] || null;
    setFileName(f ? f.name : '');
    onFileChange(f);
  };

  return (
    <Button variant="outlined" component="label" fullWidth sx={{ p: 2, justifyContent: 'flex-start' }}>
      {file ? file.name : fileName || placeholder}
      <input type="file" hidden accept="image/*" onChange={handleFile} />
    </Button>
  );
};
