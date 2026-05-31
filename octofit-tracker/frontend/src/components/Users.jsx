import ResourcePage from './ResourcePage.jsx'

const columns = [
  {
    label: 'Name',
    getValue: (user) => user.name,
  },
  {
    label: 'Email',
    getValue: (user) => user.email,
  },
  {
    label: 'Role',
    getValue: (user) => user.role,
  },
  {
    label: 'Fitness level',
    getValue: (user) => user.fitnessLevel,
  },
]

const codespaceEndpoint = `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/users/`
const fallbackEndpoint = 'http://localhost:8000/api/users/'

function Users() {
  return (
    <ResourcePage
      resource="users"
      title="Users"
      description="Review user profiles, roles, and current fitness levels from the backend service."
      columns={columns}
      codespaceEndpoint={codespaceEndpoint}
      fallbackEndpoint={fallbackEndpoint}
    />
  )
}

export default Users