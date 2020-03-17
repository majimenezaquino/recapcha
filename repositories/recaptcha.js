const db = require("../schemas");
const clinete = [10072622, 3058, 5153, 6602, 13035, 14782, 17404, 21954];

class RecaptchaRepository {
  constructor() {
    this.account = db.recaptcha;
  }

  async getrecaptcha(domain) {
    const recaptcha = await this.account.findAll({
      where: {
        recaptcha_id: {
          [db.Sequelize.Op.ne]: null
        },
        recaptcha_domain: domain,
        recaptcha_status: "ACTIVE"
      }
    });

    return recaptcha;
  }
}

module.exports = new RecaptchaRepository();