import en from "../locale/en.json";
const { home } = en;

export default function Home() {
  return <h1 className="font-bold underline">{home.welcome_msg}</h1>;
}
