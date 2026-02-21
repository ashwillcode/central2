import { useState, useLayoutEffect } from 'react'
import { useSubjectColor } from '../context/SubjectColorContext'
import './Dashboard.css'

const ChatIcon = () => (
  <svg className="dashboard__subject-tabs-chat-icon" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
)

const RecommendedIcon = () => (
  <svg className="dashboard__subject-tabs-recommended-icon" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <path d="M14 2v6h6" />
    <path d="M16 13H8" />
    <path d="M16 17H8" />
    <path d="M10 9H8" />
  </svg>
)

const SUBJECTS = [
  { id: 'math', label: 'Math', color: 'steel' },
  { id: 'science', label: 'Science', color: 'olive' },
  { id: 'english', label: 'English', color: 'blush' },
  { id: 'social', label: 'Social Studies', color: 'grape' },
]

function Dashboard() {
  const { dashboardSubjectId, setDashboardSubjectId } = useSubjectColor()
  const [chatOpen, setChatOpen] = useState(true)
  const [recommendedOpen, setRecommendedOpen] = useState(false)
  const activeSubjectId = dashboardSubjectId ?? SUBJECTS[0].id
  const activeSubject = SUBJECTS.find((s) => s.id === activeSubjectId)

  useLayoutEffect(() => {
    if (!dashboardSubjectId) setDashboardSubjectId(SUBJECTS[0].id)
    return () => setDashboardSubjectId(null)
  }, [setDashboardSubjectId])

  const setActiveSubjectId = setDashboardSubjectId

  return (
    <div className="dashboard">
      <section
        className={`dashboard__content ${activeSubject ? `dashboard__content--${activeSubject.color}` : ''}`}
        aria-label="Main content"
      >
        <div className="dashboard__content-inner">
          <p className="dashboard__placeholder">
            {activeSubject ? `${activeSubject.label} player content` : 'Player content goes here.'}
          </p>
        </div>
      </section>

      <aside className="dashboard__subject-tabs" aria-label="Subject tabs">
        <div className="dashboard__subject-tabs-list">
          {SUBJECTS.map((subject) => (
            <button
              key={subject.id}
              type="button"
              className={`dashboard__subject-tab dashboard__subject-tab--${subject.color} ${activeSubjectId === subject.id ? 'dashboard__subject-tab--active' : ''}`}
              onClick={() => setActiveSubjectId(subject.id)}
              aria-pressed={activeSubjectId === subject.id}
              aria-label={`Switch to ${subject.label}`}
            >
              <span className="dashboard__subject-tab-label">{subject.label}</span>
            </button>
          ))}
        </div>
        <div className="dashboard__subject-tabs-actions">
        <button
          type="button"
          className="dashboard__subject-tabs-recommended"
          onClick={() => {
            setRecommendedOpen((open) => !open)
            setChatOpen(false)
          }}
          aria-label={recommendedOpen ? 'Close Recommended for today' : 'Open Recommended for today'}
          aria-pressed={recommendedOpen}
        >
          <RecommendedIcon />
        </button>
        <button
          type="button"
          className="dashboard__subject-tabs-chat"
          onClick={() => {
            setChatOpen((open) => !open)
            setRecommendedOpen(false)
          }}
          aria-label={chatOpen ? 'Close AI chat' : 'Open AI chat'}
          aria-pressed={chatOpen}
        >
            <ChatIcon />
          </button>
        </div>
      </aside>

      <aside
        className={`dashboard__panel-slot ${recommendedOpen || chatOpen ? 'dashboard__panel-slot--open' : 'dashboard__panel-slot--closed'}`}
        aria-hidden={!recommendedOpen && !chatOpen}
      >
        <div
          className={`dashboard__recommended ${recommendedOpen ? 'dashboard__panel--visible' : 'dashboard__panel--hidden'}`}
          aria-label="Recommended for today"
          aria-hidden={!recommendedOpen}
        >
          <div className="dashboard__recommended-inner">
            <h3 className="dashboard__recommended-title">Recommended for today</h3>

            <section className="dashboard__recommended-section" aria-label="Assignments due today">
              <h4 className="dashboard__recommended-section-title">Due today</h4>
              <p className="dashboard__placeholder dashboard__placeholder--muted">
                Assignment cards (all subjects) due today.
              </p>
            </section>

            <section className="dashboard__recommended-section" aria-label="Study sessions">
              <h4 className="dashboard__recommended-section-title">Study sessions</h4>
              <p className="dashboard__placeholder dashboard__placeholder--muted">
                Study sessions will go here.
              </p>
            </section>

            <section className="dashboard__recommended-section" aria-label="Classmates in this content">
              <h4 className="dashboard__recommended-section-title">Here now</h4>
              <p className="dashboard__placeholder dashboard__placeholder--muted">
                Classmates currently in this part of the content.
              </p>
            </section>
          </div>
        </div>

        <div
          className={`dashboard__chat ${chatOpen ? 'dashboard__panel--visible' : 'dashboard__panel--hidden'}`}
          aria-label="Chat with students and AI"
          aria-hidden={!chatOpen}
        >
          <div className="dashboard__chat-inner">
            <p className="dashboard__chat-title">Chat with other students or AI</p>
            <p className="dashboard__placeholder dashboard__placeholder--muted">
              Chat UI will go here.
            </p>
          </div>
        </div>
      </aside>
    </div>
  )
}

export default Dashboard
