const { gql } = require('apollo-server-express');
const axios = require('axios')

const typeDefs = gql`
  type Item {
    id: Int
    collection: Collection
    tags: Tag
    element_texts: [ElementTexts]
  }
  type Tag {
    id: Int
    url: String
    name: String
  }
  type ElementTexts {
    text: String
    element_set: ElementSet
    element: ElementType
  }
  type ElementSet {
    id: Int
    url: String
    name: String
  }
  type ElementType {
    id: Int
    url: String
    name: String
  }
  type Collection {
    id: Int
  }
  type Image {
    item: ItemId
    file_urls: FileUrls
    mime_type: String
  }
  type ItemId {
    id: Int
  }
  type FileUrls {
    original: String
    fullsize: String
    thumbnail: String
    square_thumbnail: String
  }
  # QUERIES
  type Query {
    items: [Item]
    images: [Image]
    item(id: Int): Item
    tag(id: Int): Tag
    image(id: Int): Image
  }
`;
module.exports = {typeDefs}
