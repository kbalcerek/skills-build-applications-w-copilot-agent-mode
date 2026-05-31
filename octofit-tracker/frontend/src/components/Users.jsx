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

function Users() {
  return (
    <ResourcePage
      resource="users"
      title="Users"
      description="Review user profiles, roles, and current fitness levels from the backend service."
      columns={columns}
    />
  )
}

export default Users