import * as z from 'zod/v4';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
import { categories } from '@/lib/categories';
import { NewPlaceSchema } from '@/schema/schema';
import ErrorMsg from '../auth/ErrorMsg';
import { useState } from 'react';
import type { PlaceDialogProps } from '@/types/PlaceType';
import useAxiosPrivate from '@/hooks/useAxiosPrivate';

type NewPlaceType = z.infer<typeof NewPlaceSchema>;

export function PlaceDialog({ isEdit, initialValues }: PlaceDialogProps) {
  const {
    register,
    setValue,
    reset,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<NewPlaceType>({
    resolver: zodResolver(NewPlaceSchema),
  });

  const [open, setOpen] = useState(false);

  const axiosPrivate = useAxiosPrivate();

  const handleSubmitPlace = async (data: NewPlaceType) => {
    if (isValid) {
      const res = await axiosPrivate.post('/place/create', data);

      console.log(res);

      setOpen(false);
      reset();
    }
  };

  function handleClose() {
    setOpen(false);
    reset();
  }

  const customFormHandler = handleSubmit(handleSubmitPlace);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" className="mt-10 border-2 border-slate-600">
          {isEdit ? 'Update your place' : 'Create your first place'}
        </Button>
      </DialogTrigger>

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
                name="title"
                type="text"
                placeholder="Tumpak Sewu"
                defaultValue={initialValues?.title}
              />
              {errors.title?.message && <ErrorMsg msg={errors.title.message} />}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="imageUrl">Image URL</Label>
              <Input
                {...register('imageUrl')}
                id="imageUrl"
                name="imageUrl"
                type="text"
                placeholder="https://example.com/image.jpg"
                defaultValue={initialValues?.imageUrl}
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
                name="location"
                type="text"
                placeholder="Lumajang, East Java, Indonesia"
                defaultValue={initialValues?.location}
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
                <SelectTrigger
                  className="w-full"
                  {...register('category')}
                  name="category"
                >
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
                name="description"
                placeholder="Write a brief description..."
                defaultValue={initialValues?.description}
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

            <Button>{isEdit ? 'Save changes' : 'Submit data'}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
