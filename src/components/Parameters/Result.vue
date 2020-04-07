<template>
    <div class="card bg-light mb-3" style="max-width: 300px; min-width: 200px; padding: 0px;">
        <div class="card-header">Result</div>
        <div class="card-body" style="padding: 0">
            <div class="list-group list-group-flush" >
                <div class="list-group-item d-flex flex-row" style="justify-content: space-between">
                    <div style="margin-top: 6px;">
                        <label>Total cost</label>
                    </div>
                    <div style="margin-left: 12px">
                        <p style="margin: 6px">{{cost}}</p>
                    </div>
                </div>
                <div class="list-group-item d-flex flex-row" style="justify-content: space-between">
                    <div style="margin-top: 6px;">
                        <label>Total hours</label>
                    </div>
                    <div style="margin-left: 12px">
                        <p style="margin: 6px">{{hours}}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Result",
        props: ["cost", "hours"]
    }
</script>

<style scoped>

</style>
