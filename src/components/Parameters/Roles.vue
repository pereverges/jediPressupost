<template>
    <div class="card bg-light mb-3" style="max-width: 280px; min-width: 280px; padding: 0;">
        <div class="card-header">Roles</div>
        <div class="card-body" style="padding: 0">
            <div class="list-group list-group-flush" >
                <Role v-for="(role, index) in roles" :key="role.id" :index="index" @remove="removeTask"/>
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
                count: 0,
                roles: [],
            }
        },
        methods: {
            removeTask(index) {
                this.roles.splice(index,1);
            },
            addRole(){
                this.roles.push({id: this.count});
                this.count += 1;
            }
        }
    }
</script>

<style scoped>

</style>
