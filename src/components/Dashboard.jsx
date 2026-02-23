import { useState, useLayoutEffect } from 'react'
import { useSubjectColor } from '../context/SubjectColorContext'
import './Dashboard.css'

const ChatIcon = () => (
  <svg className="dashboard__subject-tabs-chat-icon" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
)

const RecommendedIcon = () => (
  <svg className="dashboard__subject-tabs-recommended-icon" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <path d="M14 2v6h6" />
    <path d="M16 13H8" />
    <path d="M16 17H8" />
    <path d="M10 9H8" />
  </svg>
)

const MessageTeacherIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
)

const GradebookIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <line x1="19" y1="5" x2="5" y2="19" />
    <circle cx="6.5" cy="6.5" r="2.5" />
    <circle cx="17.5" cy="17.5" r="2.5" />
  </svg>
)

const SUBJECTS = [
  { id: 'math', label: 'Math', color: 'steel' },
  { id: 'science', label: 'Science', color: 'olive' },
  { id: 'english', label: 'English', color: 'blush' },
  { id: 'social', label: 'Social Studies', color: 'grape' },
]

const STORAGE_KEY_TRAY = 'central2-player-tray'

function getStoredTray() {
  try {
    const v = localStorage.getItem(STORAGE_KEY_TRAY)
    if (v === 'chat' || v === 'recommended') return v
    if (v === 'closed') return null
  } catch {}
  return 'chat'
}

function Dashboard() {
  const { dashboardSubjectId, setDashboardSubjectId } = useSubjectColor()
  const [openPanel, setOpenPanel] = useState(getStoredTray)
  const chatOpen = openPanel === 'chat'
  const recommendedOpen = openPanel === 'recommended'

  const persistTray = (panel) => {
    try {
      localStorage.setItem(STORAGE_KEY_TRAY, panel || 'closed')
    } catch {}
  }

  const activeSubjectId = dashboardSubjectId ?? SUBJECTS[0].id
  const activeSubject = SUBJECTS.find((s) => s.id === activeSubjectId)

  useLayoutEffect(() => {
    if (!dashboardSubjectId) setDashboardSubjectId(SUBJECTS[0].id)
  }, [dashboardSubjectId, setDashboardSubjectId])

  const setActiveSubjectId = setDashboardSubjectId

  return (
    <div className="dashboard">
      <section
        className={`dashboard__content ${activeSubject ? `dashboard__content--${activeSubject.color}` : ''}`}
        aria-label="Main content"
      >
        <header className="dashboard__content-header">
          <div className="dashboard__content-course-card">
            <div className="dashboard__content-header-left">
              <h1 className="dashboard__content-course-name">
                {activeSubject ? activeSubject.label : 'Course'}
              </h1>
              <p className="dashboard__content-course-section">Section 204</p>
            </div>
            <div className="dashboard__content-header-actions">
              <button type="button" className="dashboard__content-header-btn dashboard__content-header-btn--icon" aria-label="Message Teacher">
                <MessageTeacherIcon />
                <span className="dashboard__content-header-tooltip">Message Teacher</span>
              </button>
              <button type="button" className="dashboard__content-header-btn dashboard__content-header-btn--icon" aria-label="Gradebook">
                <GradebookIcon />
                <span className="dashboard__content-header-tooltip">Gradebook</span>
              </button>
            </div>
            <div className="dashboard__content-header-right">
              <div className="dashboard__content-overall-grade" aria-label="Overall grade">
                <span className="dashboard__content-overall-grade-label">Overall</span>
                <span className="dashboard__content-overall-grade-value">87%</span>
              </div>
            </div>
          </div>
        </header>
        <div className="dashboard__content-inner">
            <div className="dashboard__content-card">
            <div className="dashboard__content-card-hero">
              <img
                src="https://placehold.co/1200x320/e5e5e5"
                alt=""
                className="dashboard__content-card-hero-img"
              />
              <span className="dashboard__content-placeholder-label">Lesson image</span>
            </div>
            <div className="dashboard__content-card-body">
              <h2 className="dashboard__content-card-title">Today&apos;s lesson</h2>
              <div className="dashboard__content-card-lesson">
                {activeSubject?.id === 'math' && (
                  <>
                    <p>
                      In this lesson we explore linear equations and how they describe relationships between two quantities. You&apos;ll learn to identify the slope and y-intercept from an equation in slope-intercept form, and to graph lines using these key features.
                    </p>
                    <p>
                      Slope tells us how steep a line is and whether it rises or falls as we move from left to right. We&apos;ll connect slope to real situations—like distance over time or cost per item—so you can interpret what the numbers mean in context. By the end of the lesson you&apos;ll be able to write equations from graphs and use them to make predictions.
                    </p>
                    <p>
                      We start with the slope-intercept form y = mx + b, where m is the slope and b is the y-intercept. From there we&apos;ll practice finding slope from two points using the formula, and we&apos;ll look at horizontal and vertical lines as special cases. You&apos;ll also work on converting between different forms of linear equations and deciding which form is most useful for a given problem.
                    </p>
                    <p>
                      Real-world applications include interpreting rate of change in scenarios like speed, growth, or cost per unit. We&apos;ll use graphs to visualize these relationships and connect the visual representation to the numbers in the equation.
                    </p>
                  </>
                )}
                {activeSubject?.id === 'science' && (
                  <>
                    <p>
                      This lesson introduces the structure and function of plant and animal cells. We&apos;ll compare the main organelles—such as the nucleus, mitochondria, and cell membrane—and explain how each part helps the cell carry out life processes.
                    </p>
                    <p>
                      You&apos;ll see how plant cells differ from animal cells (cell walls, chloroplasts, and large vacuoles) and why these differences matter for how organisms get energy and support their bodies. We&apos;ll use diagrams and real examples so you can identify cell structures and describe their roles in keeping organisms alive.
                    </p>
                    <p>
                      The nucleus holds the cell&apos;s DNA and controls which genes are turned on or off. The mitochondria are often called the powerhouse of the cell because they produce ATP, the energy currency that drives most cellular work. We&apos;ll trace how materials enter and leave the cell through the membrane and how plant cells use chloroplasts for photosynthesis.
                    </p>
                    <p>
                      By the end you&apos;ll be able to label a cell diagram, match each organelle to its function, and explain how the parts work together to maintain homeostasis and support the organism.
                    </p>
                  </>
                )}
                {activeSubject?.id === 'english' && (
                  <>
                    <p>
                      Today we focus on how authors build theme and use evidence to support their ideas. We&apos;ll read a short text and identify its central theme, then trace how specific details and character choices develop that theme over the course of the story.
                    </p>
                    <p>
                      You&apos;ll practice quoting accurately from the text and explaining how each quote supports your interpretation. We&apos;ll also look at the author&apos;s use of language—word choice, imagery, and tone—and discuss how these craft moves reinforce the theme. By the end you&apos;ll write a short paragraph that states a theme and backs it up with evidence.
                    </p>
                    <p>
                      Theme is different from a topic: a topic might be &quot;friendship,&quot; but a theme is the story&apos;s message or insight about that topic—for example, that true friendship sometimes requires sacrifice. We&apos;ll look at how characters&apos; actions, dialogue, and the consequences of their choices all contribute to the theme the author is building.
                    </p>
                    <p>
                      You&apos;ll also practice selecting the strongest evidence: quotes that are specific, relevant, and that you can explain clearly. We&apos;ll use a checklist to evaluate evidence and revise our paragraphs so our claims are well supported.
                    </p>
                  </>
                )}
                {activeSubject?.id === 'social' && (
                  <>
                    <p>
                      In this lesson we examine the causes and effects of the American Revolution. We&apos;ll look at the political and economic tensions between the colonies and Great Britain, including taxes, representation, and the ideas that influenced the colonists&apos; push for independence.
                    </p>
                    <p>
                      You&apos;ll trace key events from the Stamp Act and Boston Tea Party through the Declaration of Independence and the war. We&apos;ll discuss how different groups—colonists, Loyalists, and the British—viewed these events and how the outcome shaped the new nation&apos;s government and identity.
                    </p>
                    <p>
                      We&apos;ll pay special attention to the ideas of the Enlightenment—natural rights, consent of the governed, and the social contract—and how they appear in the Declaration. You&apos;ll see how colonists used pamphlets, speeches, and protests to build support for independence, and how the war affected not only soldiers but also families, enslaved people, and Native American nations.
                    </p>
                    <p>
                      By the end you&apos;ll be able to explain multiple causes of the Revolution, describe key turning points, and discuss how the new nation struggled to live up to its founding ideals in the years that followed.
                    </p>
                  </>
                )}
                {!activeSubject && (
                  <p>Select a subject to see today&apos;s lesson content.</p>
                )}
              </div>

              <section className="dashboard__content-card-video" aria-label="Lesson video">
                <h3 className="dashboard__content-card-video-title">Watch the lesson</h3>
                <div className="dashboard__content-card-video-wrap">
                  <img
                    src="https://placehold.co/1200x520/e5e5e5"
                    alt=""
                    className="dashboard__content-card-video-img"
                  />
                  <span className="dashboard__content-placeholder-label">Video player</span>
                </div>
                <p className="dashboard__content-card-video-caption">
                  Follow along with the video to see the lesson in action, then review the content above if you need to revisit any part.
                </p>
              </section>
            </div>
          </div>
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
            setOpenPanel((prev) => {
              const next = prev === 'recommended' ? null : 'recommended'
              persistTray(next)
              return next
            })
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
            setOpenPanel((prev) => {
              const next = prev === 'chat' ? null : 'chat'
              persistTray(next)
              return next
            })
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
