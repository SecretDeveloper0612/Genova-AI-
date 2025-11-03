import React, { useState, useEffect } from 'react';
import * as api from '../api';
import { GalleryItem } from '../types';

const GalleryPage: React.FC = () => {
    const [items, setItems] = useState<GalleryItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchGallery = async () => {
            setLoading(true);
            setError(null);
            try {
                const galleryItems = await api.getGallery();
                setItems(galleryItems);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to load gallery.');
            } finally {
                setLoading(false);
            }
        };
        fetchGallery();
    }, []);

    return (
        <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl sm:text-4xl font-bold mb-2 text-white">My Gallery</h1>
            <p className="text-brand-text mb-8">Browse and manage your creations.</p>

            <div className="flex flex-col sm:flex-row items-center gap-4 mb-8">
                <input
                    type="search"
                    placeholder="Search your creations..."
                    className="w-full sm:flex-grow bg-brand-gray p-3 rounded-lg border border-brand-gray-light focus:outline-none focus:ring-2 focus:ring-brand-yellow"
                />
                <button className="w-full sm:w-auto bg-brand-yellow text-brand-dark font-bold py-3 px-6 rounded-lg hover:opacity-90 transition-opacity">
                    Create New
                </button>
            </div>

            {loading ? (
                <div className="flex justify-center items-center py-20">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-brand-yellow"></div>
                    <p className="ml-4 text-lg">Loading creations...</p>
                </div>
            ) : error ? (
                 <div className="text-center py-20 text-red-400">
                    <p className="font-bold">Error Loading Gallery</p>
                    <p>{error}</p>
                </div>
            ) : items.length === 0 ? (
                <div className="text-center py-20 text-brand-text">
                    <p className="font-bold text-xl">Your gallery is empty</p>
                    <p>Start creating images to see them here.</p>
                </div>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {items.map((item) => (
                        <div key={item.id} className="group relative aspect-square rounded-2xl overflow-hidden cursor-pointer">
                            <img src={item.asset.url} alt={item.title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-4">
                               <p className="text-white font-semibold text-sm truncate">{item.title}</p>
                                <button className="text-white bg-white/20 backdrop-blur-sm p-2 rounded-full hover:bg-white/30">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default GalleryPage;
