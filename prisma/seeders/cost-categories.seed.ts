import { PrismaClient } from "@prisma/client";

const seedVehicles = async (prisma: PrismaClient) => {
  console.log('Seeding cost categories data...');
  await prisma.costCategory.createMany({
    data: [
      {
        name: "Purchase"
      },
      {
        name: "Depreciation"
      },
      {
        name: "Financing"
      },
      {
        name: "Insurance"
      },
      {
        name: "Taxes"
      },
      {
        name: "PreventativeMaintenance"
      },
      {
        name: "Storage"
      },
      {
        name: "PermitsAndLicenses"
      },
      {
        name: "Fuel"
      },
      {
        name: "Repairs"
      },
      {
        name: "Cleaning"
      },
      {
        name: "TollsAndHighways"
      },
      {
        name: "RoadsideAssistance"
      },
      {
        name: "MarketingAndAdvertising"
      },
      {
        name: "AdministrativeExpenses"
      },
      {
        name: "Commissions"
      },
      {
        name: "AdditionalEquipment"
      },
      {
        name: "RentalInsurance"
      },
      {
        name: "Deductible"
      },
      {
        name: "CleaningFee"
      },
      {
        name: "AdditionalMileage"
      },
    ]
  });

  console.log('Seeding complete!');
};

export default seedVehicles;
