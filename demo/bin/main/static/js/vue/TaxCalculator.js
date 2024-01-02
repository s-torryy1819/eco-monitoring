export default {
    components: {},
    data() {
        return {
            dataSet: this.getDataSet(),
            reservoirsList: this.getReservoirs(),
            argSet: this.getArgSet(),
            regionsList: this.getRegions(),
            selectedReservoirEntry: null,
            selectedRegionDataEntry: null,
            selectedFish: null,
            showTable: false,
            showHp: false,
            showMp: false,
            showPp_g: false,
            N1: null,
            N2: null,
            N3: null,
            N4: null,
            s: null,
            p: null,
            p1: null,
            p2: null,
            n1: null,
            n2: null,
            C: null,
            m1: null,
            P: null,
            PproHektar: null,
            directDamageValue: null,
            offspringValue: null,
            valueExpresionValue: null
        }
    },
    methods: {
        setSelectedReservoir(selectedReservoirEntry) {
            if (this.selectedReservoirEntry === selectedReservoirEntry)
                this.selectedReservoirEntry = null
            else
                this.selectedReservoirEntry = selectedReservoirEntry
        },
        setSelectedRegion(selectedRegionDataEntry) {
            if (this.selectedRegionDataEntry === selectedRegionDataEntry)
                this.selectedRegionDataEntry = null
            else
                this.selectedRegionDataEntry = selectedRegionDataEntry
        },
        setselectedFish(selectedFish) {
            if (this.selectedFish === selectedFish)
                this.selectedFish = null
            else
                this.selectedFish = selectedFish
        },
        getDataSet() {
            $.ajax({
                type: "GET",
                url: "/getDataSet",
                async: false,
                encode: false,
            }).done((data) => {
                this.dataSet = data;
            });
        },
        getReservoirs() {
            $.ajax({
                type: "GET",
                url: "/getReservoirs",
                async: false,
                encode: false,
            }).done((data) => {
                this.reservoirsList = data;
            });
        },
        getArgSet() {
            $.ajax({
                type: "GET",
                url: "/getArgSet",
                async: false,
                encode: false,
            }).done((data) => {
                this.argSet = data;
            });
        },
        getRegions() {
            $.ajax({
                type: "GET",
                url: "/getRegions",
                async: false,
                encode: false,
            }).done((data) => {
                this.regionsList = data;
            });
        },
        showTableAfterClick() {
            this.showTable = true;
        },
        showHpAfterClick() {
            this.showHp = true;
        },
        showMpAfterClick() {
            this.showMp = true;
        },
        showPp_gAfterClick() {
            this.showPp_g = true;
        }
    },
    computed: {
        allFischForReservoir() {
            return this.dataSet?.filter(fisch => fisch.reservoir === this.selectedReservoirEntry) ?? []
        },
        offspringLosses() {
            if (this.selectedFish != null) {
                console.log(this.selectedFish);
                this.offspringValue = parseFloat(this.s) * parseFloat(this.PproHektar) * parseFloat(this.selectedFish.z) / 100 * parseFloat(this.selectedFish.q) * parseFloat(this.selectedFish.c) * parseFloat(this.selectedFish.k2) / 100 * parseFloat(this.selectedFish.m);
                console.log(this.offspringValue);
            }
            return this.offspringValue;
        },
        directDamage() {
            if (this.selectedFish != null) {
                this.directDamageValue = parseFloat(this.p) * parseFloat(this.s) * parseFloat(this.selectedFish.m) + parseFloat(this.p1) * parseFloat(this.selectedFish.m) * parseFloat(this.s) * parseFloat(this.selectedFish.k1) / 100 + parseFloat(this.p2) * parseFloat(this.selectedFish.m) * parseFloat(this.s) * parseFloat(this.selectedFish.k2 / 100);
                console.log(this.directDamageValue);
            }
            return this.directDamageValue;
        },
        valueExpression() {
            if (this.selectedFish != null) {
                this.valueExpresionValue = parseFloat(this.directDamageValue) + parseFloat(this.s) * parseFloat(this.offspringValue);
            }
            return this.valueExpresionValue;
        },
        lossLifeDamages() {
            return 0.28 * this.N1 + 6.5 * this.N2 + 37 * this.N3 + 47 * this.N4;
        },
        propertyDestruction() {
            return 45 * this.n1 + 33 * this.n2 + 0.35 * this.C + 0.65 * this.m1;
        },
        agriculturalDamages1() {
            if (this.selectedRegionDataEntry != null) {
                return this.selectedRegionDataEntry.arableLand * this.P;
            }
        },
        agriculturalDamages2() {
            if (this.selectedRegionDataEntry != null) {
                return this.selectedRegionDataEntry.haymakers * this.P;
            }
        },
        agriculturalDamages3() {
            if (this.selectedRegionDataEntry != null) {
                return this.selectedRegionDataEntry.pastures * this.P;
            }
        }
    },
    mounted() {
        this.getDataSet();
        this.getReservoirs();
        this.getArgSet();
        this.getRegions();
    },
    template: `
        <div id="tax_background">

            <br><h1>Calculation of fisheries losses</h1><br/>
            <div id="title_description_wrapper">
                <div class="badge-warning text-white" id="title_wrapper">
                <div id="title">The calculation is carried out separately for each species (or for
                    a group of biologically close species) and for each stage of development
                    of fish according to this formula: <b>Pp/g = N + SN, (kg)</b></div>
                </div>
                <div class="badge-success text-white" id="title_wrapper">
                <div id="title">Direct damages are calculated according to the formula:  <b>N = П * S * М + П1 * М * S * К1/100 + П2 * М * S * К2/100</b></div>
                </div>
                <div class="badge-info text-white" id="title_wrapper">
                <div id="title">Damages from the loss of offspring are calculated according to the following formula:
                                <b></v>N5 = S x P x Z/100 x QC x K/100 x M</b></div>
                </div>
            </div><br/>

            <br/>
            <form>
        <div class="form-group">
          <label class="bg-warning text-white label_wrapper" for="nameInput">p - Average number of dead fish, pieces/sq. meter</label>
          <input type="text" v-model="p" class="form-control" required id="nameInput" aria-describedby="name" placeholder="Enter a number">
        </div>
        <div class="form-group">
          <label class="bg-warning text-white label_wrapper" for="amountInput">p1 - Average number of dead larvae, pieces/sq. meter;</label>
          <input type="text" v-model="p1" class="form-control"  required id="amountInput" placeholder="Enter a number">
        </div>
        <div class="form-group">
          <label class="bg-warning text-white label_wrapper" for="priceInput">p2 - Average number of dead caviar, pieces/sq. meter;</label>
          <input type="text"  v-model="p2" class="form-control"  id="priceInput" required placeholder="Enter a number">
        </div>
        <div class="form-group">
          <label class="bg-warning text-white label_wrapper" for="descriptionInput">s - Area of negative impact of damage, sq. meters;</label>
          <input type="text"  v-model="s" class="form-control" required id="descriptionInput" placeholder="Enter a number">
        </div>
        <div class="form-group">
          <label class="bg-warning text-white label_wrapper" for="descriptionInput">pProHektar - The number of spawners on spawning grounds, pieces/hectare;</label>
          <input type="text"  v-model="PproHektar" class="form-control" required id="descriptionInput" placeholder="Enter a number">
        </div>
        <input type="button" class="btn btn-success" id="calculate" @click="showTableAfterClick()" value="Calculate with input data">
      </form>


            <table v-if="showTable" class="table table-bordered table-hover">
                <thead class="table-success">
                    <tr>
                        <th scope="col">Reservoir name</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <template v-for="reservoir in reservoirsList">
                        <tr>
                            <td scope="row">{{reservoir}}</td>
                            <td>
                                <input type="button" class="btn btn-info" @click="setSelectedReservoir(reservoir)" value="Show fisch types"/>
                            </td>
                        </tr>

                        <template v-if="selectedReservoirEntry === reservoir">
                            <tr>
                                <td colspan="4" style="padding-top: 0px;padding-bottom: 0px;">
                                    <div class="pollutant-selector-wrapper" :class="selectedReservoirEntry === reservoir ? 'show' : 'hide'">
                                    
                                    
                                    <table class="table table-bordered table-hover">
                                    <thead class="table-success">
                                        <tr>
                                            <th scope="col">Fisch type</th>
                                            <th scope="col">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        <template v-for="fisch in allFischForReservoir">
                                            <tr>
                                                <td>{{fisch?.fischType}}</td>
                                                <td>
                                                    <input type="button" class="btn btn-info" @click="setselectedFish(fisch)" value="Show Damage"/>
                                                </td>
                                            </tr>
                                        <tr>
                                                <td colspan="7" style="padding-top: 0px;padding-bottom: 0px;">
                                                    <div class="pollutant-selector-wrapper" :class="selectedFish === fisch ? 'show' : 'hide'">
                                                    
                                                        <h3 class="text-info">Losses from loss of offspring (N5) : {{offspringLosses}} <i>kg</i></h3>
                                                        <h3 class="text-success">Direct damage (N) : {{directDamage}} <i>kg</i></h3>
                                                        <h3 class="text-primary">Calculation of losses of fishing industry in value expression (Pp/g) : {{valueExpression}} <i>kg</i></h3>

                                                    </div>
                                                </td>
                                            </tr>
                                        </template> 

                                    </tbody>
                                </table>
                                    </div>
                                </td>
                            </tr>
                        </template>

                    </template>
                </tbody>
            </table>

            <br><h1>Calculation of Hp - Calculation of damages from the loss of life and health of the population</h1><br/>

            <br/>
            <form>
        <div class="form-group">
          <label class="bg-info text-white label_wrapper" for="nameInput">N1 - A minor accident with loss of working capacity for up to 9 days</label>
          <input type="text" v-model="N1" class="form-control" required id="nameInput" aria-describedby="name" placeholder="Enter a number">
        </div>
        <div class="form-group">
          <label class="bg-info text-white label_wrapper" for="amountInput">N2 - Serious accident without establishing disability with loss of working capacity for more than 9 days</label>
          <input type="text" v-model="N2" class="form-control"  required id="amountInput" placeholder="Enter a number">
        </div>
        <div class="form-group">
          <label class="bg-info text-white label_wrapper" for="priceInput">N3 - Serious accident, as a result of which the victim received a disability with loss of working capacity for more than 3980 days</label>
          <input type="text"  v-model="N3" class="form-control"  id="priceInput" required placeholder="Enter a number">
        </div>
        <div class="form-group">
          <label class="bg-info text-white label_wrapper" for="descriptionInput">N4 - An accident resulting in the death of: an adult under the age of 60 a child under the age of 16</label>
          <input type="text"  v-model="N4" class="form-control" required id="descriptionInput" placeholder="Enter a number">
        </div>
        <input type="button" class="btn btn-success" id="calculate" @click="showHpAfterClick()" value="Calculate with input data">
      </form>

      <div class="pollutant-selector-wrapper" v-if="showHp">                                                 
            <h3 class="text-info">Calculation of damages from the loss of life and health of the population : {{lossLifeDamages}} <i>thousand hrn ua</i></h3>
       </div>

       <br><h1>Calculation of Mp - Calculation of losses from the destruction and damage of fixed assets, destruction of property and products</h1><br/>

            <br/>
            <form>
        <div class="form-group">
          <label class="bg-warning text-white label_wrapper" for="nameInput">n1 - the number of types of fixed assets of production purpose that were partially or completely destroyed</label>
          <input type="text" v-model="n1" class="form-control" required id="nameInput" aria-describedby="name" placeholder="Enter a number">
        </div>
        <div class="form-group">
          <label class="bg-warning text-white label_wrapper" for="amountInput">n2 - the number of types of said funds that were completely destroyed</label>
          <input type="text" v-model="N2" class="form-control"  required id="amountInput" placeholder="Enter a number">
        </div>
        <div class="form-group">
          <label class="bg-warning text-white label_wrapper" for="priceInput">C - unit cost of the i-th type of industrial production</label>
          <input type="text"  v-model="C" class="form-control"  id="priceInput" required placeholder="Enter a number">
        </div>
        <div class="form-group">
          <label class="bg-warning text-white label_wrapper" for="descriptionInput">m1 - number of types of lost agricultural products</label>
          <input type="text"  v-model="m1" class="form-control" required id="descriptionInput" placeholder="Enter a number">
        </div>
        <input type="button" class="btn btn-success" id="calculate" @click="showMpAfterClick()" value="Calculate with input data">
      </form>

      <div class="pollutant-selector-wrapper" v-if="showMp">                                         
            <h3 class="text-info">Calculation of losses from the destruction and damage of fixed assets, destruction of property and products : {{propertyDestruction}} <i>thousand hrn ua</i></h3>
       </div>


       <br><h1>Calculation of Pp_g - Calculation of damages from removal or violation of agricultural lands</h1><br/>

            <br/>
            <form>
        <div class="form-group">
          <label class="bg-warning text-white label_wrapper" for="nameInput">P - the area of agricultural lands of the corresponding type, which are withdrawn from use, in hectares</label>
          <input type="text" v-model="P" class="form-control" required id="nameInput" aria-describedby="name" placeholder="Enter a number">
        </div>
        <input type="button" class="btn btn-success" id="calculate" @click="showPp_gAfterClick()" value="Calculate with input data">
      </form>

      <table v-if="showPp_g" class="table table-bordered table-hover">
                <thead class="table-success">
                    <tr>
                        <th scope="col">Region</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <template v-for="regionData in argSet">
                        <tr>
                            <td scope="row">{{regionData.region}}</td>
                            <td>
                                <input type="button" class="btn btn-info" @click="setSelectedRegion(regionData)" value="Show calculated data"/>
                            </td>
                        </tr>

                        <template v-if="selectedRegionDataEntry === regionData">
                            <div class="pollutant-selector-wrapper" :class="selectedRegionDataEntry === regionData ? 'show' : 'hide'">
                                                    
                                <h4 class="text-info">Calculation of damages from removal or violation of arable land and perennial plantations : {{agriculturalDamages1}} <i>thousand hrn ua</i></h3>
                                <h4 class="text-info">Calculation of damages from removal or violation of haymakers : {{agriculturalDamages2}} <i>thousand hrn ua</i></h3>
                                <h4 class="text-info">Calculation of damages from removal or violation of pastures : {{agriculturalDamages3}} <i>thousand hrn ua</i></h3>
                            </div>
                        </template> 

                    </template>
                </tbody>
            </table>
    </div>
    `
}
