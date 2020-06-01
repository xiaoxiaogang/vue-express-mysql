import Hello from "../components/Hello";

// 对$yunce的实例重新封装成一个plugin ,方便 Vue.use(xxxx)
export default {
    install: function (Vue, Option) {
        //Object.defineProperty(Vue.prototype, '$yunce', { value: yunCe })
        Vue.component(Hello.name, Hello)
    }
}