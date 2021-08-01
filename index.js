require("dotenv").config();
const { Client } = require("@notionhq/client");
const { all } = require("p-cancelable");

const notion = new Client({ auth: process.env.NOTION_API_KEY });
const databaseId = process.env.NOTION_API_DATABASE;

exports.getDatabase = async function () {
  const response = await notion.databases.query({ database_id: databaseId });

  const responseResults = response.results.map((page) => {
    return {
      id: page.id,
      name: page.properties.Name.title[0]?.plain_text,
      url: page.url,
      summary: page.properties.Summary ?.rich_text[0]?.plain_text,
      created: page.created_time,
      modified: page.last_edited_time
    };
  });
  // console.log(responseResults);
  return responseResults;
}

// const checkDatabase = async () => {
//   const response = await notion.databases.query({ database_id: databaseId });

//   const responseResults = response.results.map((page) => {
//     return {
//       id: page.id,
//       name: page.properties.Name.title[0]?.plain_text,
//       url: page.url,
//       summary: page.properties.Summary?.rich_text,
//       created: page.created_time,
//       modified: page.last_edited_time,
//     };
//   });
//   console.log(responseResults);
//   return responseResults;
// };

// checkDatabase();
