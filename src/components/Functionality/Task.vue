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
                <input type="text" class="form-control" placeholder="Task"/>
            </div>
            <div class="margin" >
                <label v-if="!index">Points</label>
                <input type="number" size="2" class="form-control" min="0" max="21" placeholder="1" v-model="point" @change="updateHours">
            </div>
            <div class="margin">
                <label v-if="!index">Hours</label>
                <p style="margin-left: 12px; margin-right: 12px; margin-top: 7px">
                    {{hours}}
                </p>
            </div>
            <div>
                <Roles class="margin" :first="index" @updateNumberRole="updateNumberRole"/>
            </div>
            <div class="margin">
                <label v-if="!index">Cost</label>
                <p style="margin-left: 12px; margin-right: 12px; margin-top: 7px">
                    {{cost}}
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
                roles: [],
                pointHour: 0,
                point: 0,
                hourError: 0.0,
                hourManagement: 0.0,
                cost: 0
            }
        },
        methods: {
            removeTask(){
                this.$emit('remove', this.index);
            },
            updateNumberRole(costHour) {
                this.cost = Math.round((costHour*this.hours + Number.EPSILON)*100)/100;
                this.$emit('cost', {'index': this.index, 'cost': this.cost});
            },
            updateHours(){
                this.$emit('hours', {'index': this.index, 'hours': this.hours});
            }
        },
        computed: {
            hours: function(){
                let h = this.point * this.pointHour;
                return Math.round(((h + (h * this.hourError) + (h * this.hourManagement)) + Number.EPSILON)*100)/100;
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
                    if(state.pointHour != null){
                        this.pointHour = state.pointHour;
                        this.updateHours();
                    }
                } else if(mutation.type === "setHourError"){
                   if(state.hourError != null){
                       this.hourError = state.hourError;
                       this.updateHours();
                   }
                } else if(mutation.type === "setHourManagement"){
                    this.hourManagement = state.hourManagement;
                    this.updateHours();
                } else if(mutation.type === "updateRole"){
                    if(state.roles != null){
                        this.roles = state.roles;
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
