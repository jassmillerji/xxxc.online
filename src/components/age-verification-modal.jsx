
"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import Link from 'next/link';
import Logo from './logo';

const AgeVerificationModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // We need to check if we are in a browser environment before accessing sessionStorage
    if (typeof window !== 'undefined') {
      try {
        const isVerified = sessionStorage.getItem('isAgeVerified');
        if (!isVerified) {
          setIsOpen(true);
        }
      } catch (error) {
        console.error('Could not access sessionStorage:', error);
        // If sessionStorage is blocked, we should still show the modal
        setIsOpen(true);
      }
    }
  }, []);

  const handleEnter = () => {
    try {
      sessionStorage.setItem('isAgeVerified', 'true');
    } catch (error) {
      console.error('Could not write to sessionStorage:', error);
    }
    setIsOpen(false);
  };

  const handleLeave = () => {
    // A more user-friendly way to leave the site
    window.location.href = 'https://www.google.com/search?q=age+verification';
  };

  // The modal should not be closable by clicking outside or pressing Escape
  const onOpenChange = (open) => {
    if (!open) {
      // Prevent closing unless one of the buttons is clicked
      return;
    }
    setIsOpen(open);
  }

  if (!isMounted) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg bg-card text-card-foreground p-6 sm:p-8" hideCloseButton>
        <DialogHeader className="text-center space-y-4">
          <div className="flex justify-center">
            <Logo />
          </div>
          <DialogTitle className="text-2xl font-bold font-headline">This is an adult website</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            This website contains age-restricted materials including nudity and explicit depictions of sexual activity. By entering, you affirm that you are at least 18 years of age or the age of majority in the jurisdiction you are accessing the website from and you consent to viewing sexually explicit content.
          </DialogDescription>
        </DialogHeader>
        
        <DialogFooter className="flex-col sm:flex-row gap-4 pt-4">
          <Button onClick={handleEnter} className="w-full h-12 text-lg bg-accent hover:bg-accent/90 text-accent-foreground">I am 18 or older - Enter</Button>
          <Button onClick={handleLeave} variant="secondary" className="w-full h-12 text-lg">I am under 18 - Exit</Button>
        </DialogFooter>

        <div className="text-center text-xs text-muted-foreground pt-4 space-y-2">
            <p>Our <Link href="#" className="underline hover:text-accent">parental controls page</Link> explains how you can easily block access to this site.</p>
            <p>&copy; {new Date().getFullYear()} xxxc.online. All rights reserved.</p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AgeVerificationModal;
