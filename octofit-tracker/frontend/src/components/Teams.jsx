import ResourcePage from './ResourcePage.jsx'

const columns = [
  {
    label: 'Team',
    getValue: (team) => team.name,
  },
  {
    label: 'Description',
    getValue: (team) => team.description,
  },
  {
    label: 'Members',
    getValue: (team) => team.members,
    formatter: (members) => (Array.isArray(members) ? `${members.length} members` : '0 members'),
  },
]

const codespaceEndpoint = `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/teams/`
const fallbackEndpoint = 'http://localhost:8000/api/teams/'

function Teams() {
  return (
    <ResourcePage
      resource="teams"
      title="Teams"
      description="Track team creation, descriptions, and roster sizes for group competition."
      columns={columns}
      codespaceEndpoint={codespaceEndpoint}
      fallbackEndpoint={fallbackEndpoint}
    />
  )
}

export default Teams