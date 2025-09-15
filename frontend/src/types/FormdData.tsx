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
  gender: string; // reserved for future use
  dob: string; // ISO date string yyyy-mm-dd
  photoUpload: File | null;
}