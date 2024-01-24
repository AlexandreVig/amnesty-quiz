import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store';

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import { aliases, mdi } from 'vuetify/iconsets/mdi-svg'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    const vuetify = createVuetify({
        components,
        directives,
        icons: {
            defaultSet: 'mdi',
            aliases: {
                ...aliases,
            },
            sets: {
                mdi,
            },
        },
    })

    const app = createApp(App)

    app.use(router)
    app.use(store)
    app.use(vuetify)
    app.mount('#app');
}

if (typeof cordova === 'undefined') {
    onDeviceReady();
} else {
    window.screen.orientation.lock("portrait-primary");
}
