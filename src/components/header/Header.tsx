import { UserButton } from '@clerk/nextjs';
import Link from 'next/link';

function Header() {
	return (
		<header className='flex w-full justify-between items-center max-w-5xl mx-auto p-4 bg-slate-100/10 shadow-md'>
			<h1 className='text-xl font-bold'>Discord</h1>
			<nav className='flex gap-4 items-center'>
				<Link href='/'>Home</Link>
				<Link href='/about'>About</Link>
				<Link href='/contact'>Contact</Link>
				<UserButton afterSignOutUrl='/' />
			</nav>
		</header>
	);
}

export default Header;
