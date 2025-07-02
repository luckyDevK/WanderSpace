import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod/v4';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '../ui/textarea';
import { Button } from '@/components/ui/button';

import { categories } from '@/lib/categories';
import { NewPlaceSchema } from '@/schema/schema';
import ErrorMsg from '../auth/ErrorMsg';

import type { PlaceDialogProps } from '@/types/PlaceDialogType';

export type NewPlaceType = z.infer<typeof NewPlaceSchema>;

export default function PlaceDialog({
  isEdit,
  initialValues,
  isOpen,
  setIsOpen,
  handleClose,
  handleSubmit: submitData,
}: PlaceDialogProps) {
  const {
    register,
    setValue,
    reset,
    handleSubmit,
    formState: { errors, isValid, isSubmitSuccessful, isSubmitting },
  } = useForm<NewPlaceType>({
    resolver: zodResolver(NewPlaceSchema),
    defaultValues: initialValues,
  });

  useEffect(() => {
    if (initialValues) {
      reset(initialValues);
    }
  }, [initialValues, reset]);

  useEffect(() => {
    if (isSubmitSuccessful && !isEdit) {
      reset();
    }
  }, [isSubmitSuccessful, reset, isEdit]);

  const customFormHandler = handleSubmit((data) => submitData(data, isValid));

  return (
    <Dialog open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
      <DialogContent className="md:max-w-md [&>button]:hidden">
        <form onSubmit={customFormHandler}>
          <DialogHeader>
            <DialogTitle>
              {isEdit ? 'Update Place' : 'Add New Place'}
            </DialogTitle>
            <DialogDescription className="text-balance">
              {isEdit
                ? 'Edit the details of your place below.'
                : 'Fill in the details for your new place. Click submit when done.'}
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Title</Label>
              <Input
                {...register('title')}
                id="title"
                type="text"
                placeholder="Tumpak Sewu"
              />
              {errors.title?.message && <ErrorMsg msg={errors.title.message} />}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="imageUrl">Image URL</Label>
              <Input
                {...register('imageUrl')}
                id="imageUrl"
                type="text"
                placeholder="https://example.com/image.jpg"
              />
              {errors.imageUrl?.message && (
                <ErrorMsg msg={errors.imageUrl.message} />
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="location">Location</Label>
              <Input
                {...register('location')}
                id="location"
                type="text"
                placeholder="Lumajang, East Java, Indonesia"
              />
              {errors.location?.message && (
                <ErrorMsg msg={errors.location.message} />
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="category">Category</Label>
              <Select
                defaultValue={initialValues?.category}
                onValueChange={(val) =>
                  setValue('category', val as NewPlaceType['category'])
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              {errors.category?.message && (
                <ErrorMsg msg={errors.category.message} />
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                {...register('description')}
                id="description"
                placeholder="Write a brief description..."
              />
              {errors.description?.message && (
                <ErrorMsg msg={errors.description.message} />
              )}
            </div>
          </div>

          <DialogFooter>
            <Button type="button" onClick={handleClose} variant="outline">
              Cancel
            </Button>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center cursor-pointer justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSubmitting && (
                <svg
                  className="h-5 w-5 animate-spin text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 
                    5.291A7.962 7.962 0 014 12H0c0 
                    3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
              )}
              <span>{isEdit ? 'Save changes' : 'Submit data'}</span>
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
