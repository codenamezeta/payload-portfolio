import PortfolioViewer from '@/components/PortfolioViewer'

export const metadata = {
  title: 'Portfolio | Michael Zeta',
  description: 'View my portfolio of web development and design projects',
}

export default async function Portfolio() {
  return (
    <div className="container py-16">
      <h1 className="text-4xl font-bold mb-8">Michael Zeta&apos;s Portfolio</h1>
      <PortfolioViewer sort="-publishedAt" />
    </div>
  )
}
