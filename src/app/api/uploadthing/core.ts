import { createUploadthing, type FileRouter } from 'uploadthing/next';
import { auth } from '@clerk/nextjs';

const f = createUploadthing();

const handleAuth = () => {
	const { userId } = auth();
	if (!userId) throw new Error('unauthorized');
	return { userId };
};

export const ourFileRouter = {
	serverImage: f({ image: { maxFileSize: '1MB', maxFileCount: 1 } })
		.middleware(() => handleAuth())
		.onUploadComplete((file) => {
			console.log('imageUrl: ', file);
		}),
	messageFile: f(['image', 'video', 'audio'])
		.middleware(() => handleAuth())
		.onUploadComplete((file) => {
			console.log('file: ', file);
		}),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
