import React, { useState, useCallback, useRef, useEffect } from 'react';
import * as api from '../api';
import { AspectRatio } from '../types';
import { GenerateIcon } from '../components/icons';

const stylePresets = ["Photorealistic", "Anime", "3D Render", "Cinematic", "Fantasy", "Vector"];
const aspectRatios: { label: string; value: AspectRatio }[] = [
    { label: "1:1 (Square)", value: "1:1" },
    { label: "16:9 (Landscape)", value: "16:9" },
    { label: "9:16 (Portrait)", value: "9:16" },
    { label: "4:3 (Standard)", value: "4:3" },
    { label: "3:4 (Tall)", value: "3:4" },
];

type SlotStatus = 'idle' | 'loading' | 'completed' | 'failed';
interface ImageSlot {
    status: SlotStatus;
    imageUrl?: string;
    jobId?: string;
    error?: string;
}

const GeneratePage: React.FC = () => {
    const [prompt, setPrompt] = useState('');
    const [selectedStyle, setSelectedStyle] = useState('Photorealistic');
    const [aspectRatio, setAspectRatio] = useState<AspectRatio>('1:1');
    const [imageSlots, setImageSlots] = useState<ImageSlot[]>(Array(4).fill({ status: 'idle' }));
    const [isGenerating, setIsGenerating] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const pollers = useRef<Record<string, number>>({});

    const startPolling = useCallback((jobId: string, slotIndex: number) => {
        pollers.current[jobId] = window.setInterval(async () => {
            try {
                const job = await api.getJob(jobId);
                if (job.status === 'completed' && job.output_asset_id) {
                    const asset = await api.getAsset(job.output_asset_id);
                    setImageSlots(prev => {
                        const newSlots = [...prev];
                        newSlots[slotIndex] = { status: 'completed', imageUrl: asset.url, jobId };
                        return newSlots;
                    });
                    clearInterval(pollers.current[jobId]);
                    delete pollers.current[jobId];
                } else if (job.status === 'failed') {
                    setImageSlots(prev => {
                        const newSlots = [...prev];
                        newSlots[slotIndex] = { status: 'failed', error: job.error || 'Generation failed.', jobId };
                        return newSlots;
                    });
                    clearInterval(pollers.current[jobId]);
                    delete pollers.current[jobId];
                }
            } catch (err) {
                console.error(`Polling failed for job ${jobId}`, err);
                setImageSlots(prev => {
                    const newSlots = [...prev];
                    newSlots[slotIndex] = { status: 'failed', error: 'Could not fetch job status.', jobId };
                    return newSlots;
                });
                clearInterval(pollers.current[jobId]);
                delete pollers.current[jobId];
            }
        }, 3000);
    }, []);

    useEffect(() => {
        const isStillPolling = Object.keys(pollers.current).length > 0;
        if (!isStillPolling) {
            setIsGenerating(false);
        }
    }, [imageSlots]);

    useEffect(() => {
        return () => {
            Object.values(pollers.current).forEach(clearInterval);
        };
    }, []);

    const handleGenerate = useCallback(async () => {
        if (!prompt) {
            setError('Please enter a prompt.');
            return;
        }
        setIsGenerating(true);
        setError(null);
        setImageSlots(Array(4).fill({ status: 'loading' }));

        try {
            const fullPrompt = `${prompt}, ${selectedStyle} style.`;
            const jobPromises = Array(4).fill(0).map(() => 
                api.createGenerationJob({ prompt: fullPrompt, params: { aspectRatio } })
            );
            
            const jobs = await Promise.all(jobPromises);
            
            const newSlots = jobs.map(job => ({
                status: 'loading' as const,
                jobId: job.id
            }));
            setImageSlots(newSlots);

            jobs.forEach((job, index) => {
                startPolling(job.id, index);
            });

        } catch (e) {
            console.error(e);
            setError(e instanceof Error ? e.message : 'Failed to start generation jobs.');
            setImageSlots(Array(4).fill({ status: 'failed', error: 'Request failed' }));
            setIsGenerating(false);
        }
    }, [prompt, selectedStyle, aspectRatio, startPolling]);

    return (
        <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl sm:text-4xl font-bold mb-8 text-white">Create Anything</h1>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1 bg-brand-gray-dark p-6 rounded-2xl flex flex-col space-y-6 self-start">
                    <div>
                        <label className="block text-sm font-semibold mb-2 text-brand-text">PROMPT</label>
                        <textarea
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            placeholder="Describe your dream image..."
                            className="w-full h-32 bg-brand-gray p-3 rounded-lg border border-brand-gray-light focus:outline-none focus:ring-2 focus:ring-brand-yellow resize-none"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold mb-2 text-brand-text">STYLE PRESETS</label>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                            {stylePresets.map(style => (
                                <button key={style} onClick={() => setSelectedStyle(style)} className={`px-4 py-2 text-sm rounded-lg transition-colors ${selectedStyle === style ? 'bg-brand-yellow text-brand-dark font-bold' : 'bg-brand-gray text-white hover:bg-brand-gray-light'}`}>
                                    {style}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold mb-2 text-brand-text">ADVANCED SETTINGS</label>
                        <div className="relative">
                            <select value={aspectRatio} onChange={(e) => setAspectRatio(e.target.value as AspectRatio)} className="w-full appearance-none bg-brand-gray p-3 rounded-lg border border-brand-gray-light focus:outline-none focus:ring-2 focus:ring-brand-yellow">
                                {aspectRatios.map(ar => <option key={ar.value} value={ar.value}>{ar.label}</option>)}
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-white">
                                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                            </div>
                        </div>
                    </div>

                    <button onClick={handleGenerate} disabled={isGenerating} className="w-full flex items-center justify-center bg-brand-yellow text-brand-dark font-bold py-4 px-6 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed text-lg">
                        <GenerateIcon className="h-6 w-6 mr-2" />
                        {isGenerating ? 'Generating...' : 'Generate'}
                    </button>
                    {error && <p className="text-red-500 text-sm mt-2 text-center">{error}</p>}
                </div>

                <div className="lg:col-span-2">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {imageSlots.map((slot, index) => (
                            <div key={index} className="aspect-square bg-brand-gray-dark rounded-2xl flex items-center justify-center overflow-hidden p-2">
                                {slot.status === 'loading' && <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-brand-yellow"></div>}
                                {slot.status === 'completed' && slot.imageUrl && <img src={slot.imageUrl} alt={`Generated image ${index + 1}`} className="w-full h-full object-cover rounded-lg" />}
                                {slot.status === 'failed' && <div className="text-center text-red-400">
                                    <p className="font-bold">Generation Failed</p>
                                    <p className="text-xs">{slot.error}</p>
                                </div>}
                                {slot.status === 'idle' && <p className="text-brand-text text-center">Your creation will appear here</p>}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GeneratePage;
