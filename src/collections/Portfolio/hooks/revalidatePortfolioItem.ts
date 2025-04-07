import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'

import type { PortfolioItem } from '../../../payload-types'

export const revalidatePortfolioItem: CollectionAfterChangeHook<PortfolioItem> = ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    if (doc._status === 'published') {
      const path = `/portfolio/${doc.slug}`

      payload.logger.info(`Revalidating portfolio item at path: ${path}`)

      revalidatePath(path)
      revalidateTag('portfolio-sitemap')
    }

    // If the post was previously published, we need to revalidate the old path
    if (previousDoc._status === 'published' && doc._status !== 'published') {
      const oldPath = `/portfolio/${previousDoc.slug}`

      payload.logger.info(`Revalidating old portfolio item at path: ${oldPath}`)

      revalidatePath(oldPath)
      revalidateTag('portfolio-sitemap')
    }
  }
  return doc
}

export const revalidateDeletePortfolioItem: CollectionAfterDeleteHook<PortfolioItem> = ({
  doc,
  req: { context },
}) => {
  if (!context.disableRevalidate) {
    const path = `/portfolio/${doc?.slug}`

    revalidatePath(path)
    revalidateTag('portfolio-sitemap')
  }

  return doc
}
