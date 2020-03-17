const db = require("../schemas");
const clinete = [
  10072622,
  3058,
  5153,
  6602,
  13035
];

class AccountRepository {
  constructor() {
    this.account = db.accounts;
  }

  async getAccounts() {
    const accounts = await this.account.findAll({
      where: {
        account_facebook_id: {
          [db.Sequelize.Op.ne]: null
        },
        account_subscriber_id: clinete,
        account_status: "ACTIVE"
      }
    });

    return accounts;
  }
}

module.exports = new AccountRepository();