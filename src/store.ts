import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        settings: {
            background: {
                colorA: "#98aab3",
                colorB: "#e2ebf0"
            }
        }
    },
    mutations: {
        backgroundColorA(state,color: string) {
            state.settings.background.colorA = color;
        },
        backgroundColorB(state,color: string) {
            state.settings.background.colorB = color;
        },
    },
    actions: {
        backgroundColorA(context,color: string) {
            context.commit("backgroundColorA",color);
        },
        backgroundColorB(context,color: string) {
            context.commit("backgroundColorB",color);
        },
    }
})
