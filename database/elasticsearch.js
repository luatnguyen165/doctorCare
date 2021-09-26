const { Client } = require('@elastic/elasticsearch')
const client = new Client({ node: 'http://elasticsearch:9200' })
async function checkConnection(){
    try{
         const health = await client.cluster.health({})
         console.log(health);
         console.log('Elasticsearch connected')
    }catch(e){
        console.log('Elasticsearch failed');
        throw new Error(e)
    }
}
module.exports = checkConnection;