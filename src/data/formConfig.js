// Single source of truth for the form. Each field's `name` is what a
// WordPress developer will map to a form plugin field.
//
// TIP: download these images into src/assets and import them instead of
// hotlinking from Jotform, so they never break.
export const COVER_LOGO_URL =
  'https://www.jotform.com/uploads/dtechistscourses/form_files/DTM%20logo%20new-6abca0a4707c31.62288868.jpeg'
export const BANNER_URL =
  'https://www.jotform.com/uploads/dtechistscourses/form_files/WhatsApp%20Image%202026-09-30%20at%2011.15.27%20AM-6abca2664d08f1.84627579.jpeg'
export const PAYMENT_URL = 'https://payments.cashfree.com/forms/Master-SEO'

export const FORM_TITLE = 'SEO MASTERY – Advanced SEO, AIO, GEO & GMB'
const COURSE = 'Master SEO Course'

// layout: 'half' keeps the input narrow (like the original); omit for full width.
export const SECTIONS = [
  {
    id: 'personal',
    title: 'Personal Details',
    subtitle: COURSE,
    fields: [
      {
        name: 'full_name',
        label: 'Full Name',
        type: 'fullname',
        required: true,
        parts: [
          { key: 'first', label: 'First Name', required: true, autoComplete: 'given-name' },
          { key: 'middle', label: 'Middle Name', autoComplete: 'additional-name' },
          { key: 'last', label: 'Last Name', required: true, autoComplete: 'family-name' },
        ],
      },
      { name: 'date_of_birth', label: 'Date of Birth', type: 'date', required: true, layout: 'half', maxToday: true },
      {
        name: 'gender',
        label: 'Gender',
        type: 'radio',
        required: true,
        options: ['Male', 'Female', 'Other', 'Prefer not to say'],
      },
      {
        name: 'mobile',
        label: 'Mobile Number (WhatsApp preferred)',
        type: 'tel',
        required: true,
        layout: 'half',
        placeholder: '(+91) 00000-00000',
      },
      {
        name: 'alt_mobile',
        label: 'Alternate Contact Number',
        type: 'tel',
        layout: 'half',
        placeholder: '(+91) 00000-00000',
      },
      {
        name: 'email',
        label: 'Email Address',
        type: 'email',
        required: true,
        layout: 'half',
        placeholder: 'example@example.com',
      },
      { name: 'current_city', label: 'Current City and State', type: 'text', required: true, layout: 'half' },
      {
        name: 'address',
        label: 'Full Residential Address',
        type: 'address',
        required: true,
        parts: [
          { key: 'street', label: 'Street Address', required: true, size: 'full', autoComplete: 'address-line1' },
          { key: 'street2', label: 'Street Address Line 2', size: 'full', autoComplete: 'address-line2' },
          { key: 'city', label: 'City', required: true, autoComplete: 'address-level2' },
          { key: 'state', label: 'State / Province', required: true, autoComplete: 'address-level1' },
          { key: 'postal', label: 'Postal / Zip Code', required: true, autoComplete: 'postal-code' },
        ],
      },
    ],
  },
  {
    id: 'background',
    title: 'Educational/Professional Background',
    subtitle: COURSE,
    fields: [
      {
        name: 'current_status',
        label: 'Current Status',
        type: 'radio',
        required: true,
        allowOther: true,
        options: ['Student', 'Graduate', 'Postgraduate', 'Working Professional', 'Career Switcher'],
      },
      {
        name: 'qualification',
        label: 'Highest Qualification',
        type: 'select',
        required: true,
        layout: 'half',
        options: ['12th', 'Diploma', "Bachelor's", "Master's", 'PhD', 'Other'],
      },
      { name: 'degree_course', label: 'Degree/Course Name and Specialization', type: 'text', required: true, layout: 'half' },
      { name: 'college', label: 'College/University Name', type: 'text', required: true, layout: 'half' },
      { name: 'passing_year', label: 'Year of Passing or Expected', type: 'text', required: true, layout: 'half' },
      { name: 'employed', label: 'Currently Employed', type: 'radio', required: true, options: ['Yes', 'No'] },
      { name: 'employer_details', label: 'If Employed: Company Name and Designation', type: 'text', layout: 'half' },
      { name: 'experience', label: 'Any Prior Experience in Digital Marketing or SEO', type: 'textarea' },
    ],
  },
  {
    id: 'program',
    title: 'Program and Batch Preference',
    subtitle: COURSE,
    fields: [
      {
        name: 'batch_start',
        label: 'Preferred Batch Start Date',
        type: 'select',
        required: true,
        layout: 'half',
        // Update these dates when the real batches are confirmed.
        options: ['2026-09-12', '2026-09-19', '2026-10-03', '2026-10-10', '2026-10-17', '2026-10-24', 'Other'],
      },
      { name: 'attendance_mode', label: 'Mode of Attendance', type: 'radio', required: true, options: ['Online Live'] },
      {
        name: 'has_laptop',
        label: 'Do you have a laptop or computer with stable internet?',
        type: 'radio',
        required: true,
        options: ['Yes', 'No'],
      },
      {
        name: 'heard_from',
        label: 'How did you hear about This Course?',
        type: 'checkbox',
        maxSelect: 3,
        allowOther: true,
        options: ['Instagram', 'LinkedIn', 'Website', 'Friend or Referral', 'Google Search'],
      },
      { name: 'reason', label: 'Reason for Joining This - Master SEO Course', type: 'textarea' },
    ],
  },
  {
    id: 'payment',
    title: 'Payment and Confirmation',
    subtitle: COURSE,
    notice: {
      title: 'Master SEO Course Fee Acknowledgement : 9,999/-',
      text: 'Course Fee: ₹9,999/- (Rupees Nine Thousand Nine Hundred Ninety-Nine Only) for the 3-Month SEO Master Course.',
      linkLabel: 'Pay Course Fee',
      linkHref: PAYMENT_URL,
    },
    fields: [],
  },
  {
    id: 'declaration',
    title: 'Declaration',
    subtitle: COURSE,
    fields: [
      {
        name: 'declaration',
        label: 'Declaration Confirmation',
        type: 'checkbox',
        required: true,
        minSelect: 2, // both statements must be ticked
        options: [
          'I confirm that the information provided is accurate and complete.',
          'I hereby confirm that I have read and agree to the Terms & Conditions of the 3-Month SEO Course. I understand that the course fee of ₹9,999/- is non-refundable.',
        ],
      },
      { name: 'signature_name', label: 'Signature Type Full Name', type: 'text', required: true, layout: 'half' },
      { name: 'application_date', label: 'Date of Application', type: 'date', required: true, layout: 'half', defaultToday: true },
    ],
  },
]

export const FIELDS = SECTIONS.flatMap((section) => section.fields)