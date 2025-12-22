import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Privacy Policy - ResearchScoutAI',
    description: 'How we handle data and privacy at ResearchScoutAI.',
};

export default function PrivacyPage() {
    return (
        <main className="min-h-screen premium-bg grid-pattern text-slate-200 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto bg-slate-900/50 backdrop-blur-md rounded-2xl p-8 border border-white/10 shadow-2xl">
                <h1 className="text-3xl font-display font-bold text-white mb-8">Privacy Policy</h1>

                <div className="space-y-6 text-sm sm:text-base leading-relaxed">
                    <section>
                        <h2 className="text-xl font-semibold text-white mb-3">1. Data Collection</h2>
                        <p>We collect information you voluntarily provide to us when you register or use our services. We also aggregate public web data for research purposes.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-white mb-3">2. AI Processing of Public Data</h2>
                        <p>
                            Our AI engine analyzes publicly available information (such as company websites, blog posts, and news articles) to generate personalized insights.
                            We do not access private accounts or confidential data.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-white mb-3">3. Data Usage</h2>
                        <p>We use the collected data to:</p>
                        <ul className="list-disc pl-5 space-y-2 mt-2">
                            <li>Provide and maintain our service.</li>
                            <li>Improve our AI models.</li>
                            <li>Process payments (via third-party providers like PayPal).</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-white mb-3">4. Cookies</h2>
                        <p>We use essential cookies to maintain your session and preferences. We do not use third-party tracking cookies for advertising.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-white mb-3">5. Contact</h2>
                        <p>If you have any questions about this Privacy Policy, please contact us.</p>
                    </section>
                </div>
                <div className="mt-12 pt-8 border-t border-white/10 text-center">
                    <a href="/" className="text-violet-400 hover:text-violet-300 transition-colors">← Back to Dashboard</a>
                </div>
            </div>
        </main>
    );
}
