const fs = require('fs')
const path = require('path')
const esConn = require('./conn')

async function loadData () {
  try {
    await esConn.resetIdx()

    let files = fs.readdirSync('./jobs')
    let jobs = []
    for (let file of files) {
      const filePath = path.join('./jobs', file)
      const jobsfile = fs.readFileSync(filePath, 'utf8')
      const joblist = JSON.parse(jobsfile)
      for (let job of joblist) {
        jobs.push(job)
      }
    }
    await insertData(jobs)
  } catch (err) {
    console.error(err)
  }
}

async function insertData (jobs) {
  let ops = []
  for (let i = 0; i < jobs.length; i++) {
    ops.push(
      {
        id: i,
        title: jobs[i].jobTitle,
        location: jobs[i].location,
        company: jobs[i].company,
        description: jobs[i].description
      }
    )
  }

  console.log(`Insert\n\n\n`)
  const operations = ops.flatMap(j => [{ index: {_index: esConn.index}}, j])

  const bulkResponse = await esConn.client.bulk({ refresh: true, operations })

  if (bulkResponse.errors) {
    const erroredDocuments = []
    bulkResponse.items.forEach((action, i) => {
      const operation = Object.keys(action)[0]
      if (action[operation].error) {
        erroredDocuments.push({
          status: action[operation].status,
          error: action[operation].error,
          operation: operations[i * 2],
          document: operations[i * 2 + 1]
        })
      }
    })
    console.log(erroredDocuments)
  }

  const count = await esConn.client.count({ index: esConn.index })
  console.log(count)
}

loadData().catch(console.log)

