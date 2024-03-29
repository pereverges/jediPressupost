// store/index.js

import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        budget: {
            functionalitiesObject: {
            },
            rolesObject: {
            },
            fixedCostsObject: {
            },
            budgetName: "",
            pointHour: 0,
            hourError: 0.0,
            hourManagement: 0.0,
            totalCost: 0,
            jediTax: 0,
            taxesCost: 0,
            totalHours: 0,
            lastRoleRemoved: null
        },

    },
    getters: {
        getFunctionalityCost: state => {
            return state.budget.functionalitiesObject.totalCost
        },
        getRoles: state => {
            return state.budget.rolesObject.roles;
        },
        getPointHour: state => {
            return state.budget.pointHour;
        },
        getHourError: state => {
            return state.budget.hourError;
        },
        getHourManagement: state => {
            return state.budget.hourManagement
        },
        getBudget: state => {
            return state.budget.functionalitiesObject;
        },
        getAllData: state => {
            return state.budget;
        },
        getFixedCostObject: state => {
            return state.budget.fixedCostsObject;
        },
        getJediTax: state => {
            return state.budget.jediTax;
        }
    },
    mutations: {
        removeRole (state, index){
            state.budget.rolesObject.roles.splice(index,1);
            state.budget.lastRoleRemoved = index;
        },
        updateRole (state, payload){
            state.budget.rolesObject.roles.splice(payload.index,1,payload.role);
        },
        updateRoleWeight (state, payload){
            state.budget.rolesObject.roles.splice(payload.index,1,payload.role);
        },
        updateRoleEarning (state, payload){
            state.budget.rolesObject.roles.splice(payload.index,1,payload.role);
        },
        updateRoleObject(state, rolesObject) {
            state.budget.rolesObject = rolesObject;
        },
        refreshRole(state){
            console.log(state);
        },
        setPointHour(state, pointHour){
            state.budget.pointHour = pointHour;
        },
        setHourError(state, hourError){
            state.budget.hourError = hourError;
        },
        setHourManagement(state, hourManagement){
            state.budget.hourManagement = hourManagement
        },
        setTaxesCost(state, taxesCost){
            state.budget.taxesCost = taxesCost;
        },
        setJediTax(state, jediTax){
            state.budget.jediTax = jediTax;
        },
        updateBudget(state, functionalitiesObject){
            state.budget.functionalitiesObject = functionalitiesObject;
            if(state.budget.fixedCostsObject.cost !== undefined){
                state.budget.totalCost = state.budget.functionalitiesObject.totalCost + state.budget.fixedCostsObject.cost;
            } else {
                state.budget.totalCost = state.budget.functionalitiesObject.totalCost;
            }
        },
        uploadNewBudget(state, budget){
            state.budget = budget;
        },
        updateFixedCosts(state, fixedCostObject){
            state.budget.fixedCostsObject = fixedCostObject;
            if(state.budget.functionalitiesObject.totalCost !== undefined){
                state.budget.totalCost = state.budget.functionalitiesObject.totalCost + state.budget.fixedCostsObject.cost;
            } else {
                state.budget.totalCost = state.budget.fixedCostsObject.cost;
            }
        },
        updateBudgetName(state, budgetName){
            state.budget.budgetName = budgetName;
        }
    },
    actions: {}
});
