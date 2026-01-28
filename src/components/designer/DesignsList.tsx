import { DesignSubmission } from '@/data/designerMockData';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { CheckCircle2, Clock, XCircle, AlertCircle, Eye, Edit, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DesignsListProps {
  designs: DesignSubmission[];
}

const statusConfig = {
  approved: {
    label: 'Approved',
    icon: CheckCircle2,
    className: 'bg-green-500/10 text-green-500 border-green-500/20',
  },
  pending: {
    label: 'Pending Review',
    icon: Clock,
    className: 'bg-brand-yellow/10 text-brand-yellow border-brand-yellow/20',
  },
  rejected: {
    label: 'Rejected',
    icon: XCircle,
    className: 'bg-red-500/10 text-red-500 border-red-500/20',
  },
  revision: {
    label: 'Needs Revision',
    icon: AlertCircle,
    className: 'bg-orange-500/10 text-orange-500 border-orange-500/20',
  },
};

const categoryLabels = {
  'desktop-mat': 'Desktop Mat',
  'laptop-mat': 'Laptop Mat',
  'mousepad': 'Mousepad',
  'accessory': 'Accessory',
};

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export function DesignsList({ designs }: DesignsListProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>My Designs</CardTitle>
        <span className="text-sm text-muted-foreground">{designs.length} total</span>
      </CardHeader>
      <CardContent>
        <div className="divide-y divide-border">
          {designs.map(design => {
            const status = statusConfig[design.status];
            const StatusIcon = status.icon;

            return (
              <div
                key={design.id}
                className="flex items-center gap-4 py-4 first:pt-0 last:pb-0"
              >
                <div className="h-16 w-16 flex-shrink-0 rounded-lg bg-muted overflow-hidden">
                  <img
                    src={design.image}
                    alt={design.name}
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h4 className="font-semibold text-foreground truncate">
                      {design.name}
                    </h4>
                    <Badge variant="secondary" className="text-xs">
                      {categoryLabels[design.category]}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    Submitted {formatDate(design.submittedAt)}
                  </p>
                  {design.feedback && (
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-1">
                      Feedback: {design.feedback}
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  <Badge
                    variant="outline"
                    className={cn('gap-1.5 font-medium', status.className)}
                  >
                    <StatusIcon className="h-3.5 w-3.5" />
                    {status.label}
                  </Badge>

                  <div className="hidden sm:flex items-center gap-1">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>View Design</TooltipContent>
                    </Tooltip>
                    
                    {(design.status === 'pending' || design.status === 'revision') && (
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Edit Design</TooltipContent>
                      </Tooltip>
                    )}
                    
                    {design.status === 'pending' && (
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Delete Design</TooltipContent>
                      </Tooltip>
                    )}
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
