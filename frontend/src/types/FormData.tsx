
export interface FormData {
  province: string | null;
  department: string | null;
  eventType: string | null;
  typeOfSport: string | null;
  selectedSport: string | null;
  position: string;
  firstName: string;
  lastName: string;
  nationalID: string;
  phone: string;
  dob: string;
  photoUpload: File | null;
  category: string | null ; // reserved for future use
  sportsByCategory?: Record<string, string[]>; // optional, for dynamic sports list
}

export type FormErrors = Partial<Record<keyof FormData, string>> & {
  photoUpload?: string;
};

export type OnFieldChange = <K extends keyof FormData>(
  field: K,
  value: FormData[K]
) => void;
