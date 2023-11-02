import {defineScope} from '@sanity/ui-workshop'
import {lazy} from 'react'

export default defineScope({
  name: 'studio-ui',
  title: 'Studio UI',
  stories: [
    {
      name: 'menu-item',
      title: 'Menu item',
      component: lazy(() => import('./MenuItemStory')),
    },
  ],
})
