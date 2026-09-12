import React, { useState } from 'react';
import {
  Layers,
  Plus,
  Edit2,
  Trash2,
  Briefcase,
  Sparkles,
  Check
} from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import { ProjectCategory } from '../../types';

export const CategoryManager: React.FC = () => {
  const { categories, projects, addCategory, deleteCategory } = usePortfolio();
  const [newCatName, setNewCatName] = useState('');
  const [newCatDesc, setNewCatDesc] = useState('');
  const [newCatIcon, setNewCatIcon] = useState('Layers');

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCatName.trim()) return;

    await addCategory({
      name: newCatName.trim(),
      description: newCatDesc.trim() || 'Custom industry portfolio category',
      icon: newCatIcon
    });

    setNewCatName('');
    setNewCatDesc('');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="bg-[#0C0C0C] border border-[#1C1C1C] rounded-xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-[#F5F2EA] flex items-center gap-2">
            <Layers className="w-5 h-5 text-[#F5F2EA]" />
            <span>Category Taxonomy System</span>
          </h2>
          <p className="text-xs text-[#736E66] mt-0.5">
            Organize business niches (Restaurants, Auto Detailing, Mechanics, Local Services)
          </p>
        </div>
      </div>

      {/* Add Category Form */}
      <div className="bg-[#0C0C0C] border border-[#1C1C1C] rounded-xl p-6">
        <h3 className="text-sm font-bold text-[#F5F2EA] mb-4">Create New Category</h3>
        <form onSubmit={handleAdd} className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div>
            <label className="block text-[#C2BCB2] font-medium mb-1">Category Name *</label>
            <input
              type="text"
              required
              placeholder="e.g., Car Detailing"
              value={newCatName}
              onChange={(e) => setNewCatName(e.target.value)}
              className="w-full px-3 py-2 bg-[#141414] border border-[#262626] rounded-lg text-[#F5F2EA] focus:border-[#444] outline-none"
            />
          </div>

          <div>
            <label className="block text-[#C2BCB2] font-medium mb-1">Description</label>
            <input
              type="text"
              placeholder="e.g., High-ticket detailing & ceramic coating platforms"
              value={newCatDesc}
              onChange={(e) => setNewCatDesc(e.target.value)}
              className="w-full px-3 py-2 bg-[#141414] border border-[#262626] rounded-lg text-[#F5F2EA] focus:border-[#444] outline-none"
            />
          </div>

          <div className="flex items-end">
            <button
              type="submit"
              className="w-full py-2 px-4 rounded-lg bg-[#181818] hover:bg-[#222222] border border-[#2E2E2E] text-[#FFFFFF] font-semibold text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>Create Category</span>
            </button>
          </div>
        </form>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((cat) => {
          const catNameLower = (cat?.name || '').toLowerCase();
          const associatedCount = projects.filter(
            p => (p?.category || '').toLowerCase() === catNameLower
          ).length;

          return (
            <div
              key={cat.id}
              className="bg-[#0C0C0C] border border-[#1C1C1C] hover:border-[#2C2C2C] rounded-xl p-5 flex flex-col justify-between transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-9 h-9 rounded-lg bg-[#161616] border border-[#2A2A2A] flex items-center justify-center text-[#F5F2EA]">
                    <Layers className="w-4 h-4" />
                  </div>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-[#141414] text-[#D1CCC4] border border-[#242424]">
                    {associatedCount} Projects
                  </span>
                </div>

                <h4 className="text-sm font-bold text-[#F5F2EA]">{cat.name}</h4>
                <p className="text-xs text-[#7A746B] mt-1 leading-relaxed">
                  {cat.description || 'Specialized portfolio niche category'}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-[#171717] flex items-center justify-between text-xs font-mono">
                <span className="text-[10px] text-[#666]">{cat.slug || cat.id}</span>
                {cat.id !== 'cat-restaurant' && cat.id !== 'cat-auto' && (
                  <button
                    onClick={() => deleteCategory(cat.id)}
                    className="p-1 rounded text-red-400 hover:bg-red-950/30 transition-colors cursor-pointer"
                    title="Delete Category"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
