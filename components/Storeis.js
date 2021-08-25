import StoryCard from "./StoryCard";
const Stories = [
  {
    name: "josephine langford",
    src: "https://links.papareact.com/zof",
    profile: "https://links.papareact.com/l4v",
  },
  {
    name: "Elon Musk",
    src: "https://links.papareact.com/4zn",
    profile: "https://links.papareact.com/kxk",
  },
  {
    name: "Jeff Bezoz",
    src: "https://links.papareact.com/k2j",
    profile: "https://links.papareact.com/f0p",
  },
  {
    name: "Mark Zukerberg",
    src: "https://links.papareact.com/xql",
    profile: "https://links.papareact.com/snf",
  },
  {
    name: "Bill Gates",
    src: "https://links.papareact.com/4u4",
    profile: "https://links.papareact.com/zvy",
  },
];

const Storeis = () => {
  return (
    <div className="flex justify-center space-x-3 mx-auto">
      {Stories.map((story, index) => (
        <StoryCard
          key={index}
          src={story.src}
          profile={story.profile}
          name={story.name}
        />
      ))}
    </div>
  );
};

export default Storeis;
