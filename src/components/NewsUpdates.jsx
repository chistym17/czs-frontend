import '../app/globals.css';

const newsData = [
  {
    title: 'Tournament Begins!',
    description: 'The CZS Tournament is now officially open. Stay tuned for exciting matches and updates.',
    icon: '🏆'
  },
  {
    title: 'Match Schedule',
    description: 'First round matches will be announced soon. Teams are preparing for their debut.',
    icon: '📅'
  },
  {
    title: 'Live Updates',
    description: 'Follow us for real-time match updates, scores, and player statistics.',
    icon: '⚡'
  }
];

const NewsSection = () => {
  return (
    <section className='bg-white h-auto py-12'>
      <div className="max-w-7xl mx-auto px-4">
        <h1 className='text-4xl md:text-5xl font-bold text-center text-gray-800 mb-4'>
          Tournament Updates
        </h1>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Stay connected with the latest news, match schedules, and exciting moments from the CZS Tournament
        </p>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {newsData.map((card, index) => (
            <div
              key={index}
              className='bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300'
            >
              <div className="p-6">
                <div className="text-3xl mb-4">{card.icon}</div>
                <h2 className='text-xl font-semibold text-gray-800 mb-3'>{card.title}</h2>
                <p className='text-gray-600'>
                  {card.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const NewsUpdates = () => {
  return (
    <div className="bg-white">
      <NewsSection />
    </div>
  );
};

export default NewsUpdates;
