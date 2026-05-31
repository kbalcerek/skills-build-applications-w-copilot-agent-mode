import ResourcePage from './ResourcePage.jsx'

const columns = [
  {
    label: 'Rank',
    getValue: (entry) => entry.rank,
  },
  {
    label: 'Points',
    getValue: (entry) => entry.points,
  },
  {
    label: 'Period',
    getValue: (entry) => entry.period,
  },
  {
    label: 'User',
    getValue: (entry) => entry.user,
  },
  {
    label: 'Team',
    getValue: (entry) => entry.team,
  },
]

const codespaceEndpoint = `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`
const fallbackEndpoint = 'http://localhost:8000/api/leaderboard/'

function Leaderboard() {
  return (
    <ResourcePage
      resource="leaderboard"
      title="Leaderboard"
      description="Surface competitive standings with ranks, points, and the period each entry covers."
      columns={columns}
      codespaceEndpoint={codespaceEndpoint}
      fallbackEndpoint={fallbackEndpoint}
    />
  )
}

export default Leaderboard