import ChoiceGroup from './ChoiceGroup'
import { formatPhone, getToday } from '../utils/formUtils'

const GROUP_TYPES = ['fullname', 'address', 'radio', 'checkbox']

// Basic input (text, email, tel, date). id and name are always the same.
function Input({ id, type = 'text', value, invalid, onChange, ...rest }) {
  return (
    <input
      id={id}
      name={id}
      type={type}
      value={value}
      className={`jf-control${invalid ? ' jf-control--error' : ''}`}
      aria-invalid={invalid}
      aria-describedby={invalid ? `${id}-error` : undefined}
      onChange={(event) => onChange(id, event.target.value)}
      {...rest}
    />
  )
}

// Multi-part field: full name or address. Each part has its own sub-label.
function PartsGroup({ field, values, invalid, onChange }) {
  return (
    <div className="jf-parts">
      {field.parts.map((part) => {
        const key = `${field.name}_${part.key}`
        const partInvalid = invalid && part.required && !values[key].trim()
        return (
          <div key={key} className={`jf-part${part.size === 'full' ? ' jf-part--full' : ''}`}>
            <Input id={key} value={values[key]} invalid={partInvalid} onChange={onChange} autoComplete={part.autoComplete} />
            <label className="jf-sublabel" htmlFor={key}>
              {part.label}
            </label>
          </div>
        )
      })}
    </div>
  )
}

// One question: label + the right control for its type + error message.
function FormField({ field, values, error, onChange }) {
  const { name, label, type, required, layout, placeholder, options } = field
  const invalid = Boolean(error)
  const isGroup = GROUP_TYPES.includes(type)
  const LabelTag = isGroup ? 'span' : 'label'
  const labelProps = isGroup ? { id: `${name}-label` } : { htmlFor: name }

  // Passes the parent field name so its error clears when any part changes.
  const handleChange = (key, value) => {
    onChange(key, type === 'tel' ? formatPhone(value) : value, name)
  }

  let control
  switch (type) {
    case 'fullname':
    case 'address':
      control = <PartsGroup field={field} values={values} invalid={invalid} onChange={handleChange} />
      break
    case 'radio':
    case 'checkbox':
      control = <ChoiceGroup field={field} values={values} invalid={invalid} onChange={handleChange} />
      break
    case 'select':
      control = (
        <select
          id={name}
          name={name}
          value={values[name]}
          className={`jf-control${invalid ? ' jf-control--error' : ''}`}
          aria-invalid={invalid}
          onChange={(event) => handleChange(name, event.target.value)}
        >
          <option value="">Please Select</option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      )
      break
    case 'textarea':
      control = (
        <textarea
          id={name}
          name={name}
          value={values[name]}
          className="jf-control"
          onChange={(event) => handleChange(name, event.target.value)}
        />
      )
      break
    default:
      control = (
        <Input
          id={name}
          type={type}
          value={values[name]}
          invalid={invalid}
          placeholder={placeholder}
          max={field.maxToday ? getToday() : undefined}
          aria-required={required}
          onChange={handleChange}
        />
      )
  }

  const className = `jf-field${layout === 'half' ? ' jf-field--half' : ''}${invalid ? ' jf-field--error' : ''}`

  return (
    <div className={className}>
      <LabelTag className="jf-label" {...labelProps}>
        {label}
        {required && (
          <span className="jf-label__star" aria-hidden="true">
            *
          </span>
        )}
      </LabelTag>
      <div role={isGroup ? 'group' : undefined} aria-labelledby={isGroup ? `${name}-label` : undefined}>
        {control}
      </div>
      {error && (
        <p className="jf-error" id={`${name}-error`} role="alert">
          {error}
        </p>
      )}
    </div>
  )
}

export default FormField