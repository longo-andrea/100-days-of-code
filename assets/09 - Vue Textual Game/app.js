new Vue({
  el: '#app',
  data: {
    p1Health: 100,
    computerHealth: 100,
    isPlaying: false,
    turns: []
  },
  methods: {
    play: function() {
      this.isPlaying = true;
      this.p1Health = 100;
      this.computerHealth = 100;
    },
    giveUp: function() {
      this.isPlaying = false;
    },
    attack: function() {
      let damage = this.calculateDamage(3, 10);

      this.computerHealth -= damage;
      this.turns.unshift({
        isPlayer: true,
        text: 'Player hits computer for ' + damage
      });

      if (this.checkWin())
        return;
    
      this.computerAttack();
    },
    specialAttack: function() {
      let damage = this.calculateDamage(8, 15);
      
      this.computerHealth -= damage;
      this.turns.unshift({
        isPlayer: true,
        text: 'Player hits computer for ' + damage
      });

      if (this.checkWin())
        return;

      this.computerAttack();
    },
    heal: function() {
      let heal = this.calculateHeal(6, 12);

      this.p1Health += heal;
      this.turns.unshift({
        isPlayer: true,
        text: 'Player recoverd ' + heal
      });
      
      if (this.checkWin())
        return;

      this.computerAttack();
    },
    computerAttack: function() {
      let damage = this.calculateDamage(5, 12);
      this.p1Health -= damage;

      this.turns.unshift({
        isPlayer: false,
        text: 'Computer hits player for ' + damage
      });

      this.checkWin();
    },
    calculateDamage: function(min, max) {
      return Math.max(Math.floor(Math.random() * max) + 1, min);
    },
    calculateHeal: function (min, max) {
      return Math.max(Math.floor(Math.random() * max) + 1, min);
    },
    checkWin: function() {
      if (this.computerHealth <= 0) {
        if(confirm('You won! Another match?')) {
          this.play()
        }
        else {
          this.isPlaying = false;
        }
        return true;
      }
      else if (this.p1Health <= 0) {
        if (confirm('You lost! Another match?')) {
          this.play();
        }
        else {
          this.isPlaying = false;
        }
        return true;
      }
      return false;
    }
  }

});