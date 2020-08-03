module.exports = {
	validationRules: [
		{
			column: "USER_NAME",
			type: "STRING",
			required: true,
			unique: true,
			size: 255,
			saveAs: "USER_NAME"
		},
		{
			column: "AGE",
			type: "NUMBER",
			size: 3,
			required: true,
			saveAs: "AGE"
		},
		{
			column: "HEIGHT",
			type: "NUMBER",
			size: 3,
			required: true,
			saveAs: "HEIGHT"
		},
		{
			column: "GENDER",
			type: "STRING",
			size: 10,
			required: true,
			saveAs: "GENDER"
		},
		{
			column: "SALES_AMOUNT",
			type: "NUMBER",
			required: true,
			size: 20,
			unique: false,
			saveAs: "SALES_AMOUNT"
		},
		{
			column: "LAST_PURCHASE_DATE",
			type: "DATE",
			required: true,
			saveAs: "LAST_PURCHASE_DATE"
		}
	]
};