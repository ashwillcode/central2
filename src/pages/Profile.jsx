import { Link } from 'react-router-dom'

function Profile() {
  return (
    <div className="page profile-page">
      <h1>Profile</h1>
      <p>Profile area — placeholder. (Settings, account, preferences.)</p>
      <Link to="/">Back to dashboard</Link>
    </div>
  )
}

export default Profile
