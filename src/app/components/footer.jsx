import Link from 'next/link';
import { FaGithub, FaTwitter, FaLinkedin, FaHeart } from 'react-icons/fa';

export const Footer = () => {
    const footerLinks = [
        { name: 'About', href: '/about' },
        { name: 'Privacy Policy', href: '/privacy' },
        { name: 'Terms of Service', href: '/terms' },
        { name: 'Contact Us', href: '/contact' },
        { name: 'FAQ', href: '/faq' },
        { name: 'Blog', href: '/blog' },
    ];

    const socialLinks = [
        { icon: <FaGithub size={18} />, name: 'GitHub', href: 'https://github.com' },
        { icon: <FaTwitter size={18} />, name: 'Twitter', href: 'https://twitter.com' },
        { icon: <FaLinkedin size={18} />, name: 'LinkedIn', href: 'https://linkedin.com' },
    ];

    return (
        <footer className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
                    {/* Brand info */}
                    <div className="space-y-4">
                        <Link href="/" className="flex items-center">
                            <span className="text-xl font-bold">AI Blog</span>
                        </Link>
                        <p className="text-sm text-muted-foreground">
                            Empowering creators with AI-driven tools to craft amazing content.
                        </p>
                        <div className="flex space-x-4">
                            {socialLinks.map((link, index) => (
                                <Link
                                    key={index}
                                    href={link.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={link.name}
                                    className="text-muted-foreground hover:text-primary transition-colors duration-200"
                                >
                                    {link.icon}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Links columns */}
                    <div className="space-y-4">
                        <h4 className="text-sm font-semibold uppercase tracking-wider">Resources</h4>
                        <ul className="space-y-2">
                            {footerLinks.slice(0, 3).map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="space-y-4">
                        <h4 className="text-sm font-semibold uppercase tracking-wider">Support</h4>
                        <ul className="space-y-2">
                            {footerLinks.slice(3).map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div className="space-y-4">
                        <h4 className="text-sm font-semibold uppercase tracking-wider">Subscribe</h4>
                        <p className="text-sm text-muted-foreground">
                            Get the latest updates and news.
                        </p>
                        <div className="flex space-x-2">
                            <input
                                type="email"
                                placeholder="Your email"
                                className="flex-1 rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                            />
                            <button className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus:outline-none focus:ring-1 focus:ring-primary">
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div className="mt-12 border-t pt-8">
                    <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                        <p className="text-sm text-muted-foreground">
                            © {new Date().getFullYear()} AI Blog Platform. All rights reserved.
                        </p>
                        <p className="flex items-center text-sm text-muted-foreground">
                            Made with <FaHeart className="mx-1 text-red-500" /> by AI Blog Team
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};