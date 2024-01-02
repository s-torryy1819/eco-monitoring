export default {
    components: {

    },
    props: ["pollutionForComp", "pollutants", "salaries"],
    data() {
        return {
            pollutionForComp: this.pollutionForComp,
            pollutants: this.pollutants,
            salaries: this.salaries,
            selectedPollution: null
        }
    },
    computed: {
        pollutionOptions() {
            const pollution = this.pollutionForComp
            return { months: new Set(pollution.map(pol => pol.month)), codes: new Set(pollution.map(pol => pol.pollutantCode)) }
        },
        currentPollutant() {
            return this.pollutants.find(poll => poll.pollutantCode === this.selectedPollution?.pollutantCode)
        },
        mass() {

            const pollutant = this.currentPollutant

            return (3.6 * Math.pow(10, -6) * (pollutant.poi - pollutant.ponorm)
                * pollutant.q * this.selectedPollution.hours);
        },
        tax() {

            const pollutant = this.currentPollutant

            const Kt = 1.9375
            const Ki = pollutant.poi / pollutant.gdk
            const A = 1 / pollutant.gdk;

            const currentSalary = this.salaries.find(sal => this.selectedPollution.month === sal.month && this.selectedPollution.companyId === sal.companyId)

            return this.mass * 1.1 * currentSalary.salary * A * Kt * Ki;
        }
    },
    methods: {
        setSelectedPollution(selectedPollution) {
            if (this.selectedPollution === selectedPollution)
                this.selectedPollution = null
            else
                this.selectedPollution = selectedPollution
        },
        getPollutantName(pollutantCode) {
            return this.pollutants.find(poll => pollutantCode === poll.pollutantCode)?.name;
        }
    },
    template: `

    <table class="table table-bordered table-hover">
        <thead>
            <tr class="table-info">
                <th scope="col">Pollutant Code</th>
                <th scope="col">Pollutant Name</th>
                <th scope="col">Hours of emission</th>
                <th scope="col">Month of emission</th>
                <th scope="col">Actions</th>
            </tr>
        </thead>
        <tbody>
            <template v-for="pollution in pollutionForComp">
                <tr>
                    <td>{{pollution.pollutantCode}}</td>
                    <td>{{getPollutantName(pollution?.pollutantCode)}}</td>
                    <td>{{pollution.hours}}</td>
                    <td>{{pollution.month}}</td>
                    <td>
                        <input type="button" class="btn btn-info" @click="setSelectedPollution(pollution)" value="Show compensation"/>
                    </td>
                </tr>
                <tr v-if="selectedPollution?.pollutantCode === pollution.pollutantCode && selectedPollution?.month === pollution.month" class="table-danger text-light">
                    <td colspan="5">
                        <h3>Mass : <b>{{mass}}</b> tonne</h3>
                        <h3>Compensation for damages: <b>{{tax}}</b> ua hryvnia</h3>
                    </td>
                </tr>
            </template>
        </tbody>
    </table>

    `
}
