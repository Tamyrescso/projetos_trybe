import Battle from './Battle';
import Fighter, { SimpleFighter } from '../Fighter';

class PVE extends Battle {
  constructor(hero: Fighter, protected env: SimpleFighter[]) {
    super(hero);
  }

  public fight(): number {
    let lifeMonsters = false;
    
    while (this.player.lifePoints !== -1 && lifeMonsters !== true) {
      this.env.forEach((monster) => this.player.attack(monster));
      this.env.forEach((monster) => {
        monster.attack(this.player); 
      });
      lifeMonsters = this.env.every((monster) => monster.lifePoints === -1);
    }
    return this.player.lifePoints === -1 ? -1 : 1;
  }
}

export default PVE;
