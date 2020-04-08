<template>
    <div class="card bg-light mb-3" style="max-width: 300px; min-width: 200px; padding: 0;">
        <div class="card-header">Result</div>
        <div class="card-body" style="padding: 0">
            <div class="list-group list-group-flush" >
                <div class="list-group-item d-flex flex-row" style="justify-content: space-between">
                    <div style="margin-top: 6px;">
                        <label>Total cost</label>
                    </div>
                    <div style="margin-left: 12px">
                        <p style="margin: 6px">{{totalCost}}</p>
                    </div>
                </div>
                <div class="list-group-item d-flex flex-row" style="justify-content: space-between">
                    <div style="margin-top: 6px;">
                        <label>Total hours</label>
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
                totalCost: 0
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
                if (mutation.type === "updateBudget" || mutation.type === "uploadNewBudget") {
                    let budget = state.budget.functionalitiesObject;
                    if(budget.totalHours != null){
                        this.totalHours = budget.totalHours;
                    }
                    if(budget.totalCost != null){
                        this.totalCost = budget.totalCost;
                    }
                }
            });
        }
    }
</script>

<style scoped>

</style>
