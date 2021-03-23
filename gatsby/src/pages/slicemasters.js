import React from 'react';
import Img from 'gatsby-image';
import { graphql, Link } from 'gatsby';
import styled from 'styled-components';
import Pagination from '../components/Pagination';
import SEO from '../components/SEO';

const PersonGridStyles = styled.div`
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  margin-top: 2rem;
`;

const SinglePersonStyles = styled.div`
  border: 1px solid var(--grey);
  padding: 2rem;
  text-align: center;
  img {
    width: 100%;
    height: 200px;
    object-fit: contain;
    display: grid;
    align-items: center;
    font-size: 10px;
    color: black;
  }
  h2 {
    transform: rotate(-2deg);
    font-size: 4rem;
  }
`;

export default function SliceMastersPage({ data, pageContext }) {
  const slicemasters = data.slicemasters.nodes;
  console.log(slicemasters);
  return (
    <>
      <SEO title={`Slicemasters - Page ${pageContext.currentPage || 1}`} />
      <Pagination
        pageSize={parseInt(process.env.GATSBY_PAGE_SIZE)}
        totalCount={data.slicemasters.totalCount}
        currentPage={pageContext.currentPage || 1}
        skip={pageContext.skip}
        base="/slicemasters"
      />
      <PersonGridStyles>
        {slicemasters.map((person) => (
          <SinglePersonStyles key={person.id}>
            <Link to={`/slicemaster/${person.slug.current}`}>
              <h2>
                <span className="mark">{person.person}</span>
              </h2>
            </Link>
            <Img fluid={person.image.asset.fluid} alt={person.person} />
            <p className="description">{person.description}</p>
          </SinglePersonStyles>
        ))}
      </PersonGridStyles>
    </>
  );
}

export const query = graphql`
  query($skip: Int = 0, $pageSize: Int = 6) {
    slicemasters: allSanityPerson(limit: $pageSize, skip: $skip) {
      totalCount
      nodes {
        id
        slug {
          current
        }
        image {
          asset {
            fluid(maxWidth: 400) {
              ...GatsbySanityImageFluid
            }
          }
        }
        description
        person
      }
    }
  }
`;
