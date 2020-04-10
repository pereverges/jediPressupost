<template>
    <div>
        <div class="d-flex flex-row">
            <div class="margin">
                <button type="button" class="btn btn-outline-danger"  v-bind:class="{'marginFirst' : !index}" style="margin-left: -4px" @click="removeFixedCost">
                    <font-awesome-icon  icon="minus" />
                </button>
            </div>
            <div class="flex-grow-1 margin">
                <label v-if="!index" style="float: left; margin-left: 4px">Fixed Costs</label>
                <input type="text" class="form-control " placeholder="Fixed cost"
                       v-model="fixedCost.name" value="fixedCost.name" @change="updateFixedCost"/>
            </div>
            <div style="max-width: 90px; min-width: 90px">
                <label v-if="!index">Cost</label>
                <div style="margin: 4px" >
                    <input type="number" size="4" step="1" class="form-control" min="0" max="9999" v-model="fixedCost.cost" value="fixedCost.cost"  @change="updateFixedCost">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: ["index", "fixedCost"],
        name: "FixedCosts",
        methods: {
            removeFixedCost(){
                this.$emit('remove', this.index);
            },
            updateFixedCost(){
                this.$emit('fixedCost', this.fixedCost);
            }
        }
    }
</script>

<style scoped>
    .marginFirst{
        margin-top: 32px;
    }
    .margin {
        margin: 4px;
    }

    .taskHolder{
        margin: 0px 0px 50px 50px;
    }

    .add-button{
        margin: 4px;
    }
</style>
