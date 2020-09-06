<template>
    <div class="card bg-light mb-3" style="max-width: 280px; min-width: 280px; padding: 0px">
        <div class="card-header">Parameters</div>
        <div class="card-body" style="padding: 0px">
            <div class="list-group list-group-flush" >
                <div class="list-group-item d-flex flex-row" style="justify-content: space-between">
                    <div style="margin-top: 6px;">
                        <label>Point/Hour</label>
                    </div>
                    <div style="margin-left: 12px">
                        <input type="number" required placeholder="1.5" size="5" step="0.05" class="form-control" min="0" max="99" v-model="pointHour" value="pointHour" @change="setPointHour">
                    </div>
                </div>
                <div class="list-group-item d-flex flex-row" style="justify-content: space-between">
                    <div style="margin-top: 6px;">
                        <label>Hour/Error</label>
                    </div>
                    <div style="margin-left: 12px">
                        <input type="number" required size="5" placeholder="0.2"  step="0.05" class="form-control" min="0" max="99" v-model="hourError" value="hourError" @change="setHourError">
                    </div>
                </div>
                <div class="list-group-item d-flex flex-row" style="justify-content: space-between">
                    <div style="margin-top: 6px;">
                        <label>Hour/Management</label>
                    </div>
                    <div style="margin-left: 12px;" class="float-right">
                        <input type="number" required size="5" placeholder="0.1" step="0.025" class="form-control" min="0" max="99" v-model="hourManagement" value="hourManagement" @change="setHourManagement">
                    </div>
                </div>
                <div class="list-group-item d-flex flex-row" style="justify-content: space-between">
                    <div style="margin-top: 6px;">
                        <label>Taxes</label>
                    </div>
                    <div style="margin-left: 12px;" class="float-right">
                        <input type="number" required placeholder="21" size="5" step="0.5" class="form-control" min="0" max="99" v-model="taxesCost" value="taxesCost" @change="setTaxesCost">
                    </div>
                </div>
                <div class="list-group-item d-flex flex-row" style="justify-content: space-between">
                    <div style="margin-top: 6px;">
                        <label>Jedi tax</label>
                    </div>
                    <div style="margin-left: 12px;" class="float-right">
                        <input type="number" required placeholder="5" size="5" step="0.5" class="form-control" min="0" max="99" v-model="jediTax" value="jediTax" @change="setJediTax">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Parameters",
        data(){
            return{
                pointHour: null,
                hourError: null,
                hourManagement: null,
                jediTax: null,
                taxesCost: null
            }
        },
        methods: {
            setPointHour() {
                this.$store.commit("setPointHour", this.pointHour);
            },
            setHourError(){
                this.$store.commit("setHourError", this.hourError);
            },
            setHourManagement(){
                this.$store.commit("setHourManagement", this.hourManagement);
            },
            setTaxesCost(){
                this.$store.commit("setTaxesCost", this.taxesCost);
            },
            setJediTax(){
                this.$store.commit("setJediTax", this.jediTax);
            },
            updateParameters(){
                this.setPointHour();
                this.setHourError();
                this.setHourManagement();
                this.setTaxesCost();
                this.setJediTax();
            }
        },
        created(){
            this.$store.subscribe((mutation, state) => {
                if (mutation.type === "uploadNewBudget") {
                    if (state.budget != null) {
                        this.pointHour = state.budget.pointHour;
                        this.hourError = state.budget.hourError;
                        this.hourManagement = state.budget.hourManagement;
                        this.jediTax = state.budget.jediTax;
                        this.taxesCost = state.budget.taxesCost;
                        this.updateParameters();
                    }
                }
            });
        }
    }
</script>

<style scoped>

</style>
