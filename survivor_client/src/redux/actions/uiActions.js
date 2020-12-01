import { CLEAR_ERRORS, CLEAR_MESSAGE } from '../types'

export const clearAllAlerts = () => dispatch => {
  dispatch({ type: CLEAR_ERRORS })
  dispatch({ type: CLEAR_MESSAGE })
}
