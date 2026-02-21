/**
 * Fake messages for the prototype.
 * thread: array of { from: 'them' | 'me', text: string, time: string } for back-and-forth in the conversation view.
 */
export const messages = [
  {
    id: '1',
    from: 'Ms. Chen',
    initials: 'MC',
    theme: 'blush',
    subject: 'Essay feedback ready',
    preview: 'I\'ve left comments on your draft. Take a look when you can.',
    time: '1 hour ago',
    unread: true,
    thread: [
      { from: 'them', text: 'Hi! I wanted to check in about your essay draft.', time: '10:42 AM' },
      { from: 'me', text: 'Thanks for following up. I submitted it last night.', time: '10:45 AM' },
      { from: 'them', text: 'I\'ve left comments on your draft. Take a look when you can.', time: '10:52 AM' },
      { from: 'me', text: 'I\'ll read through them today. Should I reply to each comment or just revise?', time: '11:01 AM' },
      { from: 'them', text: 'Either works—reply if you have questions, otherwise a revised draft is fine by Friday.', time: '11:08 AM' },
    ],
  },
  {
    id: '2',
    from: 'Mr. Davis',
    initials: 'MD',
    theme: 'olive',
    subject: 'Office hours this week',
    preview: 'I\'ll be available Wednesday 3–4 PM if you want to review the lab.',
    time: 'Yesterday',
    unread: false,
    thread: [
      { from: 'them', text: 'Reminder: Lab 3 is due this week. Let me know if you want to go over any of the problems.', time: 'Yesterday, 2:30 PM' },
      { from: 'me', text: 'I\'m stuck on the last two. Would office hours work?', time: 'Yesterday, 3:15 PM' },
      { from: 'them', text: 'I\'ll be available Wednesday 3–4 PM if you want to review the lab.', time: 'Yesterday, 4:00 PM' },
      { from: 'me', text: 'Perfect, I\'ll stop by. Thanks!', time: 'Yesterday, 4:12 PM' },
    ],
  },
  {
    id: '3',
    from: 'Study Group - Algebra',
    initials: 'SG',
    theme: 'steel',
    subject: 'Practice problems',
    preview: 'Anyone want to work through the review set together?',
    time: '2 days ago',
    unread: false,
    thread: [
      { from: 'them', text: 'Anyone want to work through the review set together?', time: '2 days ago' },
      { from: 'me', text: 'I\'m in. When are you free?', time: '2 days ago' },
      { from: 'them', text: 'How about tomorrow after 3? We could do a quick Zoom.', time: '2 days ago' },
      { from: 'me', text: 'Works for me. I\'ll send a link.', time: '2 days ago' },
    ],
  },
]
