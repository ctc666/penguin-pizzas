import { graphql } from 'gatsby';
import React from 'react';
import Img from 'gatsby-image';
import styled from 'styled-components';
import SEO from '../components/SEO';

const SliceMasterGrid = styled.div`
  max-width: 400px;
  margin: 0 auto;
  h2 {
    font-size: 5rem;
  }
`;

export default function SingleSlicemasterPage({ data }) {
  const { person } = data;

  return (
    <>
      <SEO title={person.person} image={person.image?.asset?.fluid?.src} />
      <SliceMasterGrid className="center">
        <h2 className="mark">{person.person}</h2>
        <Img fluid={person.image.asset.fluid} alt={person.person} />
        <div>
          <p>{person.description}</p>
        </div>
      </SliceMasterGrid>
    </>
  );
}

// this needs to be dynamic based on the slug
export const query = graphql`
  query($slug: String!) {
    person: sanityPerson(slug: { current: { eq: $slug } }) {
      person
      description
      slug {
        current
      }
      image {
        asset {
          fluid(maxWidth: 400, maxHeight: 400) {
            ...GatsbySanityImageFluid
          }
        }
      }
    }
  }
`;
