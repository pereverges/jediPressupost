<template>
  <div id="app" style="min-width: 650px">
    <Header msg="Welcome to Your Vue.js App"/>
    <div style="float: left; width: 100%;  margin-left: 18px;">
      <FunctionalityHolder/>
    </div>
    <div class="container" style="float: left; margin-top:30px; margin-left: 22px;">
      <div class="row">
        <Parameters class="align-self-start col-md-auto"  style="margin-right: 12px"/>
        <Roles  class="align-self-start col-md-auto" style="margin-right: 12px"/>
        <Result class="align-self-start col-md-auto" style="margin-right: 12px"/>
        <div class="col-md-auto align-self-start" style="margin-right: -4px; padding-left: 0; margin-bottom: 16px">
          <button class="btn btn-outline-primary align-self-start" style="float:left;" @click="saveData">Save</button>
        </div>
        <div class="col-md-auto" style="padding-left: 0">
          <div class="custom-file" style="max-width: 170px; float:left;">
            <input type="file" class="custom-file-input"  style="margin-top: 8px" @change="loadBudget">
            <label class="custom-file-label" style="margin-right: -70px; padding-left: 0">Select file</label>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from './components/Header.vue'
import FunctionalityHolder from "@/components/FunctionalityHolder";
import Parameters from "@/components/Parameters/Parameters";
import Result from "@/components/Parameters/Result";
import Roles from "@/components/Parameters/Roles";


export default {
  name: 'App',
  components: {
    Result,
    Parameters,
    Header,
    FunctionalityHolder,
    Roles
  },
  data(){
    return{
      budget: {}
    }
  },
  methods: {
    saveData(){
      this.budget = this.$store.getters.getAllData;
      let dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(this.budget, null, 2));
      let downloadAnchorNode = document.createElement('a');
      downloadAnchorNode.setAttribute("href",     dataStr);
      downloadAnchorNode.setAttribute("download", "budget" + ".json");
      document.body.appendChild(downloadAnchorNode); // required for firefox
      downloadAnchorNode.click();
      downloadAnchorNode.remove();
    },
    loadBudget(event){
      const file = event.target.files[0];
      const reader = new FileReader();

      reader.onload = ev => this.$store.commit('uploadNewBudget',  JSON.parse(ev.target.result));
      reader.readAsText(file);
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 30px;
}
</style>
