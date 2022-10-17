if (!process.env.GOODREADS_USER) {
    throw new Error("Environment variable GOODREADS_USER is missing.")
  }

const URL = `https://www.goodreads.com/review/list/${process.env.GOODREADS_USER}?shelf=to-read`

module.exports.URL = URL
