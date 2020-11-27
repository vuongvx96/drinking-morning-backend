const ROLES = {
	ADMIN: 'ADMIN',
	SUPERADMIN: 'SUPERADMIN',
}

const settingsJson =
	'{"maxTaskDuration":24,"timeAutoStop1":{"hour":12,"minute":45,"second":0},"timeAutoStop2":{"hour":20,"minute":5,"second":0},"allowTimerBeforeApproved":false}'

const PERMISSIONS = {
	ACCOUNT_OVERRIDE: 'ACCOUNT_OVERRIDE',
	ACCOUNT_CREATE: 'ACCOUNT_CREATE',
	ACCOUNT_EDIT: 'ACCOUNT_EDIT',
	ACCOUNT_REMOVE: 'ACCOUNT_REMOVE',
	ACCOUNT_VIEW_ALL: 'ACCOUNT_VIEW_ALL'
}

export { settingsJson, PERMISSIONS, ROLES }
