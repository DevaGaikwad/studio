
"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import type { Product } from '@/lib/types';
import { addProduct, updateProduct } from '@/services/productService';
import { Trash2, PlusCircle } from 'lucide-react';
import { categories } from '@/lib/placeholder-data';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  price: z.preprocess(
    (a) => parseFloat(z.string().parse(a)),
    z.number().positive("Price must be a positive number.")
  ),
  category: z.string().min(1, "Category is required."),
  color: z.string().min(1, "Color is required."),
  description: z.string().min(10, "Description must be at least 10 characters."),
  aiHint: z.string().min(1, "AI Hint is required."),
  sizes: z.array(z.object({ value: z.string().min(1, "Size cannot be empty.") })).min(1, "At least one size is required."),
  images: z.array(z.object({ value: z.string().url("Must be a valid URL.") })).min(1, "At least one image URL is required."),
});

type ProductFormValues = z.infer<typeof formSchema>;

interface ProductFormProps {
  initialData?: Product;
}

export default function ProductForm({ initialData }: ProductFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData ? {
        ...initialData,
        price: String(initialData.price),
        sizes: initialData.sizes.map(s => ({ value: s })),
        images: initialData.images.map(i => ({ value: i })),
        imageUrl: undefined // We handle imageUrl separately
    } : {
      name: '',
      price: '',
      category: '',
      color: '',
      description: '',
      aiHint: '',
      sizes: [{ value: '' }],
      images: [{ value: '' }],
    },
  });

  const { fields: sizeFields, append: appendSize, remove: removeSize } = useFieldArray({
    control: form.control,
    name: "sizes"
  });

  const { fields: imageFields, append: appendImage, remove: removeImage } = useFieldArray({
    control: form.control,
    name: "images"
  });
  
  const onSubmit = async (values: ProductFormValues) => {
    try {
      setLoading(true);
      const productData = {
          ...values,
          price: Number(values.price),
          sizes: values.sizes.map(s => s.value),
          images: values.images.map(i => i.value),
          // Set the primary imageUrl to the first image in the list
          imageUrl: values.images[0].value
      }

      if (initialData) {
        await updateProduct(initialData.id, productData);
        toast({ title: "Product updated successfully." });
      } else {
        await addProduct(productData);
        toast({ title: "Product created successfully." });
      }
      router.push('/admin/products');
      router.refresh();
    } catch (error) {
      console.error(error);
      toast({ variant: 'destructive', title: "Something went wrong.", description: "Your product was not saved. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>{initialData ? 'Edit Product' : 'Create Product'}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                        <Input placeholder="Classic T-Shirt" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                        <Input type="number" placeholder="25.00" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                 <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {categories.filter(c => c.name !== 'All').map(c => (
                            <SelectItem key={c.id} value={c.name}>{c.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                control={form.control}
                name="color"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Color</FormLabel>
                    <FormControl>
                        <Input placeholder="White" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                 <div className="md:col-span-2">
                    <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                            <Textarea placeholder="A timeless classic..." {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                </div>
                 <div className="md:col-span-2">
                    <FormField
                    control={form.control}
                    name="aiHint"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>AI Hint</FormLabel>
                        <FormControl>
                            <Input placeholder="white t-shirt" {...field} />
                        </FormControl>
                        <FormDescription>A short hint for AI image search (e.g., 'blue shirt').</FormDescription>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                </div>

                {/* Sizes */}
                <div className="space-y-2 md:col-span-2">
                    <Label>Sizes</Label>
                    {sizeFields.map((field, index) => (
                        <FormField
                        key={field.id}
                        control={form.control}
                        name={`sizes.${index}.value`}
                        render={({ field }) => (
                             <FormItem className="flex items-center gap-2">
                                <FormControl>
                                    <Input {...field} placeholder={`Size ${index + 1}`} />
                                </FormControl>
                                <Button type="button" variant="destructive" size="icon" onClick={() => removeSize(index)}>
                                    <Trash2 className="h-4 w-4"/>
                                </Button>
                             </FormItem>
                        )}
                        />
                    ))}
                     <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => appendSize({ value: '' })}
                        >
                        <PlusCircle className="mr-2 h-4 w-4"/> Add Size
                    </Button>
                    <FormMessage>{form.formState.errors.sizes?.message}</FormMessage>
                </div>

                 {/* Images */}
                 <div className="space-y-2 md:col-span-2">
                    <Label>Image URLs</Label>
                    {imageFields.map((field, index) => (
                        <FormField
                        key={field.id}
                        control={form.control}
                        name={`images.${index}.value`}
                        render={({ field }) => (
                             <FormItem className="flex items-center gap-2">
                                <FormControl>
                                    <Input {...field} placeholder={`https://example.com/image${index + 1}.png`} />
                                </FormControl>
                                <Button type="button" variant="destructive" size="icon" onClick={() => removeImage(index)}>
                                    <Trash2 className="h-4 w-4"/>
                                </Button>
                             </FormItem>
                        )}
                        />
                    ))}
                     <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => appendImage({ value: '' })}
                        >
                        <PlusCircle className="mr-2 h-4 w-4"/> Add Image URL
                    </Button>
                     <FormMessage>{form.formState.errors.images?.message}</FormMessage>
                </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => router.push('/admin/products')}>Cancel</Button>
              <Button type="submit" disabled={loading}>{loading ? 'Saving...' : 'Save Product'}</Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </Form>
  );
}
