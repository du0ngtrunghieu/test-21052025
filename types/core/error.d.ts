/**
 * Error object type
 */
export interface ErrorObject extends Error {
  statusCode?: number
  url?: string
  message: string
  stack?: string
}

/**
 * Error page component properties
 */
export interface ErrorPageProps {
  error: ErrorObject
}
