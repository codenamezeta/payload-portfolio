import { formatDateTime } from 'src/utilities/formatDateTime'
import React from 'react'

import type { PortfolioItem } from '@/payload-types'

import { Media } from '@/components/Media'

import { buttonVariants } from '@/components/ui/button'
import Link from 'next/link'
import { Categories } from '@/collections/Categories'

export const PortfolioItemHero: React.FC<{
  portfolioItem: PortfolioItem
}> = ({ portfolioItem }) => {
  const { projectType, categories, heroImage, publishedAt, title } = portfolioItem

  // const hasAuthors =
  //   populatedAuthors && populatedAuthors.length > 0 && formatAuthors(populatedAuthors) !== ''

  return (
    <div className="relative -mt-[10.4rem] flex items-end">
      <div className="container z-10 relative lg:grid lg:grid-cols-[1fr_48rem_1fr] text-white pb-8">
        <div className="col-start-1 col-span-1 md:col-start-2 md:col-span-2">
          <h1 className="mb-6 text-3xl md:text-5xl lg:text-6xl">{title}</h1>
          <div className="text-sm mb-6 flex gap-8">
            {projectType && (
              <div className="text-sm font-semibold flex flex-col">
                <span className="font-normal">Category:</span>
                <span className="uppercase font-bold tracking-wide">{projectType}</span>
              </div>
            )}
            {Categories && (
              <div className="text-sm font-semibold flex flex-col">
                <span className="font-normal">Project Type:</span>
                {categories?.map((category, index) => {
                  if (typeof category === 'object' && category !== null) {
                    const { title: categoryTitle } = category
                    const isLast = index === categories.length - 1

                    return (
                      <span key={index} className="uppercase font-bold tracking-wide">
                        {categoryTitle}
                        {!isLast && <React.Fragment>, &nbsp;</React.Fragment>}
                      </span>
                    )
                  }
                  return null
                })}
              </div>
            )}
            {/* {publishedAt && (
              <div className="flex flex-col gap-1">
                <span className="text-sm">Date Published:</span>
                <time dateTime={publishedAt} className="uppercase font-bold tracking-wide">
                  {formatDateTime(publishedAt)}
                </time>
              </div>
            )} */}
          </div>

          {(portfolioItem.projectLinks?.liveSiteUrl || portfolioItem.projectLinks?.githubUrl) && (
            <div className="flex flex-wrap gap-3 mt-4">
              {portfolioItem.projectLinks?.liveSiteUrl && (
                <Link
                  href={portfolioItem.projectLinks.liveSiteUrl}
                  className={buttonVariants({ variant: 'default' })}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="mr-2">🚀</span> View Live Project
                </Link>
              )}

              {portfolioItem.projectLinks?.githubUrl && (
                <Link
                  href={portfolioItem.projectLinks.githubUrl}
                  className={buttonVariants({ variant: 'outline' })}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="mr-2">💻</span> View Source Code
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
      <div className="min-h-[80vh] select-none">
        {heroImage && typeof heroImage !== 'string' && (
          <Media fill priority imgClassName="-z-10 object-cover" resource={heroImage} />
        )}
        <div className="absolute pointer-events-none left-0 bottom-0 w-full h-1/2 bg-gradient-to-t from-black to-transparent" />
      </div>
    </div>
  )
}
