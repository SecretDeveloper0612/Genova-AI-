import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogoIcon, GenerateIcon, EditIcon, GalleryIcon, MenuIcon, XIcon } from '../components/icons';

const LandingPage: React.FC = () => {
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const creations = [
        'https://picsum.photos/seed/1/400/400',
        'https://picsum.photos/seed/2/400/400',
        'https://picsum.photos/seed/3/400/400',
        'https://picsum.photos/seed/4/400/400',
        'https://picsum.photos/seed/5/400/400',
        'https://picsum.photos/seed/6/400/400',
        'https://picsum.photos/seed/7/400/400',
        'https://picsum.photos/seed/8/400/400',
    ];

    const features = [
        {
            icon: GenerateIcon,
            title: 'AI Image Generation',
            description: 'Turn your text prompts into high-quality images in seconds with our state-of-the-art AI.',
        },
        {
            icon: EditIcon,
            title: 'Advanced Editing Tools',
            description: 'Refine, upscale, and modify your creations with a powerful suite of intuitive editing features.',
        },
        {
            icon: GalleryIcon,
            title: 'Personal Gallery',
            description: 'Save, organize, and manage your projects in a secure, private gallery built for creators.',
        },
    ];

    const navLinks = (
        <>
            <a href="#" className="hover:text-brand-yellow transition-colors block py-2 md:py-0">Features</a>
            <a href="#" className="hover:text-brand-yellow transition-colors block py-2 md:py-0">Gallery</a>
            <a href="#" className="hover:text-brand-yellow transition-colors block py-2 md:py-0">Pricing</a>
        </>
    );

    return (
        <div className="bg-brand-dark min-h-screen text-white font-sans">
            <header className="container mx-auto px-6 py-4 flex justify-between items-center relative">
                <div className="flex items-center space-x-2">
                    <LogoIcon className="h-8 w-8 text-brand-yellow" />
                    <span className="text-xl font-bold">Nano Banana Studio</span>
                </div>
                <nav className="hidden md:flex items-center space-x-8">
                    {navLinks}
                </nav>
                <div className="flex items-center">
                    <button onClick={() => navigate('/login')} className="bg-brand-yellow text-brand-dark font-bold py-2 px-6 rounded-lg hover:opacity-90 transition-opacity hidden sm:block">Launch App</button>
                    <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden ml-4 z-20">
                        {isMenuOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
                    </button>
                </div>
                {isMenuOpen && (
                    <div className="absolute top-full left-0 w-full bg-brand-gray-dark md:hidden z-10 p-6 flex flex-col items-center space-y-4">
                        {navLinks}
                        <button onClick={() => navigate('/login')} className="bg-brand-yellow text-brand-dark font-bold py-2 px-6 rounded-lg hover:opacity-90 transition-opacity w-full mt-4">Launch App</button>
                    </div>
                )}
            </header>

            <main className="container mx-auto px-6">
                <section className="text-center py-20 md:py-32">
                    <div className="relative max-w-4xl mx-auto p-6 sm:p-10 bg-brand-gray-dark rounded-2xl shadow-2xl overflow-hidden">
                        <div className="absolute -top-20 -left-20 w-64 h-64 bg-purple-600/20 rounded-full filter blur-3xl"></div>
                        <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-blue-600/20 rounded-full filter blur-3xl"></div>
                        <div className="relative">
                            <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold mb-4 leading-tight">Bring Your Imagination to Life, <br /><span className="bg-gradient-to-r from-purple-400 to-blue-400 text-transparent bg-clip-text">Instantly</span></h1>
                            <p className="text-base sm:text-lg md:text-xl text-brand-text max-w-2xl mx-auto mb-8">The ultimate AI suite for generating and editing breathtaking visual content.</p>
                            <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
                                <button onClick={() => navigate('/app/generate')} className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-blue-500 text-white font-bold py-3 px-8 rounded-lg hover:opacity-90 transition-transform hover:scale-105">Start Generating for Free</button>
                                <button className="w-full sm:w-auto bg-brand-gray-light text-white font-bold py-3 px-8 rounded-lg hover:bg-brand-gray transition-colors">See Examples</button>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="py-16">
                    <h3 className="text-center text-sm font-semibold tracking-widest text-brand-text uppercase mb-8">Creations Powered by Nano Banana</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4">
                        {creations.map((src, index) => (
                            <div key={index} className="aspect-square rounded-lg sm:rounded-2xl overflow-hidden transition-transform hover:scale-105 duration-300">
                                <img src={src} alt={`creation ${index + 1}`} className="w-full h-full object-cover" />
                            </div>
                        ))}
                    </div>
                </section>

                <section className="py-20 md:py-32 text-center">
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">A Powerful Suite of AI Tools</h2>
                    <p className="text-base sm:text-lg text-brand-text max-w-3xl mx-auto mb-12">From initial concept to final touches, Nano Banana Studio provides everything you need to create stunning visuals.</p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <div key={index} className="bg-brand-gray-dark p-8 rounded-2xl text-left border border-transparent hover:border-brand-yellow transition-all duration-300 transform hover:-translate-y-2">
                                <feature.icon className="h-10 w-10 text-brand-yellow mb-4" />
                                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                                <p className="text-brand-text">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </section>
            </main>

            <footer className="container mx-auto px-6 py-8 border-t border-brand-gray flex flex-col md:flex-row justify-between items-center text-sm text-brand-text">
                <p className='text-center md:text-left'>&copy; 2024 Nano Banana Studio. All rights reserved.</p>
                <div className="flex items-center space-x-6 mt-4 md:mt-0">
                    <a href="#" className="hover:text-white">Terms of Service</a>
                    <a href="#" className="hover:text-white">Privacy Policy</a>
                    <a href="#" className="hover:text-white">Contact</a>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;