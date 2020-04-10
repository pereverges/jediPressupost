<template>
    <div style="margin-left: 4px; margin-top: 4px;">
        <FixedCosts v-for="(fixedCost, index) in fixedCostsObject.fixedCosts" :key="fixedCost.id" :fixedCost="fixedCost" :index="index" @fixedCost="updateFixedCost" @remove="removeFixedCost"/>
        <div>
            <button type="button" class="btn btn-outline-danger float-left add-button" @click="addFixedCost">
                <font-awesome-icon  icon="plus"/>
            </button>
        </div>
    </div>
</template>

<script>
    import FixedCosts from "@/components/FixedCosts/FixedCosts";
    export default {
        name: "FixedCostsHolder",
        data(){
            return{
                fixedCostsObject: {
                    fixedCosts: [],
                    count: 0,
                    cost: 0
                }
            }
        },
        components: {
            FixedCosts
        },
        methods: {
            addFixedCost(){
                let i = this.fixedCostsObject.fixedCosts.length;
                this.fixedCostsObject.fixedCosts.push({
                    name: "",
                    index: i,
                    id: this.fixedCostsObject.count,
                    cost: 0,
                });
                this.fixedCostsObject.count += 1;
            },
            updateFixedCost(fixedCost) {
                this.fixedCostsObject.fixedCosts[fixedCost.index] = fixedCost;
                this.newCostCompute();
            },
            removeFixedCost(index) {
                this.fixedCostsObject.fixedCosts.splice(index,1);
                this.newCostCompute();
            },
            newCostCompute(){
                this.fixedCostsObject.cost = 0;
                let i;
                for (i = 0; i < this.fixedCostsObject.fixedCosts.length; i++){
                    this.fixedCostsObject.cost += parseInt(this.fixedCostsObject.fixedCosts[i].cost);
                }
                this.fixedCostsObject.cost = Math.round((this.fixedCostsObject.cost + Number.EPSILON)*100)/100;
                this.$store.commit("updateFixedCosts", this.fixedCostsObject);
            }
        },
        mounted(){
            this.roles = this.$store.getters.getFixedCostObject;
        },
        created(){
            this.$store.subscribe((mutation, state) => {
                if (mutation.type === "uploadNewBudget") {
                    this.fixedCostsObject = state.budget.fixedCostsObject;
                }
            });
        }
    }
</script>

<style scoped>

</style>
