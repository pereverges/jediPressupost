<template>
    <div class="d-flex flex-row">
        <div v-for="(role, index) in this.roles" :key="index" style="margin-right: 8px">
            <label v-if="!first">{{role.name}}</label>
            <input type="number" size="2" class="form-control" min="0" max="1" placeholder="0" @change="updateRoleObject"
                   v-model="rolesObject[index].number" value="rolesObject[index].number">
        </div>
    </div>
</template>

<script>
    export default {
        name: "Roles",
        props: ["first"],
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
                    let i;
                    for(i = 0; i < this.roles.length; ++i){
                        costHour += this.roles[i].price*this.rolesObject[i].number;
                    }
                }
                this.$emit('updateRolesObject', {'roles': this.rolesObject, 'costHour': costHour});
            }
        },
        mounted(){
            this.roles = this.$store.getters.getRoles;
            let i;
            for (i = 0; i < this.roles.length; i++){
                this.rolesObject.push({
                    name: this.roles[i].name,
                    index: i,
                    number: 0
                })
            }
        },
        created(){
            this.$store.subscribe((mutation, state) => {
                if(mutation.type === "updateRole"){
                    if(state.roles != null){
                        this.roles = state.roles;
                        if(this.roles.length > this.rolesObject.length){
                            let index = this.rolesObject.length;
                            this.rolesObject.push({
                                name: this.roles[index].name,
                                index: index,
                                number: 0
                            });
                        }
                        this.updateRoleObject();
                    } else {
                        this.roles = []
                    }
                } else if(mutation.type === "removeRole"){
                    if(state.lastRoleRemoved != null){
                        this.roles = state.roles;
                        this.rolesObject.splice(state.lastRoleRemoved, 1);
                        this.updateRoleObject();
                    }
                }
            })
        }
    }
</script>

<style scoped>
</style>
