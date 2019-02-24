function importClasses(): IClasses {
    return require("./Classes.json");
}

const Classes: IClasses = importClasses();

export default Classes;
