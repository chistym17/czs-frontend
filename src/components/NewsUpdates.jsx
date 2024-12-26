import '../app/globals.css';

const cardData = [
  { title: 'TEAM INFO', description: 'Under Maintenance' },
  { title: 'TEAM INFO', description: 'Under Maintenance' },
  { title: 'TEAM INFO', description: 'Under Maintenance' },
];

const NewsSection = () => {
  return (
    <section className='bg-white h-auto py-8'>
      <h1 className='h-[100px] flex items-center justify-center text-4xl text-black'>
        News & Updates
      </h1>
      <div className='w-full flex flex-wrap items-center justify-center gap-8 p-4'>
        {cardData.map((card, index) => (
          <div
            key={index}
            className='card bg-white border border-gray-300 shadow-xl rounded-2xl grid h-40 w-60 place-items-center'
          >
            <div>
              <h1 className='flex items-center justify-center'>{card.title}</h1>
              <p className='flex items-center justify-center'>
                {card.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

const MatchUpdatesSection = () => {
  return (
    <section className='bg-white h-auto py-8'>
      <h1 className='flex items-center justify-center text-4xl text-black'>
        Match Updates
      </h1>
      <div className='w-full flex flex-wrap items-center justify-center gap-8 p-4'>
        {cardData.map((card, index) => (
          <div
            key={index}
            className='card bg-white border border-gray-300 shadow-xl rounded-2xl grid h-40 w-60 place-items-center'
          >
            <div>
              <h1 className='flex items-center justify-center'>{card.title}</h1>
              <p className='flex items-center justify-center'>
                {card.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

const StatsSection = () => {
  return (
    <section className='bg-white flex items-center justify-center h-auto py-8'>
      <div className='stats stats-vertical lg:stats-horizontal shadow bg-white text-black w-full max-w-screen-lg'>
        <div className='stat'>
          <div className='stat-title text-black'>Total Events</div>
          <div className='stat-value'>6</div>
        </div>
        <div className='stat'>
          <div className='stat-title text-black'>Total Teams</div>
          <div className='stat-value'>32</div>
        </div>
        <div className='stat'>
          <div className='stat-title text-black'>Total Players</div>
          <div className='stat-value'>640</div>
        </div>
      </div>
    </section>
  );
};

const NewsUpdates = () => {
  return (
    <div>
      <NewsSection />
      <MatchUpdatesSection />
      <StatsSection />
    </div>
  );
};

export default NewsUpdates;
