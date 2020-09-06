<template>
    <div class="list-group list-group-flush">
        <div class="list-group-item d-flex flex-row">
            <div class=" d-flex flex-row" style="justify-content: space-between">
                <div style="padding-right: 8px">
                    <button type="button" class="btn btn-outline-success" v-bind:class="{'marginFirst' : !index}" @click="removeRole">
                        <font-awesome-icon  icon="minus" />
                    </button>
                </div>
                <div>
                    <input type="text" class="form-control" placeholder="Role" @change="addRole" v-model="role.name"/>
                </div>
            </div>
        </div>
        <div class="list-group-item d-flex flex-row" style="justify-content: space-between;">
            <div style="margin-top: 6px;">
                <label>Price/Hour</label>
            </div>
            <div style="margin-left: 12px">
                <input type="number" size="5" step=0.5 class="form-control" min="0" max=99 placeholder="10" value="role.price" required @change="addRole" v-model="role.price">
            </div>
        </div>
        <div class="list-group-item d-flex flex-row" style="justify-content: space-between;">
            <div style="margin-top: 6px;">
                <label>Default Weight</label>
            </div>
            <div style="margin-left: 12px">
                <input type="number" size="5" step=1 class="form-control" min="0" max=99 placeholder="1" value="role.weight" required @change="addRole" v-model="role.weight">
            </div>
        </div>
        <div class="list-group-item d-flex flex-row" style="justify-content: space-between; border-bottom: 1px solid black">
            <div style="margin-top: 6px;">
                <label>Earnings</label>
            </div>
            <div style="margin-right: 8px; margin-top: 8px; margin-bottom: -8px">
                <p>{{realEarnings}}</p>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: ["index","role"],
        name: "Role",
        data(){
            return{
                taxesCost: 0,
                jediTax: 0
            }
        },
        methods: {
            removeRole(){
                this.$store.commit("removeRole", this.index);
            },
            addRole(){
                if(this.role.name.length !== 0){
                    let payload = {'index': this.index, 'role': this.role};
                    this.$store.commit("updateRole", payload);
                } else {
                    this.$emit('remove', this.index);
                    this.$store.commit("removeRole", this.index);
                }
            }
        },
        created(){
            this.$store.subscribe((mutation, state) => {
                if (mutation.type === "setTaxesCost" || mutation.type === "setJediTax" || mutation.type === "updateRole" || mutation.type === "setPointHour" || mutation.type === "setHourError" || mutation.type === "setHourManagement" || mutation.type === "updateRolesObject" || mutation.type === "updateRoleEarning" || mutation.type === "updateBudget") {
                    this.taxesCost = state.budget.taxesCost;
                    this.jediTax = state.budget.jediTax;
                }
            });
        },
        computed: {
            realEarnings: function () {
                return Math.round(((this.role.earnings-(this.role.earnings*(this.taxesCost/100)))-((this.role.earnings-(this.role.earnings*(this.taxesCost/100)))*(this.jediTax/100)))*100)/100;

            }
        }
    }
</script>

<style scoped>

</style>
