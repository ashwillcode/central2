import { createContext, useContext, useState, useMemo, useCallback } from 'react'

const SUBJECT_COLORS = {
  math: 'steel',
  science: 'olive',
  english: 'blush',
  social: 'grape',
}

const SubjectColorContext = createContext(null)

const DEFAULT_SUBJECT_ID = 'math'
const STORAGE_KEY_SUBJECT = 'central2-player-subject'

function getStoredSubject() {
  try {
    const v = localStorage.getItem(STORAGE_KEY_SUBJECT)
    if (v && SUBJECT_COLORS[v]) return v
  } catch {}
  return DEFAULT_SUBJECT_ID
}

export function SubjectColorProvider({ children }) {
  const [dashboardSubjectId, setState] = useState(getStoredSubject)
  const setDashboardSubjectId = useCallback((id) => {
    setState(id)
    try {
      if (id && SUBJECT_COLORS[id]) localStorage.setItem(STORAGE_KEY_SUBJECT, id)
    } catch {}
  }, [])
  const subjectColor = useMemo(
    () => SUBJECT_COLORS[dashboardSubjectId] ?? SUBJECT_COLORS[DEFAULT_SUBJECT_ID],
    [dashboardSubjectId]
  )
  const value = useMemo(
    () => ({
      subjectColor,
      dashboardSubjectId,
      setDashboardSubjectId,
    }),
    [subjectColor, dashboardSubjectId, setDashboardSubjectId]
  )
  return (
    <SubjectColorContext.Provider value={value}>
      {children}
    </SubjectColorContext.Provider>
  )
}

export function useSubjectColor() {
  const ctx = useContext(SubjectColorContext)
  return (
    ctx || {
      subjectColor: null,
      dashboardSubjectId: null,
      setDashboardSubjectId: () => {},
    }
  )
}
