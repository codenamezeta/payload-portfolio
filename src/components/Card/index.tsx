'use client'
import { cn } from '@/utilities/ui'
import useClickableCard from '@/utilities/useClickableCard'
import Link from 'next/link'
import React, { Fragment } from 'react'

import type { PortfolioItem, Post } from '@/payload-types'

import { Media } from '@/components/Media'

export type CardPostData =
  | Pick<Post, 'slug' | 'categories' | 'meta' | 'title'>
  | Pick<PortfolioItem, 'slug' | 'categories' | 'meta' | 'title'>

export const Card: React.FC<{
  alignItems?: 'center'
  className?: string
  doc?: CardPostData
  relationTo?: 'posts' | 'portfolio'
  showCategories?: boolean
  title?: string
}> = (props) => {
  const { card, link } = useClickableCard({})
  const { className, doc, relationTo, showCategories, title: titleFromProps } = props

  const { slug, categories, meta, title } = doc || {}
  const { description, image: metaImage } = meta || {}

  // Get technologies directly from doc (it's a top-level property in PortfolioItem)
  const technologies =
    relationTo === 'portfolio' && 'technologies' in (doc || {})
      ? (doc as PortfolioItem).technologies
      : undefined

  const hasCategories = categories && Array.isArray(categories) && categories.length > 0
  const titleToUse = titleFromProps || title
  const sanitizedDescription = description?.replace(/\s/g, ' ') // replace non-breaking space with white space
  const href = `/${relationTo}/${slug}`

  return (
    <article
      className={cn(
        'border border-border rounded-lg overflow-hidden bg-card hover:cursor-pointer',
        className,
      )}
      ref={card.ref}
    >
      <div className="relative w-full ">
        {!metaImage && <div className="">No image</div>}
        {metaImage && typeof metaImage !== 'string' && <Media resource={metaImage} size="33vw" />}
      </div>
      <div className="p-4">
        {showCategories && hasCategories && (
          <div className="uppercase text-sm mb-4">
            {showCategories && hasCategories && (
              <div>
                {categories?.map((category, index) => {
                  if (typeof category === 'object') {
                    const { title: titleFromCategory } = category

                    const categoryTitle = titleFromCategory || 'Untitled category'

                    const isLast = index === categories.length - 1

                    return (
                      <Fragment key={index}>
                        {categoryTitle}
                        {!isLast && <Fragment>, &nbsp;</Fragment>}
                      </Fragment>
                    )
                  }

                  return null
                })}
              </div>
            )}
          </div>
        )}
        {titleToUse && (
          <div className="prose">
            <h3>
              <Link className="not-prose" href={href} ref={link.ref}>
                {titleToUse}
              </Link>
            </h3>
          </div>
        )}
        {description && <div className="mt-2">{description && <p>{sanitizedDescription}</p>}</div>}
      </div>
      {technologies && (
        <div className="flex flex-wrap gap-2 p-4 justify-start">
          {technologies.map((tech, index) => {
            // Each technology is an object with a 'technology' property
            const technologyText = tech.technology || ''
            // const isLast = index === technologies.length - 1

            return (
              <span
                key={index}
                className="text-sm text-gray-500 bg-gray-300 rounded-full px-2 py-1"
              >
                {technologyText}
                {/* {!isLast && <Fragment>, &nbsp;</Fragment>} */}
              </span>
            )
          })}
        </div>
      )}
    </article>
  )
}
