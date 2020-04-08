<template>
    <div>
        <Functionality v-for="(functionality, index) in functionalitiesObject.functionalities" :key="functionality.id" :functionality="functionality" :findex="index" @functionality="updateFunctionality" @remove="removeFunctionality"/>
        <div>
            <button type="button" class="btn btn-outline-primary float-left add-button" @click="addFunctionality">
                <font-awesome-icon  icon="plus"/>
            </button>
        </div>
    </div>
</template>

<script>
    import Functionality from "@/components/Functionality/Functionality";
    export default {
        name: "FunctionalityHolder",
        components: {
            Functionality
        },
        data(){
            return{
                functionalitiesObject: {
                    totalCost: 0,
                    totalHours: 0,
                    functionalities: [],
                    count: 0
                }
            }
        },
        methods: {
            updateFunctionality(functionality) {
                this.functionalitiesObject.functionalities[functionality.index] = functionality;
                this.newCostCompute();
                this.newHoursCompute();
            },
            addFunctionality(){
                let i = this.functionalitiesObject.length;
                this.functionalitiesObject.functionalities.push({
                    name: "",
                    index: i,
                    id: this.functionalitiesObject.count,
                    cost: 0,
                    hours: 0,
                    tasks: [],
                    count: 0
                });
                this.functionalitiesObject.count += 1;
            },
            removeFunctionality(index) {
                this.functionalitiesObject.functionalities.splice(index,1);
                this.newCostCompute();
                this.newHoursCompute();
            },
            newHoursCompute(){
                this.functionalitiesObject.totalHours = 0;
                let i;
                for (i = 0; i < this.functionalitiesObject.functionalities.length; i++){
                    this.functionalitiesObject.totalHours += this.functionalitiesObject.functionalities[i].hours;
                }
                this.functionalitiesObject.totalHours = Math.round((this.functionalitiesObject.totalHours + Number.EPSILON)*100)/100;

                this.updateFunctionalitiesObject();
            },
            newCostCompute(){
                this.functionalitiesObject.totalCost = 0;
                let i;
                for (i = 0; i < this.functionalitiesObject.functionalities.length; i++){
                    this.functionalitiesObject.totalCost += this.functionalitiesObject.functionalities[i].cost;
                }
                this.functionalitiesObject.totalCost = Math.round((this.functionalitiesObject.totalCost + Number.EPSILON)*100)/100;

                this.updateFunctionalitiesObject()
            },
            updateFunctionalitiesObject(){
                this.$store.commit("updateBudget", this.functionalitiesObject);
            }
        },
        created(){
            this.$store.subscribe((mutation, state) => {
                if (mutation.type === "uploadNewBudget") {
                    this.functionalitiesObject = null;
                    this.functionalitiesObject = state.budget.functionalitiesObject;
                }
            });
        }
    }
</script>

<style scoped>
    .add-button{
        margin: 4px;
    }
</style>
