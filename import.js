const Typesense = require('typesense')
const fs = require('fs/promises');

async function main() {
  let client = new Typesense.Client({
    'nodes': [{
      'host': 'localhost', // For Typesense Cloud use xxx.a1.typesense.net
      'port': 8108,      // For Typesense Cloud use 443
      'protocol': 'http'   // For Typesense Cloud use https
    }],
    'apiKey': 'xyz ',
    'connectionTimeoutSeconds': 2
  })

  let articlesSchema = {
    'name': 'hc-articles',
    'fields': [
      {'name': 'title', 'type': 'string' },
      {'name': 'body', 'type': 'string' }
    ]
  }

  await client.collections("hc-articles").delete();
  const data = await client.collections().create(articlesSchema)

  const documents = await fs.readFile("./contentful.jsonl")
  client.collections("hc-articles").documents().import(documents, { batch_size: 100  })

}

main();
