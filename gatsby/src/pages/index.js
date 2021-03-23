import React from 'react';
import ItemGrid from '../components/ItemGrid';
import LoadingGrid from '../components/LoadingGrid';
import { HomePageGrid } from '../styles/Grids';
import useLatestData from '../utils/useLatestData';

function CurrentlySlicing({ slicemasters }) {
  return (
    <div>
      <h2 className="center">
        <span className="mark tilt">
          The Penguins Preparing Perfectly Pleasant Pizzas today are...
        </span>
      </h2>
      <p />
      {!slicemasters && <LoadingGrid count={4} />}
      {slicemasters && !slicemasters?.length && <p>The penguins are asleep</p>}
      {slicemasters?.length && <ItemGrid items={slicemasters} />}
    </div>
  );
}

function HotSlices({ hotSlices }) {
  return (
    <div>
      <h2 className="center">
        <span className="mark tilt">
          The Perfectly Prepared Pizzas the Penguins are Preparing are...
        </span>
      </h2>
      <p />
      {!hotSlices && <LoadingGrid count={4} />}
      {hotSlices && !hotSlices?.length && (
        <p>No pizzas today. We ate them all</p>
      )}
      {hotSlices?.length && <ItemGrid items={hotSlices} />}
    </div>
  );
}

function HomePage() {
  const { slicemasters, hotSlices } = useLatestData();
  return (
    <div className="center">
      <h1>The Best Penguin Pizzas</h1>
      <p>Always open unless the penguins are asleep!</p>
      <HomePageGrid>
        <CurrentlySlicing slicemasters={slicemasters} />
        <HotSlices hotSlices={hotSlices} />
      </HomePageGrid>
    </div>
  );
}

export default HomePage;
