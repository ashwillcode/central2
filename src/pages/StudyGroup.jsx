import { Link } from 'react-router-dom'

function StudyGroup() {
  return (
    <main className="page study-group">
      <h1>Study together</h1>
      <p>Study group concept – placeholder. (Notes, points, clues for peers.)</p>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/learn">Learning</Link>
      </nav>
    </main>
  )
}

export default StudyGroup
