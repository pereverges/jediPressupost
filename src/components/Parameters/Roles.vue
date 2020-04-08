<template>
    <div class="card bg-light mb-3" style="max-width: 280px; min-width: 280px; padding: 0;">
        <div class="card-header">Roles</div>
        <div class="card-body" style="padding: 0">
            <div class="list-group list-group-flush" >
                <Role v-for="(role, index) in rolesObject.roles" :key="role.id" :index="index" :role="role"/>
                <div class="list-group-item d-flex flex-row" style="justify-content: space-between">
                    <button type="button" class="btn btn-outline-success float-left add-button" @click="addRole">
                        <font-awesome-icon  icon="plus"/>
                    </button>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
    import Role from "@/components/Parameters/Role";
    export default {
        name: "Roles",
        components: {
            Role
        },
        data(){
            return{
                rolesObject: {
                    count: 0,
                    roles: [],
                }
            }
        },
        methods: {
            addRole(){
                this.rolesObject.roles.push({
                    id: this.rolesObject.count,
                    name: "",
                    price: 0
                });
                this.rolesObject.count += 1;
                this.updateRoleObject();
            },
            updateRoleObject(){
                this.$store.commit("updateRoleObject", this.rolesObject);
            }
        },
        created(){
            this.$store.subscribe((mutation, state) => {
                if (mutation.type === "uploadNewBudget") {
                    if (state.budget != null) {
                        this.rolesObject = state.budget.rolesObject
                    }
                } else if (mutation.type === "removeRole"){
                    this.rolesObject.roles = state.budget.rolesObject.roles;
                }
            });
        }
    }
</script>

<style scoped>

</style>
