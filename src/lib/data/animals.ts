import { Cat, Dog } from "@/lib/types/animals";

const firstNames = [
  "John", "Jane", "Michael", "Sarah", "David", "Emma", "Robert", "Lisa",
  "James", "Mary", "William", "Patricia", "Richard", "Jennifer", "Charles",
  "Linda", "Joseph", "Elizabeth", "Thomas", "Barbara", "Christopher", "Susan",
  "Daniel", "Jessica", "Matthew", "Margaret", "Anthony", "Dorothy", "Mark",
  "Nancy", "Donald", "Karen", "Steven", "Helen", "Paul", "Sandra", "Andrew",
  "Donna", "Joshua", "Carol", "Kenneth", "Ruth", "Kevin", "Sharon", "Brian",
  "Michelle", "George", "Laura", "Edward", "Sarah", "Ronald", "Kimberly"
];

const lastNames = [
  "Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller",
  "Davis", "Rodriguez", "Martinez", "Hernandez", "Lopez", "Gonzalez",
  "Wilson", "Anderson", "Thomas", "Taylor", "Moore", "Jackson", "Martin",
  "Lee", "Perez", "Thompson", "White", "Harris", "Sanchez", "Clark",
  "Ramirez", "Lewis", "Robinson", "Walker", "Young", "Allen", "King",
  "Wright", "Scott", "Torres", "Nguyen", "Hill", "Flores", "Green",
  "Adams", "Nelson", "Baker", "Hall", "Rivera", "Campbell", "Mitchell",
  "Carter", "Roberts", "Gomez", "Phillips", "Evans", "Turner", "Diaz"
];

const streets = [
  "Main Street", "Oak Avenue", "Pine Road", "Maple Drive", "Cedar Lane",
  "Elm Street", "Park Avenue", "First Street", "Second Street", "Third Street",
  "Fourth Street", "Fifth Street", "Washington Street", "Lincoln Avenue",
  "Jefferson Road", "Madison Drive", "Monroe Street", "Adams Lane",
  "Jackson Avenue", "Harrison Street", "Tyler Road", "Taylor Drive",
  "Wilson Lane", "Anderson Street", "Thomas Avenue", "Jackson Road",
  "White Street", "Harris Avenue", "Martin Lane", "Thompson Street",
  "Garcia Road", "Martinez Avenue", "Robinson Street", "Clark Lane",
  "Rodriguez Road", "Lewis Avenue", "Lee Street", "Walker Lane",
  "Hall Road", "Allen Avenue", "Young Street", "Hernandez Lane",
  "King Road", "Wright Avenue", "Lopez Street", "Hill Lane"
];

const suburbs = [
  "Downtown", "Riverside", "Highland", "Westside", "Eastside", "Northgate",
  "Southpark", "Midtown", "Uptown", "Lakeside", "Hillcrest", "Sunset",
  "Sunrise", "Greenwood", "Fairview", "Brookside", "Valley View", "Park Hills",
  "Forest Hills", "Garden City", "Spring Valley", "Golden Valley", "Meadowbrook",
  "Oak Hill", "Pine Valley", "Cedar Heights", "Maple Grove", "Elm Heights",
  "Birchwood", "Ashwood", "Willow Creek", "Stonegate", "Millbrook", "Clearwater",
  "Springdale", "Woodland", "Riverside", "Parkview", "Hillside", "Creekside",
  "Lakeview", "Mountain View", "Ocean View", "City Center", "Old Town"
];

const catNames = [
  "Whiskers", "Mittens", "Shadow", "Luna", "Simba", "Bella", "Max", "Chloe",
  "Tiger", "Princess", "Smokey", "Ginger", "Felix", "Nala", "Oliver", "Lucy",
  "Charlie", "Lily", "Milo", "Sophie", "Jack", "Coco", "Leo", "Zoe",
  "Oreo", "Daisy", "Boots", "Ruby", "Jasper", "Molly", "Oscar", "Stella",
  "Bandit", "Willow", "Toby", "Rosie", "Sam", "Poppy", "Buster", "Penny",
  "Chester", "Hazel", "Murphy", "Ivy", "Rusty", "Mia", "Ziggy", "Pearl",
  "Finn", "Olive", "Rocco", "Sage", "Bruno", "Honey", "Duke", "Cleo"
];

const dogNames = [
  "Buddy", "Bella", "Max", "Lucy", "Charlie", "Molly", "Cooper", "Lola",
  "Rocky", "Sadie", "Bear", "Maggie", "Duke", "Bailey", "Tucker", "Sophie",
  "Jack", "Chloe", "Oliver", "Stella", "Zeus", "Zoe", "Bentley", "Penny",
  "Milo", "Nala", "Toby", "Roxy", "Oscar", "Luna", "Leo", "Lily",
  "Finn", "Ruby", "Buster", "Daisy", "Rusty", "Rosie", "Scout", "Gracie",
  "Gunner", "Abby", "Diesel", "Coco", "Hank", "Ginger", "Bruno", "Princess",
  "Ace", "Honey", "Rex", "Hazel", "Cash", "Piper", "Ranger", "Ellie"
];

const catBreeds = [
  { code: "PER", breed: "Persian" },
  { code: "SIA", breed: "Siamese" },
  { code: "MAI", breed: "Maine Coon" },
  { code: "RAG", breed: "Ragdoll" },
  { code: "BRI", breed: "British Shorthair" },
  { code: "ABY", breed: "Abyssinian" },
  { code: "RUS", breed: "Russian Blue" },
  { code: "BEN", breed: "Bengal" },
  { code: "BIR", breed: "Birman" },
  { code: "NOR", breed: "Norwegian Forest Cat" },
  { code: "SPH", breed: "Sphynx" },
  { code: "SCO", breed: "Scottish Fold" },
  { code: "AME", breed: "American Shorthair" },
  { code: "ORI", breed: "Oriental" },
  { code: "SOM", breed: "Somali" },
  { code: "DSH", breed: "Domestic Shorthair" },
  { code: "DLH", breed: "Domestic Longhair" }
];

const dogBreeds = [
  { code: "LAB", breed: "Labrador Retriever" },
  { code: "GER", breed: "German Shepherd" },
  { code: "GOL", breed: "Golden Retriever" },
  { code: "BUL", breed: "French Bulldog" },
  { code: "BEA", breed: "Beagle" },
  { code: "POO", breed: "Poodle" },
  { code: "ROT", breed: "Rottweiler" },
  { code: "YOR", breed: "Yorkshire Terrier" },
  { code: "SIB", breed: "Siberian Husky" },
  { code: "POM", breed: "Pomeranian" },
  { code: "BOS", breed: "Boston Terrier" },
  { code: "AUS", breed: "Australian Shepherd" },
  { code: "SHI", breed: "Shih Tzu" },
  { code: "BOX", breed: "Boxer" },
  { code: "COC", breed: "Cocker Spaniel" },
  { code: "BOR", breed: "Border Collie" },
  { code: "CHI", breed: "Chihuahua" },
  { code: "DAL", breed: "Dalmatian" },
  { code: "GRE", breed: "Great Dane" },
  { code: "MIX", breed: "Mixed Breed" }
];

const colours = [
  "Black", "White", "Brown", "Grey", "Cream", "Orange", "Tabby",
  "Calico", "Tortoiseshell", "Tuxedo", "Silver", "Blue", "Red",
  "Chocolate", "Lilac", "Fawn", "Brindle", "Merle", "Sable",
  "Tri-color", "Bi-color", "Solid", "Spotted", "Striped"
];

const markings = [
  "None", "White chest", "White paws", "White face", "Black mask",
  "Stripe on back", "Spotted", "Patches", "Collar marking", "Tail tip",
  "Ear tips", "Facial markings", "Leg markings", "Belly markings",
  "Unique pattern", "Scar on leg", "Birthmark", "Distinctive spots"
];

const generateRandomDate = (daysBack: number = 365) => {
  const now = new Date();
  const randomDays = Math.floor(Math.random() * daysBack);
  return new Date(now.getTime() - randomDays * 24 * 60 * 60 * 1000);
};

const generateTagNumber = (index: number, type: 'cat' | 'dog') => {
  const prefix = type === 'cat' ? 'C' : 'D';
  return `${prefix}${String(index + 1).padStart(6, '0')}`;
};

const generateMicrochipNumber = () => {
  return Array.from({ length: 15 }, () => Math.floor(Math.random() * 10)).join('');
};

export const generateDummyCats = (): Cat[] => {
  return Array.from({ length: 100 }, (_, i) => {
    const breed = catBreeds[Math.floor(Math.random() * catBreeds.length)];
    const createdAt = generateRandomDate();
    const hasConvictionBan = Math.random() < 0.1; // 10% chance of having a conviction ban
    
    return {
      id: `cat-${i + 1}`,
      type: 'cat',
      tagNumber: generateTagNumber(i, 'cat'),
      na: Math.random() < 0.05 ? 'N/A' : '', // 5% chance of N/A
      lastName: lastNames[Math.floor(Math.random() * lastNames.length)],
      givenName: firstNames[Math.floor(Math.random() * firstNames.length)],
      addressNo: String(Math.floor(Math.random() * 999) + 1),
      lotNo: Math.random() < 0.3 ? String(Math.floor(Math.random() * 99) + 1) : '',
      houseNo: Math.random() < 0.7 ? String(Math.floor(Math.random() * 99) + 1) : '',
      street: streets[Math.floor(Math.random() * streets.length)],
      suburb: suburbs[Math.floor(Math.random() * suburbs.length)],
      name: catNames[Math.floor(Math.random() * catNames.length)],
      breedCode: breed.code,
      breed: breed.breed,
      colour: colours[Math.floor(Math.random() * colours.length)],
      markings: markings[Math.floor(Math.random() * markings.length)],
      sterilised: Math.random() < 0.7, // 70% chance of being sterilised
      nextYearTagNo: generateTagNumber(i + 100, 'cat'),
      oldTagNo: Math.random() < 0.3 ? generateTagNumber(i - 10, 'cat') : '',
      microchipNo: generateMicrochipNumber(),
      currentConvictionBannedStartDate: hasConvictionBan ? generateRandomDate(30) : undefined,
      currentConvictionBannedEndDate: hasConvictionBan ? new Date(Date.now() + Math.random() * 365 * 24 * 60 * 60 * 1000) : undefined,
      createdAt,
      updatedAt: new Date(createdAt.getTime() + Math.random() * 30 * 24 * 60 * 60 * 1000)
    };
  });
};

export const generateDummyDogs = (): Dog[] => {
  return Array.from({ length: 100 }, (_, i) => {
    const breed = dogBreeds[Math.floor(Math.random() * dogBreeds.length)];
    const createdAt = generateRandomDate();
    const hasConvictionBan = Math.random() < 0.1; // 10% chance of having a conviction ban
    
    return {
      id: `dog-${i + 1}`,
      type: 'dog',
      tagNumber: generateTagNumber(i, 'dog'),
      na: Math.random() < 0.05 ? 'N/A' : '', // 5% chance of N/A
      lastName: lastNames[Math.floor(Math.random() * lastNames.length)],
      givenName: firstNames[Math.floor(Math.random() * firstNames.length)],
      addressNo: String(Math.floor(Math.random() * 999) + 1),
      lotNo: Math.random() < 0.3 ? String(Math.floor(Math.random() * 99) + 1) : '',
      houseNo: Math.random() < 0.7 ? String(Math.floor(Math.random() * 99) + 1) : '',
      street: streets[Math.floor(Math.random() * streets.length)],
      suburb: suburbs[Math.floor(Math.random() * suburbs.length)],
      name: dogNames[Math.floor(Math.random() * dogNames.length)],
      breedCode: breed.code,
      breed: breed.breed,
      colour: colours[Math.floor(Math.random() * colours.length)],
      markings: markings[Math.floor(Math.random() * markings.length)],
      sterilised: Math.random() < 0.7, // 70% chance of being sterilised
      dangerous: Math.random() < 0.05, // 5% chance of being dangerous
      animalBreeder: Math.random() < 0.1, // 10% chance of being an animal breeder
      nextYearTagNo: generateTagNumber(i + 100, 'dog'),
      oldTagNo: Math.random() < 0.3 ? generateTagNumber(i - 10, 'dog') : '',
      microchipNo: generateMicrochipNumber(),
      currentConvictionBannedStartDate: hasConvictionBan ? generateRandomDate(30) : undefined,
      currentConvictionBannedEndDate: hasConvictionBan ? new Date(Date.now() + Math.random() * 365 * 24 * 60 * 60 * 1000) : undefined,
      createdAt,
      updatedAt: new Date(createdAt.getTime() + Math.random() * 30 * 24 * 60 * 60 * 1000)
    };
  });
};
