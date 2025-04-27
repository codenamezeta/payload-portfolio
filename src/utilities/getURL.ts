import canUseDOM from './canUseDOM'

export const getServerSideURL = () => {
  let url = process.env.NEXT_PUBLIC_SERVER_URL

  if (!url && process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  }

  if (!url) {
    url = 'http://localhost:3000'
  }

  return url
}

export const getClientSideURL = () => {
  if (canUseDOM) {
    const protocol = window.location.protocol
    const domain = window.location.hostname
    const port = window.location.port

    return `${protocol}//${domain}${port ? `:${port}` : ''}`
  }

  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  }

  return process.env.NEXT_PUBLIC_SERVER_URL || ''
}

// Add this new function to handle media URLs properly
export const getMediaURL = (url?: string | null): string => {
  if (!url) return ''

  // Check if the URL is already absolute
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url
  }

  // Check if it's a Vercel Blob URL without protocol
  if (url.includes('public.blob.vercel-storage.com')) {
    return `https://${url}`
  }

  // Otherwise it's a relative URL, so prepend the server URL
  const baseURL = getClientSideURL()
  const formattedURL = url.startsWith('/') ? url : `/${url}`

  return `${baseURL}${formattedURL}`
}
