import Layout from '@/components/layout/Layout';
import { EarningsCard } from '@/components/designer/EarningsCard';
import { DesignSubmissionForm } from '@/components/designer/DesignSubmissionForm';
import { DesignsList } from '@/components/designer/DesignsList';
import { SalesTable } from '@/components/designer/SalesTable';
import { EarningsChart } from '@/components/designer/EarningsChart';
import { NotificationsList } from '@/components/designer/NotificationsList';
import { DesignerSettingsForm } from '@/components/designer/DesignerSettingsForm';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import {
  mockDesignSubmissions,
  mockSalesRecords,
  mockEarningsSummary,
  mockNotifications,
  monthlyEarningsData,
} from '@/data/designerMockData';
import { designers } from '@/data/mockData';
import { Palette, TrendingUp, Clock } from 'lucide-react';

export default function DesignerDashboardPage() {
  // Mock current designer - in production this would come from auth
  const currentDesigner = designers[0];
  const earnings = mockEarningsSummary;

  const thisMonthChange = earnings.lastMonth > 0
    ? ((earnings.thisMonth - earnings.lastMonth) / earnings.lastMonth) * 100
    : 0;

  return (
    <Layout>
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          {/* Header */}
          {/* Premium Header Section */}
          <div className="relative overflow-hidden rounded-3xl bg-[#111827] text-white p-8 md:p-12 mb-10 shadow-2xl shadow-gray-200">
            {/* Ambient Background */}
            <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-brand-orange/20 via-transparent to-transparent opacity-50" />
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-brand-orange/30 rounded-full blur-[100px]" />

            <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
              <div className="flex items-center gap-6">
                <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-brand-orange to-purple-500 rounded-full blur opacity-75" />
                  <Avatar className="h-24 w-24 border-4 border-[#111827] relative z-10">
                    <AvatarImage src={currentDesigner.avatar} alt={currentDesigner.name} />
                    <AvatarFallback className="text-2xl bg-gray-800 text-gray-400">
                      {currentDesigner.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  {currentDesigner.featured && (
                    <div className="absolute -bottom-2 -right-2 bg-brand-orange text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full border-4 border-[#111827] shadow-lg z-20">
                      Featured
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <h1 className="text-3xl md:text-4xl font-black font-display tracking-tight text-white">
                      Hello, {currentDesigner.name.split(' ')[0]}
                    </h1>
                  </div>
                  <p className="text-gray-400 text-lg max-w-md font-medium">
                    Your creative empire is growing. Here's what's happening with your studio today.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex gap-4">
                  <Button asChild className="gap-2 bg-brand-orange hover:bg-brand-orange/90 text-white border-0 shadow-lg shadow-brand-orange/20">
                    <Link to="/designer/assets">
                      <Plus className="h-4 w-4" />
                      New Asset Upload
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <EarningsCard
              title="Total Earnings"
              value={earnings.totalEarnings}
              subtitle={`${earnings.totalSales.toLocaleString()} total sales`}
              icon="earnings"
            />
            <EarningsCard
              title="This Month"
              value={earnings.thisMonth}
              icon="earnings"
              trend={{
                value: Math.abs(Math.round(thisMonthChange)),
                isPositive: thisMonthChange >= 0,
              }}
            />
            <EarningsCard
              title="Pending Payout"
              value={earnings.pendingPayout}
              subtitle="Next payout: Feb 1, 2024"
              icon="pending"
            />
            <EarningsCard
              title="Last Payout"
              value={earnings.lastPayout}
              subtitle={`Paid on ${new Date(earnings.lastPayoutDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`}
              icon="payout"
            />
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border/50">
              <div className="p-3 rounded-lg bg-primary/10">
                <Palette className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{earnings.approvedDesigns}</p>
                <p className="text-sm text-muted-foreground">Active Designs</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border/50">
              <div className="p-3 rounded-lg bg-accent/10">
                <TrendingUp className="h-5 w-5 text-accent" />
              </div>
              <div>
                <p className="text-2xl font-bold">{currentDesigner.commissionRate}%</p>
                <p className="text-sm text-muted-foreground">Commission Rate</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border/50">
              <div className="p-3 rounded-lg bg-brand-yellow/10">
                <Clock className="h-5 w-5 text-brand-yellow" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {mockDesignSubmissions.filter(d => d.status === 'pending').length}
                </p>
                <p className="text-sm text-muted-foreground">Pending Reviews</p>
              </div>
            </div>
          </div>

          {/* Main Content Tabs */}
          <Tabs defaultValue="overview" className="space-y-8">
            <div className="border-b border-border/40">
              <TabsList className="bg-transparent h-auto p-0 gap-8 justify-start w-full overflow-x-auto no-scrollbar">
                <TabsTrigger
                  value="overview"
                  className="rounded-none border-b-2 border-transparent px-0 py-3 font-medium text-muted-foreground data-[state=active]:border-brand-orange data-[state=active]:text-foreground data-[state=active]:shadow-none transition-all hover:text-foreground"
                >
                  Overview
                </TabsTrigger>
                <TabsTrigger
                  value="designs"
                  className="rounded-none border-b-2 border-transparent px-0 py-3 font-medium text-muted-foreground data-[state=active]:border-brand-orange data-[state=active]:text-foreground data-[state=active]:shadow-none transition-all hover:text-foreground"
                >
                  My Designs
                </TabsTrigger>
                <TabsTrigger
                  value="sales"
                  className="rounded-none border-b-2 border-transparent px-0 py-3 font-medium text-muted-foreground data-[state=active]:border-brand-orange data-[state=active]:text-foreground data-[state=active]:shadow-none transition-all hover:text-foreground"
                >
                  Sales History
                </TabsTrigger>
                <TabsTrigger
                  value="settings"
                  className="rounded-none border-b-2 border-transparent px-0 py-3 font-medium text-muted-foreground data-[state=active]:border-brand-orange data-[state=active]:text-foreground data-[state=active]:shadow-none transition-all hover:text-foreground"
                >
                  Settings
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="overview" className="space-y-6 animate-in slide-in-from-bottom-2 duration-500 fade-in">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <EarningsChart data={monthlyEarningsData} />
                </div>
                <div>
                  <NotificationsList notifications={mockNotifications} />
                </div>
              </div>
              <SalesTable sales={mockSalesRecords.slice(0, 5)} />
            </TabsContent>

            <TabsContent value="designs">
              <DesignsList designs={mockDesignSubmissions} />
            </TabsContent>

            <TabsContent value="sales">
              <SalesTable sales={mockSalesRecords} />
            </TabsContent>

            <TabsContent value="settings">
              <DesignerSettingsForm />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
}
