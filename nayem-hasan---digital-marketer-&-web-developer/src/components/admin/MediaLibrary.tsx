import React, { useState } from 'react';
import {
  Image as ImageIcon,
  Plus,
  Trash2,
  Copy,
  Check,
  AlertTriangle,
  ExternalLink,
  Search,
  UploadCloud
} from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';

export const MediaLibrary: React.FC = () => {
  const { mediaItems, addMediaItem, deleteMediaItem } = usePortfolio();
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // New Image Modal / Input
  const [newUrl, setNewUrl] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [newAlt, setNewAlt] = useState('');

  const handleAddMedia = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUrl.trim()) return;

    addMediaItem({
      url: newUrl.trim(),
      name: newTitle.trim() || 'Portfolio Asset',
      alt: newAlt.trim() || newTitle.trim(),
      fileSize: '320 KB',
      dimensions: '1600 × 1060',
      usedInCount: 1
    });

    setNewUrl('');
    setNewTitle('');
    setNewAlt('');
  };

  const handleCopy = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredMedia = mediaItems.filter(item => {
    const sQuery = (searchQuery || '').toLowerCase();
    const itemName = (item?.name || '').toLowerCase();
    const itemAlt = (item?.alt || '').toLowerCase();
    return !sQuery || itemName.includes(sQuery) || itemAlt.includes(sQuery);
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="bg-[#0C0C0C] border border-[#1C1C1C] rounded-xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-[#F5F2EA] flex items-center gap-2">
            <ImageIcon className="w-5 h-5 text-[#C9A227]" />
            <span>Media & Asset Library</span>
            <span className="px-2 py-0.5 rounded-full text-[11px] font-mono bg-[#1C1C1C] text-[#E5C45A] border border-[#C9A227]/30">
              {mediaItems.length} Assets
            </span>
          </h2>
          <p className="text-xs text-[#736E66] mt-0.5">
            Manage showcase screenshots, mobile mockups, photography, and optimization flags
          </p>
        </div>

        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#666]" />
          <input
            type="text"
            placeholder="Search assets..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 pr-3 py-2 bg-[#141414] border border-[#262626] rounded-lg text-xs text-[#F5F2EA] focus:border-[#C9A227] outline-none font-mono w-60"
          />
        </div>
      </div>

      {/* Quick Add Form */}
      <div className="bg-[#0C0C0C] border border-[#1C1C1C] rounded-xl p-6">
        <h3 className="text-sm font-bold text-[#F5F2EA] mb-3 flex items-center gap-2">
          <UploadCloud className="w-4 h-4 text-[#E5C45A]" />
          <span>Register New Media URL</span>
        </h3>
        <form onSubmit={handleAddMedia} className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
          <div className="sm:col-span-2">
            <input
              type="url"
              required
              placeholder="Direct Image URL (Unsplash, CDN, WebP)..."
              value={newUrl}
              onChange={(e) => setNewUrl(e.target.value)}
              className="w-full px-3 py-2 bg-[#141414] border border-[#262626] rounded-lg text-[#F5F2EA] font-mono"
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Asset Title..."
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="w-full px-3 py-2 bg-[#141414] border border-[#262626] rounded-lg text-[#F5F2EA]"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full py-2 px-3 rounded-lg bg-gradient-to-r from-[#C9A227] to-[#E5C45A] text-[#0A0A0A] font-semibold text-xs flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add Media</span>
            </button>
          </div>
        </form>
      </div>

      {/* Media Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredMedia.map((media) => {
          const isLarge = media.fileSize.includes('MB') || parseInt(media.fileSize) > 800;

          return (
            <div
              key={media.id}
              className="bg-[#0C0C0C] border border-[#1C1C1C] rounded-xl overflow-hidden group flex flex-col justify-between"
            >
              <div>
                <div className="relative h-40 bg-[#141414] overflow-hidden">
                  <img
                    src={media.url}
                    alt={media.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {isLarge && (
                    <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-amber-950/90 border border-amber-600/50 text-amber-300 text-[10px] font-mono flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3" />
                      <span>Large File</span>
                    </div>
                  )}

                  <div className="absolute top-2 right-2 px-2 py-0.5 rounded bg-black/80 text-[#8C857B] text-[10px] font-mono">
                    {media.dimensions || '1600 × 1060'}
                  </div>
                </div>

                <div className="p-3 space-y-1">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-semibold text-[#F5F2EA] truncate">{media.name}</h4>
                    <span className="text-[10px] font-mono text-[#888]">{media.fileSize}</span>
                  </div>
                  <p className="text-[11px] font-mono text-[#666] truncate">{media.url}</p>
                </div>
              </div>

              <div className="p-2.5 bg-[#080808] border-t border-[#171717] flex items-center justify-between text-xs">
                <span className="text-[10px] font-mono text-[#777]">
                  Used in {media.usedInCount || 1} project{(media.usedInCount || 1) > 1 ? 's' : ''}
                </span>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleCopy(media.url, media.id)}
                    className="p-1.5 rounded bg-[#141414] hover:bg-[#202020] text-[#D1CCC4] transition-colors cursor-pointer"
                    title="Copy URL"
                  >
                    {copiedId === media.id ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                  <button
                    onClick={() => deleteMediaItem(media.id)}
                    className="p-1.5 rounded bg-[#241111] hover:bg-[#381616] text-red-400 transition-colors cursor-pointer"
                    title="Delete Image"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
