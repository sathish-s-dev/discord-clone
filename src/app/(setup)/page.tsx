import Header from '@/components/header/Header';

import { currentUser, redirectToSignIn } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

import { db } from '@/lib/db';
import { initialProfile } from '@/lib/initial-profile';
import { InitialModal } from '@/components/modals/initialModal';

export default async function Home() {
	const profile = await initialProfile();

	const server = await db.server.findFirst({
		where: {
			member: {
				some: {
					profileId: profile?.id,
				},
			},
		},
	});

	if (server) {
		return redirect(`/servers/${server.id}`);
	}

	return (
		<>
			<InitialModal />
		</>
	);
}
