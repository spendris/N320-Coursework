
var app = new Vue({
    el: "#app",
    data: {
        page1: true, //true if on home page
        page2: false, //true if on character page
        transition: false, //whether a transition is needed or not
    },
    data() {
        return {
            data: null,
            page1: true, //true if on home page
            page2: false, //true if on character page
            transition: false, //whether a transition is needed or not
            characterId: "",
            dmg: document.getElementById("damage")
        }
    },
    methods: {
        goToCharacterPage: function() {
            this.page1 = false;
            this.page2 = true;
            this.transition = true;
            this.characterId = this.id;
            var fml = "this.data.characters.";
            var ihbp = characterId;
            var ftj = "{{ " + fml + ihbp + ".stats.damage }}";
            


            // recovery.innerHTML = "Recovery: " + this.data.characters.characterId + ".stats.recovery }} ";
            // neutral.innerHTML = "Neutral: " + this.data.characters.characterId + ".stats.neutral }} ";
            // defense.innerHTML = "Defense: " + this.data.characters.characterId + ".stats.defense }} ";
            // weight.innerHTML = "Weight: {{" + fml + this.characterId + ".stats.weight }}";
        },
        goToSnake: function() {
            this.page1 = false;
            this.page2 = true;
            this.transition = true;
        },
        goHome: function() {
            this.page1 = true;
            this.page2 = false;
            this.transition = true;
            
        }, 
        select: function(event) {
            characterId = event.currentTarget.id;
            console.log(characterId);
            this.goToCharacterPage();
        }
        
    },
    mounted() {
        axios
        .get('data/smash.json')
        .then(response => (this.data = response.data))
    }
})