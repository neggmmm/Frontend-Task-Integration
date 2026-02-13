import { toast } from 'react-toastify'

export function showToast(message: string, type: 'success' | 'error' | 'info' = 'info') {
    toast[type](message, {
        position: "top-right",
        autoClose: 2000,
        closeOnClick: false,
        pauseOnHover: true,
        theme: "dark",
    })
}
