import FormHeader from './FormHeader'
import FormField from './FormField'

// One section: heading band, optional notice box, then its fields.
function FormSection({ section, values, errors, onChange }) {
  const { id, title, subtitle, notice, fields } = section
  return (
    <section className="jf-section" aria-labelledby={`${id}-title`}>
      <FormHeader id={`${id}-title`} title={title} subtitle={subtitle} />

      {notice && (
        <div className="jf-notice">
          <h3 className="jf-notice__title">{notice.title}</h3>
          <p className="jf-notice__text">{notice.text}</p>
          <a className="jf-button jf-button--outline" href={notice.linkHref} target="_blank" rel="noopener noreferrer">
            {notice.linkLabel}
          </a>
        </div>
      )}

      {fields.map((field) => (
        <FormField key={field.name} field={field} values={values} error={errors[field.name]} onChange={onChange} />
      ))}
    </section>
  )
}

export default FormSection