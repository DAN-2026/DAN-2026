import EventCountdownCard from '../../Components/EventCountdownCard';

function Event() {
  return (
    <div className="min-h-screen pt-32 pb-16 px-4">
      <EventCountdownCard
        title="Awarding Night 2026"
        targetDate="2026-12-31T19:00:00"
      />
    </div>
  );
}

export default Event;