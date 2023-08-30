'use client';

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '../ui/input';
import { Button } from '@/components/ui/button';
import { FileUpload } from '../FileUpload';

export function InitialModal() {
	const formSchema = z.object({
		name: z.string().min(1, {
			message: 'server name is required',
		}),
		imageUrl: z.string().min(1, {
			message: 'server image is required',
		}),
	});
	const form = useForm({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: '',
			imageUrl: '',
		},
	});

	const isLoading = form.formState.isSubmitting;

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		console.log(values);
	};
	return (
		<div className='flex flex-col items-center justify-center text-center min-h-screen'>
			<div className='flex flex-col gap-4 max-w-md bg-slate-100 text-zinc-700 rounded-md p-6'>
				<h2 className='text-2xl font-bold'>Customize your server</h2>
				<p className='text-sm text-zinc-400'>
					Give your server a personality with a name and image. You can always
					change it later.
				</p>

				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)}>
						<div className='space-y-8'>
							<div className='flex items-center justify-center text-center'>
								<FormField
									control={form.control}
									name='imageUrl'
									render={({ field }) => {
										return (
											<FormItem>
												<FormControl>
													<FileUpload
														endpoint='serverImage'
														onChange={field.onChange}
														value={field.value}
													/>
												</FormControl>
											</FormItem>
										);
									}}
								/>
							</div>
							<FormField
								name='name'
								control={form.control}
								render={({ field }) => {
									return (
										<FormItem>
											<FormLabel className='text-zinc-500 dark:text-secondary/70  uppercase text-xs flex items-start'>
												Server Name
											</FormLabel>
											<FormControl>
												<Input
													className='rounded-md dark:bg-zinc-300/50 border-0 text-slate-600 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border'
													disabled={isLoading}
													placeholder='Enter server name'
													{...field}
												/>
											</FormControl>
										</FormItem>
									);
								}}
							/>
						</div>
						<Button
							variant={'primary'}
							disabled={isLoading}>
							create
						</Button>
					</form>
				</Form>
			</div>
		</div>
	);
}
