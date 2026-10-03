import EnrollmentForm from './components/EnrollmentForm'
import { COVER_LOGO_URL } from './data/formConfig'

// Page wrapper: logo on top, then the form card.
function App() {
  return (
    <main className="jf-page">
      <div className="jf-cover">
        <img src={COVER_LOGO_URL} alt="Course logo" width="140" />
      </div>
      <EnrollmentForm />
    </main>
  )
}

export default App