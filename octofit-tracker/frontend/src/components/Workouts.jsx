import ResourcePage from './ResourcePage.jsx'

const columns = [
  {
    label: 'Workout',
    getValue: (workout) => workout.title,
  },
  {
    label: 'Description',
    getValue: (workout) => workout.description,
  },
  {
    label: 'Fitness level',
    getValue: (workout) => workout.fitnessLevel,
  },
  {
    label: 'Duration',
    getValue: (workout) => workout.durationMinutes,
    formatter: (value) => (value ? `${value} min` : 'Not available'),
  },
  {
    label: 'Activities',
    getValue: (workout) => workout.activityTypes,
  },
]

const codespaceEndpoint = `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`
const fallbackEndpoint = 'http://localhost:8000/api/workouts/'

function Workouts() {
  return (
    <ResourcePage
      resource="workouts"
      title="Workouts"
      description="Review suggested workouts, target fitness levels, and included activity types."
      columns={columns}
      codespaceEndpoint={codespaceEndpoint}
      fallbackEndpoint={fallbackEndpoint}
    />
  )
}

export default Workouts