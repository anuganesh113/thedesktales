import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Upload, Plus, Image as ImageIcon, X } from 'lucide-react';
import { toast } from 'sonner';

interface DesignFormData {
  name: string;
  category: string;
  description: string;
  tags: string;
  file: File | null;
}

export function DesignSubmissionForm() {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<DesignFormData>({
    name: '',
    category: '',
    description: '',
    tags: '',
    file: null,
  });
  const [preview, setPreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        toast.error('File size must be less than 10MB');
        return;
      }
      setFormData(prev => ({ ...prev, file }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const clearFile = () => {
    setFormData(prev => ({ ...prev, file: null }));
    setPreview(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.category || !formData.file) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    toast.success('Design submitted successfully! We\'ll review it within 48 hours.');
    setOpen(false);
    setFormData({ name: '', category: '', description: '', tags: '', file: null });
    setPreview(null);
    setIsSubmitting(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Submit New Design
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Submit a New Design</DialogTitle>
          <DialogDescription>
            Upload your design for review. Approved designs earn you commissions on every sale.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="design-name">Design Name *</Label>
            <Input
              id="design-name"
              placeholder="e.g., Cosmic Nebula Pattern"
              value={formData.name}
              onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Product Category *</Label>
            <Select
              value={formData.category}
              onValueChange={value => setFormData(prev => ({ ...prev, category: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="desk-mat">DeskMats</SelectItem>
                <SelectItem value="mousepad">Mousepads</SelectItem>
                <SelectItem value="poster">Posters</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Tell us about your design inspiration and style..."
              rows={3}
              value={formData.description}
              onChange={e => setFormData(prev => ({ ...prev, description: e.target.value }))}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="tags">Tags</Label>
            <Input
              id="tags"
              placeholder="minimalist, geometric, space (comma-separated)"
              value={formData.tags}
              onChange={e => setFormData(prev => ({ ...prev, tags: e.target.value }))}
            />
          </div>

          <div className="space-y-2">
            <Label>Design File *</Label>
            {preview ? (
              <div className="relative rounded-lg border border-border overflow-hidden">
                <img
                  src={preview}
                  alt="Design preview"
                  className="w-full h-48 object-cover"
                />
                <button
                  type="button"
                  onClick={clearFile}
                  className="absolute top-2 right-2 p-1 rounded-full bg-background/80 hover:bg-background transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <label
                htmlFor="design-file"
                className="flex flex-col items-center justify-center h-48 border-2 border-dashed border-border rounded-lg cursor-pointer hover:border-primary/50 hover:bg-muted/30 transition-colors"
              >
                <div className="flex flex-col items-center gap-2 text-muted-foreground">
                  <div className="p-3 rounded-full bg-muted">
                    <Upload className="h-6 w-6" />
                  </div>
                  <p className="text-sm font-medium">Click to upload or drag and drop</p>
                  <p className="text-xs">PNG, JPG, or SVG (max. 10MB)</p>
                </div>
                <input
                  id="design-file"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
            )}
          </div>

          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting} className="flex-1">
              {isSubmitting ? 'Submitting...' : 'Submit Design'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
