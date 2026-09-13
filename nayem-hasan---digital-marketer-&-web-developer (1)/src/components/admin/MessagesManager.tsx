import React, { useState } from 'react';
import {
  MessageSquare,
  Mail,
  Building,
  DollarSign,
  Calendar,
  CheckCircle,
  Archive,
  Trash2,
  Reply,
  Search,
  Check,
  X,
  Send,
  Sparkles,
  Inbox
} from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import { ContactMessage } from '../../types';

export const MessagesManager: React.FC = () => {
  const { messages, updateMessageStatus, deleteMessage, unreadMessagesCount } = usePortfolio();

  const [activeTab, setActiveTab] = useState<'all' | 'new' | 'replied' | 'archived'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  const [replyModalOpen, setReplyModalOpen] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [replySent, setReplySent] = useState(false);

  const filterMessages = messages.filter(m => {
    const sQuery = (searchQuery || '').toLowerCase();
    const mStatus = (m?.status || '').toLowerCase();
    const aTab = (activeTab || '').toLowerCase();
    const matchesTab = activeTab === 'all' || mStatus === aTab;
    const mName = (m?.name || '').toLowerCase();
    const mEmail = (m?.email || '').toLowerCase();
    const mMsg = (m?.message || '').toLowerCase();
    const mBiz = (m?.businessName || '').toLowerCase();

    const matchesSearch = !sQuery || mName.includes(sQuery) || mEmail.includes(sQuery) || mMsg.includes(sQuery) || mBiz.includes(sQuery);
    return matchesTab && matchesSearch;
  });

  const openReplyModal = (msg: ContactMessage) => {
    setSelectedMessage(msg);
    setReplyText(`Hi ${msg.name},\n\nThank you for reaching out regarding your web project for ${msg.businessName || 'your business'}.\n\nI would love to learn more about your goals and discuss how we can build a high-converting digital platform tailored to your audience.\n\nAre you available for a brief 15-minute discovery call later this week?\n\nBest regards,\nNayem Hasan\nDigital Marketer & Web Developer\nhttps://nayemhasan.com`);
    setReplyModalOpen(true);
    setReplySent(false);
  };

  const handleSendReply = async () => {
    if (!selectedMessage) return;
    setReplySent(true);
    await updateMessageStatus(selectedMessage.id, 'replied');
    setTimeout(() => {
      setReplyModalOpen(false);
      setReplySent(false);
    }, 1500);
  };

  const setTemplate = (type: 'call' | 'pricing' | 'showcase') => {
    if (!selectedMessage) return;
    if (type === 'call') {
      setReplyText(`Hi ${selectedMessage.name},\n\nThank you for reaching out! Let's schedule a 15-minute strategy call to walk through the exact roadmap for ${selectedMessage.businessName || 'your business'}.\n\nYou can pick a time that works best for you here: https://cal.com/nayemhasan\n\nLooking forward to speaking!\n\nBest,\nNayem Hasan`);
    } else if (type === 'pricing') {
      setReplyText(`Hi ${selectedMessage.name},\n\nThank you for inquiring about ${selectedMessage.service || 'our web development services'}.\n\nBased on your selected budget (${selectedMessage.budget || 'Standard'}), our complete custom package includes full mobile-responsive UX, speed optimization, local SEO structure, and lead conversion integrations.\n\nLet me know if you'd like me to prepare a tailored project brief for ${selectedMessage.businessName || 'your team'}.\n\nBest,\nNayem Hasan`);
    } else if (type === 'showcase') {
      setReplyText(`Hi ${selectedMessage.name},\n\nThanks for your message! Here are a few live interactive case studies specifically relevant to ${selectedMessage.businessType || 'your industry'}:\n\n• Fine Dining & Hospitality Demo: https://nayemhasan.com/#work\n• Automotive & Detailing Demo: https://nayemhasan.com/#work\n\nLet me know your thoughts!\n\nBest,\nNayem Hasan`);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="bg-[#0C0C0C] border border-[#1C1C1C] rounded-xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-[#F5F2EA] flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-[#F5F2EA]" />
            <span>Contact Inquiries & Lead Management</span>
            {unreadMessagesCount > 0 && (
              <span className="px-2 py-0.5 rounded-full text-[11px] font-mono bg-[#1E1E1E] text-[#FFFFFF] border border-[#333333]">
                {unreadMessagesCount} Unread
              </span>
            )}
          </h2>
          <p className="text-xs text-[#736E66] mt-0.5">
            Incoming inquiries from prospective restaurant owners, auto shops, and local businesses
          </p>
        </div>

        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#666]" />
          <input
            type="text"
            placeholder="Search inquiries..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 pr-3 py-2 bg-[#141414] border border-[#262626] rounded-lg text-xs text-[#F5F2EA] focus:border-[#444] outline-none font-mono w-60"
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-[#1A1A1A] pb-2 text-xs font-mono">
        {[
          { id: 'all', label: 'All Inquiries' },
          { id: 'new', label: 'New / Unread' },
          { id: 'replied', label: 'Replied' },
          { id: 'archived', label: 'Archived' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
              activeTab === tab.id
                ? 'bg-[#202020] text-[#FFFFFF] border border-[#333333] font-semibold'
                : 'text-[#888] hover:text-[#FFF] hover:bg-[#141414]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Inquiries List */}
      <div className="space-y-4">
        {filterMessages.length === 0 ? (
          <div className="bg-[#0C0C0C] border border-[#1A1A1A] rounded-xl p-12 text-center">
            <Inbox className="w-10 h-10 text-[#444] mx-auto mb-3" />
            <h3 className="text-sm font-semibold text-[#8C857B]">No Inquiries in this view</h3>
            <p className="text-xs text-[#555] mt-1 font-mono">New form submissions will appear here automatically</p>
          </div>
        ) : (
          filterMessages.map((msg) => {
            const isNew = msg.status === 'new';

            return (
              <div
                key={msg.id}
                className={`bg-[#0C0C0C] border rounded-xl p-5 transition-all space-y-4 ${
                  isNew
                    ? 'border-[#383838] bg-[#0E0E0E]'
                    : 'border-[#1C1C1C]'
                }`}
              >
                {/* Top Info */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#171717]">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-[#141414] border border-[#262626] flex items-center justify-center text-xs font-bold text-[#F5F2EA]">
                      {msg.name.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-xs font-bold text-[#F5F2EA]">{msg.name}</h4>
                        {isNew && (
                          <span className="px-1.5 py-0.2 rounded text-[10px] font-mono bg-[#222222] text-[#FFFFFF] border border-[#333333] font-semibold">
                            NEW
                          </span>
                        )}
                        {msg.status === 'replied' && (
                          <span className="px-1.5 py-0.2 rounded text-[10px] font-mono bg-emerald-950 text-emerald-300">
                            REPLIED
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] font-mono text-[#888] flex items-center gap-2">
                        <span>{msg.email}</span>
                        {msg.phone && <span>• {msg.phone}</span>}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-[11px] font-mono text-[#666]">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>
                      {new Date(msg.createdAt || msg.date || Date.now()).toLocaleDateString()} at{' '}
                      {new Date(msg.createdAt || msg.date || Date.now()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>

                {/* Metadata badges */}
                <div className="flex flex-wrap gap-2 text-xs">
                  {msg.businessName && (
                    <span className="px-2.5 py-1 rounded-lg bg-[#141414] border border-[#242424] text-[#D1CCC4] flex items-center gap-1.5">
                      <Building className="w-3.5 h-3.5 text-[#D1CCC4]" />
                      <span>{msg.businessName}</span>
                    </span>
                  )}
                  {msg.businessType && (
                    <span className="px-2.5 py-1 rounded-lg bg-[#141414] border border-[#242424] text-[#D1CCC4]">
                      Industry: <strong className="text-[#F5F2EA]">{msg.businessType}</strong>
                    </span>
                  )}
                  {msg.service && (
                    <span className="px-2.5 py-1 rounded-lg bg-[#141414] border border-[#242424] text-[#D1CCC4]">
                      Service: <strong className="text-[#F5F2EA]">{msg.service}</strong>
                    </span>
                  )}
                  {msg.budget && (
                    <span className="px-2.5 py-1 rounded-lg bg-[#141414] border border-[#242424] text-[#D1CCC4] flex items-center gap-1">
                      <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Budget: {msg.budget}</span>
                    </span>
                  )}
                </div>

                {/* Message Body */}
                <div className="p-3.5 rounded-lg bg-[#111] border border-[#1C1C1C] text-xs text-[#D1CCC4] leading-relaxed">
                  {msg.message}
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between pt-1 text-xs">
                  <div className="flex items-center gap-2">
                    {isNew ? (
                      <button
                        onClick={() => updateMessageStatus(msg.id, 'read')}
                        className="px-2.5 py-1 rounded bg-[#141414] hover:bg-[#1E1E1E] text-[#A6A19A] text-xs font-mono cursor-pointer"
                      >
                        Mark Read
                      </button>
                    ) : (
                      <button
                        onClick={() => updateMessageStatus(msg.id, 'new')}
                        className="px-2.5 py-1 rounded bg-[#141414] hover:bg-[#1E1E1E] text-[#A6A19A] text-xs font-mono cursor-pointer"
                      >
                        Mark Unread
                      </button>
                    )}

                    <button
                      onClick={() => updateMessageStatus(msg.id, msg.status === 'archived' ? 'read' : 'archived')}
                      className="px-2.5 py-1 rounded bg-[#141414] hover:bg-[#1E1E1E] text-[#A6A19A] text-xs font-mono flex items-center gap-1 cursor-pointer"
                    >
                      <Archive className="w-3 h-3" />
                      <span>{msg.status === 'archived' ? 'Unarchive' : 'Archive'}</span>
                    </button>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => openReplyModal(msg)}
                      className="px-3 py-1.5 rounded-lg bg-[#181818] hover:bg-[#222222] border border-[#2E2E2E] text-[#FFFFFF] font-semibold text-xs flex items-center gap-1.5 cursor-pointer shadow-sm"
                    >
                      <Reply className="w-3.5 h-3.5" />
                      <span>Quick Reply</span>
                    </button>
                    <button
                      onClick={() => deleteMessage(msg.id)}
                      className="p-1.5 rounded-lg bg-[#241111] hover:bg-[#381616] text-red-400 cursor-pointer"
                      title="Delete"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Reply Modal */}
      {replyModalOpen && selectedMessage && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-[#0D0D0D] border border-[#242424] rounded-2xl w-full max-w-2xl shadow-2xl p-6 space-y-4 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-[#1C1C1C]">
              <div>
                <h3 className="text-sm font-bold text-[#F5F2EA]">Reply to {selectedMessage.name}</h3>
                <p className="text-[11px] font-mono text-[#777]">To: {selectedMessage.email}</p>
              </div>
              <button
                onClick={() => setReplyModalOpen(false)}
                className="p-1.5 rounded-lg text-[#888] hover:text-[#FFF]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Templates */}
            <div className="flex items-center gap-2 text-xs">
              <span className="text-[#888] font-mono text-[11px]">Templates:</span>
              <button
                type="button"
                onClick={() => setTemplate('call')}
                className="px-2.5 py-1 rounded bg-[#171717] hover:bg-[#222] text-[#D1CCC4] text-[11px] font-mono cursor-pointer"
              >
                Schedule Call
              </button>
              <button
                type="button"
                onClick={() => setTemplate('pricing')}
                className="px-2.5 py-1 rounded bg-[#171717] hover:bg-[#222] text-[#D1CCC4] text-[11px] font-mono cursor-pointer"
              >
                Pricing Overview
              </button>
              <button
                type="button"
                onClick={() => setTemplate('showcase')}
                className="px-2.5 py-1 rounded bg-[#171717] hover:bg-[#222] text-[#D1CCC4] text-[11px] font-mono cursor-pointer"
              >
                Share Live Showcase
              </button>
            </div>

            <textarea
              rows={8}
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              className="w-full p-3 bg-[#141414] border border-[#262626] rounded-xl text-xs text-[#F5F2EA] focus:border-[#444] outline-none font-mono leading-relaxed"
            />

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setReplyModalOpen(false)}
                className="px-4 py-2 rounded-lg bg-[#141414] text-[#888] hover:text-[#FFF] text-xs font-mono cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSendReply}
                disabled={replySent}
                className="px-5 py-2 rounded-lg bg-[#181818] hover:bg-[#222222] border border-[#2E2E2E] text-[#FFFFFF] font-semibold text-xs flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
              >
                {replySent ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Sent & Marked Replied!</span>
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5 text-[#D1CCC4]" />
                    <span>Send Reply Email</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
