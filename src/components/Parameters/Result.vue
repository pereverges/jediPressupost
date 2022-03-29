<template>
    <div class="card bg-light mb-3" style="max-width: 280px; min-width: 280px; padding: 0;">
        <div class="card-header">Result</div>
        <div class="card-body" style="padding: 0">
            <div class="list-group list-group-flush" >
                <div class="list-group-item d-flex flex-row" style="justify-content: space-between">
                    <div style="margin-top: 6px;">
                        <label style="font-weight: bold">Net cost</label>
                    </div>
                    <div style="margin-left: 12px">
                        <p style="margin: 6px">{{netCost}}</p>
                    </div>
                </div>
                <div class="list-group-item d-flex flex-row" style="justify-content: space-between">
                    <div style="margin-top: 6px;">
                        <label style="font-weight: bold">Total cost</label>
                    </div>
                    <div style="margin-left: 12px">
                        <p style="margin: 6px">{{totalCost}}</p>
                    </div>
                </div>
                <div class="list-group-item d-flex flex-row" style="justify-content: space-between; margin-bottom: -10px">
                    <div>
                        <label style="margin-left: 8px">Functionalities cost</label>
                    </div>
                    <div style="margin-left: 12px">
                        <p style="margin: 6px; margin-top: 0px">{{functionalitiesCost}}</p>
                    </div>
                </div>
                <div class="list-group-item d-flex flex-row" style="justify-content: space-between; margin-bottom: -10px">
                    <div>
                        <label style="margin-left: 8px">Fixed cost</label>
                    </div>
                    <div style="margin-left: 12px">
                        <p style="margin: 6px; margin-top: 0px">{{fixedCost}}</p>
                    </div>
                </div>
                <div class="list-group-item d-flex flex-row" style="justify-content: space-between">
                    <div style="margin-top: 6px;">
                        <label style="font-weight: bold;">Total hours</label>
                    </div>
                    <div style="margin-left: 12px">
                        <p style="margin: 6px">{{totalHours}}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Result",
        data(){
            return{
                totalHours: 0,
                totalCost: 0,
                netCost: 0,
                fixedCost: 0,
                functionalitiesCost: 0
            }
        },
        mounted(){
            let budget = this.$store.getters.getBudget;
            if(budget.totalHours != null){
                this.totalHours = budget.totalHours;
            }
            if(budget.totalCost != null){
                this.totalCost = budget.totalCost;
                //let net = this.totalCost+(this.totalCost*(budget.taxesCost/100));
                // this.netCost = Math.round((net+(net*(budget.jediTax/100)))*100)/100;
                // this.netCost = Math.round((this.totalCost-(this.totalCost*(budget.jediTax/100)))*100)/100
                let jediTaxes = (this.totalCost*(budget.jediTax/100))
                this.netCost = Math.round((this.totalCost-jediTaxes)*100)/100;

            }
        },
        created(){
            this.$store.subscribe((mutation, state) => {
                if (mutation.type === "updateBudget" || mutation.type === "uploadNewBudget" || mutation.type === "updateFixedCosts" || mutation.type === "setJediTax" || mutation.type === "setTaxesCost") {
                    let budget = state.budget.functionalitiesObject;
                    if(budget.totalHours != null){
                        this.totalHours = budget.totalHours;
                    }
                    if(state.budget.fixedCostsObject.cost !== null && state.budget.fixedCostsObject.cost !== undefined){
                        this.fixedCost = state.budget.fixedCostsObject.cost;
                    }
                    if(state.budget.functionalitiesObject.totalCost !== null && state.budget.functionalitiesObject.totalCost !== undefined){
                        this.functionalitiesCost = state.budget.functionalitiesObject.totalCost;
                    }
                    this.totalCost = Math.round(state.budget.totalCost + (state.budget.totalCost * (state.budget.taxesCost/100)));

                    let costTotal = (state.budget.totalCost+this.fixedCost);
                    let totalTax = costTotal + (costTotal*state.budget.taxesCost*0.01);
                    let totalTaxNoIRPF = totalTax - (totalTax*0.19);
                    let jediTax = totalTaxNoIRPF*state.budget.jediTax*0.01;
                    console.log((totalTax+jediTax).toString() + '€');
                    // this.netCost = Math.round(state.budget.totalCost);
                    // let net = this.totalCost+(this.totalCost*(state.budget.taxesCost/100));
                    // this.netCost = Math.round((net+(net*(state.budget.jediTax/100)))*100)/100;
                    this.netCost = Math.round((state.budget.totalCost/(1+(state.budget.jediTax/100))));
                }
            });
        }
    }
</script>

<style scoped>

</style>
