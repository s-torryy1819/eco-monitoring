import TaxCalculator from './TaxCalculator.js';
import ShowData from './ShowData.js';

export default {
    components: {
        TaxCalculator,
        ShowData
    },
    data() {
        return {
            allPages: ['Calculate', 'Show Data'],
            activePage: 'Calculate'
        }
    },
    methods: {

    },
    template: `
    <br/>
    <div class="btn-group btn-group-toggle" data-toggle="buttons">
        <label class="btn btn-info" :class="activePage === page ? 'active' : ''" v-for="page in allPages" @click="activePage = page">
            <input type="radio" name="allPages" :id="page" />
            {{page}}
        </label>
    </div>
    
    <tax-calculator v-if="activePage === 'Calculate'"></tax-calculator>
    <show-data v-if="activePage === 'Show Data'"></show-data>
    
    `
}