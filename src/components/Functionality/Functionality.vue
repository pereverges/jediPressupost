<template>
    <div>
        <div class="d-flex flex-row">
            <div class="margin">
                <button type="button" class="btn btn-outline-primary"  v-bind:class="{'marginFirst' : !index}" @click="removeFunctionality">
                    <font-awesome-icon  icon="minus" />
                </button>
            </div>
            <div class="flex-grow-1 margin">
                <label v-if="!index" style="float: left; margin-left: 4px">Functionalities</label>
                <input type="text" class="form-control " placeholder="Functionality"/>
            </div>
            <div>
                <label v-if="!index">Cost</label>
                <p style="margin-left: 12px; margin-right: 12px; margin-top: 8px">
                    {{cost}}
                </p>
            </div>
        </div>

        <div class="taskHolder">
            <Task v-for="(task, index) in tasks" :key="task.id" :index="index" @cost="updateCost" @hours="updateHours" @remove="removeTask"/>
            <div>
                <button type="button" class="btn btn-outline-success float-left add-button" @click="addTask">
                    <font-awesome-icon  icon="plus"/>
                </button>
            </div>
        </div>

    </div>
</template>

<script>
    import Task from "@/components/Functionality/Task";
    export default {
        props: ["index"],
        name: "Functionality",
        components: {
            Task
        },
        data(){
            return{
                tasks: [],
                count: 0,
                cost: 0,
                hours: 0,
            }
        },
        methods: {
            removeFunctionality(){
                this.$emit('remove', this.index);
            },
            addTask(){
                this.tasks.push({cost: "0", hours: "0", id: this.count});
                this.count += 1;
            },
            removeTask(index) {
                this.tasks.splice(index,1);
                this.newCostCompute();
                this.newHoursCompute();
            },
            updateCost(task){
                this.tasks[task.index].cost = task.cost;
                this.newCostCompute();
            },
            updateHours(task){
                this.tasks[task.index].hours = task.hours;
                this.newHoursCompute();
            },
            newHoursCompute(){
                this.hours = 0;
                let i;
                for (i = 0; i < this.tasks.length; i++){
                    this.hours += this.tasks[i].hours;
                }
                this.hours = Math.round((this.hours + Number.EPSILON)*100)/100;
                this.$emit('hours', {'index': this.index, 'hours': this.hours});
            },
            newCostCompute(){
                this.cost = 0;
                let i;
                for (i = 0; i < this.tasks.length; i++){
                    this.cost += this.tasks[i].cost;
                }
                this.cost = Math.round((this.cost + Number.EPSILON)*100)/100;
                this.$emit('cost', {'index': this.index, 'cost': this.cost});
            }
        }
    }
</script>

<style scoped>
.margin {
    margin: 4px;
}

.taskHolder{
    margin: 0px 0px 50px 50px;
}

.add-button{
    margin: 4px;
}

.marginFirst{
    margin-top: 32px;
}
</style>
