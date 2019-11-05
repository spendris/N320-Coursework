Vue.component("playing-card", {
    props: {
        card: Object,
        isactive: ['active', 'out']
    },
template: "<div class='card'><span style='float:left'>{{ card.suit }}</span><span style='font-size: 16pt;'> <br> {{ card.valueSymbol }} </span> <br><br> <span style='float:right'>{{ card.suit }}</span> </div>"
})


var app = new Vue({
    el: "#app",
    data: {
        cards: [
            { value: 11, suit: "♣", valueSymbol: "A", suitValue: "clubs" }, { value: 2, suit: "♣", valueSymbol: "2", suitValue: "clubs" }, { value: 3, suit: "♣", valueSymbol: "3", suitValue: "clubs" }, 
            { value: 4, suit: "♣", valueSymbol: "4", suitValue: "clubs" }, { value: 5, suit: "♣", valueSymbol: "5", suitValue: "clubs" }, { value: 6, suit: "♣", valueSymbol: "6", suitValue: "clubs" },
            { value: 7, suit: "♣", valueSymbol: "7", suitValue: "clubs" }, { value: 8, suit: "♣", valueSymbol: "8", suitValue: "clubs" }, { value: 9, suit: "♣", valueSymbol: "9", suitValue: "clubs" },
            { value: 10, suit: "♣", valueSymbol: "10", suitValue: "clubs" }, { value: 10, suit: "♣", valueSymbol: "J", suitValue: "clubs" }, { value: 10, suit: "♣", valueSymbol: "K", suitValue: "clubs" },
            { value: 10, suit: "♣", valueSymbol: "Q", suitValue: "clubs" },
            { value: 11, suit: "♥", valueSymbol: "A", suitValue: "hearts" }, { value: 2, suit: "♥", valueSymbol: "2", suitValue: "hearts" }, { value: 3, suit: "♥", valueSymbol: "3", suitValue: "hearts" }, 
            { value: 4, suit: "♥", valueSymbol: "4", suitValue: "hearts" }, { value: 5, suit: "♥", valueSymbol: "5", suitValue: "hearts" }, { value: 6, suit: "♥", valueSymbol: "6", suitValue: "hearts" },
            { value: 7, suit: "♥", valueSymbol: "7", suitValue: "hearts" }, { value: 8, suit: "♥", valueSymbol: "8", suitValue: "hearts" }, { value: 9, suit: "♥", valueSymbol: "9", suitValue: "hearts" },
            { value: 10, suit: "♥", valueSymbol: "10", suitValue: "hearts" }, { value: 10, suit: "♥", valueSymbol: "J", suitValue: "hearts" }, { value: 10, suit: "♥", valueSymbol: "K", suitValue: "hearts" },
            { value: 10, suit: "♥", valueSymbol: "Q", suitValue: "hearts" },
            { value: 11, suit: "♠", valueSymbol: "A", suitValue: "spades" }, { value: 2, suit: "♠", valueSymbol: "2", suitValue: "spades" }, { value: 3, suit: "♠", valueSymbol: "3", suitValue: "spades" }, 
            { value: 4, suit: "♠", valueSymbol: "4", suitValue: "spades" }, { value: 5, suit: "♠", valueSymbol: "5", suitValue: "spades" }, { value: 6, suit: "♠", valueSymbol: "6", suitValue: "spades" },
            { value: 7, suit: "♠", valueSymbol: "7", suitValue: "spades" }, { value: 8, suit: "♠", valueSymbol: "8", suitValue: "spades" }, { value: 9, suit: "♠", valueSymbol: "9", suitValue: "spades" },
            { value: 10, suit: "♠", valueSymbol: "10", suitValue: "spades" }, { value: 10, suit: "♠", valueSymbol: "J", suitValue: "spades" }, { value: 10, suit: "♠", valueSymbol: "K", suitValue: "spades" },
            { value: 10, suit: "♠", valueSymbol: "Q", suitValue: "spades" },
            { value: 11, suit: "♦", valueSymbol: "A", suitValue: "diamonds" }, { value: 2, suit: "♦", valueSymbol: "2", suitValue: "diamonds" }, { value: 3, suit: "♦", valueSymbol: "3", suitValue: "diamonds" }, 
            { value: 4, suit: "♦", valueSymbol: "4", suitValue: "diamonds" }, { value: 5, suit: "♦", valueSymbol: "5", suitValue: "diamonds" }, { value: 6, suit: "♦", valueSymbol: "6", suitValue: "diamonds" },
            { value: 7, suit: "♦", valueSymbol: "7", suitValue: "diamonds" }, { value: 8, suit: "♦", valueSymbol: "8", suitValue: "diamonds" }, { value: 9, suit: "♦", valueSymbol: "9", suitValue: "diamonds" },
            { value: 10, suit: "♦", valueSymbol: "10", suitValue: "diamonds" }, { value: 10, suit: "♦", valueSymbol: "J", suitValue: "diamonds" }, { value: 10, suit: "♦", valueSymbol: "K", suitValue: "diamonds" },
            { value: 10, suit: "♦", valueSymbol: "Q", suitValue: "diamonds" },
        ],
        //decks
        playingDeck: [ ], // cards that you play with
        playerHand: [ ], //cards in player's hand
        dealerHand: [ ], //cards in dealer's hand
        //deck values
        playerHandValue: 0, //value of the player's hand
        dealerHandValue: 0, //value of the dealer's hand
        //money and betting
        money: 1000, //money in the player's purse
        bet: 0, //amount the player bets
        pot: 0, //amount the player is playing for
        betHasBeenPlaced: false, //whether the player has bet
        //card logic
        cardInPlay: { }, //card that is pulled from the playingDeck
        cardShuffleIndex: 0, //index of a random card in the deck
        //conditionals
        handOver: true, // is true when the player stands
        dealt: false, // is true after the player bets and the cards are in play
        dealerDrawn: false, // is true after the dealer draws all of their cards in a round
        endResult: false, // is true when the round is over and the winner/loser is decided
        playerWins: false, 
        dealerWins: false,
        blackjack: false, //is true when a player gets blackjack
       

    },
    methods: {
        bet100: function() { //bets $100
            //subtract that value from the total player funds
            this.bet = 100;
            this.money -= 100;
            //list the value in the "pot" box
            this.pot = this.bet * 2;
            //allow the player to deal, this enables the deal button display
            this.deal();
        },
        bet250: function() { //bets $250
            //subtract that value from the total player funds
            this.bet = 250;
            this.money -= 250;
            //list the value in the "pot" box
            this.pot = this.bet * 2;
            //allow the player to deal, this enables the deal button display
            this.deal();
        },
        bet500: function() {//bets $500
            //subtract that value from the total player funds
            this.bet = 500;
            this.money -= 500;
            //list the value in the "pot" box
            this.pot = this.bet * 2;
            //allow the player to deal, this enables the deal button display
            this.deal();
        },
        bet750: function() {//bets $750
            //subtract that value from the total player funds
            this.bet = 750;
            this.money -= 750;
            //list the value in the "pot" box
            this.pot = this.bet * 2;
            //allow the player to deal, this enables the deal button display
            this.deal();
        },
        bet1000: function() {//bets $1000
            //subtract that value from the total player funds
            this.bet = 1000;
            this.money -= 1000;
            //list the value in the "pot" box
            this.pot = this.bet * 2;
            //allow the player to deal, this enables the deal button display
            this.deal();
        },
        bet2000: function() {//bets $2000
            //subtract that value from the total player funds
            this.bet = 2000;
            this.money -= 2000;
            //list the value in the "pot" box
            this.pot = this.bet * 2;
            //allow the player to deal, this enables the deal button display

            this.deal();
        },
        deal: function() {

            //clear both hands
            this.playerHand.splice(0,6);
            this.dealerHand.splice(0,6);
            this.playerHandValue = 0;
            this.dealerHandValue = 0;

            //copy card list to playing deck
            this.playingDeck = this.cards.slice(0);
            
            //pick two random cards from the deck for the dealer's hand
            for(var i = 2; i > 0; i--) { //run this twice, drawing two cards
                this.cardShuffleIndex = Math.floor(Math.random() * this.playingDeck.length);
                this.cardInPlay = this.playingDeck[this.cardShuffleIndex];

                //add the cards to the dealer's hand
                this.dealerHand.push(this.cardInPlay);

                //add the card values to the dealer's hand
                this.dealerHandValue += this.cardInPlay.value;
    
                //remove the cards from the original deck
                this.playingDeck.splice(this.cardInPlay,1);
            }
             //pick two random cards from the deck for the player's hand
            for(var i = 2; i > 0; i--) { //run twice, drawing two cards
                this.cardShuffleIndex = Math.floor(Math.random() * this.playingDeck.length);
                this.cardInPlay = this.playingDeck[this.cardShuffleIndex];
    
                //add the cards to the player's hand
                this.playerHand.push(this.cardInPlay);

                //add the card values to the player's hand
                this.playerHandValue += this.cardInPlay.value;
                console.log(this.playerHandValue);
    
                //remove the cards from the original deck
                this.playingDeck.splice(this.cardInPlay,1);
            }
            this.dealt = true; //reveals action buttons
            this.handOver = false;
        },
        hit: function() {
            //pick a random card from the deck
            this.cardShuffleIndex = Math.floor(Math.random() * this.playingDeck.length);
            this.cardInPlay = this.playingDeck[this.cardShuffleIndex];
        
            //add the card to the player's hand
            this.playerHand.push(this.cardInPlay);
            
            //remove the card from the original deck
            this.playingDeck.splice(this.cardInPlay,1);

            //increase the player hand value by the value of the card added
            this.playerHandValue += this.cardInPlay.value;

            //check for bust or blackjack
            if(this.playerHandValue == 21) { //blackjack
                this.stand(); //end hand
            } else if(this.playerHandValue >= 22) { //bust
                this.stand(); //end hand
            } else {
                //continue playing
            }
        },
        dealerHit: function() { //done at the end of a hand when the player stands until dealer hand value is at or above 17
            //if dealer hand value is less than 17 or the player and the player hasn't busted, dealer draws cards
            setTimeout( () => {
                for(var k = 2; k > 0; k--) { //run twice, drawing between 0 and 2 cards
                    if(this.dealerHandValue < 17 && this.dealerHandValue < this.playerHandValue && this.playerHandValue <= 21) {
                        //pick a random card from the deck
                        this.cardShuffleIndex = Math.floor(Math.random() * this.playingDeck.length);
                        this.cardInPlay = this.playingDeck[this.cardShuffleIndex];

                        //add the card to the dealer's hand
                        this.dealerHand.push(this.cardInPlay);
                        this.dealerHand.isDealing = true;

                        //add the card values to the dealer's hand
                        this.dealerHandValue += this.cardInPlay.value;

                        //remove the cards from the original deck
                        this.playingDeck.splice(this.cardInPlay,1);
                    }
                }
            }, 500);
            this.dealerDrawn = true;
             
        },
        stand: function() {
            //flip over the hole card
            this.handOver = true; //hides action buttons
            this.dealt = false; 
            this.betHasBeenPlaced = false;

            this.dealerHit(); //calls dealer to draw cards
            if(this.dealerDrawn = true) { //after this is done
                this.compareHands();
            }
           
    
        },
        compareHands: function() {
            setTimeout( () => {
                //compare player hand with dealer hand: highest wins, ties mean no loss or gain
                if(this.playerHandValue == 21) {
                    console.log("blackjack");
                    this.money += this.pot * 2; // doubles your winnings
                    this.pot = 0;
                    this.playerWins = true; // green border around the player area
                    this.blackjack = true; // displays the "BlackJack" notification
                } else if (this.playerHandValue > this.dealerHandValue && this.playerHandValue <= 21 || this.dealerHandValue > 21) {
                    console.log("you win");
                    this.money += this.pot;
                    this.pot = 0;
                    this.playerWins = true; //green border around player area
                } else if (this.playerHandValue == this.dealerHandValue) {
                    console.log("its a tie, no money won or lost");
                    this.money += this.pot * 0.5; // returns your bet to your purse
                    this.pot = 0;
                } else {
                    console.log("you lose");
                    this.pot = 0;
                    this.dealerWins = true; //red border around player area
                }
            }, 1000)
            //display results
            this.displayResults();
            
        },
        doubleDown: function() {
            //double the bet
            this.money -= this.bet;
            this.pot = this.pot * 2;

            //hit once then stand
            this.hit();
            this.stand();

            //display results
            this.displayResults();

        },
        surrender: function() {
            //restart the game
            this.handOver = true;
            this.dealt = false;
            this.betHasBeenPlaced = false;

            //player is refunded half of their initial bet
            this.money += this.bet / 2;
            //display results
            this.displayResults();

        },
        displayResults: function() {
            if(this.handOver = true) {
                this.endResult = true; //this shows the hand values and displays the winner/loser 
            }
        },
        reset: function() { //called when player presses new game button
            this.endResult = false;
            this.dealerDrawn = false;
            this.playerWins = false;
            this.dealerWins = false;
            this.blackjack = false;
        }

    }
})