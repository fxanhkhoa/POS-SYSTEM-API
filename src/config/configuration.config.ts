export default () => ({
	database: process.env.DATABASE,
	email_username: process.env.MAIL_USERNAME,
	email_password: process.env.MAIL_PASSWORD,
	web_url: process.env.WEB_URL,
	POSTGRE_USERNAME: process.env.POSTGRE_USERNAME
});
