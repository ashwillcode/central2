/**
 * Fake notifications for the prototype.
 */
/**
 * period: 'today' | 'this-week' – for the Today / This Week filter.
 * Use 'this-week' for items that should only show when "This Week" is selected (Today shows empty state).
 */
/** theme: 'blush' | 'olive' | 'steel' – color for icon and row hover */
export const notifications = [
  {
    id: '1',
    icon: 'assignment',
    theme: 'blush',
    title: 'Algebra assignment due tomorrow',
    body: 'Unit 4 Quiz is due by 11:59 PM.',
    time: 'Tuesday',
    read: false,
    period: 'this-week',
  },
  {
    id: '2',
    icon: 'calendar',
    theme: 'olive',
    title: 'Live session reminder',
    body: 'History live session starts at 2:00 PM Wednesday.',
    time: 'Monday',
    read: false,
    period: 'this-week',
  },
  {
    id: '3',
    icon: 'comment',
    theme: 'steel',
    title: 'New comment on your post',
    body: 'Ms. Chen replied to your discussion in English.',
    time: 'Last week',
    read: true,
    period: 'this-week',
  },
]
