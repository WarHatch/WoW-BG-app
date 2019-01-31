// Defines index signature so the images can be called dynamically
// e.g.: images[druid]
interface Iimages {
    [key: string]: any;
}

const images: Iimages = {
    druid: require("./Druid.png"),
};

export default images;
