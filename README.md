# SEO Mastery Enrollment Form (Frontend)

Frontend-only clone of the Jotform enrollment page, built with React + Vite and plain CSS.

## Run
npm install
npm run dev

## Structure
- src/data/formConfig.js: every section and field (name, label, type, required, options)
- src/utils/formUtils.js: validation and helpers
- src/components: FormHeader, FormSection, FormField, ChoiceGroup, EnrollmentForm
- src/styles: variables.css (colors/sizes), base.css, form.css, fields.css
- All CSS classes use the `jf-` prefix (BEM naming) to avoid WordPress theme clashes.

## Field names
full_name, date_of_birth, gender, mobile, alt_mobile, email, current_city, address,
current_status, qualification, degree_course, college, passing_year, employed,
employer_details, experience, batch_start, attendance_mode, has_laptop, heard_from,
reason, declaration, signature_name, application_date

## Notes
Frontend only. On submit it validates and logs values to the console. No backend yet.
Payment is a link to the Cashfree page. A hidden honeypot field (`website`) is included for spam protection.