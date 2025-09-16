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
