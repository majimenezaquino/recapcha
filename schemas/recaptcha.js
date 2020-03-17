module.exports = function (sequelize, DataTypes) {
    return sequelize.define(
        'recaptcha', {
            recaptcha_id: {
                type: DataTypes.BIGINT,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            recaptcha_domain: {
                type: DataTypes.STRING,
                allowNull: false
            },

            recaptcha_website_key: {
                type: DataTypes.STRING,
                allowNull: true
            },
            recaptcha_secret_key: {
                type: DataTypes.STRING,
                allowNull: true
            },

            client_email_default: {
                type: DataTypes.STRING,
                allowNull: true
            },
            recaptcha_status: {
                type: DataTypes.STRING,
                allowNull: true
            }



        }, {
            tableName: 'recaptcha',
            timestamps: false
        }
    );
};