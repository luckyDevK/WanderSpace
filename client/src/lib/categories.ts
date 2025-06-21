// categories.ts

// 👇 Define array with `as const` to keep literal values
export const categories = [
  'Waterfall',
  'Beach',
  'Mountain',
  'Lake',
  'Island',
  'Forest',
  'Cave',
  'Temple',
  'City',
  'Village',
  'Desert',
  'National Park',
  'Museum',
  'Historical Site',
  'Theme Park',
  'Market',
  'Restaurant',
  'Cafe',
  'Monument',
  'Hot Spring',
] as const;

// 👇 Create union type from the array
export type CategoryType = (typeof categories)[number];
