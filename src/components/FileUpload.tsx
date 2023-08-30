import { Button } from '@/components/ui/button';
import { UploadDropzone } from '@/lib/uploadthing';
import '@uploadthing/react/styles.css';
import { X } from 'lucide-react';
import Image from 'next/image';

interface FileUploadProps {
	endpoint: 'messageFile' | 'serverImage';
	onChange: (url?: string) => void;
	value: string;
}

export function FileUpload({ endpoint, onChange, value }: FileUploadProps) {
	const fileType = value?.split('.').pop();
	if (value && fileType !== 'pdf') {
		return (
			<div className='relative'>
				<Image
					src={value}
					alt={'upload image'}
					className='rounded-full object-cover w-16 h-16'
					width={75}
					height={75}
				/>
				<Button
					onClick={() => onChange('')}
					variant={'link'}
					className='absolute top-[-0.5rem] right-[-1.5rem]'>
					<X className='text-[0.4rem] bg-rose-600 text-rose-100 rounded-full' />
				</Button>
			</div>
		);
	}
	return (
		<UploadDropzone
			endpoint={endpoint}
			onClientUploadComplete={(res) => onChange(res?.[0].url)}
			onUploadError={(error: Error) => {
				console.log(error);
			}}
		/>
	);
}
