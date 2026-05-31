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

function Workouts() {
  return (
    <ResourcePage
      resource="workouts"
      title="Workouts"
      description="Review suggested workouts, target fitness levels, and included activity types."
      columns={columns}
    />
  )
}

export default Workouts