'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { UserButton, useUser } from '@clerk/nextjs';
import { Search, Menu } from 'lucide-react';
import Button from './ui/button';
import { Input } from './ui/input';
import { useEffect, useState } from 'react';

export const Navbar = () => {
    const pathname = usePathname();
    const { isSignedIn } = useUser();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    const navLinks = [
        { name: 'Home', href: '/' },
        { name: 'Blogs', href: '/blogs' },
        { name: 'Create', href: '/create' },
    ];

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header className={`sticky top-0 z-50 w-full border-b transition-all duration-300 ${isScrolled ? 'bg-background/95 shadow-sm' : 'bg-background/80'} backdrop-blur supports-[backdrop-filter]:bg-background/60`}>
            <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6">
                {/* Left side - Logo and nav links */}
                <div className="flex items-center space-x-6">
                    <Link href="/" className="flex items-center space-x-2">
                        <span className="text-lg font-bold">AI Blog</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-6">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={`text-sm font-medium transition-colors hover:text-primary ${pathname === link.href ? 'text-primary' : 'text-muted-foreground'}`}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </nav>
                </div>

                {/* Mobile menu button */}
                <div className="flex md:hidden">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        <Menu className="h-5 w-5" />
                    </Button>
                </div>

                {/* Right side - Search and auth */}
                <div className="hidden md:flex items-center space-x-4">
                    <div className="relative w-48 lg:w-64">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            placeholder="Search posts..."
                            className="pl-9"
                        />
                    </div>

                    {isSignedIn ? (
                        <UserButton afterSignOutUrl="/" />
                    ) : (
                        <div className="flex space-x-2">
                            <Button variant="outline"  size="sm">
                                <Link href="/sign-in">Sign In</Link>
                            </Button>
                            <Button  size="sm">
                                <Link href="/sign-up">Sign Up</Link>
                            </Button>
                        </div>
                    )}
                </div>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div className="absolute top-16 left-0 right-0 bg-background md:hidden border-t shadow-lg">
                        <div className="container px-4 py-3 space-y-4">
                            <div className="relative w-full">
                                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                <Input
                                    placeholder="Search posts..."
                                    className="pl-9 w-full"
                                />
                            </div>

                            <nav className="flex flex-col space-y-3">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.name}
                                        href={link.href}
                                        className={`py-2 text-sm font-medium transition-colors hover:text-primary ${pathname === link.href ? 'text-primary' : 'text-muted-foreground'}`}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        {link.name}
                                    </Link>
                                ))}
                            </nav>

                            {!isSignedIn && (
                                <div className="flex space-x-2 pt-2">
                                    <Button variant="outline"  className="w-full">
                                        <Link href="/sign-in">Sign In</Link>
                                    </Button>
                                    <Button  className="w-full">
                                        <Link href="/sign-up">Sign Up</Link>
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
};