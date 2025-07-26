export interface BaseAnimal {
  id: string;
  tagNumber: string;
  na: string;
  lastName: string;
  givenName: string;
  addressNo: string;
  lotNo: string;
  houseNo: string;
  street: string;
  suburb: string;
  name: string; // Animal name
  breedCode: string;
  breed: string;
  colour: string;
  markings: string;
  sterilised: boolean;
  nextYearTagNo: string;
  oldTagNo: string;
  microchipNo: string;
  currentConvictionBannedStartDate?: Date;
  currentConvictionBannedEndDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface Cat extends BaseAnimal {
  type: 'cat';
}

export interface Dog extends BaseAnimal {
  type: 'dog';
  dangerous: boolean;
  animalBreeder: boolean;
}

export type Animal = Cat | Dog;

export interface AnimalFormData {
  tagNumber: string;
  na: string;
  lastName: string;
  givenName: string;
  addressNo: string;
  lotNo: string;
  houseNo: string;
  street: string;
  suburb: string;
  name: string;
  breedCode: string;
  breed: string;
  colour: string;
  markings: string;
  sterilised: boolean;
  nextYearTagNo: string;
  oldTagNo: string;
  microchipNo: string;
  currentConvictionBannedStartDate?: Date;
  currentConvictionBannedEndDate?: Date;
  // Dog-specific fields
  dangerous?: boolean;
  animalBreeder?: boolean;
}
