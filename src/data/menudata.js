import home from "../assets/home.png";
import knowledge from "../assets/knowledge.png";
import members from "../assets/members.png";
import teams from "../assets/teams.png";
import vault from "../assets/vault.png";
import chat from "../assets/chat.png";
import settings from "../assets/settings.png";
import company from "../assets/company.png";
import myprofile from "../assets/myprofile.png";
export const topmenu = [
  { title: "DASHBOARD", url: "/", img: home, tabClicked: false },
  { title: "KNOWLEDGE", url: "/knowledge", img: knowledge, tabClicked: false },
  { title: "MEMBERS", url: "/members", img: members, tabClicked: false },
  { title: "TEAMS", url: "/teams", img: teams, tabClicked: false },
  { title: "VAULT", url: "/vault", img: vault, tabClicked: false },
  { title: "CHAT", url: "/chat", img: chat, tabClicked: false },
];
export const bottommenu = [
  { title: "SETTINGS", url: "/settings", img: settings },
  { title: "COMPANY", url: "/company", img: company },
  { title: "MY PROFILE", url: "/myprofile", img: myprofile },
];
