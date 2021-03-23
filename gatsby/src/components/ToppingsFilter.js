import { graphql, Link, useStaticQuery } from 'gatsby';
import React from 'react';
import styled from 'styled-components';

const ToppingsStyles = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 4rem;
  a {
      display: grid;
      grid-template-columns: auto 1fr;
      grid-gap: 0 1rem;
      align-items: center;
      padding: 5px;
      background: var(--grey)
      border-radius: 2px;
      .count {
          background: white;
          padding: 2px 5px;
      }
      &[aria-current="page"] {
          background: var(--yellow);
      }
  }
`;

function countPizzasInToppings(pizzas) {
  const counts = pizzas
    .map((pizza) => pizza.toppings)
    .flat()
    .reduce((acc, topping) => {
      // check if this is an exisiting topping.
      const existingTopping = acc[topping.id];
      if (existingTopping) {
        existingTopping.count += 1;
      } else {
        // if it is, increment by 1
        // otherwise create a new entry in our acc and set it to one.
        acc[topping.id] = {
          id: topping.id,
          name: topping.name,
          count: 1,
        };
      }
      // acc = accumulator
      return acc;
    }, {});
  // sort them based on their count
  const sortedToppings = Object.values(counts).sort(
    (a, b) => b.count - a.count
  );
  return sortedToppings;
}

export default function ToppingsFilter({ activeTopping }) {
  const { pizzas } = useStaticQuery(graphql`
    query {
      pizzas: allSanityPizza {
        nodes {
          toppings {
            name
            id
          }
        }
      }
    }
  `);

  const toppingsWithCounts = countPizzasInToppings(pizzas.nodes);
  console.log(toppingsWithCounts);

  return (
    <ToppingsStyles>
      <Link to="/pizzas">
        <span className="all">All</span>
        <span className="count">{pizzas.nodes.length}</span>
      </Link>
      {toppingsWithCounts.map((topping) => (
        <Link
          to={`/toppings/${topping.name}`}
          key={topping.id}
          className={topping.name === activeTopping ? 'active' : ''}
        >
          <span className="name">{topping.name}</span>
          <span className="count">{topping.count}</span>
        </Link>
      ))}
    </ToppingsStyles>
  );
}
