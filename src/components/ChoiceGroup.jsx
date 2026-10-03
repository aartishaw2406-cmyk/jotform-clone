import { OTHER } from '../utils/formUtils'

// Radio buttons or checkboxes, with optional "Other" text input and max selections.
function ChoiceGroup({ field, values, invalid, onChange }) {
  const { name, type, options, allowOther, maxSelect } = field
  const isRadio = type === 'radio'
  const selected = isRadio ? [values[name]] : values[name]
  const items = allowOther ? [...options, OTHER] : options
  const otherKey = `${name}_other`

  const handleToggle = (item) => {
    if (isRadio) {
      onChange(name, item)
      return
    }
    if (selected.includes(item)) {
      onChange(name, selected.filter((value) => value !== item))
      return
    }
    if (maxSelect && selected.length >= maxSelect) return
    onChange(name, [...selected, item])
  }

  return (
    <div className="jf-choices">
      {items.map((item, index) => {
        const id = `${name}-${index}`
        return (
          <div className="jf-choice" key={id}>
            <input
              className="jf-choice__input"
              id={id}
              type={type}
              name={name}
              value={item}
              checked={selected.includes(item)}
              onChange={() => handleToggle(item)}
            />
            <label className="jf-choice__label" htmlFor={id}>
              {item === OTHER ? 'Other' : item}
            </label>
          </div>
        )
      })}

      {allowOther && selected.includes(OTHER) && (
        <input
          className={`jf-control${invalid && !values[otherKey].trim() ? ' jf-control--error' : ''}`}
          id={otherKey}
          name={otherKey}
          type="text"
          value={values[otherKey]}
          placeholder="Please type another option here"
          aria-label="Other option"
          onChange={(event) => onChange(otherKey, event.target.value)}
        />
      )}
    </div>
  )
}

export default ChoiceGroup