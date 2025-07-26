"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon, Save } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Animal, AnimalFormData, Dog } from "@/lib/types/animals";

const animalFormSchema = z.object({
  tagNumber: z.string().min(1, "Tag number is required"),
  na: z.string().optional(),
  lastName: z.string().min(1, "Last name is required"),
  givenName: z.string().min(1, "Given name is required"),
  addressNo: z.string().min(1, "Address number is required"),
  lotNo: z.string().optional(),
  houseNo: z.string().optional(),
  street: z.string().min(1, "Street is required"),
  suburb: z.string().min(1, "Suburb is required"),
  name: z.string().min(1, "Animal name is required"),
  breedCode: z.string().min(1, "Breed code is required"),
  breed: z.string().min(1, "Breed is required"),
  colour: z.string().min(1, "Colour is required"),
  markings: z.string().min(1, "Markings are required"),
  sterilised: z.boolean(),
  nextYearTagNo: z.string().optional(),
  oldTagNo: z.string().optional(),
  microchipNo: z.string().optional(),
  currentConvictionBannedStartDate: z.date().optional(),
  currentConvictionBannedEndDate: z.date().optional(),
  // Dog-specific fields
  dangerous: z.boolean().optional(),
  animalBreeder: z.boolean().optional(),
});

interface AnimalFormModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  animal?: Animal | null;
  type?: 'cat' | 'dog';
  onSave: (data: AnimalFormData) => void;
}

const breedOptions = {
  cat: [
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
  ],
  dog: [
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
  ]
};

const colourOptions = [
  "Black", "White", "Brown", "Grey", "Cream", "Orange", "Tabby",
  "Calico", "Tortoiseshell", "Tuxedo", "Silver", "Blue", "Red",
  "Chocolate", "Lilac", "Fawn", "Brindle", "Merle", "Sable",
  "Tri-color", "Bi-color", "Solid", "Spotted", "Striped"
];

const markingsOptions = [
  "None", "White chest", "White paws", "White face", "Black mask",
  "Stripe on back", "Spotted", "Patches", "Collar marking", "Tail tip",
  "Ear tips", "Facial markings", "Leg markings", "Belly markings",
  "Unique pattern", "Scar on leg", "Birthmark", "Distinctive spots"
];

export const AnimalFormModal = ({ 
  open, 
  onOpenChange, 
  animal, 
  type,
  onSave 
}: AnimalFormModalProps) => {
  const isEditing = !!animal;
  const modalType = type || animal?.type || 'cat';
  const currentBreeds = breedOptions[modalType];

  const form = useForm<z.infer<typeof animalFormSchema>>({
    resolver: zodResolver(animalFormSchema),
    defaultValues: {
      tagNumber: "",
      na: "",
      lastName: "",
      givenName: "",
      addressNo: "",
      lotNo: "",
      houseNo: "",
      street: "",
      suburb: "",
      name: "",
      breedCode: "",
      breed: "",
      colour: "",
      markings: "None",
      sterilised: false,
      nextYearTagNo: "",
      oldTagNo: "",
      microchipNo: "",
      dangerous: false,
      animalBreeder: false,
    },
  });

  useEffect(() => {
    if (animal) {
      form.reset({
        tagNumber: animal.tagNumber,
        na: animal.na,
        lastName: animal.lastName,
        givenName: animal.givenName,
        addressNo: animal.addressNo,
        lotNo: animal.lotNo,
        houseNo: animal.houseNo,
        street: animal.street,
        suburb: animal.suburb,
        name: animal.name,
        breedCode: animal.breedCode,
        breed: animal.breed,
        colour: animal.colour,
        markings: animal.markings,
        sterilised: animal.sterilised,
        nextYearTagNo: animal.nextYearTagNo,
        oldTagNo: animal.oldTagNo,
        microchipNo: animal.microchipNo,
        currentConvictionBannedStartDate: animal.currentConvictionBannedStartDate,
        currentConvictionBannedEndDate: animal.currentConvictionBannedEndDate,
        dangerous: animal.type === 'dog' ? (animal as Dog).dangerous : false,
        animalBreeder: animal.type === 'dog' ? (animal as Dog).animalBreeder : false,
      });
    } else {
      form.reset({
        tagNumber: "",
        na: "",
        lastName: "",
        givenName: "",
        addressNo: "",
        lotNo: "",
        houseNo: "",
        street: "",
        suburb: "",
        name: "",
        breedCode: "",
        breed: "",
        colour: "",
        markings: "None",
        sterilised: false,
        nextYearTagNo: "",
        oldTagNo: "",
        microchipNo: "",
        dangerous: false,
        animalBreeder: false,
      });
    }
  }, [animal, form]);

  const onSubmit = (values: z.infer<typeof animalFormSchema>) => {
    onSave(values as AnimalFormData);
    form.reset(); // Reset form after successful save
  };

  const handleModalClose = (open: boolean) => {
    onOpenChange(open);
    if (!open) {
      // Reset form when modal closes
      setTimeout(() => {
        form.reset();
      }, 100);
    }
  };

  const handleBreedChange = (breedCode: string) => {
    const selectedBreed = currentBreeds.find(b => b.code === breedCode);
    if (selectedBreed) {
      form.setValue("breedCode", breedCode);
      form.setValue("breed", selectedBreed.breed);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleModalClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Edit" : "Add New"} {modalType === 'cat' ? 'Cat' : 'Dog'} Registration
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Basic Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="tagNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tag Number</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter tag number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="na"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>N/A</FormLabel>
                      <FormControl>
                        <Input placeholder="N/A" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{modalType === 'cat' ? 'Cat' : 'Dog'} Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter animal name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Owner Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Owner Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="givenName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Given Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter given name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter last name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Address Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Address Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="addressNo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address No</FormLabel>
                      <FormControl>
                        <Input placeholder="Address number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lotNo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Lot No</FormLabel>
                      <FormControl>
                        <Input placeholder="Lot number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="houseNo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>House No</FormLabel>
                      <FormControl>
                        <Input placeholder="House number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="street"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Street</FormLabel>
                      <FormControl>
                        <Input placeholder="Street name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="suburb"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Suburb</FormLabel>
                      <FormControl>
                        <Input placeholder="Suburb" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Animal Details */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Animal Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="breedCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Breed</FormLabel>
                      <Select onValueChange={handleBreedChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select breed" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {currentBreeds.map((breed) => (
                            <SelectItem key={breed.code} value={breed.code}>
                              {breed.breed} ({breed.code})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="colour"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Colour</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select colour" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {colourOptions.map((colour) => (
                            <SelectItem key={colour} value={colour}>
                              {colour}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="markings"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Markings</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select markings" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {markingsOptions.map((marking) => (
                            <SelectItem key={marking} value={marking}>
                              {marking}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Additional Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Additional Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="nextYearTagNo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Next Year Tag No</FormLabel>
                      <FormControl>
                        <Input placeholder="Next year tag" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="oldTagNo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Old Tag No</FormLabel>
                      <FormControl>
                        <Input placeholder="Old tag number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="microchipNo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Microchip No</FormLabel>
                      <FormControl>
                        <Input placeholder="Microchip number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Status Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Status Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="sterilised"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>Sterilised?</FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />
                  {modalType === 'dog' && (
                    <>
                      <FormField
                        control={form.control}
                        name="dangerous"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel>Dangerous</FormLabel>
                            </div>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="animalBreeder"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel>Animal Breeder</FormLabel>
                            </div>
                          </FormItem>
                        )}
                      />
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Conviction Ban Period */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Current Conviction Banned Date</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="currentConvictionBannedStartDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Start Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick start date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date > new Date() || date < new Date("1900-01-01")
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="currentConvictionBannedEndDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>End Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick end date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) => date < new Date()}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex justify-end gap-4 pt-4">
              <Button type="button" variant="outline" onClick={() => handleModalClose(false)}>
                Cancel
              </Button>
              <Button type="submit">
                <Save className="w-4 h-4 mr-2" />
                {isEditing ? "Update" : "Save"} {modalType === 'cat' ? 'Cat' : 'Dog'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
