<template>
    <div class="d-flex flex-row">
        <div v-for="(role, index) in this.roles" :key="index" style="margin-right: 8px">
            <label v-if="!first">{{role.name}}</label>
            <input type="number" size="2" class="form-control" min="0" max="99" placeholder="0" @change="updateNumberRole" v-model="roleNumber[index]" value="roleNumber[index]">
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
                roleNumber: []
            }
        },
        methods: {
            updateNumberRole(){
                let priceHour = 0;
                if (this.roles.length === this.roleNumber.length){
                    let i;
                    for(i = 0; i < this.roles.length; ++i){
                        priceHour += this.roles[i].price*this.roleNumber[i];
                    }

                }
                this.$emit('updateNumberRole', priceHour);
            }
        },
        mounted(){
            this.roles = this.$store.getters.getRoles;
        },
        created(){
            this.$store.subscribe((mutation, state) => {
                if(mutation.type === "updateRole"){
                    if(state.roles != null){
                        this.roles = state.roles;
                        if(this.roles.length > this.roleNumber.length){
                            this.roleNumber.push("0");
                        }
                        this.updateNumberRole();
                    } else {
                        this.roles = []
                    }
                } else if(mutation.type === "removeRole"){
                    if(state.lastRemoved != null){
                        this.roles = state.roles;
                        this.roleNumber.splice(state.lastRemoved, 1);
                        this.updateNumberRole();
                    }
                }
            })
        }
    }
</script>

<style scoped>
</style>
