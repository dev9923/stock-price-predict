import { NewsItem } from '@/types/stock';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

export default function NewsFeed({ news }: { news: NewsItem[] }) {
    if (!news || news.length === 0) {
        return (
            <div className="text-gray-400 text-center py-8">
                No recent news found.
            </div>
        );
    }

    return (
        <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
            {news.map((item, i) => (
                <a
                    key={i}
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block group"
                >
                    <div className="bg-gray-50 dark:bg-gray-800/50 hover:bg-blue-50 dark:hover:bg-blue-900/10 transition-colors p-4 rounded-xl border border-gray-100 dark:border-gray-800">
                        <div className="flex justify-between items-start mb-2">
                            <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                                {item.source}
                            </span>
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                                {dayjs(item.pubDate).fromNow()}
                            </span>
                        </div>
                        <h3 className="text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-300 transition-colors font-medium leading-snug line-clamp-2">
                            {item.title}
                        </h3>
                    </div>
                </a>
            ))}
        </div>
    );
}
