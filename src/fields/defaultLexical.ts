import type { TextFieldSingleValidation } from 'payload'
import {
  // Basic formatting
  ParagraphFeature,
  HeadingFeature,
  BoldFeature,
  ItalicFeature,
  UnderlineFeature,
  StrikethroughFeature,

  // Lists
  OrderedListFeature,
  UnorderedListFeature,
  ChecklistFeature,
  BlockquoteFeature,

  // Links and media
  LinkFeature,
  RelationshipFeature,
  UploadFeature,

  // Advanced formatting
  IndentFeature,
  AlignFeature,
  lexicalEditor,
  type LinkFields,
} from '@payloadcms/richtext-lexical'

export const defaultLexical = lexicalEditor({
  features: [
    // Basic formatting
    ParagraphFeature(),
    HeadingFeature({
      enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
    }),
    BoldFeature(),
    ItalicFeature(),
    UnderlineFeature(),
    StrikethroughFeature(),

    // Lists
    UnorderedListFeature(),
    OrderedListFeature(),
    ChecklistFeature(),

    BlockquoteFeature(),

    // Links
    LinkFeature({
      enabledCollections: ['pages', 'posts'],
      fields: ({ defaultFields }) => {
        const defaultFieldsWithoutUrl = defaultFields.filter((field) => {
          if ('name' in field && field.name === 'url') return false
          return true
        })

        return [
          ...defaultFieldsWithoutUrl,
          {
            name: 'url',
            type: 'text',
            admin: {
              condition: (_data, siblingData) => siblingData?.linkType !== 'internal',
            },
            label: ({ t }) => t('fields:enterURL'),
            required: true,
            validate: ((value, options) => {
              if ((options?.siblingData as LinkFields)?.linkType === 'internal') {
                return true // no validation needed, as no url should exist for internal links
              }
              return value ? true : 'URL is required'
            }) as TextFieldSingleValidation,
          },
        ]
      },
    }),

    // Media
    UploadFeature({
      collections: {
        media: {
          fields: [
            // Additional fields for uploads if needed
          ],
        },
      },
    }),

    // Advanced formatting
    AlignFeature(),
    IndentFeature(),

    // Relationships (uncomment if needed)
    // RelationshipFeature({
    //   collections: ['pages', 'posts'],
    // }),
  ],
})
