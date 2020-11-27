const filterTypeMap = new Map([
	['equals', '$eq'],
	['notEqual', '$ne'],
	['lessThan', '$lt'],
	['lessThanOrEqual', '$lte'],
	['greaterThan', '$gt'],
	['greaterThanOrEqual', '$gte']
])


export const buildFilterQuery = filterInfo => {
	switch (filterInfo.filterType) {
		case 'text': {
			switch (filterInfo.type) {
				case 'contains':
					return { $regex: `.*${filterInfo.filter}.*`, $options: 'siu' }
				case 'notContains':
					return {
						$regex: `^((?!${filterInfo.filter}).)*$`,
						$options: 'siu'
					}
				case 'equals':
					return filterInfo.filter
				case 'notEqual':
					return { $ne: filterInfo.filter }
				case 'startsWith':
					return {
						$regex: `^${filterInfo.filter}`,
						$options: 'siu'
					}
				default:
					return {
						$regex: `${filterInfo.filter}$`,
						$options: 'siu'
					}
			}
		}
		case 'number': {
			if (filterInfo.type === 'inRange')
				return { $gte: filterInfo.filter, $lte: filterInfo.filterTo }
			return { [filterTypeMap.get(filterInfo.type)]: filterInfo.filter }
		}
	}
}