export const OTHER = 'other'

const REQUIRED_MESSAGE = 'This field is required.'
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const isEmpty = (value) => !String(value ?? '').trim()

// Today as YYYY-MM-DD in the user's local time.
export const getToday = () => new Date().toLocaleDateString('en-CA')

// Phone helpers: format as "(+91) 00000-00000".
const phoneDigits = (value) => value.replace('(+91)', '').replace(/\D/g, '').slice(0, 10)

export function formatPhone(value) {
  const digits = phoneDigits(value)
  if (!digits) return ''
  return digits.length > 5 ? `(+91) ${digits.slice(0, 5)}-${digits.slice(5)}` : `(+91) ${digits}`
}

// Builds { field_name: '' | [] } for every field (and its parts / "other" text).
export function buildInitialValues(fields) {
  const values = {}
  fields.forEach((field) => {
    const { name, type } = field
    if (field.parts) {
      field.parts.forEach((part) => {
        values[`${name}_${part.key}`] = ''
      })
    } else if (type === 'checkbox') {
      values[name] = []
    } else {
      values[name] = field.defaultToday ? getToday() : ''
    }
    if (field.allowOther) values[`${name}_other`] = ''
  })
  return values
}

function validateField(field, values) {
  const { name, type, required } = field

  if (field.parts) {
    const missing = field.parts.some((part) => part.required && isEmpty(values[`${name}_${part.key}`]))
    return missing ? REQUIRED_MESSAGE : ''
  }

  if (type === 'checkbox') {
    const selected = values[name]
    const minimum = field.minSelect ?? 1
    if (required && selected.length < minimum) {
      return minimum > 1 ? 'Please confirm all the statements.' : REQUIRED_MESSAGE
    }
    if (selected.includes(OTHER) && isEmpty(values[`${name}_other`])) return REQUIRED_MESSAGE
    return ''
  }

  if (type === 'radio') {
    if (required && isEmpty(values[name])) return REQUIRED_MESSAGE
    if (values[name] === OTHER && isEmpty(values[`${name}_other`])) return REQUIRED_MESSAGE
    return ''
  }

  const value = values[name]
  if (required && isEmpty(value)) return REQUIRED_MESSAGE
  if (type === 'email' && !isEmpty(value) && !EMAIL_PATTERN.test(value)) {
    return 'Enter a valid e-mail address'
  }
  if (type === 'tel' && !isEmpty(value) && phoneDigits(value).length !== 10) {
    return 'Please enter a valid phone number.'
  }
  return ''
}

// Returns { field_name: 'error message' } for every invalid field.
export function validateForm(fields, values) {
  const errors = {}
  fields.forEach((field) => {
    const message = validateField(field, values)
    if (message) errors[field.name] = message
  })
  return errors
}