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
    <div className="relative group">
      <div className="absolute -inset-0.5 bg-gradient-to-br from-brand-orange/20 to-purple-500/0 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <Card className="relative h-full border-border/40 bg-card/50 backdrop-blur-xl hover:bg-card/80 transition-all duration-300">
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className={cn('rounded-xl p-3 ring-1 ring-inset ring-white/10 shadow-sm transition-transform duration-300 group-hover:scale-110', iconBgMap[icon])}>
              <Icon className="h-5 w-5" />
            </div>
            {trend && (
              <div className={cn(
                'flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full bg-white/50 backdrop-blur-sm',
                trend.isPositive ? 'text-green-600' : 'text-red-600'
              )}>
                {trend.isPositive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                <span>{trend.value}%</span>
              </div>
            )}
          </div>

          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider text-[10px]">{title}</p>
            <p className="text-2xl lg:text-3xl font-black tracking-tight text-foreground group-hover:text-brand-orange transition-colors duration-300">
              {typeof value === 'number' ? `Rs. ${value.toLocaleString('en-US', { minimumFractionDigits: 2 })}` : value}
            </p>
            {subtitle && (
              <p className="text-xs text-muted-foreground font-medium pt-1">{subtitle}</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
