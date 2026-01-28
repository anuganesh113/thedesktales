import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp, TrendingDown, DollarSign, Clock, Wallet, Package } from 'lucide-react';
import { cn } from '@/lib/utils';

interface EarningsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: 'earnings' | 'pending' | 'payout' | 'sales';
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

const iconMap = {
  earnings: DollarSign,
  pending: Clock,
  payout: Wallet,
  sales: Package,
};

const iconBgMap = {
  earnings: 'bg-accent/20 text-accent',
  pending: 'bg-brand-yellow/20 text-brand-yellow',
  payout: 'bg-green-500/20 text-green-500',
  sales: 'bg-primary/20 text-primary',
};

export function EarningsCard({ title, value, subtitle, icon, trend }: EarningsCardProps) {
  const Icon = iconMap[icon];

  return (
    <Card className="border-border/50 bg-card/80 backdrop-blur-sm">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold text-foreground">
              {typeof value === 'number' ? `Rs. ${value.toLocaleString('en-US', { minimumFractionDigits: 2 })}` : value}
            </p>
            {subtitle && (
              <p className="text-xs text-muted-foreground">{subtitle}</p>
            )}
            {trend && (
              <div className={cn(
                'flex items-center gap-1 text-xs font-medium',
                trend.isPositive ? 'text-green-500' : 'text-red-500'
              )}>
                {trend.isPositive ? (
                  <TrendingUp className="h-3 w-3" />
                ) : (
                  <TrendingDown className="h-3 w-3" />
                )}
                <span>{trend.isPositive ? '+' : ''}{trend.value}% vs last month</span>
              </div>
            )}
          </div>
          <div className={cn('rounded-xl p-3', iconBgMap[icon])}>
            <Icon className="h-5 w-5" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
