new Vue({
    el:'#app',
    data() {
        return {
            shoes: null
        }
    },
    mounted() {
        axios
            .get('json/data.json')
            .then(response => (this.shoes = response))
    }
})