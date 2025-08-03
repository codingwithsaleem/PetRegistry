"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AnimalTable } from "@/components/animals/animal-table";
import { generateDummyCats, generateDummyDogs } from "@/lib/data/animals";
import { Cat, Dog, AnimalFormData } from "@/lib/types/animals";
import { useState } from "react";
import { toast } from "sonner";

const AnimalsPage = () => {
  const [cats, setCats] = useState<Cat[]>(generateDummyCats());
  const [dogs, setDogs] = useState<Dog[]>(generateDummyDogs());
  const allAnimals = [...cats, ...dogs];

  const handleSaveCat = (data: AnimalFormData, editingId?: string) => {
    if (editingId) {
      // Update existing cat
      setCats(prev => prev.map(cat => 
        cat.id === editingId 
          ? {
              ...cat,
              ...data,
              type: 'cat' as const,
              updatedAt: new Date()
            }
          : cat
      ));
      toast.success("Cat updated successfully!");
    } else {
      // Add new cat
      const newCat: Cat = {
        ...data,
        id: `cat-${Date.now()}`,
        type: 'cat',
        createdAt: new Date(),
        updatedAt: new Date()
      };
      setCats(prev => [newCat, ...prev]);
      toast.success("New cat registered successfully!");
    }
  };

  const handleSaveDog = (data: AnimalFormData, editingId?: string) => {
    if (editingId) {
      // Update existing dog
      setDogs(prev => prev.map(dog => 
        dog.id === editingId 
          ? {
              ...dog,
              ...data,
              type: 'dog' as const,
              dangerous: data.dangerous || false,
              animalBreeder: data.animalBreeder || false,
              updatedAt: new Date()
            }
          : dog
      ));
      toast.success("Dog updated successfully!");
    } else {
      // Add new dog
      const newDog: Dog = {
        ...data,
        id: `dog-${Date.now()}`,
        type: 'dog',
        dangerous: data.dangerous || false,
        animalBreeder: data.animalBreeder || false,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      setDogs(prev => [newDog, ...prev]);
      toast.success("New dog registered successfully!");
    }
  };

  const handleDeleteCat = (catId: string) => {
    setCats(prev => prev.filter(cat => cat.id !== catId));
    toast.success("Cat deleted successfully!");
  };

  const handleDeleteDog = (dogId: string) => {
    setDogs(prev => prev.filter(dog => dog.id !== dogId));
    toast.success("Dog deleted successfully!");
  };

  const handleDeleteAnimal = (animalId: string) => {
    const isCat = cats.some(cat => cat.id === animalId);
    if (isCat) {
      handleDeleteCat(animalId);
    } else {
      handleDeleteDog(animalId);
    }
  };

  return (
    <div className="container mx-auto p-6 pt-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Animals Management</h1>
        <p className="text-muted-foreground">
          Manage animal registrations, view records, and update information.
        </p>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="all">All Animals</TabsTrigger>
          <TabsTrigger value="cats">Cats</TabsTrigger>
          <TabsTrigger value="dogs">Dogs</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-6">
          <AnimalTable 
            animals={allAnimals} 
            type="all"
            title="All Animals"
            showAddButton={false}
            onSave={() => {}}
            onDelete={handleDeleteAnimal}
          />
        </TabsContent>
        
        <TabsContent value="cats" className="mt-6">
          <AnimalTable 
            animals={cats} 
            type="cat"
            title="Cat Registrations"
            showAddButton={true}
            onSave={handleSaveCat}
            onDelete={handleDeleteCat}
          />
        </TabsContent>
        
        <TabsContent value="dogs" className="mt-6">
          <AnimalTable 
            animals={dogs} 
            type="dog"
            title="Dog Registrations"
            showAddButton={true}
            onSave={handleSaveDog}
            onDelete={handleDeleteDog}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AnimalsPage;
