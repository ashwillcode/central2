import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useSubjectColor } from '../context/SubjectColorContext'
import * as Tabs from '@radix-ui/react-tabs'
import { notifications } from '../data/notifications'
import { messages } from '../data/messages'

const iconSize = 16

const icons = {
  bell: (
    <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  ),
  envelope: (
    <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  ),
  home: (
    <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  ),
  profile: (
    <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  ),
}

const menuIconSize = 20
const menuIcons = {
  assignment: (
    <svg width={menuIconSize} height={menuIconSize} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  ),
  calendar: (
    <svg width={menuIconSize} height={menuIconSize} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  ),
  comment: (
    <svg width={menuIconSize} height={menuIconSize} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  ),
  message: (
    <svg width={menuIconSize} height={menuIconSize} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  ),
}

function LeftNav() {
  const location = useLocation()
  const { subjectColor } = useSubjectColor()
  const [openMenu, setOpenMenu] = useState(null)
  const [notificationFilter, setNotificationFilter] = useState('today')
  const [selectedMessageId, setSelectedMessageId] = useState(null)
  const [showComposeMessage, setShowComposeMessage] = useState(false)
  const [composeTo, setComposeTo] = useState('')
  const menuRef = useRef(null)
  const threadBubblesRef = useRef(null)

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/'
    return location.pathname.startsWith(path)
  }

  const toggleMenu = (menu) => {
    setOpenMenu((prev) => (prev === menu ? null : menu))
    setSelectedMessageId(null)
    setShowComposeMessage(false)
    setComposeRecipientId(null)
  }

  useEffect(() => {
    if (!openMenu) return
    const handleClickOutside = (e) => {
      const target = e.target
      if (target.closest('.left-nav__menu') || target.closest('.left-nav')) return
      setOpenMenu(null)
      setSelectedMessageId(null)
      setShowComposeMessage(false)
    }
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [openMenu])

  useEffect(() => {
    if (!selectedMessageId) return
    const el = threadBubblesRef.current
    if (!el) return
    const scrollToBottom = () => { el.scrollTop = el.scrollHeight }
    scrollToBottom()
    requestAnimationFrame(scrollToBottom)
  }, [selectedMessageId])

  return (
    <nav className="left-nav" aria-label="Main navigation">
      <div className="left-nav__top">
        <button
          type="button"
          className={`left-nav__icon ${openMenu === 'notifications' ? 'left-nav__icon--menu-open' : ''}`}
          aria-label="Notifications"
          aria-expanded={openMenu === 'notifications'}
          onClick={(e) => {
            e.stopPropagation()
            toggleMenu('notifications')
          }}
        >
          {icons.bell}
        </button>
        <button
          type="button"
          className={`left-nav__icon ${openMenu === 'messages' ? 'left-nav__icon--menu-open' : ''}`}
          aria-label="Messages"
          aria-expanded={openMenu === 'messages'}
          onClick={(e) => {
            e.stopPropagation()
            if (openMenu === 'messages') return
            setOpenMenu('messages')
          }}
        >
          {icons.envelope}
        </button>
      </div>

      {openMenu && (
        <div
          ref={menuRef}
          className={`left-nav__menu left-nav__menu--${openMenu} ${openMenu === 'messages' && (selectedMessageId || showComposeMessage) ? 'left-nav__menu--thread' : ''}`}
          role="dialog"
          aria-label={openMenu === 'notifications' ? 'Notifications' : 'Messages'}
        >
          {openMenu === 'notifications' && (
            <div className="left-nav__menu-content">
              <div className="left-nav__menu-header">
                <h3 className="left-nav__menu-title">Notifications</h3>
                <Tabs.Root
                  className={`left-nav__menu-tabs left-nav__menu-tabs--${notificationFilter}`}
                  value={notificationFilter}
                  onValueChange={setNotificationFilter}
                >
                  <Tabs.List className="left-nav__menu-toggle" aria-label="Filter by time">
                    <span className="left-nav__menu-toggle-slider" aria-hidden />
                    <Tabs.Trigger className="left-nav__menu-toggle-btn" value="today">
                      Today
                    </Tabs.Trigger>
                    <Tabs.Trigger className="left-nav__menu-toggle-btn" value="this-week">
                      This Week
                    </Tabs.Trigger>
                  </Tabs.List>
                </Tabs.Root>
              </div>
              {(() => {
                const filtered = notifications.filter((n) => n.period === notificationFilter)
                if (filtered.length === 0) {
                  const isToday = notificationFilter === 'today'
                  return (
                    <div className="left-nav__menu-empty" role="status" aria-live="polite">
                      <div className="left-nav__menu-empty-illustration" aria-hidden>
                        <span className="left-nav__menu-empty-sparkle left-nav__menu-empty-sparkle--3">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12h14" strokeLinecap="round" /></svg>
                        </span>
                        <span className="left-nav__menu-empty-sparkle left-nav__menu-empty-sparkle--2">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12h14" strokeLinecap="round" /></svg>
                        </span>
                        <span className="left-nav__menu-empty-dot left-nav__menu-empty-dot--1" />
                        <span className="left-nav__menu-empty-dot left-nav__menu-empty-dot--4" />
                        <span className="left-nav__menu-empty-dot left-nav__menu-empty-dot--5" />
                        <span className="left-nav__menu-empty-dot left-nav__menu-empty-dot--6" />
                        <span className="left-nav__menu-empty-icon">
                          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                            <g className="left-nav__menu-empty-icon-clapper">
                              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                            </g>
                          </svg>
                        </span>
                      </div>
                      <p className="left-nav__menu-empty-title">
                        {isToday ? 'No notifications today!' : 'No notifications this week!'}
                      </p>
                      <p className="left-nav__menu-empty-body">
                        We'll notify you when there's something new.
                      </p>
                    </div>
                  )
                }
                const shown = filtered.slice(0, 5)
                return (
                  <>
                    <ul className="left-nav__menu-list">
                      {shown.map((n, index) => (
                        <li key={n.id} className={`left-nav__menu-item left-nav__menu-item--with-icon ${n.read ? 'left-nav__menu-item--read' : ''}`}>
                          {index > 0 && <hr className="left-nav__menu-hr" />}
                          <div className={`left-nav__menu-item-content left-nav__menu-item-content--theme-${n.theme || 'steel'}`}>
                            <span className={`left-nav__menu-item-icon left-nav__menu-item-icon--notification left-nav__menu-item-icon--notification-${n.theme || 'steel'}`} aria-hidden>
                              {menuIcons[n.icon] || menuIcons.assignment}
                            </span>
                            <span className="left-nav__menu-item-text">
                              <span className="left-nav__menu-item-title">{n.title}</span>
                              <span className="left-nav__menu-item-body">{n.body}</span>
                              <span className="left-nav__menu-item-time">{n.time}</span>
                            </span>
                          </div>
                        </li>
                      ))}
                    </ul>
                    {filtered.length > 0 && (
                      <Link to="/" className="left-nav__menu-see-more" onClick={() => setOpenMenu(null)}>
                        See More
                      </Link>
                    )}
                  </>
                )
              })()}
            </div>
          )}
          {openMenu === 'messages' && (
            <div className={`left-nav__menu-content ${selectedMessageId ? 'left-nav__menu-content--thread' : ''} ${showComposeMessage ? 'left-nav__menu-content--compose' : ''}`}>
              {showComposeMessage ? (
                <>
                  <header className="left-nav__menu-thread-header-bar">
                    <span className="left-nav__menu-thread-contact">New message</span>
                    <button
                      type="button"
                      className="left-nav__menu-back"
                      onClick={(e) => {
                        e.stopPropagation()
                        setShowComposeMessage(false)
                        setComposeTo('')
                      }}
                      aria-label="Back to messages"
                    >
                      ←
                    </button>
                  </header>
                  <div className="left-nav__menu-compose">
                    <div className="left-nav__menu-compose-to-row">
                      <label className="left-nav__menu-compose-label" htmlFor="compose-to">
                        To
                      </label>
                      <input
                        id="compose-to"
                        type="text"
                        className="left-nav__menu-reply-input left-nav__menu-compose-to"
                        placeholder="Type recipients name..."
                        value={composeTo}
                        onChange={(e) => setComposeTo(e.target.value)}
                        aria-label="Choose recipient"
                      />
                    </div>
                    <div className="left-nav__menu-compose-body">
                      <div className="left-nav__menu-thread-window left-nav__menu-thread-window--grape">
                        <div className="left-nav__menu-thread-reply">
                          <textarea
                            className="left-nav__menu-reply-input"
                            placeholder="Type your message..."
                            rows={2}
                            readOnly
                            aria-label="Message (demo)"
                          />
                          <button type="button" className="left-nav__menu-send-btn" disabled aria-label="Send (demo)">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M22 2L11 13" />
                              <path d="M22 2L15 22L11 13L2 9L22 2Z" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : selectedMessageId ? (() => {
                const message = messages.find((m) => m.id === selectedMessageId)
                if (!message) return null
                return (
                  <>
                    <header className="left-nav__menu-thread-header-bar">
                      <span className="left-nav__menu-thread-contact">{message.from}</span>
                      <button
                        type="button"
                        className="left-nav__menu-back"
                        onClick={(e) => {
                          e.stopPropagation()
                          setSelectedMessageId(null)
                        }}
                        aria-label="Back to messages"
                      >
                        ←
                      </button>
                    </header>
                    <div className="left-nav__menu-thread">
                      <div className={`left-nav__menu-thread-window left-nav__menu-thread-window--${message.theme || 'steel'}`}>
                        <div ref={threadBubblesRef} className="left-nav__menu-thread-bubbles">
                          {(message.thread || [{ from: 'them', text: message.preview, time: message.time }]).map((bubble, i) => (
                            <div
                              key={i}
                              className={`left-nav__menu-bubble left-nav__menu-bubble--${bubble.from}`}
                            >
                              <p className="left-nav__menu-bubble-text">{bubble.text}</p>
                              <span className="left-nav__menu-bubble-time">{bubble.time}</span>
                            </div>
                          ))}
                        </div>
                        <div className="left-nav__menu-thread-reply">
                          <textarea
                            className="left-nav__menu-reply-input"
                            placeholder="Type something..."
                            rows={2}
                            readOnly
                            aria-label="Reply to message (demo)"
                          />
                          <button type="button" className="left-nav__menu-send-btn" disabled aria-label="Send (demo)">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M22 2L11 13" />
                              <path d="M22 2L15 22L11 13L2 9L22 2Z" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </>
                )
              }              )() : (
                <>
                  <div className="left-nav__menu-header left-nav__menu-header--with-action">
                    <h3 className="left-nav__menu-title">Messages</h3>
                    <button
                      type="button"
                      className="left-nav__menu-plus"
                      onClick={(e) => {
                        e.stopPropagation()
                        setShowComposeMessage(true)
                        setSelectedMessageId(null)
                      }}
                      aria-label="New message"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 5v14M5 12h14" />
                      </svg>
                    </button>
                  </div>
                  <ul className="left-nav__menu-list">
                    {messages.slice(0, 5).map((m, index) => (
                      <li key={m.id} className={`left-nav__menu-item left-nav__menu-item--with-icon ${m.unread ? 'left-nav__menu-item--unread' : ''}`}>
                        {index > 0 && <hr className="left-nav__menu-hr" />}
                        <button
                          type="button"
                          className={`left-nav__menu-item-content left-nav__menu-item-content--button left-nav__menu-item-content--theme-${m.theme || 'steel'}`}
                          onClick={(e) => {
                            e.stopPropagation()
                            setSelectedMessageId(m.id)
                          }}
                        >
                          <span className={`left-nav__menu-item-avatar left-nav__menu-item-avatar--${m.theme || 'steel'}`} aria-hidden>
                            {m.initials || m.from.slice(0, 2).toUpperCase()}
                          </span>
                          <span className="left-nav__menu-item-text">
                            <span className="left-nav__menu-item-from">{m.from}</span>
                            <span className="left-nav__menu-item-subject">{m.subject}</span>
                            <span className="left-nav__menu-item-preview">{m.preview}</span>
                            <span className="left-nav__menu-item-time">{m.time}</span>
                          </span>
                        </button>
                      </li>
                    ))}
                  </ul>
                  {messages.length > 0 && (
                    <Link to="/messages" className="left-nav__menu-see-more" onClick={() => setOpenMenu(null)}>
                      See More
                    </Link>
                  )}
                </>
              )}
            </div>
          )}
        </div>
      )}

      <div className="left-nav__middle">
        <Link
          to="/"
          className={`left-nav__item ${isActive('/') ? 'left-nav__item--active' : ''} ${isActive('/') && subjectColor ? `left-nav__item--active--${subjectColor}` : ''}`}
          aria-label="Home - Dashboard"
        >
          {icons.home}
        </Link>
        <Link
          to="/profile"
          className={`left-nav__item ${isActive('/profile') ? 'left-nav__item--active' : ''}`}
          aria-label="Profile"
        >
          {icons.profile}
        </Link>
      </div>
    </nav>
  )
}

export default LeftNav
