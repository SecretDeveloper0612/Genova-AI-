import React from 'react';

export const LogoIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M12 2C11.411 2 10.9228 2.411 10.833 3C9.073 3.693 5.421 6.848 5.125 12C4.949 15.313 7.425 18.423 10.833 21C10.9228 21.589 11.411 22 12 22C12.589 22 13.0772 21.589 13.167 21C14.927 20.307 18.579 17.152 18.875 12C19.051 8.687 16.575 5.577 13.167 3C13.0772 2.411 12.589 2 12 2Z" fill="#E1FF00"/>
  </svg>
);

export const GenerateIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M12 2L14.09 8.26L20 10.35L14.09 12.44L12 18.7L9.91 12.44L4 10.35L9.91 8.26L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const EditIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M18.5 2.5C18.8978 2.10218 19.4374 1.87868 20 1.87868C20.5626 1.87868 21.1022 2.10218 21.5 2.5C21.8978 2.89782 22.1213 3.43739 22.1213 4C22.1213 4.56261 21.8978 5.10218 21.5 5.5L12 15L8 16L9 12L18.5 2.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const GalleryIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <rect x="3" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <rect x="14" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <rect x="14" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <rect x="3" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const SubscriptionIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M20 12V6H4V12M20 12V18H4V12M20 12H4M12 6V3M12 18V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M8 9.5C8.27614 9.5 8.5 9.27614 8.5 9C8.5 8.72386 8.27614 8.5 8 8.5C7.72386 8.5 7.5 8.72386 7.5 9C7.5 9.27614 7.72386 9.5 8 9.5Z" fill="currentColor" stroke="currentColor"/>
    </svg>
);

export const SettingsIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M19.14 12.94C19.0651 12.4883 19.0651 11.5117 19.14 11.06C19.34 10.05 19.96 9.15002 20.83 8.51002C21.0526 8.35623 21.2339 8.15673 21.3621 7.92482C21.4903 7.69291 21.5623 7.43443 21.574 7.17002C21.574 6.94002 21.504 6.71002 21.374 6.52002C21.234 6.32002 21.044 6.17002 20.834 6.05002L18.814 4.93002C18.604 4.81002 18.354 4.75002 18.104 4.75002C17.864 4.75002 17.614 4.81002 17.404 4.93002C16.534 5.57002 15.914 6.47002 15.714 7.48002C15.6391 7.93169 15.6391 8.90831 15.714 9.36002C15.914 10.37 15.294 11.27 14.424 11.91L14.414 11.92C13.544 12.56 12.784 12.94 11.974 12.94C11.164 12.94 10.404 12.56 9.53402 11.92L9.52402 11.91C8.65402 11.27 8.03402 10.37 7.83402 9.36002C7.75904 8.90831 7.75904 7.93169 7.83402 7.48002C8.03402 6.47002 7.41402 5.57002 6.54402 4.93002C6.33402 4.81002 6.08402 4.75002 5.83402 4.75002C5.58402 4.75002 5.33402 4.81002 5.12402 4.93002L3.10402 6.05002C2.89402 6.17002 2.70402 6.32002 2.56402 6.52002C2.43402 6.71002 2.36402 6.94002 2.36402 7.17002C2.37574 7.43443 2.44773 7.69291 2.57593 7.92482C2.70414 8.15673 2.88544 8.35623 3.10802 8.51002C3.97802 9.15002 4.59802 10.05 4.79802 11.06C4.87297 11.5117 4.87297 12.4883 4.79802 12.94C4.59802 13.95 3.97802 14.85 3.10802 15.49C2.88544 15.6438 2.70414 15.8433 2.57593 16.0752C2.44773 16.3071 2.37574 16.5656 2.36402 16.83C2.36402 17.06 2.43402 17.29 2.56402 17.48C2.70402 17.68 2.89402 17.83 3.10402 17.95L5.12402 19.07C5.33402 19.19 5.58402 19.25 5.83402 19.25C6.08402 19.25 6.33402 19.19 6.54402 19.07C7.41402 18.43 8.03402 17.53 8.23402 16.52C8.30904 16.0683 8.30904 15.0917 8.23402 14.64C8.03402 13.63 8.65402 12.73 9.52402 12.09L9.53402 12.08C10.404 11.44 11.164 11.06 11.974 11.06C12.784 11.06 13.544 11.44 14.414 12.08L14.424 12.09C15.294 12.73 15.914 13.63 16.114 14.64C16.189 15.0917 16.189 16.0683 16.114 16.52C15.914 17.53 15.294 18.43 14.424 19.07C14.214 19.19 13.964 19.25 13.714 19.25C13.464 19.25 13.214 19.19 13.004 19.07L11.974 21.48C11.974 21.48 11.974 21.48 11.974 21.49C12.374 21.68 12.824 21.75 13.254 21.75C13.624 21.75 13.994 21.67 14.334 21.52L17.404 19.07C17.614 19.19 17.864 19.25 18.114 19.25C18.364 19.25 18.614 19.19 18.824 19.07L20.844 17.95C21.054 17.83 21.244 17.68 21.384 17.48C21.514 17.29 21.584 17.06 21.584 16.83C21.5723 16.5656 21.5003 16.3071 21.3721 16.0752C21.2439 15.8433 21.0626 15.6438 20.84 15.49C19.97 14.85 19.35 13.95 19.15 12.94H19.14Z" fill="currentColor"/>
  </svg>
);

export const MenuIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M3 12H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M3 6H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M3 18H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

export const XIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);