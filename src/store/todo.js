import Vue from "vue";
import Todo from "../model/todo.js";

export default {
    state: {
        mapping: {},
    },
    getters: {
        
    },
    mutations: {
        setCatalog(state, catalog) {
            Vue.set(state.mapping, catalog.id, catalog);
        },
    },
    actions: {
        async catalogList({ commit }, query) {
            const res = await Todo.list(query);
            res.data.results.forEach((app) => {
                commit("setCatalog", app);
            });
            return res;
        },

    },
};
