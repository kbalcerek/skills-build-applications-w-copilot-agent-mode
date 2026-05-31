import ResourcePage from './ResourcePage.jsx'

const columns = [
  {
    label: 'Type',
    getValue: (activity) => activity.type,
  },
  {
    label: 'Duration',
    getValue: (activity) => activity.durationMinutes,
    formatter: (value) => (value ? `${value} min` : 'Not available'),
  },
  {
    label: 'Distance',
    getValue: (activity) => activity.distanceMiles,
    formatter: (value) => (value != null ? `${value} mi` : 'Not available'),
  },
  {
    label: 'Calories',
    getValue: (activity) => activity.caloriesBurned,
    formatter: (value) => (value != null ? `${value} kcal` : 'Not available'),
  },
  {
    label: 'Logged',
    getValue: (activity) => activity.loggedAt,
    formatter: (value) => (value ? new Date(value).toLocaleString() : 'Not available'),
  },
]

function Activities() {
  return (
    <ResourcePage
      resource="activities"
      title="Activities"
      description="Monitor logged activity types, workout durations, calorie burn, and timestamps."
      columns={columns}
    />
  )
}

export default Activities