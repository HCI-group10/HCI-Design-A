/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import * as components from 'vuetify/components'
import * as labsComponents from 'vuetify/labs/components'

// Composables
import { createVuetify } from 'vuetify'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    themes: {
      light: {
        colors: {
          primary: '#525B76',
          secondary: '#F7A072',
          tertiary: '#5487DD',
        },
      },
    },
  },
  components: {
    ...components,
    ...labsComponents,
  },
})
