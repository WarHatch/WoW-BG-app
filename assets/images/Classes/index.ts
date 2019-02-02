// Defines index signature so the images can be called dynamically
// e.g.: images[druid]
interface Iimages {
    [key: string]: any;
}

const images: Iimages = {
    paladin: require("./paladin.png"),
    warlock: require("./warlock.png"),
    rogue: require("./rogue.png"),
    mage: require("./mage.png"),
    hunter: require("./hunter.png"),
    druid: require("./druid.png"),
    warrior: require("./warrior.png"),
    shaman: require("./shaman.png"),
    priest: require("./priest.png"),
};

export default images;
