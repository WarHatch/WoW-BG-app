interface  ILevelCap {
    "health": number;
    "energy": number;
}

interface ICharacter {
    "name": string;
    "class": string;
    "iconName": string;
    "levelCaps": ILevelCap[];
    "faction": "Alliance"|"Horde";
}

interface IClasses {
    "Alliance": ICharacter[];
    "Horde": ICharacter[];
}
