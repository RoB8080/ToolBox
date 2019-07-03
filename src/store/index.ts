import Vue from 'vue'
import Vuex from 'vuex'
import Setting from './setting'
import Desktop from './desktop'

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        setting: Setting,
        desktop: Desktop
    }
})
