import { SaleRecord } from '@/data/designerMockData';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';

interface SalesTableProps {
  sales: SaleRecord[];
}

const statusConfig = {
  completed: {
    label: 'Completed',
    className: 'bg-green-500/10 text-green-500 border-green-500/20',
  },
  processing: {
    label: 'Processing',
    className: 'bg-brand-yellow/10 text-brand-yellow border-brand-yellow/20',
  },
  refunded: {
    label: 'Refunded',
    className: 'bg-red-500/10 text-red-500 border-red-500/20',
  },
};

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function formatCurrency(amount: number) {
  return `Rs. ${amount.toLocaleString()}`;
}

export function SalesTable({ sales }: SalesTableProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Recent Sales</CardTitle>
        <span className="text-sm text-muted-foreground">{sales.length} transactions</span>
      </CardHeader>
      <CardContent>
        {/* Desktop Table */}
        <div className="hidden md:block">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead className="text-center">Qty</TableHead>
                <TableHead className="text-right">Sale Price</TableHead>
                <TableHead className="text-right">Commission</TableHead>
                <TableHead className="text-center">Status</TableHead>
                <TableHead className="text-right">Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sales.map(sale => {
                const status = statusConfig[sale.status];
                return (
                  <TableRow key={sale.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-md bg-muted overflow-hidden flex-shrink-0">
                          <img
                            src={sale.productImage}
                            alt={sale.productName}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <span className="font-medium truncate max-w-[200px]">
                          {sale.productName}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">{sale.quantity}</TableCell>
                    <TableCell className="text-right">
                      {formatCurrency(sale.salePrice * sale.quantity)}
                    </TableCell>
                    <TableCell className="text-right font-semibold text-green-500">
                      {sale.status === 'refunded' ? (
                        <span className="text-red-500">-{formatCurrency(sale.commission)}</span>
                      ) : (
                        formatCurrency(sale.commission)
                      )}
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge variant="outline" className={cn('font-medium', status.className)}>
                        {status.label}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right text-muted-foreground">
                      {formatDate(sale.date)}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden divide-y divide-border">
          {sales.map(sale => {
            const status = statusConfig[sale.status];
            return (
              <div key={sale.id} className="py-4 first:pt-0 last:pb-0">
                <div className="flex items-start gap-3">
                  <div className="h-12 w-12 rounded-md bg-muted overflow-hidden flex-shrink-0">
                    <img
                      src={sale.productImage}
                      alt={sale.productName}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-medium truncate">{sale.productName}</span>
                      <Badge variant="outline" className={cn('text-xs font-medium', status.className)}>
                        {status.label}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between mt-2 text-sm">
                      <span className="text-muted-foreground">
                        Qty: {sale.quantity} × {formatCurrency(sale.salePrice)}
                      </span>
                      <span className="font-semibold text-green-500">
                        +{formatCurrency(sale.commission)}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {formatDate(sale.date)}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
