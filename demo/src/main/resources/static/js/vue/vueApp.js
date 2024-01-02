import { createApp } from 'vue'
import MainPage from './MainPage.js';

const app = createApp({
    components: {
        MainPage
    },
    data() {
        return {}
    }
});

app.mount('#app');
