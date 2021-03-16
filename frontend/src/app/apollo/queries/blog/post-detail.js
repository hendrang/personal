import gql from "graphql-tag";

const POST_DETAIL_QUERY = gql`
  query Articles($id: ID!) {
    article(id: $id) {
      id
      title
      created
      content
      videoUrl
      image {
        url
      }
      category {
        id
        name
      }
      published_at
    }
  }
`;

export default POST_DETAIL_QUERY;