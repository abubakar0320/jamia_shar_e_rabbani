'use client';

import { motion } from 'framer-motion';
import { Video, Book, Award, PlayCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface PlaylistProps {
  title: string;
  category: string;
  listId: string;
  videoId?: string;
  badge: string;
  description?: string;
  iconType?: 'video' | 'book' | 'award';
}

const IconMap = {
  video: Video,
  book: Book,
  award: Award,
};

export default function YouTubePlaylist({ title, category, listId, videoId, badge, description, iconType = 'video' }: PlaylistProps) {
  const { t } = useTranslation();
  const Icon = IconMap[iconType];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="space-y-8"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-slate-100 pb-6 gap-4">
        <div>
            <h2 className="text-[11px] font-bold text-emerald-600 uppercase tracking-[0.2em] mb-2">{t(category)}</h2>
            <h3 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
              <Icon className="text-emerald-600" size={28} /> {t(title)}
            </h3>
            {description && (
              <p className="text-[14px] text-slate-500 mt-2 max-w-2xl font-medium leading-relaxed">
                {t(description)}
              </p>
            )}
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 rounded-full text-[10px] font-bold uppercase tracking-wider self-start md:self-center">
           <PlayCircle size={14} /> {t(badge)}
        </div>
      </div>

      <div className="relative aspect-video w-full rounded-3xl overflow-hidden shadow-2xl bg-slate-900 border-8 border-white group">
        <iframe
          src={`https://www.youtube.com/embed/${videoId || 'videoseries'}?list=${listId}`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          loading="lazy"
          className="absolute inset-0 w-full h-full"
        />
      </div>
    </motion.div>
  );
}
