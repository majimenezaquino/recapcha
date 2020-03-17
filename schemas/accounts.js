/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
	return sequelize.define(
		'accounts', {
			account_id: {
				type: DataTypes.BIGINT,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true
			},
			account_name: {
				type: DataTypes.STRING,
				allowNull: false
			},
			account_subscriber_id: {
				type: DataTypes.BIGINT,
				allowNull: false
			},
			account_facebook_id: {
				type: DataTypes.STRING,
				allowNull: true
			},
			account_google_id: {
				type: DataTypes.STRING,
				allowNull: true
			},
			account_email: {
				type: DataTypes.STRING,
				allowNull: true
			},
			account_dashboard_id: {
				type: DataTypes.STRING,
				allowNull: true
			},
			account_creation_date: {
				type: DataTypes.DATEONLY,
				allowNull: true
			},
			country_id: {
				type: DataTypes.BIGINT,
				allowNull: false,
				references: {
					model: 'countries',
					key: 'country_id'
				}
			},
			account_status: {
				type: DataTypes.STRING,
				allowNull: false
			}
		}, {
			tableName: 'accounts',
			timestamps: false
		}
	);
};