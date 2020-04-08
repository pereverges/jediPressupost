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
            pointHour: 0,
            hourError: 0.0,
            hourManagement: 0.0,
            totalCost: 0,
            totalHours: 0,
            lastRoleRemoved: null
        },

    },
    getters: {
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
    },
    mutations: {
        removeRole (state, index){
            state.budget.rolesObject.roles.splice(index,1);
            state.budget.lastRoleRemoved = index;
        },
        updateRole (state, payload){
            state.budget.rolesObject.roles.splice(payload.index,1,payload.role);
        },
        updateRoleObject(state, rolesObject) {
            state.budget.rolesObject = rolesObject;
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
        updateBudget(state, functionalitiesObject){
            state.budget.functionalitiesObject = functionalitiesObject;
        },
        uploadNewBudget(state, budget){
            state.budget = budget;
        }
    },
    actions: {}
});
