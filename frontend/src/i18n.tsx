import React, { createContext, useContext, useMemo, useState, useEffect } from 'react';

export type Lang = 'en' | 'km';

type I18nContextValue = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: string, fallback?: string) => string;
  optLabel: (category: keyof typeof optionCategories, value: string) => string;
};

const I18nContext = createContext<I18nContextValue | undefined>(undefined);

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used within LanguageProvider');
  return ctx;
}

// Helper to resolve deep keys like 'registration.title'
function get(obj: any, path: string): any {
  return path.split('.').reduce((acc, part) => (acc && acc[part] !== undefined ? acc[part] : undefined), obj);
}

// Categories we support for option label translation
const optionCategories = {
  provinces: true,
  departments: true,
  eventTypes: true,
  sportCategories: true,
  sports: true,
} as const;

const translations = {
  en: {
    registration: {
      title: 'Registration Form',
      subtitle: 'Please fill in the details below. Fields marked as required must be completed.',
    },
    errorSummary: {
      prefix: 'Please review the following:',
    },
    location: {
      title: 'Location & Event',
      subtitle: 'Select your location and the event you are registering for.',
      province: { label: 'Province' },
      department: { label: 'Department' },
      eventType: { label: 'Type of Event' },
    },
    sport: {
      selector: {
        title: 'Sport Category',
        subtitle: 'Choose a category, then pick a specific sport.',
        legend: 'Type of Sport',
      },
      select: { label: 'Select Sport' },
    },
    personal: {
      title: 'Personal Information',
      subtitle: 'Please enter your details. All fields are required.',
    },
    fields: {
      firstName: 'First Name',
      lastName: 'Last Name',
      position: 'Position',
      nationalID: 'National ID',
      dob: 'Date of Birth',
      phone: 'Phone Number',
    },
    positions: {
      beginner: 'Beginner',
      intermediate: 'Intermediate',
      advanced: 'Advanced',
      expert: 'Expert',
    },
    upload: {
      title: 'Upload Photo (optional)',
      subtitle: 'Please upload a clear image. Maximum size: 2MB.',
      choose: 'Choose file...',
      errors: {
        type: 'Only image files are allowed (JPG, PNG, etc.).',
        size: 'Image must be 2MB or smaller.',
      },
    },
    buttons: {
      submit: 'Register Now',
      submitting: 'Submitting…',
      reset: 'Reset',
    },
    alerts: {
      submitSuccess: 'Registration submitted successfully!',
    },
    errors: {
      province: { required: 'Please select your province.' },
      department: { required: 'Please select your department.' },
      eventType: { required: 'Please select the event type.' },
      firstName: { required: 'First name is required.' },
      lastName: { required: 'Last name is required.' },
      position: { required: 'Please choose your position level.' },
      nationalID: {
        required: 'National ID is required.',
        digits: 'National ID should contain digits only.',
        length: 'National ID must be between 6 and 20 digits.',
      },
      phone: {
        required: 'Phone number is required.',
        invalid: 'Enter a valid phone number (7–15 digits).',
      },
      dob: {
        required: 'Date of birth is required.',
        invalid: 'Enter a valid date.',
        future: 'Date of birth cannot be in the future.',
      },
      typeOfSport: { required: 'Please select a sport category.' },
      selectedSport: {
        required: 'Please select a sport.',
        mismatch: 'Selected sport does not match the chosen category.',
      },
    },
    options: {
      provinces: {},
      departments: {
        'Department 1': 'Department 1',
        'Department 2': 'Department 2',
        'Department 3': 'Department 3',
      },
      eventTypes: {
        'Event Type 1': 'Event Type 1',
        'Event Type 2': 'Event Type 2',
        'Event Type 3': 'Event Type 3',
      },
      sportCategories: {
        'Traditional Cambodian Sports & Games': 'Traditional Cambodian Sports & Games',
        'Ball Games': 'Ball Games',
        'Martial Arts & Combat Sports': 'Martial Arts & Combat Sports',
        'Athletics & Outdoor Sports': 'Athletics & Outdoor Sports',
        'Indoor & Recreational Sports': 'Indoor & Recreational Sports',
      },
      sports: {
        Bokator: 'Bokator',
        'Pradal Serey': 'Pradal Serey',
        'Chol Chhoung': 'Chol Chhoung',
        'Teanh Prot': 'Teanh Prot',
        Football: 'Football',
        Volleyball: 'Volleyball',
        Basketball: 'Basketball',
        'Sepak Takraw': 'Sepak Takraw',
        Karate: 'Karate',
        Taekwondo: 'Taekwondo',
        Boxing: 'Boxing',
        Judo: 'Judo',
        Running: 'Running',
        Cycling: 'Cycling',
        Swimming: 'Swimming',
        Archery: 'Archery',
        'Table Tennis': 'Table Tennis',
        Badminton: 'Badminton',
        Chess: 'Chess',
        'E-sports': 'E-sports',
      },
    },
  },
  km: {
    registration: {
      title: 'បែបបទចុះឈ្មោះ',
      subtitle: 'សូមបំពេញព័ត៌មានខាងក្រោម។ វាលដែលត្រូវបំពេញត្រូវបំពេញអស់ទាំងអស់។',
    },
    errorSummary: {
      prefix: 'សូមពិនិត្យមើល៖',
    },
    location: {
      title: 'ទីតាំង និងព្រឹត្តិការណ៍',
      subtitle: 'សូមជ្រើសរើសទីតាំង និងព្រឹត្តិការណ៍ដែលអ្នកចូលរួម។',
      province: { label: 'ខេត្ត/រាជធានី' },
      department: { label: 'នាយកដ្ឋាន' },
      eventType: { label: 'ប្រភេទព្រឹត្តិការណ៍' },
    },
    sport: {
      selector: {
        title: 'ប្រភេទកីឡា',
        subtitle: 'ជ្រើសរើសប្រភេទមួយ បន្ទាប់មកជ្រើសរើសកីឡាជាក់លាក់។',
        legend: 'ប្រភេទកីឡា',
      },
      select: { label: 'ជ្រើសរើសកីឡា' },
    },
    personal: {
      title: 'ព័ត៌មានផ្ទាល់ខ្លួន',
      subtitle: 'សូមបញ្ចូលព័ត៌មានរបស់អ្នក។ វាលទាំងអស់ត្រូវបំពេញ។',
    },
    fields: {
      firstName: 'នាមខ្លួន',
      lastName: 'នាមត្រកូល',
      position: 'កម្រិត',
      nationalID: 'អត្តសញ្ញាណប័ណ្ណ',
      dob: 'ថ្ងៃខែឆ្នាំកំណើត',
      phone: 'លេខទូរស័ព្ទ',
    },
    positions: {
      beginner: 'អ្នកចាប់ផ្តើម',
      intermediate: 'កម្រិតមធ្យម',
      advanced: 'កម្រិតខ្ពស់',
      expert: 'អ្នកជំនាញ',
    },
    upload: {
      title: 'អាប់ឡោតរូបថត (ស្រេចចិត្ត)',
      subtitle: 'សូមអាប់ឡោតរូបភាពច្បាស់ ទំហំអតិបរមា 2MB។',
      choose: 'ជ្រើសរើសឯកសារ...',
      errors: {
        type: 'អនុញ្ញាតតែឯកសាររូបភាព (JPG, PNG, ល) ប៉ុណ្ណោះ។',
        size: 'រូបភាពត្រូវតែមានទំហំតិចជាងឬស្មើ 2MB។',
      },
    },
    buttons: {
      submit: 'ចុះឈ្មោះឥឡូវនេះ',
      submitting: 'កំពុងដាក់ស្នើ…',
      reset: 'កំណត់ឡើងវិញ',
    },
    alerts: {
      submitSuccess: 'បានដាក់ស្នើការចុះឈ្មោះដោយជោគជ័យ!',
    },
    errors: {
      province: { required: 'សូមជ្រើសរើសខេត្ត/រាជធានី។' },
      department: { required: 'សូមជ្រើសរើសនាយកដ្ឋាន។' },
      eventType: { required: 'សូមជ្រើសរើសប្រភេទព្រឹត្តិការណ៍។' },
      firstName: { required: 'ត្រូវការនាមខ្លួន។' },
      lastName: { required: 'ត្រូវការនាមត្រកូល។' },
      position: { required: 'សូមជ្រើសរើសកម្រិតរបស់អ្នក។' },
      nationalID: {
        required: 'ត្រូវការលេខអត្តសញ្ញាណប័ណ្ណ។',
        digits: 'លេខអត្តសញ្ញាណត្រូវមានតែលេខ។',
        length: 'លេខអត្តសញ្ញាណប័ណ្ណត្រូវមានពី 6 ដល់ 20 ខ្ទង់។',
      },
      phone: {
        required: 'ត្រូវការលេខទូរស័ព្ទ។',
        invalid: 'សូមបញ្ចូលលេខទូរស័ព្ទត្រឹមត្រូវ (7–15 ខ្ទង់)។',
      },
      dob: {
        required: 'ត្រូវការថ្ងៃខែឆ្នាំកំណើត។',
        invalid: 'សូមបញ្ចូលកាលបរិច្ឆេទត្រឹមត្រូវ។',
        future: 'ថ្ងៃខែឆ្នាំកំណើតមិនអាចនៅអនាគតបានទេ។',
      },
      typeOfSport: { required: 'សូមជ្រើសរើសប្រភេទកីឡា។' },
      selectedSport: {
        required: 'សូមជ្រើសរើសកីឡា។',
        mismatch: 'កីឡាដែលបានជ្រើសរើសមិនត្រូវនឹងប្រភេទដែលបានជ្រើសរើសទេ។',
      },
    },
    options: {
      provinces: {
        'Phnom Penh': 'ភ្នំពេញ',
        'Banteay Meanchey': 'បន្ទាយមានជ័យ',
        Battambang: 'បាត់ដំបង',
        'Kampong Cham': 'កំពង់ចាម',
        'Kampong Chhnang': 'កំពង់ឆ្នាំង',
        'Kampong Speu': 'កំពង់ស្ពឺ',
        'Kampong Thom': 'កំពង់ធំ',
        Kampot: 'កំពត',
        Kandal: 'កណ្ដាល',
        Kep: 'កែប',
        'Koh Kong': 'កោះកុង',
        Kratie: 'ក្រចេះ',
        Mondulkiri: 'មណ្ឌលគិរី',
        'Oddar Meanchey': 'ឧត្តរមានជ័យ',
        Pailin: 'ប៉ៃលិន',
        'Preah Vihear': 'ព្រះវិហារ',
        'Prey Veng': 'ព្រៃវែង',
        Pursat: 'ពោធិ៍សាត់',
        Ratanakiri: 'រតនគិរី',
        'Siem Reap': 'សៀមរាប',
        'Preah Sihanouk': 'ព្រះសីហនុ',
        'Stung Treng': 'ស្ទឹងត្រែង',
        'Svay Rieng': 'ស్వាយរៀង',
        Takeo: 'តាកែវ',
        'Tbong Khmum': 'ត្បូងឃ្មុំ',
      },
      departments: {
        'Department 1': 'នាយកដ្ឋាន ១',
        'Department 2': 'នាយកដ្ឋាន ២',
        'Department 3': 'នាយកដ្ឋាន ៣',
      },
      eventTypes: {
        'Event Type 1': 'ប្រភេទព្រឹត្តិការណ៍ ១',
        'Event Type 2': 'ប្រភេទព្រឹត្តិការណ៍ ២',
        'Event Type 3': 'ប្រភេទព្រឹត្តិការណ៍ ៣',
      },
      sportCategories: {
        'Traditional Cambodian Sports & Games': 'កីឡា និងល្បែងប្រពៃណីខ្មែរ',
        'Ball Games': 'កីឡាបាល់',
        'Martial Arts & Combat Sports': 'សិល្បៈប្រយុទ្ធ និងកីឡាប្រយុទ្ធ',
        'Athletics & Outdoor Sports': 'កីឡាខាងក្រៅ និងអត្តពលិក',
        'Indoor & Recreational Sports': 'កីឡាខាងក្នុង និងកម្សាន្ត',
      },
      sports: {
        Bokator: 'បុកកាត',
        'Pradal Serey': 'ប្រដាល់សេរី',
        'Chol Chhoung': 'ចូលឈូង',
        'Teanh Prot': 'ទាញព្រ័ត្រ',
        Football: 'បាល់ទាត់',
        Volleyball: 'បាល់ទះ',
        Basketball: 'បាល់បោះ',
        'Sepak Takraw': 'សីប៉ាកតាក់រ៉ូ',
        Karate: 'គារ៉ាធេ',
        Taekwondo: 'តៃក្វាន់ដូ',
        Boxing: 'ប្រដាល់',
        Judo: 'ជូដូ',
        Running: 'រត់',
        Cycling: 'ជិះកង់',
        Swimming: 'ហែលទឹក',
        Archery: 'បាញ់ធ្នូ',
        'Table Tennis': 'ប៉េងប៉ុង',
        Badminton: 'បេដមិនតុន',
        Chess: 'អុក',
        'E-sports': 'អ៊ី-ស្ពត',
      },
    },
  },
} as const;

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('lang') as Lang | null;
      if (saved === 'en' || saved === 'km') return saved;
    }
    return 'en';
  });

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = lang;
    }
    if (typeof window !== 'undefined') {
      localStorage.setItem('lang', lang);
    }
  }, [lang]);

  const value = useMemo<I18nContextValue>(() => {
    const t = (key: string, fallback?: string) => {
      const v = get(translations[lang as keyof typeof translations], key);
      if (typeof v === 'string') return v;
      return fallback ?? key;
    };

    const optLabel = (category: keyof typeof optionCategories, value: string) => {
      if (lang === 'km') {
        const translated = (translations.km.options as any)[category]?.[value];
        if (translated) return translated;
      }
      // English or fallback to original value
      const enTranslated = (translations.en.options as any)[category]?.[value];
      return enTranslated || value;
    };

    return { lang, setLang, t, optLabel };
  }, [lang]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}
