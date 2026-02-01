import React from 'react';
import Layout from '@/components/layout/Layout';
import { FileText, CheckCircle, XCircle } from 'lucide-react';

const TermsOfService: React.FC = () => {
    return (
        <Layout>
            <div className="min-h-screen bg-gray-50 py-12 md:py-24">
                <div className="container max-w-4xl mx-auto px-4">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12">

                        <div className="flex items-center gap-4 mb-8">
                            <div className="p-3 bg-orange-100 rounded-xl">
                                <FileText className="w-8 h-8 text-orange-600" />
                            </div>
                            <h1 className="text-3xl md:text-4xl font-bold font-display text-gray-900">
                                Terms of Service for Designers
                            </h1>
                        </div>

                        <div className="prose prose-lg text-gray-600 max-w-none space-y-8">
                            <p className="lead text-xl text-gray-500">
                                By uploading designs to The Desk Tales, you agree to the following terms. We are a platform provider, and you retain ownership of your work while granting us the license to sell it.
                            </p>

                            <section>
                                <h2 className="text-xl font-bold text-gray-900 mb-4">1. Content Ownership & Rights</h2>
                                <div className="flex gap-4 p-4 rounded-lg bg-green-50 border border-green-100">
                                    <CheckCircle className="w-6 h-6 text-green-600 shrink-0" />
                                    <div>
                                        <h3 className="font-bold text-green-900 text-base mb-1">You Own Your Art</h3>
                                        <p className="text-sm text-green-800 m-0">
                                            You retain full copyright and intellectual property rights to any original work you upload. You are simply granting The Desk Tales a non-exclusive, worldwide license to display, reproduce, and sell your designs on our products.
                                        </p>
                                    </div>
                                </div>
                            </section>

                            <section>
                                <h2 className="text-xl font-bold text-gray-900 mb-4">2. Prohibited Content</h2>
                                <div className="flex gap-4 p-4 rounded-lg bg-red-50 border border-red-100">
                                    <XCircle className="w-6 h-6 text-red-600 shrink-0" />
                                    <div>
                                        <h3 className="font-bold text-red-900 text-base mb-1">Zero Tolerance Policy</h3>
                                        <p className="text-sm text-red-800 m-0">
                                            We strictly prohibit the upload of:
                                        </p>
                                        <ul className="list-disc pl-5 mt-2 space-y-1 text-sm text-red-800">
                                            <li>Copyrighted material you do not own (e.g., fan art without license, official logos).</li>
                                            <li>AI-generated art that infringes on specific artist styles or trademarks.</li>
                                            <li>Hate speech, violence, or sexually explicit content.</li>
                                        </ul>
                                    </div>
                                </div>
                            </section>

                            <section>
                                <h2 className="text-xl font-bold text-gray-900 mb-4">3. Indemnification</h2>
                                <p>
                                    You agree to indemnify and hold harmless The Desk Tales, its affiliates, and employees from any claims, damages, or expenses arising out of your breach of these terms or violation of any third-party rights (including copyright).
                                </p>
                            </section>

                            <section>
                                <h2 className="text-xl font-bold text-gray-900 mb-4">4. Commission & Payments</h2>
                                <p>
                                    Commissions are paid out monthly for earnings exceeding Rs. 1,000. We reserve the right to withhold payment if we receive a valid copyright infringement notice regarding your designs.
                                </p>
                            </section>

                        </div>

                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default TermsOfService;
