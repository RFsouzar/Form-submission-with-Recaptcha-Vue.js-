import Vue from 'vue';
import axios from 'axios';

Vue.use({
    install(Vue){
        Vue.prototype.$axios = function () {
            return axios.create({
                baseURL: `${window.location.protocol}//`,
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                }
            });
        };
    }
})