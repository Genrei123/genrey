import {person} from './documents/person'
import {page} from './documents/page'
import {post} from './documents/post'
import {gallery} from './documents/gallery'
import {callToAction} from './objects/callToAction'
import {infoSection} from './objects/infoSection'
import {settings} from './singletons/settings'
import {link} from './objects/link'
import {blockContent} from './objects/blockContent'
import {project} from './documents/project'
import { certificates } from './documents/certificates'

// Export an array of all the schema types.  This is used in the Sanity Studio configuration. https://www.sanity.io/docs/schema-types

export const schemaTypes = [
  // Singletons
  settings,
  // Documents
  page,
  post,
  person,
  project,
  gallery,
  certificates,
  // Objects
  blockContent,
  infoSection,
  callToAction,
  link,
]
