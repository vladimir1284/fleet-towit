// types.ts

export interface VehicleDataEntry {
  Variable: string;
  Value: string | null;
  ValueId: string,
  VariableId: number
}

export interface FormattedVehicleData {
  type: string;
  year: string;
  make: string;
  model: string;
  trim: string;
  // plate: string; // Uncomment if you want to include the plate field
  vin: string;
}

export interface ErrorResponse {
  status: number;
  data: {
    message: string;
  };
}
