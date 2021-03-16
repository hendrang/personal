import gql from "graphql-tag";

const POSTS_QUERY = gql`
  query Articles {
    articles {
      id
      title
      subtitle
      created
      category {
        id
        name
      }
      image {
        url
      }
    }
  }
`;

export default POSTS_QUERY;