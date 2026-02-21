import { createContext, useContext, useState, useMemo } from 'react'

const SUBJECT_COLORS = {
  math: 'steel',
  science: 'olive',
  english: 'blush',
  social: 'grape',
}

const SubjectColorContext = createContext(null)

export function SubjectColorProvider({ children }) {
  const [dashboardSubjectId, setDashboardSubjectId] = useState(null)
  const subjectColor = useMemo(
    () => (dashboardSubjectId ? SUBJECT_COLORS[dashboardSubjectId] ?? null : null),
    [dashboardSubjectId]
  )
  const value = useMemo(
    () => ({
      subjectColor,
      dashboardSubjectId,
      setDashboardSubjectId,
    }),
    [subjectColor, dashboardSubjectId]
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
