interface  ILevelCap {
    "health": number;
    "energy": number;
}

interface ICharacter {
    "name": string;
    "class": string;
    "iconName": string;
    "levelCaps": ILevelCap[];
}

interface IClasses {
    "Alliance": ICharacter[];
    "Horde": ICharacter[];
}

export default IClasses;
export {ILevelCap, ICharacter, IClasses};
