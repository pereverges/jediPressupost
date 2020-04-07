<template>
    <div>
        <div class="d-flex flex-row">
            <div>
                <button type="button" class="btn btn-outline-success margin" v-bind:class="{'marginFirst' : !index}" @click="removeTask">
                    <font-awesome-icon  icon="minus" />
                </button>
            </div>

            <div class="flex-grow-1 margin">
                <label v-if="!index" style="float: left; margin-left: 4px">Tasks</label>
                <input type="text" class="form-control" placeholder="Task" v-model="task.name" value="task.name" @change="updateTask"/>
            </div>
            <div class="margin" >
                <label v-if="!index">Points</label>
                <input type="number" size="2" class="form-control" min="0" max="21" placeholder="1" v-model="task.point" @change="updateHours">
            </div>
            <div class="margin">
                <label v-if="!index">Hours</label>
                <p style="margin-left: 12px; margin-right: 12px; margin-top: 7px">
                    {{task.hours}}
                </p>
            </div>
            <div>
                <Roles class="margin" :first="index" @updateRolesObject="updateRolesObject"/>
            </div>
            <div class="margin">
                <label v-if="!index">Cost</label>
                <p style="margin-left: 12px; margin-right: 12px; margin-top: 7px">
                    {{task.cost}}
                </p>
            </div>
        </div>
    </div>
</template>

<script>
    import Roles from "@/components/Functionality/Roles";
    export default {
        props: ["index"],
        name: "Task",
        components:{
            Roles
        },
        data(){
            return{
                task: {
                    name: "",
                    index: this.index,
                    point: 0,
                    hours: 0,
                    cost: 0,
                    roles: []
                },

                roles: [],
                pointHour: 0,
                hourError: 0,
                hourManagement: 0,
                costHour: 0
            }
        },
        methods: {
            removeTask(){
                this.$emit('remove', this.index);
            },
            updateRolesObject(parameters) {
                this.task.roles = parameters.roles;
                this.costHour = parameters.costHour;

                this.task.cost = Math.round((this.costHour*this.task.hours + Number.EPSILON)*100)/100;

                this.updateTask();
            },
            updateHours(){
                let h = this.task.point * this.pointHour;

                this.task.hours = Math.round(((h + (h * this.hourError) + (h * this.hourManagement)) + Number.EPSILON)*100)/100;
                if(this.task.hours != null){
                    this.task.cost = Math.round((this.costHour*this.task.hours + Number.EPSILON)*100)/100;
                }

                this.updateTask();
            },
            updateTask(){
                this.$emit('task', this.task);
            }
        },
        watch: {
            index: function (newVal) {
                this.task.index = newVal;
            }
        },
        mounted(){
            this.roles = this.$store.getters.getRoles;
            this.pointHour = this.$store.getters.getPointHour;
            this.hourError = this.$store.getters.getHourError;
            this.hourManagement = this.$store.getters.getHourManagement;
        },
        created(){
            this.$store.subscribe((mutation, state) => {
                if(mutation.type === "setPointHour"){
                    if(state.budget.pointHour != null){
                        this.pointHour = state.budget.pointHour;
                        this.updateHours();
                    }
                } else if(mutation.type === "setHourError"){
                   if(state.budget.hourError != null){
                       this.hourError = state.budget.hourError;
                       this.updateHours();
                   }
                } else if(mutation.type === "setHourManagement"){
                    this.hourManagement = state.budget.hourManagement;
                    this.updateHours();
                } else if(mutation.type === "updateRole"){
                    if(state.budget.roles != null){
                        this.roles = state.budget.roles;
                    } else{
                        this.roles = [];
                    }
                }
            })
        }
    }
</script>

<style scoped>
.margin{
    margin: 4px;
}
.marginFirst{
    margin-top: 36px;
}

</style>
