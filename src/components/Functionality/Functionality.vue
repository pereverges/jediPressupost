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
                <input type="text" class="form-control " placeholder="Functionality"
                       v-model="functionality.name" value="functionality.name" @change="updateFunctionality"/>
            </div>
            <div>
                <label v-if="!index">Cost</label>
                <p style="margin-left: 12px; margin-right: 12px; margin-top: 8px">
                    {{functionality.cost}}
                </p>
            </div>
        </div>

        <div class="taskHolder">
            <Task v-for="(task, index) in tasks" :key="task.id" :index="index" @task="updateTask" @remove="removeTask"/>
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
                functionality: {
                    name: "",
                    index: this.index,
                    cost: 0,
                    hours: 0,
                    tasks: []
                },

                tasks: [],
                count: 0,
            }
        },
        methods: {
            updateTask(task) {
                this.functionality.tasks[task.index] = task;
                this.newCostCompute();
                this.newHoursCompute();
            },
            removeFunctionality(){
                this.$emit('remove', this.index);
            },
            addTask(){
                let i = this.functionality.tasks.length;
                this.functionality.tasks.push({
                    name: "",
                    index: i,
                    point: 0,
                    hours: 0,
                    cost: 0,
                    roles: []
                });
                this.tasks.push({id: this.count});
                this.count += 1;
            },
            removeTask(index) {
                this.functionality.tasks.splice(index, 1);
                this.tasks.splice(index,1);
                this.newCostCompute();
                this.newHoursCompute();
            },
            newHoursCompute(){
                this.functionality.hours = 0;
                let i;
                for (i = 0; i < this.functionality.tasks.length; i++){
                    this.functionality.hours += this.functionality.tasks[i].hours;
                }
                this.functionality.hours = Math.round((this.functionality.hours + Number.EPSILON)*100)/100;

                this.updateFunctionality();
            },
            newCostCompute(){
                this.functionality.cost = 0;
                let i;
                for (i = 0; i < this.functionality.tasks.length; i++){
                    this.functionality.cost += this.functionality.tasks[i].cost;
                }
                this.functionality.cost = Math.round((this.functionality.cost + Number.EPSILON)*100)/100;

                this.updateFunctionality();
            },
            updateFunctionality(){
                this.$emit('functionality', this.functionality);
            }
        },
        watch: {
            index: function (newVal) {
                this.functionality.index = newVal;
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
