"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Animal, Dog, AnimalFormData } from "@/lib/types/animals";
import {
  ArrowUpDownIcon,
  ChevronLeft,
  ChevronRight,
  Edit,
  Plus,
  Search,
  Trash2,
  PawPrint
} from "lucide-react";
import { useMemo, useState } from "react";
import { AnimalFormModal } from "./animal-form-modal";
import { DeleteConfirmDialog } from "./delete-confirm-dialog";

interface AnimalTableProps {
  animals: Animal[];
  type: 'all' | 'cat' | 'dog';
  title: string;
  showAddButton: boolean;
  onSave?: (data: AnimalFormData, editingId?: string) => void;
  onDelete?: (animalId: string) => void;
}

export const AnimalTable = ({ 
  animals, 
  type, 
  title, 
  showAddButton,
  onSave,
  onDelete
}: AnimalTableProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState<keyof Animal>("name");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAnimal, setEditingAnimal] = useState<Animal | null>(null);
  const [deleteDialog, setDeleteDialog] = useState<{
    open: boolean;
    animal: Animal | null;
  }>({ open: false, animal: null });
  const itemsPerPage = 10;

  const filteredAndSortedAnimals = useMemo(() => {
    const filtered = animals.filter((animal) => {
      const searchLower = searchTerm.toLowerCase();
      return (
        animal.name.toLowerCase().includes(searchLower) ||
        animal.tagNumber.toLowerCase().includes(searchLower) ||
        animal.lastName.toLowerCase().includes(searchLower) ||
        animal.givenName.toLowerCase().includes(searchLower) ||
        animal.breed.toLowerCase().includes(searchLower) ||
        animal.suburb.toLowerCase().includes(searchLower)
      );
    });

    filtered.sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];

      if (aValue == null && bValue == null) return 0;
      if (aValue == null) return sortDirection === "asc" ? -1 : 1;
      if (bValue == null) return sortDirection === "asc" ? 1 : -1;
      if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
      if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });

    return filtered;
  }, [animals, searchTerm, sortField, sortDirection]);

  const paginatedAnimals = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredAndSortedAnimals.slice(
      startIndex,
      startIndex + itemsPerPage
    );
  }, [filteredAndSortedAnimals, currentPage]);

  const totalPages = Math.ceil(filteredAndSortedAnimals.length / itemsPerPage);

  const handleSort = (field: keyof Animal) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const handleAddNew = () => {
    setEditingAnimal(null);
    setIsModalOpen(true);
  };

  const handleEdit = (animal: Animal) => {
    setEditingAnimal(animal);
    setIsModalOpen(true);
  };

  const handleDelete = (animal: Animal) => {
    setDeleteDialog({ open: true, animal });
  };

  const confirmDelete = () => {
    if (deleteDialog.animal && onDelete) {
      onDelete(deleteDialog.animal.id);
      setDeleteDialog({ open: false, animal: null });
    }
  };

  const formatDate = (date?: Date) => {
    if (!date) return 'N/A';
    return date.toLocaleDateString();
  };

  const getAnimalTypeIcon = (animal: Animal) => {
    return animal.type === 'cat' ? '🐱' : '🐶';
  };

  const getConvictionStatus = (animal: Animal) => {
    if (!animal.currentConvictionBannedStartDate || !animal.currentConvictionBannedEndDate) {
      return null;
    }
    
    const now = new Date();
    const isActive = now >= animal.currentConvictionBannedStartDate && now <= animal.currentConvictionBannedEndDate;
    
    return isActive ? (
      <Badge variant="destructive" className="text-xs">
        Banned until {formatDate(animal.currentConvictionBannedEndDate)}
      </Badge>
    ) : null;
  };

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4 p-2 rounded-sm dark:bg-[#3D434C]">
        <div className="flex items-center gap-2">
          <PawPrint className="h-5 w-5" />
          <h2 className="text-lg font-semibold">{title}</h2>
          <Badge variant="secondary" className="ml-2">
            {filteredAndSortedAnimals.length} records
          </Badge>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative bg-background">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4" />
            <Input
              placeholder="Search animals..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-full sm:w-64"
            />
          </div>
          {showAddButton && (
            <Button onClick={handleAddNew} className="cursor-pointer">
              <Plus className="h-4 w-4 mr-2" />
              Add New {type === 'cat' ? 'Cat' : 'Dog'}
            </Button>
          )}
        </div>
      </div>

      <div className="overflow-hidden border">
        <Table>
          <TableHeader>
            <TableRow className="dark:bg-[#31353B]">
              <TableHead className="w-12">Type</TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => handleSort("tagNumber")}
                  className="p-0 h-auto font-medium"
                >
                  Tag Number
                  <ArrowUpDownIcon className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => handleSort("name")}
                  className="p-0 h-auto font-medium"
                >
                  Animal Name
                  <ArrowUpDownIcon className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => handleSort("lastName")}
                  className="p-0 h-auto font-medium"
                >
                  Owner
                  <ArrowUpDownIcon className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => handleSort("breed")}
                  className="p-0 h-auto font-medium"
                >
                  Breed
                  <ArrowUpDownIcon className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => handleSort("suburb")}
                  className="p-0 h-auto font-medium"
                >
                  Suburb
                  <ArrowUpDownIcon className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Special Attributes</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedAnimals.map((animal) => (
              <TableRow key={animal.id}>
                <TableCell className="text-lg">
                  {getAnimalTypeIcon(animal)}
                </TableCell>
                <TableCell className="font-medium">{animal.tagNumber}</TableCell>
                <TableCell>{animal.name}</TableCell>
                <TableCell>
                  <div>
                    <div className="font-medium">{animal.givenName} {animal.lastName}</div>
                    <div className="text-sm text-muted-foreground">
                      {animal.addressNo} {animal.street}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div>
                    <div className="font-medium">{animal.breed}</div>
                    <div className="text-sm text-muted-foreground">{animal.colour}</div>
                  </div>
                </TableCell>
                <TableCell>{animal.suburb}</TableCell>
                <TableCell>
                  <div className="flex flex-col gap-1">
                    <div className="flex gap-1">
                      {animal.sterilised && (
                        <Badge variant="outline" className="text-xs">
                          Sterilised
                        </Badge>
                      )}
                      {animal.type === 'dog' && (animal as Dog).dangerous && (
                        <Badge variant="destructive" className="text-xs">
                          Dangerous
                        </Badge>
                      )}
                      {animal.type === 'dog' && (animal as Dog).animalBreeder && (
                        <Badge variant="secondary" className="text-xs">
                          Breeder
                        </Badge>
                      )}
                    </div>
                    {getConvictionStatus(animal)}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="text-sm text-muted-foreground">
                    {animal.microchipNo && (
                      <div>Chip: {animal.microchipNo.slice(0, 8)}...</div>
                    )}
                    {animal.markings !== 'None' && (
                      <div>Markings: {animal.markings}</div>
                    )}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEdit(animal)}
                      className="cursor-pointer"
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDelete(animal)}
                      className="cursor-pointer text-destructive hover:text-destructive"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between py-4">
        <div className="text-sm text-slate-400">
          Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
          {Math.min(currentPage * itemsPerPage, filteredAndSortedAnimals.length)} of{" "}
          {filteredAndSortedAnimals.length} animals
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="bg-slate-700 border-slate-600 text-white hover:bg-slate-600 cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </Button>

          <div className="flex items-center gap-1">
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const pageNum = i + 1;
              return (
                <Button
                  key={pageNum}
                  variant={currentPage === pageNum ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCurrentPage(pageNum)}
                  className={
                    currentPage === pageNum
                      ? "bg-red-600 hover:bg-red-700 text-white cursor-pointer"
                      : "bg-slate-700 border-slate-600 text-white hover:bg-slate-600 cursor-pointer"
                  }
                >
                  {pageNum}
                </Button>
              );
            })}
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="bg-slate-700 border-slate-600 text-white hover:bg-slate-600 cursor-pointer"
          >
            Next
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Modal */}
      <AnimalFormModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        animal={editingAnimal}
        type={type === 'cat' ? 'cat' : type === 'dog' ? 'dog' : undefined}
        onSave={(data: AnimalFormData) => {
          if (onSave) {
            onSave(data, editingAnimal?.id);
          }
          setIsModalOpen(false);
          setEditingAnimal(null);
        }}
      />

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmDialog
        open={deleteDialog.open}
        onOpenChange={(open) => setDeleteDialog({ open, animal: null })}
        onConfirm={confirmDelete}
        title={`Delete ${deleteDialog.animal?.type || 'Animal'}`}
        description={`Are you sure you want to delete ${deleteDialog.animal?.name}? This action cannot be undone.`}
      />
    </div>
  );
};
