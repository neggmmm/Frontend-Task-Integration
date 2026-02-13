import { toast } from 'react-toastify'

export function showToast(message: string, type: 'success' | 'error' | 'info' = 'info') {
  toast[type](message, {
    position: 'bottom-right',
    closeOnClick: true,
    pauseOnHover: false,
  })
}
