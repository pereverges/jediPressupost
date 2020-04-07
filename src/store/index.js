// store/index.js

import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        budget: {
            functionalitiesObject: {
            },
            roles: [],
            pointHour: 0,
            hourError: 0.0,
            hourManagement: 0.0,
            totalCost: 0,
            totalHours: 0,
        },
        lastRoleRemoved: null

    },
    getters: {
        getRoles: state => {
            return state.budget.roles;
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
        }
    },
    mutations: {
        removeRole (state, index){
            state.budget.roles.splice(index,1);
            state.lastRoleRemoved = index;
        },
        updateRole (state, payload){
            state.budget.roles.splice(payload.index,1,payload.role);
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
        }
    },
    actions: {}
});
