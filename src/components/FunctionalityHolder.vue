<template>
    <div>
        <Functionality v-for="(functionality, index) in functionalities" :key="functionality.id" :index="index" @cost="updateCost" @hours="updateHours" @remove="removeFunctionality"/>
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
                functionalities: [],
                count: 0,
                cost: 0,
                hours: 0
            }
        },
        methods: {
            addFunctionality(){
                this.functionalities.push({cost: "0", hours: "0", id: this.count});
                this.count += 1;
            },
            removeFunctionality(index) {
                this.functionalities.splice(index,1);
                this.newCostCompute();
                this.newHoursCompute();

            },
            updateCost(functionality){
                this.functionalities[functionality.index].cost = functionality.cost;
                this.newCostCompute();
            },
            updateHours(functionality){
                this.functionalities[functionality.index].hours = functionality.hours;
                this.newHoursCompute();

            },
            newHoursCompute(){
                this.hours = 0;
                let i;
                for (i = 0; i < this.functionalities.length; i++){
                    this.hours += this.functionalities[i].hours;
                }
                this.hours = Math.round((this.hours + Number.EPSILON)*100)/100;
                this.$emit('hours', this.hours);
            },
            newCostCompute(){
                this.cost = 0;
                let i;
                for (i = 0; i < this.functionalities.length; i++){
                    this.cost += this.functionalities[i].cost;
                }
                this.cost = Math.round((this.cost + Number.EPSILON)*100)/100;
                this.$emit('cost', this.cost);
            }
        }
    }
</script>

<style scoped>
    .add-button{
        margin: 4px;
    }
</style>
