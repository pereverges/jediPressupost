<template>
  <div id="app" style="min-width: 650px">
    <Header msg="Welcome to Your Vue.js App"/>
    <div style="float: left; width: 100%;  padding-left: 22px; padding-right: 10px; margin-bottom: 12px">
      <input type="text" class="form-control " placeholder="Budget name"
             v-model="budgetName" value="budgetName" @change="updateBudgetName"/>
    </div>
    <div style="float: left; width: 100%;  margin-left: 18px;">
      <FunctionalityHolder/>
    </div>
    <div style="float: left; width: 100%;  margin-left: 18px;">
      <FixedCostsHolder/>
    </div>
    <div class="container" style="float: left; margin-top:30px; margin-left: 22px;">
      <div class="row">
        <Parameters class="align-self-start col-md-auto"  style="margin-right: 12px"/>
        <Roles  class="align-self-start col-md-auto" style="margin-right: 12px"/>
        <Result class="align-self-start col-md-auto" style="margin-right: 12px"/>
        <div class="col-md-auto align-self-start" style="margin-right: -4px; padding-left: 0; margin-bottom: 16px">
          <button class="btn btn-outline-primary align-self-start" style="float:left;" @click="saveData">Save</button>
        </div>
        <div class="col-md-auto align-self-start" style="margin-right: -4px; padding-left: 0; margin-bottom: 16px">
          <button class="btn btn-outline-primary align-self-start" style="float:left;" @click="createPdf">PDF</button>
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
import FixedCostsHolder from "@/components/FixedCosts/FixedCostsHolder";
import jsPDF from 'jspdf'

export default {
  name: 'App',
  components: {
    Result,
    Parameters,
    Header,
    FunctionalityHolder,
    Roles,
    FixedCostsHolder
  },
  data(){
    return{
      budget: {},
      budgetName: ""
    }
  },
  methods: {
    updateBudgetName(){
      this.$store.commit("updateBudgetName", this.budgetName);
    },
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
    createPdf(){
      let budget = this.$store.getters.getAllData;
      let doc = new jsPDF();
      // eslint-disable-next-line no-unused-vars
      let pageHeight = doc.internal.pageSize.getHeight();
      let pageWidth = doc.internal.pageSize.width || doc.internal.pageSize.getWidth();
      let y = 20;
      let x = 10;
      doc.setFontSize(24);
      doc.setTextColor("#4972b1");
      doc.setFontStyle('bold');
      doc.text(budget.budgetName, x, y);
      y += 15;
      doc.setTextColor("#000000");
      let i = 0;
      while (i < budget.functionalitiesObject.functionalities.length){
        doc.setFontStyle('bold');
        doc.setFontSize(12);
        x = 10;
        doc.text(budget.functionalitiesObject.functionalities[i].name, x, y, {maxWidth: pageWidth-40-doc.getTextWidth(budget.functionalitiesObject.functionalities[i].cost.toString())});
        doc.text(budget.functionalitiesObject.functionalities[i].cost.toString(), pageWidth-10, y, 'right');
        if(doc.getTextWidth(budget.functionalitiesObject.functionalities[i].name) > pageWidth-40-20){
          y += 4;
        }
        y += 8;
        if (y >= pageHeight){
          doc.addPage();
          y = 20;
        }
        let j = 0;
        x = 20;
        doc.setFontSize(10);
        doc.setFontStyle('normal');
        while(j < budget.functionalitiesObject.functionalities[i].tasks.length){
          doc.text("- " + budget.functionalitiesObject.functionalities[i].tasks[j].name, x, y, {maxWidth: pageWidth-40});
          if(doc.getTextWidth(budget.functionalitiesObject.functionalities[i].tasks[j].name) > pageWidth-40-20){
            y += 4;
          }
          y += 4;
          if (y >= pageHeight-10){
            doc.addPage();
            y = 20;
          }
          j = j+1;
        }
        y += 4;
        i = i+1;
      }
      let k = 0;
      if(budget.fixedCostsObject.fixedCosts !== undefined) {
        while (k < budget.fixedCostsObject.fixedCosts.length) {
          doc.setFontStyle('bold');
          doc.setFontSize(12);
          x = 10;
          doc.text(budget.fixedCostsObject.fixedCosts[k].name, x, y);
          doc.text(budget.fixedCostsObject.fixedCosts[k].cost.toString(), pageWidth - 10, y, 'right');
          y += 8;
          if (y >= pageHeight){
            doc.addPage();
            y = 20;
          }
          k += 1;
        }
      }
      x = 10;
      doc.setFontStyle('bold');
      doc.setFontSize(12);
      doc.line(10,y,pageWidth-10,y);
      y += 12;
      if (y >= pageHeight){
        doc.addPage();
        y = 20;
      }
      doc.text("Total cost", x, y);
      doc.text((budget.jediTax*budget.totalCost*0.01+budget.totalCost+budget.taxesCost*budget.totalCost*0.01).toString(), pageWidth-10,y, 'right');
      y += 6;
      if (y >= pageHeight){
        doc.addPage();
        y = 20;
      }
      doc.text("Total hours", x, y);
      doc.text(this.$store.getters.getBudget.totalHours.toString(), pageWidth-10,y, 'right');
      doc.save('pressupost.pdf');
    },
    loadBudget(event){
      const file = event.target.files[0];
      const reader = new FileReader();

      reader.onload = ev => {
        this.$store.commit('uploadNewBudget',  JSON.parse(ev.target.result));
        this.budget = JSON.parse(ev.target.result);
      }
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
