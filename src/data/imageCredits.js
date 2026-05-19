/**
 * Attribution for homepage photography (Unsplash / Pexels only).
 * Used for README exports and future footer credits if needed.
 */
export const imageCredits = [
  {
    id: 'classroom-training',
    imageTitle: 'Man Standing Beside People Sitting Beside Table With Laptops',
    category: 'Modern Classroom Training',
    photographer: 'fauxels',
    platform: 'Pexels',
    sourceUrl:
      'https://www.pexels.com/photo/man-standing-beside-people-sitting-beside-table-with-laptops-3184395/',
    licenseNote: 'Free to use under the Pexels License',
  },
  {
    id: 'boardroom-training',
    imageTitle:
      'A Group of Men in Black Suit Sitting Near the Table while Having Conversation',
    category: 'Corporate Boardroom Strategy',
    photographer: 'Pavel Danilyuk',
    platform: 'Pexels',
    sourceUrl:
      'https://www.pexels.com/photo/a-group-of-men-in-black-suit-sitting-near-the-table-while-having-conversation-5520287/',
    licenseNote: 'Free to use under the Pexels License',
  },
  {
    id: 'workplace-learning',
    imageTitle: 'Woman explaining detail of project to colleague',
    category: 'Workplace Practical Learning',
    photographer: 'SHVETS production',
    platform: 'Pexels',
    sourceUrl:
      'https://www.pexels.com/photo/woman-explaining-detail-of-project-to-colleague-7176287/',
    licenseNote: 'Free to use under the Pexels License',
  },
  {
    id: 'agricultural-training',
    imageTitle: 'Rural African Farmers with Agricultural Supplies',
    category: 'Agricultural Training',
    photographer: 'Şeyhmus Kino',
    platform: 'Pexels',
    sourceUrl:
      'https://www.pexels.com/photo/rural-african-farmers-with-agricultural-supplies-30403190/',
    licenseNote: 'Free to use under the Pexels License',
  },
  {
    id: 'ohs-training',
    imageTitle: "A Man and a Woman with Ppe's Talking at a Construction Site",
    category: 'Occupational Health & Safety',
    photographer: 'Mikael Blomkvist',
    platform: 'Pexels',
    sourceUrl:
      'https://www.pexels.com/photo/a-man-and-a-woman-with-ppe-s-talking-at-a-construction-site-8961065/',
    licenseNote: 'Free to use under the Pexels License',
  },
]

/** @param {string} id */
export function getImageCreditById(id) {
  return imageCredits.find((credit) => credit.id === id) ?? null
}
