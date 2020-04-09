<template>
  <div id="app">
    <Header msg="Welcome to Your Vue.js App"/>
    <FunctionalityHolder/>
    <div class="d-flex flex-row">
      <Parameters class="align-self-start" style="margin-top: 100px; margin-left: 4px"/>
      <Roles  class="align-self-start" style="margin-top: 100px; margin-left: 12px"/>
      <Result class="align-self-start" style="margin-top: 100px; margin-left: 12px"/>
    </div>
    <div class="d-flex flex-row">
      <button class="btn btn-outline-primary" style="margin-left: 52px; margin-top: 8px" @click="saveData">Save</button>
      <div class="custom-file" style="max-width: 170px; margin-top: 8px; margin-left: 12px">
        <input type="file" class="custom-file-input"  style="margin-top: 8px" @change="loadBudget">
        <label class="custom-file-label" style="margin-right: -70px; padding-left: 0">Select file</label>
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
