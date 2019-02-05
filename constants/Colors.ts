const tintColor = "#2f95dc";
const backgroundColor = "#fff";

const allianceBackgroud = "#2162ef";
const hordeBackground = "#d53131";

const FactionColorOf = (faction: string) => {
  const hordeName = "Horde";
  const allianceName = "Alliance";

  if (faction === hordeName) {
    return hordeBackground;
  } else if (faction === allianceName) {
    return allianceBackgroud;
  } else {
    throw new Error(
      `Incorrect faction name passed. Expecting "${hordeName}"|"${allianceName}". Received: ${faction}`,
    );
  }
};

export {FactionColorOf};

export default {
  tintColor,
  backgroundColor,
  allianceBackgroud,
  hordeBackground,
  borderColor: "#000000",
  tabIconDefault: "#ccc",
  tabIconSelected: tintColor,
  tabBar: "#fefefe",
  errorBackground: "red",
  errorText: "#fff",
  warningBackground: "#EAEB5E",
  warningText: "#666804",
  noticeBackground: tintColor,
  noticeText: "#fff",
};
