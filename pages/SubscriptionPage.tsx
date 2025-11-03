import React, { useState, useEffect } from 'react';
import { Plan } from '../types';
import * as api from '../api';

const PlanCard = ({ plan }: { plan: Plan }) => (
    <div className={`bg-brand-gray-dark p-6 sm:p-8 rounded-2xl border ${plan.popular ? 'border-brand-yellow' : 'border-brand-gray'} flex flex-col`}>
        {plan.popular && <span className="text-xs font-bold bg-brand-yellow text-brand-dark py-1 px-3 rounded-full self-start mb-4">POPULAR</span>}
        <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
        <p className="text-brand-text mb-4 flex-grow">{plan.description}</p>
        <p className="text-4xl font-bold mb-6"><span className="text-5xl">${plan.price}</span>/month</p>
        <button className={`w-full py-3 rounded-lg font-bold transition-colors ${plan.current ? 'bg-brand-gray-light text-white cursor-not-allowed' : plan.popular ? 'bg-brand-yellow text-brand-dark hover:opacity-90' : 'bg-brand-gray text-white hover:bg-brand-gray-light'}`}>
            {plan.current ? 'Current Plan' : 'Upgrade'}
        </button>
        <ul className="mt-8 space-y-3 text-brand-text">
            {plan.features.map((feature, index) => (
                <li key={index} className="flex items-center">
                    {feature.included ? (
                        <svg className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                    ) : (
                        <svg className="w-5 h-5 text-red-400 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    )}
                    <span>{feature.text}</span>
                </li>
            ))}
        </ul>
    </div>
);


const SubscriptionPage: React.FC = () => {
    const [plans, setPlans] = useState<Plan[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPlans = async () => {
            setLoading(true);
            setError(null);
            try {
                const fetchedPlans = await api.getPlans();
                setPlans(fetchedPlans);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to load plans.');
            } finally {
                setLoading(false);
            }
        };
        fetchPlans();
    }, []);

    return (
        <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
                <h1 className="text-3xl sm:text-5xl font-bold mb-4">Choose Your Plan</h1>
                <p className="text-brand-text max-w-2xl mx-auto">
                    Select the plan that best fits your creative needs. Upgrade, downgrade, or cancel anytime.
                </p>
            </div>
            
            {loading ? (
                <div className="flex justify-center items-center py-20">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-brand-yellow"></div>
                    <p className="ml-4 text-lg">Loading plans...</p>
                </div>
            ) : error ? (
                 <div className="text-center py-20 text-red-400">
                    <p className="font-bold">Error Loading Plans</p>
                    <p>{error}</p>
                </div>
            ) : plans.length === 0 ? (
                 <div className="text-center py-20 text-brand-text">
                    <p className="font-bold text-xl">No plans available</p>
                    <p>Please check back later.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
                    {plans.map(plan => (
                        <PlanCard key={plan.id} plan={plan} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default SubscriptionPage;
