document.querySelector;

let listOfSexPositions = [
  {
    Position: "Saddling",

    Feasibility: 3,

    Impressiveness: 6,

    Romanticness: 6,

    Comments: "Feels great, but you’ll need a GPS to direct all those limbs.",
  },
  {
    Position: "The Magic Bullet",

    Feasibility: 1,

    Impressiveness: 10,

    Romanticness: 4,

    Comments:
      "For bottomers, make sure you’re a seasoned yogi or flexible enough before you commit yourself to this position. The theatricality will wow your partner, but not worth any torn ligaments. great, but you’ll need a GPS to direct all those limbs.",
  },
  {
    Position: "Doggy Style",

    Feasibility: 9,

    Impressiveness: 5,

    Romanticness: 2,

    Comments: "You are f*cking like an animal, so",
  },
  {
    Position: "CowGirl",

    Feasibility: 8,

    Impressiveness: 1,

    Romanticness: 6,

    Comments:
      "Yes, a coital classic and everyone’s go-to, but that does not make it any less boring. Plus, the chin angles are not flattering for either partner. ",
  },
  {
    Position: "Standing Up",

    Feasibility: 4,

    Impressiveness: 7,

    Romanticness: 2,

    Comments:
      "Adventurous in conception I GUESS, but so many factors would make this not work anatomically: 1) leg heights, 2) torso heights, 3) overall coordination from these height disparities. Basically, avoid even attempting this if both parties aren’t the exact same height.",
  },
  {
    Position: "The Speedbump",

    Feasibility: 8,

    Impressiveness: 9,

    Romanticness: 9,

    Comments:
      " It can be difficult to coordinate and move around freely, but if accomplished, it’s a uniquely awesome sensation. ",
  },
  {
    Position: "One person on bed, one person standing",

    Feasibility: 6,

    Impressiveness: 6,

    Romanticness: 4,

    Comments: "You just turned your boring bedroom into one big sex prop! ",
  },
  {
    Position: "Both kinda crouching",

    Feasibility: 5,

    Impressiveness: 7,

    Romanticness: 4,

    Comments: " It’s a good angle, but requires some serious poise.",
  },
  {
    Position: "69",

    Feasibility: 4,

    Impressiveness: 8,

    Romanticness: 4,

    Comments:
      " It’s fair -- as in, you’re getting what you’re giving. But you’re also looking at each others’ buttholes which isn’t that cute. ",
  },
  {
    Position: "Legs over shoulders",

    Feasibility: 8,

    Impressiveness: 5,

    Romanticness: 5,

    Comments:
      " This is for the novice “magic bullet” couple who want to work their way up to a full-leg extension.",
  },
  {
    Position: "Missionary",

    Feasibility: 10,

    Impressiveness: 1,

    Romanticness: 10,

    Comments: `*extra points because it’s a classic*

        It/’s wrongfully labeled as “vanilla sex” -- it’s super comfy, both parties look good, and it’s said to be a great position for trying anal for the first time (as opposed to doggy style) because it’s pretty relaxing. Sometimes, you just want the pressure to be off and that’s OK! `,
  },
  {
    Position: "Spooning",

    Feasibility: 4,

    Impressiveness: 5,

    Romanticness: 10,

    Comments:
      "*extra points for good angle* SECRET SEX UNDER-THE-COVERS AMIRIGHT. Also, ideal for lazy people who still want to get really intimate.",
  },
  {
    Position: "The squat",

    Feasibility: 4,

    Impressiveness: 9,

    Romanticness: 7,

    Comments: "Bottoms are chilling ",
  },
  {
    Position: "Planking",

    Feasibility: 5,

    Impressiveness: 5,

    Romanticness: 10,

    Comments:
      " Your entire bodies are pressed tightly together like layers of a bean dip. This is as physically close to someone as you can get. ",
  },
  {
    Position: "The Notebook",

    Feasibility: 1.5,

    Impressiveness: 10,

    Romanticness: 9,

    Comments:
      "It’s sooo romantic, but unless the lifter is a bodybuilder and the liftee is generally tiny, the latter person might feel a little weight-conscious.",
  },
];

let listOfPlaces = [
  "airport",
  "Bar",
  "Bakery",
  "Bank",
  "Bookstore",
  "Bus Station",
  "Court",
  "Kitchen",
  "Parent's house",
  "friend's house",
  "Car",
  "Gym",
  "Service Station",
  "Elevator",
];

function coshappStart() {
  let possibilitiesOfSex = listOfSexPositions.length - 1;
  let randomPosition = Math.floor(Math.random() * possibilitiesOfSex);
  console.log(
    `Your position is: ${
      listOfSexPositions[randomPosition].Position
    } and you have to do it in the ${
      listOfPlaces[Math.floor(Math.random() * possibilitiesOfSex)]
    }`
  );
  console.log(listOfSexPositions[randomPosition]);
}
coshappStart();
