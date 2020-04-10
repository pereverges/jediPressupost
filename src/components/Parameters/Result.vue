<template>
    <div class="card bg-light mb-3" style="max-width: 280px; min-width: 280px; padding: 0;">
        <div class="card-header">Result</div>
        <div class="card-body" style="padding: 0">
            <div class="list-group list-group-flush" >
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
            }
        },
        created(){
            this.$store.subscribe((mutation, state) => {
                if (mutation.type === "updateBudget" || mutation.type === "uploadNewBudget" || mutation.type === "updateFixedCosts") {
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
                    this.totalCost = state.budget.totalCost;

                }
            });
        }
    }
</script>

<style scoped>

</style>
