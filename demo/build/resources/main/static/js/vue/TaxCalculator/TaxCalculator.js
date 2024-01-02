import PollutantSelector from "./PollutantSelector.js"

export default {
    components: {
        PollutantSelector
    },
    data() {
        return {
            dataSet: this.getDataSet(),
            selectedCompany: null
        }
    },
    methods: {
        pollutionForComp(companyId) {
            return this.dataSet.pollution.filter(poll => poll.companyId === companyId)
        },
        setSelectedCompany(selectedCompany) {
            if (this.selectedCompany === selectedCompany)
                this.selectedCompany = null
            else
                this.selectedCompany = selectedCompany
        },
        getDataSet() {
            let response = ""

            $.ajax({
                type: "GET",
                url: "/ajax/getDataSet",
                async: false,
                encode: false,
            }).done(function (data) {
                response = data;
            })

            return response
        }
    },
    template: `
        <div id="tax_background">

            <br>

            <h1>Compensation for damages</h1>
            <div id="title_description_wrapper">
                <div class="badge-success text-white" id="title_wrapper">
                    <div id="title">
                    This is a service for calculating compensation for damages caused to the state as a result of emissions of pollutants into the atmosphere
                    </div>
                </div>
            </div>

            <table class="table table-bordered table-hover">
                <thead class="table-success">
                    <tr>
                        <th scope="col">Company Id</th>
                        <th scope="col">Company Name</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <template v-for="company in dataSet.companies">
                        <tr>
                            <td scope="row">{{company.id}}</td>
                            <td>{{company.name}}</td>
                            <td>
                                <input type="button" class="btn btn-info" @click="setSelectedCompany(company)" value="Show company"/>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="4" style="padding-top: 0px;padding-bottom: 0px;">
                                <div class="pollutant-selector-wrapper" :class="selectedCompany?.id === company.id ? 'show' : 'hide'">
                                    <pollutant-selector :pollutionForComp="pollutionForComp(company.id)" :pollutants="dataSet.pollutants" :salaries="dataSet.salaries"></pollutant-selector>
                                </div>
                            </td>
                        </tr>
                    </template>
                </tbody>
            </table>
        </div>
    `
}
