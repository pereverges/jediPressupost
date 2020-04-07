// store/index.js

import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        functionalitiesObject: {
            totalCost: 0,
            totalHours: 0,
            functionalities: []
        },
        roles: [],
        pointHour: 0,
        hourError: 0.0,
        hourManagement: 0.0,
        totalCost: 0,
        totalHours: 0,
        lastRoleRemoved: null

    },
    getters: {
        getRoles: state => {
            return state.roles;
        },
        getPointHour: state => {
            return state.pointHour;
        },
        getHourError: state => {
            return state.hourError;
        },
        getHourManagement: state => {
            return state.hourManagement
        },
        getBudget: state => {
            return state.functionalitiesObject;
        }
    },
    mutations: {
        removeRole (state, index){
            state.roles.splice(index,1);
            state.lastRoleRemoved = index;
        },
        updateRole (state, payload){
            state.roles.splice(payload.index,1,payload.role);
        },
        setPointHour(state, pointHour){
            state.pointHour = pointHour;
        },
        setHourError(state, hourError){
            state.hourError = hourError;
        },
        setHourManagement(state, hourManagement){
            state.hourManagement = hourManagement
        },
        updateBudget(state, functionalitiesObject){
            state.functionalitiesObject = functionalitiesObject;
        }
    },
    actions: {}
});
