import { CostCategory } from "@prisma/client";

const seedVehicles = async (prisma) => {
  console.log('Seeding vehicles data...')
  await prisma.vehicle.create({
    data: {
      type: 'Car',
      year: 2023,
      make: 'Toyota',
      model: 'Camry',
      trim: 'LE',
      plate: 'ABC122D3',
      vin: '1234567890123434567',
      odometer: 10000,
      nickname: 'My Camry',
      spare_tires: 1,
      extraFields: { color: 'blue' },
      vehiclePictures: {
        create: [
          { image: 'https://example.com/car1.jpg' },
          { image: 'https://example.com/car2.jpg' },
        ],
      },
      documents: {
        create: [
          {
            file: 'https://example.com/registration.pdf',
            name: 'Registration',
            note: 'A document for driving...',
            document_type: 'Registration',
            expiration_date: new Date(2024, 11, 30),
            tags: {
              create: [
                { name: 'Important' },
                { name: 'Expired' },
              ],
            }
          },
        ],
      },
      costs: {
        create: [
          {
            value: 99,
            concept: "Trailer cleaning fee (excessive dirt)",
            category: [CostCategory.CleaningFee],
            date: new Date("2023-11-24")
          }
        ]
      }
    },
  });

  await prisma.vehicle.create({
    data: {
      "type": "Car",
      "year": 2024,
      "make": "Hyundai",
      "model": "Elantra",
      "trim": "SE",
      "plate": "D3EF4e56",
      "vin": "9876542332109876543",
      "odometer": 5000,
      "nickname": "El Ahorrador",
      "spare_tires": 1,
      "extraFields": { color: "gris perla" },
      "vehiclePictures": {
        "create": [
          { "image": "https://example.com/elantra1.jpg" },
          { "image": "https://example.com/elantra2.jpg" }
        ]
      },
      "documents": {
        "create": [
          {
            "file": "https://example.com/elantra_owners_manual.pdf",
            "name": "Manual del Propietario",
            "note": "Información importante sobre el mantenimiento",
            "document_type": "Manual",
            "tags": {
              "create": [
                { "name": "Garantía" },
                { "name": "Mantenimiento" }
              ]
            }
          }
        ]
      },
      costs: {
        create: [
          {
            value: 588,
            concept: "Oil change",
            category: [CostCategory.AdditionalEquipment],
            date: new Date("2023-11-25"),
          }
        ]
      }
    }
  })

  await prisma.vehicle.create({
    data: {
      "type": "SUV",
      "year": 2022,
      "make": "Mazda",
      "model": "CX-5",
      "trim": "Turbo AWD",
      "plate": "GHIs73489",
      "vin": "012345678901234356",
      "odometer": 20000,
      "nickname": "El Aventurero",
      "spare_tires": 1,
      "extraFields": { color: "rojo metalizado", asientos_cuero: true },
      "vehiclePictures": {
        "create": [
          { "image": "https://example.com/cx51.jpg" },
          { "image": "https://example.com/cx52.jpg" }
        ]
      },
      "documents": {
        "create": [
          {
            "file": "https://example.com/cx5_mantenimiento_programado.pdf",
            "name": "Programa de Mantenimiento",
            "note": "Cronograma de revisiones y cambios de aceite",
            "document_type": "Mantenimiento",
            "expiration_date": new Date(2025, 5, 31),
            "tags": {
              "create": [
                { "name": "Obligatorio" },
                { "name": "Garantía" }
              ]
            }
          }
        ]
      },
      costs: {
        create: [
          {
            value: 781,
            concept: "Tire rotation",
            category: [CostCategory.Insurance],
            date: new Date("2023-11-25"),
          },
          {
            value: 245,
            concept: "Trailer insurance renewal",
            category: [CostCategory.Depreciation],
            date: new Date("2023-11-20"),
          },
        ]
      }
    }

  })

  await prisma.vehicle.create({
    data: {
      "type": "Motorcycle",
      "year": 2023,
      "make": "Yamaha",
      "model": "YZF-R6",
      "trim": "",
      "plate": "M1NOdd345",
      "vin": "234567389012345678",
      "odometer": 1000,
      "nickname": "La Bala",
      "spare_tires": 0,
      "extraFields": { cilindrada: 600 },
      "vehiclePictures": {
        "create": [
          { "image": "https://example.com/yzf1.jpg" },
          { "image": "https://example.com/yzf2.jpg" }
        ]
      },
      "documents": {
        "create": [
          {
            "file": "https://example.com/yzf_manual_usuario.pdf",
            "name": "Manual de Usuario",
            "note": "Instrucciones de operación y mantenimiento",
            "document_type": "Manual",
            "tags": {
              "create": [
                { "name": "Garantía" },
                { "name": "Seguridad" }
              ]
            }
          }
        ]
      },
      costs: {
        create: [
          {
            value: 239,
            concept: "Trailer repair (brake pads)",
            category: [CostCategory.AdditionalMileage],
            date: new Date("2023-11-23"),
          },
        ]
      }
    }
  })
}

export default seedVehicles