"use client";

import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export function Header() {
  const { isAuthenticated } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Blog", href: "/blog" },
    { name: "About Us", href: "/about" },
    { name: "Project Details", href: "/project" },
    { name: "Team", href: "/team" },
    { name: "Demo", href: "/demo" },
    { name: "Resources", href: "/resources" },
    { name: "FAQs", href: "/faqs" },
    { name: "Acknowledgments", href: "/acknowledgments" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header className="border-b sticky top-0 z-50 bg-background">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          BSSE-FYP-30
        </Link>

        <nav className="hidden xl:flex items-center space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              {link.name}
            </Link>
          ))}
          <ThemeToggle />
          {isAuthenticated ? (
            <Button variant="outline" asChild>
              <Link href="/dashboard">Dashboard</Link>
            </Button>
          ) : (
            <Button variant="outline" asChild>
              <Link href="/login">Login</Link>
            </Button>
          )}
        </nav>

        <div className="flex items-center xl:hidden">
          <ThemeToggle />
          <button
            onClick={toggleMenu}
            className="ml-2 p-2"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="xl:hidden bg-background border-t">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-medium hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            {isAuthenticated ? (
              <Button variant="outline" asChild className="w-full">
                <Link href="/dashboard">Dashboard</Link>
              </Button>
            ) : (
              <Button variant="outline" asChild className="w-full">
                <Link href="/login">Login</Link>
              </Button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
