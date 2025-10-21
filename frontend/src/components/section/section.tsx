
import React from 'react';
import {
  Box as MuiBox,
  Typography as MuiTypography,
  Button as MuiButton,
  Alert as MuiAlert,
  Divider as MuiDivider,
  Container as MuiContainer,
  Paper as MuiPaper,
} from '@mui/material';

import type {
  BoxProps,
  TypographyProps,
  ButtonProps,
  AlertProps,
  DividerProps,
  ContainerProps,
  PaperProps,
} from '@mui/material';

/**
 * @param {BoxProps} props - The props for the Box component.
 * @returns {JSX.Element} - A Box component.
 * @example
 * <Box mt={2}>
 *  <p>Hello World</p>
 * </Box>
 */
export const Box: React.FC<BoxProps> = (props) => <MuiBox {...props} />;

/**
 * @param {TypographyProps} props - The props for the Typography component.
 * @returns {JSX.Element} - A Typography component.
 * @example
 * <Typography variant="h1" component="h2">
 *  Hello World
 * </Typography>
 */
export const Typography: React.FC<TypographyProps> = (props) => <MuiTypography {...props} />;

/**
 * @param {ButtonProps} props - The props for the Button component.
 * @returns {JSX.Element} - A Button component.
 * @example
 * <Button variant="contained" color="primary">
 *  Hello World
 * </Button>
 */
export const Button: React.FC<ButtonProps> = (props) => <MuiButton {...props} />;

/**
 * @param {AlertProps} props - The props for the Alert component.
 * @returns {JSX.Element} - A Alert component.
 * @example
 * <Alert severity="error">
 *  Hello World
 * </Alert>
 */
export const Alert: React.FC<AlertProps> = (props) => <MuiAlert {...props} />;

/**
 * @param {DividerProps} props - The props for the Divider component.
 * @returns {JSX.Element} - A Divider component.
 * @example
 * <Divider />
 */
export const Divider: React.FC<DividerProps> = (props) => <MuiDivider {...props} />;

/**
 * @param {ContainerProps} props - The props for the Container component.
 * @returns {JSX.Element} - A Container component.
 * @example
 * <Container maxWidth="sm">
 *  <p>Hello World</p>
 * </Container>
 */
export const Container: React.FC<ContainerProps> = (props) => <MuiContainer {...props} />;

/**
 * @param {PaperProps} props - The props for the Paper component.
 * @returns {JSX.Element} - A Paper component.
 * @example
 * <Paper elevation={3}>
 *  <p>Hello World</p>
 * </Paper>
 */
export const Paper: React.FC<PaperProps> = (props) => <MuiPaper {...props} />;
  