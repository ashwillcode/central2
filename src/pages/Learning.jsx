import { Link } from 'react-router-dom'

function Learning() {
  return (
    <main className="page learning">
      <h1>Learning</h1>
      <p>Interactive learning experience – placeholder. (Notes in lesson, points, clues, warmup.)</p>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/study">Study group</Link>
      </nav>
    </main>
  )
}

export default Learning
