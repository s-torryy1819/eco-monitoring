export default {
    components: {},
    data() {
        return {
            allData: this.getDataSet(),
            allArgData: this.getArgDataSet(),
        }
    },
    computed: {},
    methods: {
        getDataSet() {
            let response = "";

            $.ajax({
                type: "GET",
                url: "/getDataSet",
                async: false,
                encode: false,
            }).done(function (data) {
                response = data;
            });

            return response;
        },
        getArgDataSet() {
            let response = "";

            $.ajax({
                type: "GET",
                url: "/getArgSet",
                async: false,
                encode: false,
            }).done(function (data) {
                response = data;
            });

            return response;
        }
    },
    template: `

    <div>
    <br/><h1>Average biological indicators for
    the main commercial types of fish</h1><br/>
    <table class="table table-bordered table-hover">
        <thead class="table-success">
            <tr>
                <th scope="col">Reservoir name</th>
                <th scope="col">Type of fish</th>
                <th scope="col">Average weight of an adult, kg</th>
                <th scope="col">Average fertility, thousands</th>
                <th scope="col">Multiplicity of spawning, times</th>
                <th scope="col">Share of females, procents</th>
                <th scope="col">Coefficient of ppm return from larvae, procents</th>
                <th scope="col">Coefficient of ppm return from caviar, procents</th>
            </tr>
        </thead>
        <tbody>
            <template v-for="data in allData">
                <tr>
                    <td scope="row">{{data.reservoir}}</td>
                    <td>{{data.fischType}}</td>
                    <td>{{data.m}}</td>
                    <td>{{data.q}}</td>
                    <td>{{data.c}}</td>
                    <td>{{data.z}}</td>
                    <td>{{data.k1}}</td>
                    <td>{{data.k2}}</td>
                </tr>
            </template>
        </tbody>
    </table>

    <br/><h1>Damage standards for various types of agricultural land in the oblasts and the Autonomous Republic of Crimea (thousand hryvnias/hectare)</h1><br/>
    <table class="table table-bordered table-hover">
        <thead class="table-success">
            <tr>
                <th scope="col">Region name</th>
                <th scope="col">Arable land, thousand hryvnias/hectare</th>
                <th scope="col">Haymakers, thousand hryvnias/hectare</th>
                <th scope="col">Pastures, thousand hryvnias/hectare</th>
            </tr>
        </thead>
        <tbody>
            <template v-for="arg in allArgData">
                <tr>
                    <td scope="row">{{arg.region}}</td>
                    <td>{{arg.arableLand}}</td>
                    <td>{{arg.haymakers}}</td>
                    <td>{{arg.pastures}}</td>
                </tr>
            </template>
        </tbody>
    </table>
    </div>
    `
}
