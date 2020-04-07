// store/index.js

import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        roles: [],
        pointHour: 0,
        hourError: 0.0,
        hourManagement: 0.0,
        lastRemoved: null

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
        }
    },
    mutations: {
        removeRole (state, index){
            state.roles.splice(index,1);
            state.lastRemoved = index;
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
        }
    },
    actions: {}
});
