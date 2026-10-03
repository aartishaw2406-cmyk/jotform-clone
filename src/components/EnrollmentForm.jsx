import { useRef, useState } from 'react'
import FormHeader from './FormHeader'
import FormSection from './FormSection'
import { BANNER_URL, FIELDS, FORM_TITLE, SECTIONS } from '../data/formConfig'
import { buildInitialValues, validateForm } from '../utils/formUtils'

// Whole form: state, validation and the thank-you screen.
// Frontend only: on success it logs the values. No backend yet.
function EnrollmentForm() {
  const formRef = useRef(null)
  const [values, setValues] = useState(() => buildInitialValues(FIELDS))
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (key, value, fieldName) => {
    setValues((prev) => ({ ...prev, [key]: value }))
    setErrors((prev) => (prev[fieldName] ? { ...prev, [fieldName]: undefined } : prev))
  }

  const focusFirstError = () => {
    const firstError = formRef.current?.querySelector('.jf-field--error')
    firstError?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    firstError?.querySelector('input, select, textarea')?.focus({ preventScroll: true })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    // Honeypot: real users never fill this hidden field, bots do.
    if (new FormData(event.currentTarget).get('website')) return

    const newErrors = validateForm(FIELDS, values)
    setErrors(newErrors)
    if (Object.keys(newErrors).length > 0) {
      requestAnimationFrame(focusFirstError)
      return
    }

    console.log('Form values:', values)
    setSubmitted(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleReset = () => {
    setValues(buildInitialValues(FIELDS))
    setErrors({})
    setSubmitted(false)
  }

  if (submitted) {
    return (
      <div className="jf-form jf-success">
        <h1 className="jf-header__title">Thank you!</h1>
        <p className="jf-header__subtitle">Your application has been submitted. We will contact you soon.</p>
        <button className="jf-button" type="button" onClick={handleReset}>
          Submit another response
        </button>
      </div>
    )
  }

  return (
    <form className="jf-form" ref={formRef} onSubmit={handleSubmit} noValidate>
      <FormHeader variant="main" title={FORM_TITLE} imageSrc={BANNER_URL} />

      {SECTIONS.map((section) => (
        <FormSection key={section.id} section={section} values={values} errors={errors} onChange={handleChange} />
      ))}

      <input className="jf-honeypot" type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />

      <div className="jf-actions">
        <button className="jf-button" type="submit">
          Submit
        </button>
      </div>
    </form>
  )
}

export default EnrollmentForm