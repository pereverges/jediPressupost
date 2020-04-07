<template>
  <div id="app">
    <Header msg="Welcome to Your Vue.js App"/>
    <FunctionalityHolder @cost="updateCost" @hours="updateHours"/>
    <div class="d-flex flex-row">
      <Parameters class="align-self-start" style="margin-top: 100px; margin-left: 4px"/>
      <Roles  class="align-self-start" style="margin-top: 100px; margin-left: 12px"/>
      <Result class="align-self-start" :cost="cost" :hours="hours" style="margin-top: 100px; margin-left: 12px"/>
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
      cost: 0,
      hours: 0
    }
  },
  methods: {
    updateCost(cost){
      this.cost = cost;
    },
    updateHours(hours){
      this.hours = hours;
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
