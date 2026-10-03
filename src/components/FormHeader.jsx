// Heading band. variant "main" = form title with banner image, "section" = section title.
function FormHeader({ id, title, subtitle, imageSrc, variant = 'section' }) {
  const Heading = variant === 'main' ? 'h1' : 'h2'
  return (
    <header className={`jf-header jf-header--${variant}`}>
      {imageSrc && <img className="jf-header__image" src={imageSrc} alt="" />}
      <Heading className="jf-header__title" id={id}>
        {title}
      </Heading>
      {subtitle && <p className="jf-header__subtitle">{subtitle}</p>}
    </header>
  )
}

export default FormHeader