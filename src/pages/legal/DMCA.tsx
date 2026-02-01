import React from 'react';
import Layout from '@/components/layout/Layout';
import { Shield, Mail, AlertTriangle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useState } from 'react';

const DMCA: React.FC = () => {
    const [showWarning, setShowWarning] = useState(true);
    return (
        <Layout>
            <div className="min-h-screen bg-gray-50 py-12 md:py-24">
                <div className="container max-w-4xl mx-auto px-4">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12">

                        <div className="flex items-center gap-4 mb-8">
                            <div className="p-3 bg-red-100 rounded-xl">
                                <Shield className="w-8 h-8 text-red-600" />
                            </div>
                            <h1 className="text-3xl md:text-4xl font-bold font-display text-gray-900">
                                DMCA & Copyright Policy
                            </h1>
                        </div>

                        <div className="prose prose-lg text-gray-600 max-w-none space-y-8">
                            <section>
                                <h2 className="text-xl font-bold text-gray-900 mb-4">The "Safe Harbor" Statement</h2>
                                <p>
                                    The Desk Tales respects the intellectual property rights of others and expects its users to do the same.
                                    In accordance with the Digital Millennium Copyright Act of 1998 ("DMCA"), the text of which may be found on the
                                    U.S. Copyright Office website at <a href="http://www.copyright.gov/legislation/dmca.pdf" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">http://www.copyright.gov/legislation/dmca.pdf</a>,
                                    The Desk Tales will respond expeditiously to notices of alleged copyright infringement that are reported to
                                    The Desk Tales' Designated Copyright Agent, identified in the sample notice below.
                                </p>
                            </section>

                            <section className="bg-blue-50 p-6 rounded-xl border border-blue-100">
                                <h3 className="text-lg font-bold text-blue-900 mb-3 flex items-center gap-2">
                                    <Mail className="w-5 h-5" />
                                    How to File a Takedown Notice
                                </h3>
                                <p className="mb-4 text-sm">
                                    If you are a copyright owner, authorized to act on behalf of one, or authorized to act under any exclusive right under copyright,
                                    please report alleged copyright infringements taking place on or through the Site by completing the following DMCA Notice of
                                    Alleged Infringement and delivering it to The Desk Tales' Designated Copyright Agent.
                                </p>
                                <ul className="list-disc pl-5 space-y-2 text-sm text-blue-800">
                                    <li>Identify the copyrighted work that you claim has been infringed.</li>
                                    <li>Identify the material or link you claim is infringing (URLs are best).</li>
                                    <li>Provide your company affiliation (if applicable), mailing address, telephone number, and, if available, email address.</li>
                                    <li>Include a statement that you have a good faith belief that use of the material in the manner complained of is not authorized by the copyright owner, its agent, or the law.</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-xl font-bold text-gray-900 mb-4">Counter-Notice Procedure</h2>
                                <p>
                                    If you believe that your material that was removed (or to which access was disabled) is not infringing, or that you have the authorization
                                    from the copyright owner, the copyright owner's agent, or pursuant to the law, to post and use the material in your content,
                                    you may send a counter-notice containing the following information to the Copyright Agent.
                                </p>
                            </section>

                            {showWarning && (
                                <Alert variant="destructive" className="bg-yellow-50 border-yellow-100 text-yellow-800" onClose={() => setShowWarning(false)}>
                                    <AlertTriangle className="h-4 w-4 text-yellow-600" />
                                    <AlertTitle className="text-sm font-bold">Legal Warning</AlertTitle>
                                    <AlertDescription>
                                        Making false claims of copyright infringement can result in legal liability.
                                        Please consult with legal counsel if you are unsure whether material infringes your copyright.
                                    </AlertDescription>
                                </Alert>
                            )}

                            <div className="pt-8 border-t border-gray-100">
                                <p className="text-sm text-gray-500">
                                    Send notices to our Designated Agent at:<br />
                                    <span className="font-semibold text-gray-900">legal@thedesktales.com</span>
                                </p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default DMCA;
