import { createApp } from 'vue'
import TaxCalculator from './TaxCalculator/TaxCalculator.js';

const app = createApp({
    components: {
        TaxCalculator
    },
    data() {
        return {}
    }
});

app.mount('#app');
