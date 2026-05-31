import { useEffect, useState } from 'react'

const getApiBaseUrl = () => {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME

  if (codespaceName) {
    return `https://${codespaceName}-8000.app.github.dev/api`
  }

  return 'http://localhost:8000/api'
}

const formatValue = (value, formatter) => {
  if (formatter) {
    return formatter(value)
  }

  if (value == null || value === '') {
    return 'Not available'
  }

  if (Array.isArray(value)) {
    return value.length > 0 ? value.join(', ') : 'None'
  }

  if (typeof value === 'object') {
    return JSON.stringify(value)
  }

  return String(value)
}

const normalizePayload = (payload) => {
  if (Array.isArray(payload)) {
    return {
      items: payload,
      meta: {
        total: payload.length,
      },
    }
  }

  const items =
    payload?.items ??
    payload?.results ??
    payload?.data ??
    payload?.documents ??
    payload?.docs ??
    []

  return {
    items: Array.isArray(items) ? items : [],
    meta: {
      total: payload?.total ?? payload?.count ?? payload?.totalCount ?? items.length ?? 0,
      page: payload?.page ?? payload?.currentPage ?? null,
      pageSize: payload?.pageSize ?? payload?.perPage ?? null,
    },
  }
}

function ResourcePage({ resource, title, description, columns }) {
  const [items, setItems] = useState([])
  const [meta, setMeta] = useState({ total: 0, page: null, pageSize: null })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const controller = new AbortController()
    const endpoint = `${getApiBaseUrl()}/${resource}/`

    const loadResource = async () => {
      setLoading(true)
      setError('')

      try {
        const response = await fetch(endpoint, { signal: controller.signal })

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`)
        }

        const payload = await response.json()
        const normalized = normalizePayload(payload)
        setItems(normalized.items)
        setMeta(normalized.meta)
      } catch (fetchError) {
        if (fetchError.name !== 'AbortError') {
          setItems([])
          setMeta({ total: 0, page: null, pageSize: null })
          setError(fetchError.message)
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      }
    }

    void loadResource()

    return () => {
      controller.abort()
    }
  }, [resource])

  return (
    <section className="resource-view">
      <div className="section-header">
        <div>
          <div className="section-label">API resource</div>
          <h2>{title}</h2>
        </div>
        <div className="section-meta">
          <span>{meta.total} records</span>
          {meta.page && meta.pageSize ? (
            <span>
              Page {meta.page} of {Math.max(1, Math.ceil(meta.total / meta.pageSize))}
            </span>
          ) : null}
        </div>
      </div>

      <p className="section-description">{description}</p>

      {!import.meta.env.VITE_CODESPACE_NAME ? (
        <div className="alert alert-warning env-alert" role="alert">
          VITE_CODESPACE_NAME is not set. Using the local fallback API base URL at
          {' '}
          http://localhost:8000/api.
        </div>
      ) : null}

      {error ? (
        <div className="alert alert-danger" role="alert">
          Unable to load {title.toLowerCase()}: {error}
        </div>
      ) : null}

      <div className="table-responsive data-table-shell">
        <table className="table align-middle data-table">
          <thead>
            <tr>
              {columns.map((column) => (
                <th key={column.label} scope="col">
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={columns.length} className="empty-state">
                  Loading {title.toLowerCase()}...
                </td>
              </tr>
            ) : null}
            {!loading && items.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="empty-state">
                  No data returned from the {resource} endpoint.
                </td>
              </tr>
            ) : null}
            {!loading
              ? items.map((item) => (
                  <tr key={item._id ?? item.id ?? JSON.stringify(item)}>
                    {columns.map((column) => (
                      <td key={column.label}>{formatValue(column.getValue(item), column.formatter)}</td>
                    ))}
                  </tr>
                ))
              : null}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default ResourcePage