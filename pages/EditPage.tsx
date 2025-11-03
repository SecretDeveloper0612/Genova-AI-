import React, { useState, useCallback, useRef, useEffect } from 'react';
import * as api from '../api';
import ImageComparisonSlider from '../components/ImageComparisonSlider';

const EditPage: React.FC = () => {
    const [originalImage, setOriginalImage] = useState<string | null>(null);
    const [originalImageFile, setOriginalImageFile] = useState<File | null>(null);
    const [editedImage, setEditedImage] = useState<string | null>(null);
    const [editPrompt, setEditPrompt] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [jobId, setJobId] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const poller = useRef<number | null>(null);

    const cleanupPoller = () => {
        if (poller.current) {
            clearInterval(poller.current);
            poller.current = null;
        }
    };

    useEffect(() => {
        return cleanupPoller;
    }, []);

    const startPolling = useCallback((currentJobId: string) => {
        cleanupPoller();
        poller.current = window.setInterval(async () => {
            try {
                const job = await api.getJob(currentJobId);
                if (job.status === 'completed' && job.output_asset_id) {
                    const asset = await api.getAsset(job.output_asset_id);
                    setEditedImage(asset.url);
                    setIsLoading(false);
                    cleanupPoller();
                } else if (job.status === 'failed') {
                    setError(job.error || 'Editing failed.');
                    setIsLoading(false);
                    cleanupPoller();
                }
            } catch (err) {
                console.error(`Polling failed for job ${currentJobId}`, err);
                setError('Could not fetch job status.');
                setIsLoading(false);
                cleanupPoller();
            }
        }, 3000);
    }, []);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setOriginalImageFile(file);
            setOriginalImage(URL.createObjectURL(file));
            setEditedImage(null);
            setError(null);
            setJobId(null);
        }
    };
    
    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => e.preventDefault();
    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const file = e.dataTransfer.files?.[0];
        if (file) {
            setOriginalImageFile(file);
            setOriginalImage(URL.createObjectURL(file));
            setEditedImage(null);
            setError(null);
            setJobId(null);
        }
    };

    const handleApplyEdit = useCallback(async () => {
        if (!originalImageFile || !editPrompt) {
            setError('Please upload an image and provide an edit prompt.');
            return;
        }
        setIsLoading(true);
        setError(null);
        setEditedImage(null);

        try {
            const { asset_id } = await api.uploadAsset(originalImageFile);
            const job = await api.createEditJob({ 
                input_asset_id: asset_id, 
                edit_type: 'prompt_edit', 
                params: { prompt: editPrompt } 
            });
            setJobId(job.id);
            startPolling(job.id);
        } catch (e) {
            console.error(e);
            setError(e instanceof Error ? e.message : 'Failed to start edit job.');
            setIsLoading(false);
        }
    }, [originalImageFile, editPrompt, startPolling]);

    return (
        <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl sm:text-4xl font-bold mb-2 text-white">AI Image Editor</h1>
            <p className="text-brand-text mb-8">Upload an image and describe the changes you want to see.</p>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                <div className="flex flex-col gap-8">
                    <div className="w-full aspect-video bg-brand-gray-dark border-2 border-dashed border-brand-gray-light rounded-2xl flex flex-col items-center justify-center p-4 text-center" onDragOver={handleDragOver} onDrop={handleDrop}>
                        {originalImage ? <img src={originalImage} alt="Original" className="max-h-full max-w-full rounded-lg" /> : <>
                                <p className="font-semibold mb-2">Drag & Drop an image here or click to upload</p>
                                <p className="text-sm text-brand-text mb-4">Supported file types: JPG, PNG, WEBP. Max size 10MB.</p>
                                <button onClick={() => fileInputRef.current?.click()} className="bg-brand-gray-light py-2 px-4 rounded-lg hover:bg-brand-gray transition-colors">Upload Image</button>
                                <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/jpeg,image/png,image/webp" />
                            </>}
                    </div>
                    <div className="w-full">
                        <label className="block text-sm font-semibold mb-2 text-brand-text">WHAT WOULD YOU LIKE TO CHANGE?</label>
                        <textarea value={editPrompt} onChange={(e) => setEditPrompt(e.target.value)} placeholder="e.g., turn this into a watercolor painting" className="w-full h-24 bg-brand-gray p-3 rounded-lg border border-brand-gray-light focus:outline-none focus:ring-2 focus:ring-brand-yellow resize-none"/>
                    </div>
                    <button onClick={handleApplyEdit} disabled={isLoading || !originalImageFile || !editPrompt} className="w-full bg-brand-yellow text-brand-dark font-bold py-4 rounded-lg text-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed">
                        {isLoading ? 'Applying Edit...' : 'Apply Edit'}
                    </button>
                    {error && <p className="text-red-500 text-sm mt-2 text-center">{error}</p>}
                </div>
                
                <div className="flex flex-col gap-4">
                    <p className="font-bold text-xl">Result</p>
                     <div className="w-full aspect-square bg-brand-gray-dark rounded-2xl flex items-center justify-center">
                        {isLoading && <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-brand-yellow"></div>}
                        {!isLoading && originalImage && editedImage && <ImageComparisonSlider before={originalImage} after={editedImage} />}
                        {!isLoading && !editedImage && <p className="text-brand-text">Your edited image will appear here</p>}
                     </div>
                     {editedImage && !isLoading && (
                        <div className="flex items-center justify-center space-x-2 sm:space-x-4">
                            <a href={editedImage} download="edited-image.png" className="bg-brand-gray-light py-2 px-4 rounded-lg hover:bg-brand-gray transition-colors text-sm sm:text-base">Download</a>
                            <button className="bg-brand-gray-light py-2 px-4 rounded-lg hover:bg-brand-gray transition-colors text-sm sm:text-base">Save to Gallery</button>
                            <button onClick={handleApplyEdit} className="bg-brand-gray-light py-2 px-4 rounded-lg hover:bg-brand-gray transition-colors text-sm sm:text-base">Try Again</button>
                        </div>
                     )}
                </div>
            </div>
        </div>
    );
};

export default EditPage;
