import ChatpalLogger from '../utils/logger';

class Query {

	constructor(text) {
		this.text = text;
		this.filters = {
			from: [],
			mention: [],
			label:[],
			stared: undefined,
			pinned: undefined,
			location: undefined,
			on:[],
			after:[],
			before:[]
		};
		this.order = 'desc';
	}

}

class QueryBuilder {
	constructor() {
		this.DEFAULT_LANGUAGE = 'en';
		this.langMap = {
			en: {
				from: new RegExp('from:([a-z0-9.-_]+)', 'ig'),
				me: 'me'
			},
			de: {
				from: new RegExp('von:([a-z0-9.-_]+)', 'ig'),
				me: 'mir'
			}
		};
	}

	_getLangValue(name, language) {
		return this.langMap[language] && this.langMap[language][name] ?
			this.langMap[language][name] :
			this.langMap[language][this.DEFAULT_LANGUAGE];
	}

	_extract(patternName, language, query, func) {
		query.text = query.text.replace(this._getLangValue(patternName, language), func);
	}

	build(text, language) {

		const query = new Query(text);

		this._extract('from', language, query, (match, username) => {
			const me = this._getLangValue('me', language);
			if (username === me) {
				username = Meteor.user().username;
			}
			query.filters.from.push(username);
			return '';
		});

		ChatpalLogger.info('parsed query:', JSON.stringify(query, null, 2));

		query.text = query.text.replace(/\s+/g, ' ').trim();

		return query;
	}

}

export const queryBuilder = new QueryBuilder();
