const costs = [
  {
    concept: "Oil change",
    category: "Preventive maintenance",
    date: new Date("2023-11-25"),
    userId: "clt06k7hg000211343ymf9bcj",
    vehicleId: 1,
  },
  {
    concept: "Tire rotation",
    category: "Preventive maintenance",
    date: new Date("2023-11-25"),
    userId: "clt06k7ln000m11342dxwcl68",
    vehicleId: 3,

  },
  {
    concept: "Trailer insurance renewal",
    category: "Insurance",
    date: new Date("2023-11-20"),
    userId: "clt06k7i800071134d8loa3wt",
    vehicleId: 3,

  },
  {
    concept: "Trailer repair (brake pads)",
    category: "Repairs",
    date: new Date("2023-11-23"),
    userId: "clt06k7hg000211343ymf9bcj",
    vehicleId: 2,

  },
  {
    concept: "Trailer cleaning",
    category: "Cleaning",
    date: new Date("2023-11-24"),
    userId: "clt06k7ln000m11342dxwcl68",
    vehicleId: 4,

  },
  {
    concept: "Marketing expense (online ad campaign)",
    category: "Marketing and advertising",
    date: new Date("2023-11-21"),
    userId: "clt06k7ln000m11342dxwcl68",
    vehicleId: 7,

  },
  {
    concept: "Trailer permit renewal",
    category: "Permits and licences",
    date: new Date("2023-11-18"),
    userId: "clt06k7i800071134d8loa3wt",
    vehicleId: 5,

  },
  {
    concept: "Trailer rental commission",
    category: "Commissions",
    date: new Date("2023-11-22"),
    userId: "clt06k7kt000h1134jvwhxrvu",
    vehicleId: 6,

  },
  {
    concept: "Additional equipment rental (generator)",
    category: "Additional equipment",
    date: new Date("2023-11-23"),
    userId: "clt06k7i800071134d8loa3wt",
    vehicleId: 1,

  },
  {
    concept: "Trailer cleaning fee (excessive dirt)",
    category: "Cleaning fee",
    date: new Date("2023-11-24"),
    userId: "clt06k7ju000c1134wq8v5nmv",
    vehicleId: 8,
  },
];

const seedCosts = async (prisma) => {
  console.log('Seeding costs data...')
  await prisma.costs.createMany({
    data: costs
  })
}

export default seedCosts
