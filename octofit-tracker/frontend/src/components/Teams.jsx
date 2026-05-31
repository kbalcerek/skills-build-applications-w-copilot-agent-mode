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

function Teams() {
  return (
    <ResourcePage
      resource="teams"
      title="Teams"
      description="Track team creation, descriptions, and roster sizes for group competition."
      columns={columns}
    />
  )
}

export default Teams