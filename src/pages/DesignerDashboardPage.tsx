import Layout from '@/components/layout/Layout';
import { EarningsCard } from '@/components/designer/EarningsCard';
import { DesignSubmissionForm } from '@/components/designer/DesignSubmissionForm';
import { DesignsList } from '@/components/designer/DesignsList';
import { SalesTable } from '@/components/designer/SalesTable';
import { EarningsChart } from '@/components/designer/EarningsChart';
import { NotificationsList } from '@/components/designer/NotificationsList';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
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
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16 border-2 border-primary/20">
                <AvatarImage src={currentDesigner.avatar} alt={currentDesigner.name} />
                <AvatarFallback className="text-lg bg-primary/10 text-primary">
                  {currentDesigner.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-bold text-foreground">
                    Welcome back, {currentDesigner.name.split(' ')[0]}
                  </h1>
                  {currentDesigner.featured && (
                    <Badge className="bg-accent text-accent-foreground">
                      Featured Designer
                    </Badge>
                  )}
                </div>
                <p className="text-muted-foreground">
                  Manage your designs, track sales, and view your earnings.
                </p>
              </div>
            </div>
            <DesignSubmissionForm />
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
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="bg-muted/50 p-1">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="designs">My Designs</TabsTrigger>
              <TabsTrigger value="sales">Sales History</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
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
          </Tabs>
        </div>
      </div>
    </Layout>
  );
}
