/**
 * Attribution for homepage photography (Unsplash / Pexels only).
 */
export const imageCredits = [
  {
    id: 'classroom-training',
    imageTitle: 'Group of People on a Conference Room',
    category: 'Modern Classroom Training',
    photographer: 'Christina Morillo',
    platform: 'Pexels',
    sourceUrl:
      'https://www.pexels.com/photo/people-sitting-on-chairs-in-front-of-projector-1181406/',
    licenseNote: 'Free to use under the Pexels License',
  },
  {
    id: 'boardroom-training',
    imageTitle: 'Group Of People on a Meeting',
    category: 'Corporate Boardroom Strategy',
    photographer: 'Rebrand Cities',
    platform: 'Pexels',
    sourceUrl: 'https://www.pexels.com/photo/group-of-people-on-a-meeting-1367272/',
    licenseNote: 'Free to use under the Pexels License',
  },
  {
    id: 'workplace-learning',
    imageTitle: 'A People Having a Business Meeting',
    category: 'Workplace Practical Learning',
    photographer: 'MART PRODUCTION',
    platform: 'Pexels',
    sourceUrl: 'https://www.pexels.com/photo/a-people-having-a-business-meeting-7550385/',
    licenseNote: 'Free to use under the Pexels License',
  },
  {
    id: 'agricultural-training',
    imageTitle: 'Young Man with a Bucket Spreading Fertilizer on a Crop Field',
    category: 'Agricultural Training',
    photographer: 'Nirjon Nakib',
    platform: 'Pexels',
    sourceUrl:
      'https://www.pexels.com/photo/young-man-with-a-bucket-spreading-fertilizer-on-a-crop-field-18185333/',
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
  {
    id: 'youth-classroom-training',
    imageTitle: 'Teacher Discussing His Lesson to His Students',
    category: 'Youth Classroom Learning',
    photographer: 'RDNE Stock project',
    platform: 'Pexels',
    sourceUrl:
      'https://www.pexels.com/photo/teacher-discussing-his-lesson-to-his-students-7092352/',
    licenseNote: 'Free to use under the Pexels License',
  },
]

/** @param {string} id */
export function getImageCreditById(id) {
  return imageCredits.find((credit) => credit.id === id) ?? null
}
