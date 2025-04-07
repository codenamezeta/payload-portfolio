import Link from 'next/link'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { draftMode } from 'next/headers'
import { Media } from '@/components/Media'
// import { Button } from '@/components/ui/button'

export default async function PortfolioViewer({ sort = '-publishedAt' }) {
  const { isEnabled: draft } = await draftMode()
  const payload = await getPayload({ config: configPromise })

  const portfolioItems = await payload.find({
    collection: 'portfolio',
    draft,
    limit: 100,
    sort: sort,
  })

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {portfolioItems.docs.map((item) => (
        <Link
          key={item.id}
          href={`/portfolio/${item.slug}`}
          className="block group bg-card rounded-lg overflow-hidden shadow-lg hover:shadow-xl hover:border hover:border-3 hover:border-primary transition-shadow duration-300 h-full"
        >
          {item.meta?.image && (
            <div className="aspect-video overflow-hidden">
              <Media
                resource={item.meta.image}
                alt={item.title || 'Portfolio image'}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          )}

          <div className="p-6">
            <span className="text-muted-foreground mb-4 mr-4">{item.projectType}</span>
            {/* {item.publishedAt && (
              <span className="text-muted-foreground mb-4 mr-4">
                {new Date(item.publishedAt).toLocaleDateString('en-US', {
                  month: 'long',
                  year: 'numeric',
                })}
              </span>
            )} */}
            {item.categories &&
              item.categories?.map((category, index) => {
                if (typeof category === 'object' && category !== null) {
                  const { title: categoryTitle } = category

                  return (
                    <span key={index} className="text-muted-foreground mb-4">
                      {categoryTitle}
                    </span>
                  )
                }
                return null
              })}

            <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
            <p className="text-muted-foreground mb-4">{item.meta?.description}</p>

            <div className="flex flex-wrap gap-2">
              {item.technologies &&
                item.technologies.slice(0, 4).map((tech, i) => (
                  <span key={i} className="bg-accent px-3 py-1 rounded-full text-sm">
                    {tech.technology}
                  </span>
                ))}
            </div>
            {/* {item.projectLinks?.liveSiteUrl && (
              <Button className="text-muted-foreground mb-4">View Live Site</Button>
            )}
            {item.projectLinks?.githubUrl && (
              <Button className="text-muted-foreground mb-4">GitHub</Button>
            )} */}
          </div>
        </Link>
      ))}
    </div>
  )
}
