import CharacterClasses from "../constants/Classes";

class CharactersHandler {
  public static fullCharacterList: ICharacter[];

  public static FindCharacter(name: string) {
    const result = this.fullCharacterList.find((character) => character.name === name);
    if (!result) {
      throw new Error(`Was unable to find character ${name}`);
    }
    return result;
  }

  public static initialize() {
    if (!this.initialized) {
      this.fullCharacterList = CharacterClasses.Alliance.concat(CharacterClasses.Horde);

      this.initialized = true;
    }
  }

  private static initialized = false;
}

CharactersHandler.initialize();
export default CharactersHandler;
