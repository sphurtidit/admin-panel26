const SPLIT_SPORTS = ['BADMINTON', 'BASKETBALL', 'VOLLEYBALL'];
const BOYS_ONLY_SPORTS = ['CRICKET', 'TABLE TENNIS', 'FOOTBALL'];

const normalize = (value) => String(value || '').trim().toUpperCase();

const normalizeCategory = (value) => String(value || '').trim().toLowerCase();

const getAllowedCategoriesForSport = (sportName) => {
  const normalizedSport = normalize(sportName);

  if (SPLIT_SPORTS.includes(normalizedSport)) {
    return ['Boys', 'Girls'];
  }

  if (BOYS_ONLY_SPORTS.includes(normalizedSport)) {
    return ['Boys'];
  }

  return ['Standard'];
};

const isCategoryAllowedForSport = (sportName, categoryName) => {
  const allowedCategories = getAllowedCategoriesForSport(sportName).map(
    normalizeCategory
  );

  return allowedCategories.includes(normalizeCategory(categoryName));
};

export {
  BOYS_ONLY_SPORTS,
  SPLIT_SPORTS,
  getAllowedCategoriesForSport,
  isCategoryAllowedForSport,
};
