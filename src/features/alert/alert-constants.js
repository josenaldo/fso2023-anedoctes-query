/**
 * The available types of alerts.
 *
 * @constant {Object} AlertTypes
 * @property {string} SUCCESS - The success alert type.
 * @property {string} INFO - The info alert type.
 * @property {string} WARNING - The warning alert type.
 * @property {string} ERROR - The error alert type.
 */
export const ALERT_TYPES = {
  SUCCESS: 'alert-success',
  INFO: 'alert-info',
  WARNING: 'alert-warning',
  ERROR: 'alert-error',
}

/**
 * The initial state for the alert slice when there is no alert to display.
 *
 * @constant {Object} NoAlertState
 * @property {string} type - The type of the alert (e.g. 'success', 'info', 'warning', 'error').
 * @property {string} message - The message to display in the alert.
 * @property {string} details - Optional details to display in the alert.
 * @property {Error} error - Optional error object to include in the alert.
 * @property {number} timeoutId - Optional ID of the timeout for the alert.
 */
export const NO_ALERT_STATE = {
  type: null,
  message: null,
  details: null,
  error: null,
  timeoutId: null,
}

/**
 * The default timeout in seconds for alerts.
 *
 * @constant {number} ALERT_TIMEOUT
 */
export const ALERT_TIMEOUT = 5

/**
 * The default timeout in seconds for error alerts.
 *
 * @constant {number} ERROR_ALERT_TIMEOUT
 */
export const ERROR_ALERT_TIMEOUT = 15
