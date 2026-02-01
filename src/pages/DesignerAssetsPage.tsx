import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { AssetUploader } from '@/components/designer/AssetUploader';
import { MockupGenerator } from '@/components/designer/MockupGenerator';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const DesignerAssetsPage: React.FC = () => {
    const [activeFile, setActiveFile] = useState<File | null>(null);

    return (
        <Layout>
            <div className="min-h-screen bg-background">
                <div className="container mx-auto px-4 py-8 max-w-5xl">

                    <div className="mb-6">
                        <Button variant="ghost" asChild className="pl-0 hover:pl-2 transition-all">
                            <Link to="/designer">
                                <ChevronLeft className="mr-2 h-4 w-4" />
                                Back to Dashboard
                            </Link>
                        </Button>
                    </div>

                    <div className="mb-10">
                        <h1 className="text-3xl font-black font-display tracking-tight mb-2">Asset Studio</h1>
                        <p className="text-muted-foreground">
                            Upload your high-resolution artwork and let our engine create the products.
                        </p>
                    </div>

                    <div className="bg-white rounded-3xl p-6 md:p-10 border border-gray-100 shadow-xl shadow-gray-100/50">
                        {!activeFile ? (
                            <AssetUploader onUploadComplete={setActiveFile} />
                        ) : (
                            <MockupGenerator
                                originalFile={activeFile}
                                onReset={() => setActiveFile(null)}
                            />
                        )}
                    </div>

                </div>
            </div>
        </Layout>
    );
};

export default DesignerAssetsPage;
