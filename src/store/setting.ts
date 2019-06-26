export default {
    namespaced: true,
    state: {
        background: {
            gradient: true,
            colorA: "#98aab3",
            colorB: "#e2ebf0"
        },

    },
    mutations: {
        backgroundGradient(state: any, enable: boolean) {
            state.background.gradient = enable;
        },
        backgroundColorA(state: any, color: string) {
            state.background.colorA = color;
        },
        backgroundColorB(state: any,color: string) {
            state.background.colorB = color;
        },
    },
    actions: {
        backgroundGradient(context: any, enable: boolean) {
            context.commit("backgroundGradient", enable);
        },
        backgroundColorA(context: any, color: string) {
            context.commit("backgroundColorA",color);
        },
        backgroundColorB(context: any, color: string) {
            context.commit("backgroundColorB",color);
        },
    }
}
