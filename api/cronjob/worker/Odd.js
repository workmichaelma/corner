const CHL = require('../models/CHL')
const axios = require('axios')




class Odd {
  constructor() {
    this.url = {
      chl: `http://crawler:8082/odd`
    }
    
  }

  async update() {
    const chl = await axios.get(this.url.chl).then(res => {
      return res.data && res.data.length ? res.data : []
    })
    return chl
  }

}

module.exports = Odd