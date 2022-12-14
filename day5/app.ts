// Episode type
type Episode = {
  id: number;
  name: string;
  selected: boolean;
};

const episodes: Episode[] = [
  {
    id: 1,
    name: "James Q Quick's Origin Story",
    selected: false,
  },
  {
    id: 2,
    name: "Amy Dutton's Origin Story",
    selected: false,
  },
  {
    id: 3,
    name: "The Tech Behind Compressed.fm",
    selected: false,
  },
  {
    id: 4,
    name: "Starting a New Development Project",
    selected: false,
  },
  {
    id: 5,
    name: "How Do you Start a New Design Project?",
    selected: false,
  },
  {
    id: 6,
    name: "Freelancing (Part 1)",
    selected: false,
  },
  {
    id: 7,
    name: "Freelancing (Part 2)",
    selected: false,
  },
  {
    id: 8,
    name: "The Tech Behind jamesqquick.com",
    selected: false,
  },
  {
    id: 9,
    name: "Teh Tech Behind SelfTeach.me",
    selected: false,
  },
  {
    id: 10,
    name: "Design Fundamentals (Part 1)",
    selected: false,
  },
  {
    id: 11,
    name: "Design Fundamentals (Part 2)",
    selected: false,
  },
  {
    id: 12,
    name: "Productivity: Tools, Tips, and Workflows",
    selected: false,
  },
  {
    id: 13,
    name: "The Future of Code with No Code",
    selected: false,
  },
  {
    id: 14,
    name: "Building the Perfect Desk Setup",
    selected: false,
  },
  {
    id: 15,
    name: "Everything You Need to Know to Get Started in SvelteKit",
    selected: false,
  },
  {
    id: 16,
    name: "Live Streaming for Beginners",
    selected: false,
  },
  {
    id: 17,
    name: "All Things Automated",
    selected: false,
  },
  {
    id: 18,
    name: "Amy Gives James a Design Consult",
    selected: false,
  },
  {
    id: 19,
    name: "Figma for Everyone",
    selected: false,
  },
  {
    id: 20,
    name: "Learning and Building in Public",
    selected: false,
  },
  {
    id: 21,
    name: "Getting Your First Dev Job",
    selected: false,
  },
  {
    id: 22,
    name: "Hiring a Designer or Getting Your First UI / UX Job",
    selected: false,
  },
  {
    id: 23,
    name: "IRL Freelance Proposal",
    selected: false,
  },
  {
    id: 24,
    name: "Getting Started on YouTube",
    selected: false,
  },
  {
    id: 25,
    name: "Starting your own Podcast",
    selected: false,
  },
  {
    id: 26,
    name: "How Blogging Can Change Your Career",
    selected: false,
  },
  {
    id: 27,
    name: "Talking to Some of Our Favorite Content Creators",
    selected: false,
  },
  {
    id: 28,
    name: "Our Favorite Things: A Crossover Episode with Web Dev Weekly",
    selected: false,
  },
  {
    id: 29,
    name: "Freelancing IRL: Unveiling a Site Redesign",
    selected: false,
  },
  {
    id: 30,
    name: "Wordpress in 2021",
    selected: false,
  },
  {
    id: 31,
    name: "Struggle Bus",
    selected: false,
  },
  {
    id: 32,
    name: "Getting Started with TypeScript",
    selected: false,
  },
  {
    id: 33,
    name: "Small Design Tweaks that Make All the Difference",
    selected: false,
  },
  {
    id: 34,
    name: "Getting git",
    selected: false,
  },
  {
    id: 35,
    name: "Crossover Episode with Purrfect Dev",
    selected: false,
  },
  {
    id: 36,
    name: "SVGs FTW",
    selected: false,
  },
  {
    id: 37,
    name: "Building a Course",
    selected: false,
  },
];

// freeze episodes
Object.freeze(episodes);

let episodeList = document.querySelector("ul.episodes") as HTMLElement;
let shiftOn = false;
let lastSelectedElement: number;
let selectionRange: number[] = [];
let clickedItem: HTMLElement;

//key down event
document.addEventListener("keydown", (event: KeyboardEvent) => {
  handleEvent(event);
});

//key up event
document.addEventListener("keyup", (event: KeyboardEvent) => {
  handleEvent(event);
});

function handleEvent(event: KeyboardEvent) {
  //check if event was keyup or keydown
  if (event.key === "Shift" && event.type === "keydown") {
    shiftOn = true;
  } else if (event.key === "Shift" && event.type === "keyup") {
    shiftOn = false;
  }

  console.debug("shiftOn: " + shiftOn);
}

//render episodes list
function renderEpisodes() {
  let html = "";

  //get max and min from selection range
  let { min, max } = calcMinMax();

  episodes.forEach((episode) => {
    //check if episode is in the selection range
    if (episode.id >= min && episode.id <= max) {
      episode.selected = true;
    }
    html += `
    <li id="${episode.id}">
    <label for="episode-${episode.id}">
      <input type="checkbox" ${episode.selected ? "checked" : ""} id="episode-${
      episode.id
    }" onClick="handleCheckboxClick(event, ${episode.id})" />
      <span class="noselect" >${episode.id} - ${episode.name}</span>
      </label>
    </li>
    `;
  });

  episodeList.innerHTML = html;

  //reset selction range
  selectionRange = [];

  function calcMinMax() {
    let min = Math.min(...selectionRange);
    let max = Math.max(...selectionRange);
    return { min, max };
  }
}

//handle checkbox click
function handleCheckboxClick(event: Event, id: number) {
  clickedItem = event.target as HTMLElement;

  //get the episode that was clicked
  let episode = episodes.find((episode) => episode.id === id);

  //toggle the selected property
  if (episode) episode.selected = !episode.selected;

  //check if shift is pressed
  if (lastSelectedElement && shiftOn) {
    selectionRange = [
      lastSelectedElement,
      parseInt(clickedItem.id.split("-")[1]),
    ];
    console.debug(selectionRange);
  }
  lastSelectedElement = parseInt(clickedItem.id.split("-")[1]);

  console.debug(lastSelectedElement);

  //refresh elements
  renderEpisodes();
}

renderEpisodes();
