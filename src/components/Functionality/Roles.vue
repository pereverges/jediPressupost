<template>
    <div class="d-flex flex-row">
        <div v-for="(role, index) in this.roles" :key="index">
            <div class="d-flex flex-row">
                <div class="marginLeft input_width">
                    <label class="input_width" v-if="!tindex" v-bind:class="{'marginFirst' : !role.name.length}">{{role.name}}</label>
                    <input type="number" size="2" class="form-control" min="0" max="99" placeholder="0" @change="updateRoleObject"
                        v-model="rolesObject[index].weight" value="rolesObject[index].weight">
                </div>
            </div>

        </div>
    </div>
</template>

<script>
    import ResizeText from 'vue-resize-text'
    export default {
        name: "Roles",
        props: ["tindex","findex"],
        directives: {
            ResizeText
        },
        data(){
            return{
                roles: [],
                rolesObject: []
            }
        },
        methods: {
            updateRoleObject(){
                let costHour = 0;
                if (this.roles.length === this.rolesObject.length){
                    let j;
                    let totalWeights = 0;
                    for(j=0; j < this.rolesObject.length; ++j){
                        totalWeights += parseInt(this.rolesObject[j].weight);
                    }
                    if(totalWeights === 0){
                        totalWeights = 1;
                    }
                    let i;
                    for(i = 0; i < this.rolesObject.length; ++i){
                        costHour += this.roles[i].price*(this.rolesObject[i].weight/totalWeights);
                    }
                }
                this.$emit('updateRolesObject', {'roles': this.rolesObject, 'costHour': costHour});
            }
        },
        mounted(){
            if(this.$store.getters.getRoles !== undefined) {
                this.roles = this.$store.getters.getRoles;
            }
            let i = 0;
            if(this.$store.getters.getAllData.functionalitiesObject.functionalities !== undefined){
                if(this.$store.getters.getAllData.functionalitiesObject.functionalities[this.findex] !== undefined){
                    if(this.$store.getters.getAllData.functionalitiesObject.functionalities[this.findex].tasks[this.tindex].roles !== undefined){
                        this.rolesObject = this.$store.getters.getAllData.functionalitiesObject.functionalities[this.findex].tasks[this.tindex].roles;
                        i = this.$store.getters.getAllData.functionalitiesObject.functionalities[this.findex].tasks[this.tindex].roles.length;
                    }

                }

            }
            for (i; i < this.roles.length; i++){
                this.rolesObject.push({
                    name: this.roles[i].name,
                    index: i,
                    weight: 0
                })
            }
            this.updateRoleObject();
        },
        created(){
            this.$store.subscribe((mutation, state) => {
                if(mutation.type === "updateRole" || mutation.type === "updateRoleObject"){
                    if(state.budget.rolesObject.roles != null){
                        this.roles = state.budget.rolesObject.roles;
                        if(this.roles.length > this.rolesObject.length){
                            let index = this.rolesObject.length;
                            this.rolesObject.push({
                                name: this.roles[index].name,
                                index: index,
                                weight: 0
                            });
                        }
                        this.updateRoleObject();
                    } else {
                        this.roles = []
                    }
                } else if(mutation.type === "removeRole"){
                    if(state.budget.lastRoleRemoved != null){
                        this.roles = state.budget.rolesObject.roles;
                        this.rolesObject.splice(state.budget.lastRoleRemoved, 1);
                        this.updateRoleObject();
                    }
                } else if(mutation.type === "uploadNewBudget"){
                    this.roles = state.budget.rolesObject.roles;
                    this.rolesObject = [];
                    if(state.budget.functionalitiesObject.functionalities[this.findex]){
                        if(state.budget.functionalitiesObject.functionalities[this.findex].tasks[this.tindex] !== undefined) {
                           this.rolesObject = state.budget.functionalitiesObject.functionalities[this.findex].tasks[this.tindex].roles;
                        }
                    }
                    this.updateRoleObject();
                }
            })
        }
    }
</script>

<style scoped>
    .marginLeft{
        margin-left: 8px
    }

    .marginFirst{
        margin-top: 19px
    }

    .input_width{
        max-width: 60px;
        min-width: 60px;
    }

</style>
