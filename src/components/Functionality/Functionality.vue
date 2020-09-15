<template>
    <div>
        <div class="d-flex flex-row">
            <div class="margin">
                <button type="button" class="btn btn-outline-primary"  v-bind:class="{'marginFirst' : !findex}" @click="removeFunctionality">
                    <font-awesome-icon  icon="minus" />
                </button>
            </div>
            <div class="flex-grow-1 margin">
                <label v-if="!findex" style="float: left; margin-left: 4px">Functionalities</label>
                <input type="text" class="form-control " placeholder="Functionality"
                       v-model="functionality.name" value="functionality.name" @change="updateFunctionality"/>
            </div>
            <div style="max-width: 90px; min-width: 90px">
                <label v-if="!findex">Cost</label>
                <p style="margin-left: 12px; margin-right: 12px; margin-top: 8px">
                    {{functionality.cost}}
                </p>
            </div>
        </div>

        <div class="taskHolder">
            <Task v-for="(task, index) in functionality.tasks" :key="task.id" :findex="findex" :index="index" :task="task" @task="updateTask" @remove="removeTask"/>
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
        props: ["findex", "functionality"],
        name: "Functionality",
        components: {
            Task
        },
        data(){
            return{
              jediTax: 0
            }
        },
        methods: {
            updateTask(task) {
                this.functionality.tasks[task.index] = task;
                this.newCostCompute();
                this.newHoursCompute();
            },
            removeFunctionality(){
                this.$emit('remove', this.findex);
            },
            addTask(){
                let i = this.functionality.tasks.length;
                this.functionality.tasks.push({
                    name: "",
                    index: i,
                    id: this.functionality.count,
                    point: 0,
                    hours: 0,
                    cost: 0,
                    roles: [],
                });
                this.functionality.count += 1;
            },
            removeTask(index) {
                this.functionality.tasks.splice(index, 1);
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
                let jediTax = this.$store.getters.getJediTax;
                this.functionality.cost = Math.round(this.functionality.cost + ((this.functionality.cost)*(jediTax/100)));
                // this.functionality.cost = Math.round(this.functionality.cost);

                this.updateFunctionality();
            },
            updateFunctionality(){
                this.$emit('functionality', this.functionality);
            }
        },
        watch: {
            findex: function (newVal) {
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
